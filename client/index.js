import React from 'react'
import ReactDOM, { render } from 'react-dom'
import App from './components/app'
import JobSearch from './components/JobSearch'
import Charts from './components/Charts'
import ChartJobPrevalence from './components/ChartJobPrevalence'
import ChartJobAmountBasedOnTech from './components/ChartJobAmountBasedOnTech'
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render(
  <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/search" component={JobSearch}/>
        <Route path="/charts" component={Charts}>
          <Route path="/charts/job-prevalence" component={ChartJobPrevalence}/>
          <Route path="/charts/job-amount-based-on-tech" component={ChartJobAmountBasedOnTech}/>
        </Route>
      </Route>
  </Router>
  , document.querySelector('main')
)
