import React from 'react'

class JobSearchSideBar extends React.Component {

  constructor (props) {
    super (props)
    this.state = {
      keyword: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({keyword: e.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.searchTerm(this.state.keyword)
  }

  render() {
    return (
      <div className="col-md-3">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="col-sm-3 control-label">keyword</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="inputEmail3" placeholder="Keyword" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">City</label>
            <div className="col-sm-9">
              <select type="password" className="form-control" id="inputPassword3" defaultValue="3">
                <option value="1">Wellington</option>
                <option value="2">Auckland</option>
                <option value="3">Christchurch</option>
                <option value="4">Dunedin</option>
                <option value="5">Hamilton</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Date from</label>
            <div className="col-sm-9">
              <input type="date" className="form-control" id="inputPassword4" placeholder="Date"/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Date to</label>
            <div className="col-sm-9">
              <input type="date" className="form-control" id="inputPassword5" placeholder="Date"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6">
              <input type="number" className="form-control" placeholder="Salary from"/>
            </div>
            <div className="col-sm-6">
              <input type="number" className="form-control" placeholder="Salary to"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-default  center-block" >Search</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default JobSearchSideBar
