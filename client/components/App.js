import React, { Component } from 'react'
import JobSearch from './JobSearch'
import Menu from './Menu'

class App extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    )
  }

}

export default App
