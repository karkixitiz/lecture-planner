import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import {
    toggleSideMenu
} from '../../store/actions'

const styles = {
    root: {
        position: 'absolute',
        top: 50,
        left: 0,
        zIndex: 999,
        background: '#ccc',
        width: '80%',
        height: '100%',
    }
}
@connect(({showSideMenu})=>({showSideMenu}))
class Navigation extends React.Component {
    render () {
        if(!this.props.showSideMenu){
            return <div></div>
        }
        return <div className={this.props.classes.root} >
            <List component="nav">
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/lecture-details">
                    <ListItemText primary="Lectures" />
                </ListItem>
                <ListItem button component={Link} to="/user-details">
                    <ListItemText primary="User Details" />
                </ListItem>
            </List>
        </div>
    }
    _handleClick () {
        const {dispatch} = this.props

        dispatch(toggleSideMenu())
    }
}

export default withStyles(styles)(Navigation)