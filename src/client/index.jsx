import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './store/index'

import App from './components/App'

function startApp (){
    ReactDOM.render(
        <Provider store={store}>
        <Router>
         <App/>
        </Router>
        </Provider>,
        document.getElementById('app')
    )
}
startApp()