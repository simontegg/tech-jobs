import React from 'react'

var wrapComponent = function(Component, props) {
  return React.createClass({
    render: function() {
      return React.createElement(Component, props)
    }
  })
}

export default wrapComponent
