import React from 'react'
import ReactDOM, { render } from 'react-dom'
import App from './components/app'
import {HashRouter} from 'react-router'

ReactDOM.render(
  <HashRouter>
    {({router}) => {
      return (
      <App router={router} />
      )
    }}
  </HashRouter>
  , document.querySelector('main')
)
