import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import LectureDetailsResults from './LectureDetailsResults'

import {
    getLectureDetails ,
    hideSideMenu,
    setTitle
} from '../../store/actions'

@connect(({lectures}) => ({lectures}))
export default class LectureDetails extends React.Component {
    constructor (props) {
        super(props)

        props.dispatch(getLectureDetails())
        props.dispatch(hideSideMenu())
        props.dispatch(setTitle('Lectures'))
    }

    render () {
        return <Grid container spacing={8}>
            <Grid item xs={12}>
                <LectureDetailsResults />
            </Grid>
        </Grid>
    }

}

