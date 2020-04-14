import React from 'react'
import {Route} from 'react-router-dom'

import AlertMessage from './UI/AlertMessage'
import AppHeader from './UI/AppHeader'
import Home from './Home'
import UserDetails from './User/UserDetails'

 class App extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return <div>
        <AppHeader/>

        <AlertMessage />

           <h1>Hello world</h1>
            <Route path="/" component={Home} exact />
            <Route path="/user-details" component={UserDetails} /> 
          
        </div>
    }
}
export default App