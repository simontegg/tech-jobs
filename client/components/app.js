import React, { Component } from 'react'
import { Match } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import JobSearch from './JobSearch'
import Menu from './Menu'
import Charts from './Charts'

class App extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Menu />
        <Match pattern="/search" component={JobSearch}/>
        <Match pattern="/charts" component={Charts}/>
      </div>
    )
  }

}

export default App
