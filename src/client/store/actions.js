import 'babel-polyfill';
import axios from 'axios'

import {
    SET_TITLE,
    SET_SOURCE_ADDRESS,
    SET_DESTINATION_ADDRESS,
    SET_TRAVEL_ROUTES,
    GET_USER_DETAILS,
    SET_USER_ID,
    SET_UNIVERSITIES,
    SET_LOCATION_SUGGESTIONS,
    CLEAR_MESSAGE,
    SET_SUCCESS_MESSAGE,
    SET_ERROR_MESSAGE,
    HIDE_SIDE_MENU,
    TOGGLE_SIDE_MENU,
    SET_LECTURE_DETAILS,
    SET_LECTURE,
    SET_DATE,
    SET_TIME
} from './action-types'

const SERVER_ROOT='localhost'
const SERVER_PORT='3000'
const SERVER_URL=`http://${SERVER_ROOT}:${SERVER_PORT}`

export const setTitle=title=>({
    type:SET_TITLE,
    payload:title
})

export const setLecture=lecture=>({
    type:SET_LECTURE,
    payload:lecture
})

export const setLectureDate = dateTime => ({
    type: SET_DATE,
    payload: dateTime
})

export const setLectureTime = dateTime => ({
    type: SET_TIME,
    payload: dateTime
})

export const setSourceAddress = address => ({
    type: SET_SOURCE_ADDRESS,
    payload: address
})

export const setDestinationAddress = address => ({
    type: SET_DESTINATION_ADDRESS,
    payload: address
})

export const setRoutes = (routes) => ({
    type: SET_TRAVEL_ROUTES,
    payload: routes
})

export const setLocationSuggestions = (suggestions) => ({
    type: SET_LOCATION_SUGGESTIONS,
    payload: suggestions
})

export const setUniversities = (universities) => ({
    type: SET_UNIVERSITIES,
    payload: universities
})

export const setLectureDetails = (lectures) => ({
    type: SET_LECTURE_DETAILS,
    payload: lectures
})

export const setUserId = (userId) => ({
    type: SET_USER_ID,
    payload: userId
})

export const clearMessage = () => ({
    type: CLEAR_MESSAGE
})

export const setSuccessMessage = (message) => ({
    type: SET_SUCCESS_MESSAGE,
    payload: message
})

export const setErrorMessage = (message) => ({
    type: SET_ERROR_MESSAGE,
    payload: message
})

export const hideSideMenu = () => ({
    type: HIDE_SIDE_MENU
})

export const toggleSideMenu = () => ({
    type: TOGGLE_SIDE_MENU
})

export const getUserDetails = () => async dispatch => {
    try {
        dispatch(clearMessage())

        const res = await axios.get(`${SERVER_URL}/user-details`)

        let location = ''
        let university = ''
        let userId = ''

        if (res.data.data) {
            location = res.data.data.location
            university = res.data.data.university
            userId = res.data.data._id
        }

        dispatch(setUserId(userId))
        dispatch(setSourceAddress(location))
        dispatch(setDestinationAddress(university))
    } catch (e) {
        dispatch(setErrorMessage(e.response.data.message))
    }
}

export const saveuserDetails = (location, university, userId) => async dispatch => {
    try {
        dispatch(clearMessage())
        const res = await axios.post(`${SERVER_URL}/user-details`, {
            location,
            university,
            userId
        })

        dispatch(setSuccessMessage(res.data.data.message))
    } catch (e) {
        dispatch(setErrorMessage(e.response.data.message))
    }
}

export const getLocationSuggestions = (keyword) => async dispatch => {
    try {
        dispatch(clearMessage())

        const res = await axios.get(`${SERVER_URL}/route-suggestions/${keyword}`)

        dispatch(setLocationSuggestions(res.data.data))
    } catch (e) {
        dispatch(setErrorMessage(e.response.data.message))
    }
}

export const getUniversities = () => async dispatch => {
    try {
        dispatch(clearMessage())

        const res = await axios.get(`${SERVER_URL}/universities`)

        dispatch(setUniversities(res.data.data))
    } catch (e) {
        dispatch(setErrorMessage(e.response.data.message))
    }
}

export const performRouteSearch = (source, destination) => async dispatch => {
    try {
        dispatch(clearMessage())

        const res = await axios.post(`${SERVER_URL}/route-plan`, {
            from: source,
            destination: destination,
            date: '2018-08-17',
            time: '10:20'
        })

        dispatch(setRoutes(res.data.data))
    } catch (e) {
        dispatch(setErrorMessage(e.response.data.message))
    }
}

export const getLectureDetails = () => async dispatch => {
    try {
        dispatch(clearMessage())
        const res = await axios.get(`${SERVER_URL}/lecture-details`)

        //console.log(res.data.data);
        dispatch(setLectureDetails(res.data.data))
    } catch (e) {
        dispatch(setErrorMessage(e.response.message))
    }
}

export const performRouteSearchWithDateTime = (source, destination,date,time) => async dispatch => {
    try {
        dispatch(clearMessage())
        dispatch(setRoutes([]))

        const res = await axios.post(`${SERVER_URL}/route-plan`, {
            from: source,
            destination: destination,
            date: date,
            time: time
        })

        dispatch(setRoutes(res.data.data))
    } catch (e) {
        dispatch(setErrorMessage(e.response.data.message))
    }
}