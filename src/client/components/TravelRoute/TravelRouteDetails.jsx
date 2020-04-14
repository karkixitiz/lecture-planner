import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import DirectionsBusTwoTone from '@material-ui/icons/DirectionsBusTwoTone'
import DirectionsBoatTwoTone from '@material-ui/icons/DirectionsBoatTwoTone'
import DirectionsWalkTwoTone from '@material-ui/icons/DirectionsWalkTwoTone'

import TravelRouteStation from './TravelRouteStation'

const styles = {
    vehicleRoutes: {
        paddingTop: 1,
        paddingBottom: 1
    }
}

class TravelRouteDetails extends React.Component {
    render () {
        let stations = []

        for (let i=0; i < this.props.stations.length; i++) {
            let routeStop = this.props.stations[i]

            let vehicleIcon = this._getVehicleIcon(routeStop.vehicle)

            let vehicleDirection = routeStop.direction ? <React.Fragment>→ { routeStop.direction }</React.Fragment> : ''

            stations.push(<ListItem key={`routeStop_${this.props.routeKey}_${i}`}>
                { vehicleIcon }
                <List dense={true} disablePadding>
                    <ListItem
                        key={`routeStop_${this.props.routeKey}_${i}_from`}
                        className={this.props.classes.vehicleRoutes}
                    >
                        <TravelRouteStation name={ routeStop.from.name } time={ routeStop.from.time } />
                    </ListItem>
                    <ListItem
                        key={`routeStop_${this.props.routeKey}_${i}_vehicle`}
                        className={this.props.classes.vehicleRoutes}
                    >
                        <Typography color="textPrimary">{ routeStop.vehicle} { vehicleDirection }</Typography>
                    </ListItem>
                    <ListItem
                        key={`routeStop_${this.props.routeKey}_${i}_to`}
                        className={this.props.classes.vehicleRoutes}
                    >
                        <TravelRouteStation name={ routeStop.to.name } time={ routeStop.to.time } />
                    </ListItem>
                </List>
            </ListItem>)
        }

        return <Collapse in={this.props.show} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {stations}
            </List>
        </Collapse>
    }

    _getVehicleIcon (routeVehicle) {
        let vehicleIcon
        if (routeVehicle.indexOf('Bus') !== -1) {
            vehicleIcon = <DirectionsBusTwoTone></DirectionsBusTwoTone>
        } else if (routeVehicle.indexOf('Walk') !== -1) {
            vehicleIcon = <DirectionsWalkTwoTone></DirectionsWalkTwoTone>
        } else if (routeVehicle.indexOf('Fähre') !== -1) {
            vehicleIcon = <DirectionsBoatTwoTone></DirectionsBoatTwoTone>
        }

        return vehicleIcon
    }
}

export default withStyles(styles)(TravelRouteDetails)
