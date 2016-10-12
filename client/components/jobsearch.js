import React, { Component } from 'react'
import JobSearchSideBar from './JobSearchSideBar'
import JobSearchContent from './JobSearchContent'

class JobSearch extends Component {

  render () {
    return (
      <div className="container" style={{paddingTop:'30px'}}>
        <div className="row">
          <JobSearchSideBar />
          <JobSearchContent />
        </div>
      </div>
    )
  }
}

export default JobSearch
