import React from 'react'
import {Route} from 'react-router-dom'

import AlertMessage from './UI/AlertMessage'
import AppHeader from './UI/AppHeader'
import Home from './Home'
import UserDetails from './User/UserDetails'
import LectureDetails from './Lecture/LectureDetails'
import TravelRouteSchedule from './TravelRoute/TravelRouteSchedule'

 class App extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return <div>
        <AppHeader/>

        <AlertMessage />

        <Route path="/" component={Home} exact />
            <Route path="/user-details" component={UserDetails} />
            <Route path="/route-search" component={TravelRouteSchedule} />
            <Route path="/lecture-details" component={LectureDetails} />
          
        </div>
    }
}
export default App