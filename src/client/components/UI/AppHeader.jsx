import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import Navigation from './Navigation'

import {
    toggleSideMenu
} from '../../store/actions'


const styles = {
    header: {
        marginBottom: 25
    }
}
@connect(({title})=>({title}))
class AppHeader extends React.Component {
    constructor (props) {
        super(props)
        const{dispatch}=this.props
        this._toggleNav = () => dispatch(toggleSideMenu())
    }
    render () {
        return <Grid container spacing={24} className={this.props.classes.header}>
            <AppBar position="static">
                <Toolbar>
                <IconButton color="inherit" aria-label="Menu" onClick={this._toggleNav}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        { this.props.title }
                    </Typography>
                </Toolbar>
            </AppBar>

            <Navigation />
        </Grid>
    }
}

export default withStyles(styles)(AppHeader)