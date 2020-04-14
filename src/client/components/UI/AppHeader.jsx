import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import Navigation from './Navigation'

const styles = {
    header: {
        marginBottom: 25
    }
}
class AppHeader extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return <Grid container spacing={4} className={this.props.classes.header}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography  color="inherit">
                       
                    </Typography>
                </Toolbar>
            </AppBar>

            <Navigation />
        </Grid>
    }
}

export default withStyles(styles)(AppHeader)