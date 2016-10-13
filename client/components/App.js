import React, { Component } from 'react'
import Menu from './Menu'
import { browserHistory } from 'react-router'

class App extends Component {

  constructor (props) {
    super(props)
  }
  componentDidMount() {
    browserHistory.push('/search')
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
