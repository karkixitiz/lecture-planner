import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'

import Lecture from './Lecture'

import {
    setLecture,
    setLectureDate,
    setLectureTime
} from '../../store/actions'

const styles = {
    classIcon: {
        marginTop: 10,
        marginRight: 10
    }
}

@connect(({lectures}) => ({lectures}))
export class LectureDetailsResults extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
        this.setRedirect = () => {
            this.setState({
                redirect: true
            })
        }
        this.renderRedirect = () => {
            if (this.state.redirect) {
                return <Redirect to='/route-search'/>
            }
        }

    }

    render() {
        var autoCompleteList;
        var innerNodes;
        var onListItemSelected = this._setLecture;
        var i = 0;

        innerNodes = this.props.lectures.map(function (item) {
            return <ListItem
                button onClick={this._setLecture.bind(this, item.subject, item.date, item.time)}
                key={i++} {...item} >
                <Grid container direction="column">
                    <Typography>
                        { item.subject }
                    </Typography>
                    <Typography color="textSecondary">
                        {item.date}, {item.time}
                    </Typography>
                </Grid>
            </ListItem>
        }, this)

        return <List>
            {this.renderRedirect()}
            {innerNodes}</List>
    }

    _setLecture (subject, date, time) {
        this.setRedirect();

        let lecture = {
            subject,
            date,
            time
        }

        //console.log(date,time);
        this.props.dispatch(setLecture(lecture))
        this.props.dispatch(setLectureDate(date))
        this.props.dispatch(setLectureTime(time))
    }
}

export default withStyles(styles)(LectureDetailsResults)
