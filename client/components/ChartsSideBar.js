import React, { Component } from 'react'
import { Link } from 'react-router'

class ChartsSideBar extends Component {
  render() {
    return (
      <div className="col-md-3">
        <div className="list-group">
          <Link to="/charts/job-prevelence" className="list-group-item">
            <h4 className="list-group-item-heading">Job Prevelence</h4>
            <p className="list-group-item-text">...</p>
          </Link>
        </div>
        <div className="list-group">
          <Link to="/charts/job-amount-based-on-tech" className="list-group-item">
            <h4 className="list-group-item-heading">Job Amount Based on Tech</h4>
            <p className="list-group-item-text">...</p>
          </Link>
        </div>
        <div className="list-group">
          <a href="#" className="list-group-item">
            <h4 className="list-group-item-heading">Job Amount Based On Location</h4>
            <p className="list-group-item-text">...</p>
          </a>
        </div>
      </div>
    )
  }
}

export default ChartsSideBar
