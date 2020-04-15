import nahScraper from './nahScraper'
import {formatResponse, formatError} from './api'

class ScrapeCtrl {
    /**
     * Get the route plan
     * @param  {Object} req
     * @param  {Object} res
     * @return {JSON}
     */
    getRoutePlan (req, res) {
        let {from, destination, date, time} = req.body

        nahScraper.getRoutePlan(from, destination, date, time)
            .then(response => {
                res.send(formatResponse(response))
            })
            .catch(error => {
                res.status(400)
                res.json(formatError(error))
            })

    }

     /**
     * Get the location suggestions based on the provided keyword
     * @param  {Object} req
     * @param  {Object} res
     * @return {JSON}
     */
    locationSuggestions (req, res) {
        nahScraper.locationSuggestions(req.params.keyword)
            .then(response => {
                res.send(formatResponse(response))
            })
            .catch(error => {
                res.status(400)
                res.json(formatError(error))
            })
    }
}

let scrapeCtrl = new ScrapeCtrl()
export default scrapeCtrl