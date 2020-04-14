import React from 'react'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import LectureComponents from './LectureComponents'
import { Redirect } from 'react-router-dom'

export default class Lecture extends React.Component {
    constructor (props) {
        super(props)

        props.dispatch(setTitle('Lectures'))

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
                return <Redirect to='/search' />
            }
        }
    }

    render () {
        return <React.Fragment>
            <ListItem>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <LectureComponents
                        text='subject' subject={ this.props.lecture.subject }
                        date={ this.props.lecture.date }
                        time={this.props.lecture.time}
                    />
                    <div>
                        {this.renderRedirect()}
                        <Button variant="raised"
                                color="primary"
                                fullWidth={false} onClick={this.setRedirect}>Find Routes</Button>
                    </div>
                </Grid>
            </ListItem>


        </React.Fragment>
    }
}
