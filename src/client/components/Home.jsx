import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import { isAddressSet } from '../utilities'
import {
    getUserDetails,
    hideSideMenu,
    setTitle
} from '../store/actions'
@connect(({address}) => ({address}))
export default class Home extends React.Component{
    constructor(props){
        super(props)
        props.dispatch(getUserDetails())
        props.dispatch(setTitle('Home'))
        props.dispatch(hideSideMenu())
    }
    render () {
        return <React.Fragment>
            <Typography >
                Welcome to Lecture Planner!
            </Typography>
            { !isAddressSet(this.props.address) ? (
                <Typography>
                    You don't have addresses set. Visit <Link to="/user-details">User Details</Link> to set them.
                </Typography>
            ) : null }
        </React.Fragment>
    }
}