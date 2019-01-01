import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SiteDetails from '@/page/site/details'
import Display from '@/page/display'

export default class App extends Component {
  render () {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Display}/>
          <Route exact path='/details/:id' component={SiteDetails} />
        </Switch>
      </Router>
    )
  }
}