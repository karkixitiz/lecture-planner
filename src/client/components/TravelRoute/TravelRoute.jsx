import React from 'react'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import TravelRouteDetails from './TravelRouteDetails'
import TravelRouteStation from './TravelRouteStation'

export default class TravelRoute extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            showDetails: false
        }

        this._toggleDetails = () => this.setState({showDetails: !this.state.showDetails})
    }

    render () {
        return <React.Fragment>
            <ListItem button onClick={this._toggleDetails}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                    <TravelRouteStation
                        name={ this.props.route.from.name }
                        time={ this.props.route.from.time }
                    />
                    <TravelRouteStation
                        name={ this.props.route.to.name }
                        time={ this.props.route.to.time }
                    />
                </Grid>
                {this.state.showDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <TravelRouteDetails
                routeKey={this.props.routeKey}
                stations={this.props.route.stops}
                show={this.state.showDetails}
            />
        </React.Fragment>
    }
}
