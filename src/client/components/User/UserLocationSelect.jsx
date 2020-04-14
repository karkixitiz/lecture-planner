import React from 'react'
import { connect } from 'react-redux'
import Downshift from 'downshift'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

import {
    setSourceAddress,
    getLocationSuggestions
} from '../../store/actions'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  }
})

@connect(({address, locationSuggestions}) => ({address, locationSuggestions}))
class UserLocationSelect extends React.Component {
    constructor (props) {
        super(props)
        this._handleSourceAddressChange = selection => props.dispatch(setSourceAddress(selection))
        this._getLocationSuggestions = this._getLocationSuggestions.bind(this)
    }

    render () {
        const { classes } = this.props

        return <Downshift
            id="location-select"
            onChange={this._handleSourceAddressChange}
            onInputValueChange={this._getLocationSuggestions}
            defaultInputValue={this.props.address.source}
        >
            {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
                <div className={classes.container}>
                {this._renderInput({
                    fullWidth: true,
                    classes,
                    InputProps: getInputProps({
                        placeholder: 'Search your location',
                    }),
                })}
                {isOpen ? (
                    <Paper className={classes.paper} square>
                    {this.props.locationSuggestions.map((suggestion, index) =>
                        this._renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.value }),
                            highlightedIndex,
                            selectedItem,
                        }),
                        )}
                    </Paper>
                    ) : null}
                </div>
                )}
        </Downshift>
    }

    /**
     * Render the input field for typing the location keyword
     * @param  {Object} inputProps
     * @return {TextField}
     */
    _renderInput (inputProps) {
        const { InputProps, classes, ref, ...other } = inputProps

        return <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    }

    /**
     * The view for displaying location suggestions
     */
    _renderSuggestion ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
        const isHighlighted = highlightedIndex === index
        const isSelected = (selectedItem || '').indexOf(suggestion.value) > -1

        const key = `${suggestion.value.replace(/\s\s+/g, '')}_${index}`
        return <MenuItem
            {...itemProps}
            key={key}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.value}
        </MenuItem>
    }

    /**
     * Get the suggestions for the typed keyword from the server
     * @param  {String} inputValue
     */
    _getLocationSuggestions (inputValue) {
        const { dispatch } = this.props
        if (inputValue !== '') {
            dispatch(getLocationSuggestions(inputValue))
        }
    }
}

export default withStyles(styles)(UserLocationSelect)
