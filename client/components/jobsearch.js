import React, { Component } from 'react'
import SearchInput from './searchinput'
import DatePicker from './datePicker'
import Location from './location'
import Salary from './salary'

class Jobsearch extends Component {

  render () {
    return (
      <div>
        <h1>Job Search</h1>
        <SearchInput />
        <DatePicker />
        <DatePicker />
        <Location />
        <Salary />
      </div>
    )
  }
}

export default Jobsearch
