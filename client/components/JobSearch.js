import React, { Component } from 'react'
import JobSearchSideBar from './JobSearchSideBar'
import JobSearchContent from './JobSearchContent'
import api from '../lib/api'

class JobSearch extends Component {

  constructor (props) {
    super(props)

  }

  getJobs () {
     const jobs = api.service('/api/v1/jobs')
     jobs.get()
     .then((res) => {
       console.log("RESULT ", res)
     })
     .catch(err => {
       console.log("ERROR ", err)
     })
   }

  searchTerm (term) {
    const jobsByTerm = api.service(`/api/v1/${term}`)
    jobsByTerm.get()
    .then((res) => {
      console.log("RESULT ", res)
    })
    .catch(err => {
      console.log("ERROR ", err)
    })
  }

  render () {
    console.log('this.props.api ', this.props.api)
    // temporary
    var term = 'time-series/weeks?term=react'
    {var x = this.getJobs()}
    {var x = this.searchTerm(term)}

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
