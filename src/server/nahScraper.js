import rp from 'request-promise-native'
import cheerio from 'cheerio'
import moment from 'moment'
import he from 'he'

const URL = 'http://www.nah.sh/'

/**
 * Scrape data from the nah.sh website
 */
class NahScraper {
    /**
     * The constructor
     */
    constructor () {
        this.$ = null   // For DOM manipulation using cheerio
        this.timeFormat = 'HH:mm'
    }

    /**
     * Get the Security ID from the page
     * @return {String}
     */
    get securityId () {
        return this.$('#Form_TimeTableForm_SecurityID').val()
    }

    /**
     * Initialize the scraper
     * @param  {String} url
     * @param  {Boolean} doTransform
     * @return {Promise}
     */
    initalizeScraper (url, doTransform = true) {
        var options = {
            uri: url,
            transform: (body) => {
                return doTransform ? cheerio.load(body) : body;
            }
        }

        return rp(options)
                .then(($) => {
                    this.$ = $
                    return this.securityId
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
    }

    /**
     * Get the route plan
     * @param  {String} from
     * @param  {String} destination
     * @param  {String} dateIso
     * @param  {String} reachByTime 'the time to reach by'
     * @return {Promise}
     */
    getRoutePlan (from, destination, dateIso, reachByTime) {
        const encodeText = (text) => he.escape(text, {decimal: true})
        const encodeTime = (reachByTime) => encodeURIComponent(reachByTime)

        from = encodeText(from)
        destination = encodeText(destination)

        const date = moment(dateIso)
        const dateDe = date.format('DD.MM.YYYY')
        const time = encodeTime(this.calculateStartTime(date, reachByTime))

        return new Promise((resolve, reject) => {
            this.initalizeScraper(URL)
                .then(res => {
                    let queryUrl = `http://nah.sh.hafas.de/bin/query.exe/dn?url=%2Fhome%2FTimeTableForm&encoding=utf-8&tpl=suggest2json&nojs&S=${from}&REQ0JourneyStopsS0ID=&REQ0JourneyStopsS0A=255&Z=${destination}&REQ0JourneyStopsZ0ID=&REQ0JourneyStopsZ0A=255&Date=${dateDe}&isodate=${dateIso}&isJquery=true&Time=${time}&SecurityID=${this.securityId}&start=Suche`

                    return rp(queryUrl)
                })
                .then((html) => {
                    try {
                        let results = this.getResultsObject(html)

                        resolve(this.parseRouteResults(results, reachByTime))
                    } catch (e) {
                        reject(e.message)
                        return
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    /**
     * Get location suggestions based on the keyword
     * @param  {String} keyword
     * @return {JSON}
     */
    locationSuggestions (keyword) {
        let url = `http://nah.sh.hafas.de/bin/ajax-getstop.exe/dny?tpl=suggest2json&encoding=utf-8&start=1&getstop=1&nojs&S=${keyword}?&REQ0JourneyStopsS0A=255&REQ0JourneyStopsB=12`

        return new Promise((resolve, reject) => {
            rp(url)
                .then((res) => {
                    let suggestions = this.parseRouteSuggestions(res)

                    resolve(suggestions)
                })
                .catch((err) => {
                    reject(err.message)
                })
        })
    }

    /**
     * Get the results in a json format
     * @param  {String} html
     * @return {Object}
     */
    getResultsObject (html) {
        let matches = html.match(/hfsGui\.tp\.currentResult = \(([\s\S]*?)(?=\);)/)

        // If the results json couldn't be parsed from the response html
        if (!matches || matches.length < 2) {
            throw Error('Error getting matches from server')
            return
        }

        return JSON.parse(matches[1])
    }

    /**
     * Parse the results of the nah.sh route query
     * @param  {Object} results
     * @param  {String} reachByTime
     * @return {Array}
     */
    parseRouteResults (results, reachByTime = null) {
        let parsedResults = []

        /**
         * Get location info from the data
         * @param  {Object} data
         * @return {Object}
         */
        let locationInfo = (data) => {
            return {
                name: he.decode(data.location.name),
                time: typeof data.arr !== 'undefined' ? data.arr.time : data.dep.time,
                date: typeof data.arr !== 'undefined' ? data.arr.date : data.dep.date,
            }
        }

        for (var connection of results.connections) {
            let locations = {
                from: locationInfo(connection.from),
                to: locationInfo(connection.to)
            }

            // Show only the results within the reachByTime time frame
            if (!this.isTimeSufficient(reachByTime, locations.to.time)) {
                continue
            }

            let stops = Object.values(connection.sections).map((section, i) => {
                let vehicle = he.decode(connection.products[i].name.replace(/\s\s+/g, ' '))
                let direction = connection.products[i].direction ? he.decode(connection.products[i].direction) : null

                if (vehicle === '') {
                    vehicle = 'Walk'
                }

                return {
                    from: {
                        ...locationInfo(section.from),
                    },
                    to: {
                        ...locationInfo(section.to),
                    },
                    vehicle,
                    direction
                }
            })

            locations.stops = stops
            parsedResults.push(locations)
        }

        return parsedResults
    }

    /**
     * Get only the name of stops from the suggestions
     * @param  {String} routes
     * @return {Array}
     */
    parseRouteSuggestions (routes) {
        routes = JSON.parse(routes)

        return routes.suggestions.map(suggestion => ({
            value: suggestion.value
        }))
    }

    /**
     * Calculates the start time so that the destination
     * can be reached before the specified time
     * @param  {String} date
     * @param  {String} reachByTime
     * @return {String}
     */
    calculateStartTime (date, reachByTime) {
        // TODO: Figure out efficient way of calculating start time
        let startBefore
        if (date.day() === 0 || date.day() === 6) {
            // Buses don't run as frequently on Saturdays
            // and Sundays, so start sooner
            startBefore = 2.15
        } else {
            startBefore = 1.15
        }

        return moment(reachByTime, this.timeFormat).subtract(startBefore, 'hour').format(this.timeFormat)
    }

    /**
     * Check if there is sufficient time to reach the final
     * station without being late
     * @param  {String}  reachByTime
     * @param  {String}  stationArrivalTime
     * @return {Boolean}
     */
    isTimeSufficient (reachByTime, stationArrivalTime) {
        reachByTime = moment(reachByTime, this.timeFormat)
        stationArrivalTime = moment(stationArrivalTime, this.timeFormat)

        const slackTime = 5
        return reachByTime.diff(stationArrivalTime) > slackTime
    }
}

let nahScraper = new NahScraper()
export default nahScraper
