import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SiteIndex from '@/page/site/index'
import SiteDetails from '@/page/site/details'

export default class App extends Component {
  render () {
    return (
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={SiteIndex}/>
          <Route exact path='/details/:id' component={SiteDetails} />
        </Switch>
      </Router>
    )
  }
}