import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Jobsearch from './jobsearch'
import Charts from './charts'

class App extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <h1>Welcome to {this.props.name}</h1>
          <Jobsearch />
          <Charts />
        </div>
      </MuiThemeProvider>

    )
  }

}

export default App
