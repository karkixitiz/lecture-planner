import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { isAddressSet } from '../../utilities'

import TravelRouteResults from './TravelRouteResults'

import {
    hideSideMenu,
    setTitle,
    performRouteSearchWithDateTime,
    setLectureDateTime
} from '../../store/actions'

@connect(({user, address, dateTime}) => ({user, address, dateTime}))
export default class TravelRouteSchedule extends React.Component {
    constructor (props) {
        super(props)
        const {source, destination} = this.props.address
        const {date,time}=this.props.dateTime

        props.dispatch(performRouteSearchWithDateTime(source, destination,date,time))
        props.dispatch(setTitle('Route Search'))
        props.dispatch(hideSideMenu())
    }

    render () {
        return <Grid container spacing={8}>
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth={false}
                    component={Link}
                    to="/lecture-details">
                    Back to lectures
                </Button>
            </Grid>

            <Grid item xs={12} container direction="column">
                <Typography>
                    { this.props.address.source } → { this.props.address.destination }
                </Typography>
                <Typography color="textSecondary">
                    { this.props.user.lecture.subject } ({ this.props.user.lecture.date } { this.props.user.lecture.time })
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <TravelRouteResults />
            </Grid>
        </Grid>
    }
}
