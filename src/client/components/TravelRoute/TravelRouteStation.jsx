import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export default class TravelRouteStation extends React.Component {
    render () {
        return <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
            <Typography>
                { this.props.time }
            </Typography>
            <Typography color="textSecondary">
                &nbsp; { this.props.name }
            </Typography>
        </Grid>
    }
}
