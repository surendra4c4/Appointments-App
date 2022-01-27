// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    input: '',
    dateInput: '',
    starItems: false,
  }

  getStarItems = () => {
    this.setState(prevState => ({starItems: !prevState.starItems}))
  }

  getStarItemsList = () => {
    const {appointmentsList, starItems} = this.state

    if (starItems) {
      return appointmentsList.filter(eachStar => eachStar.isFavourite === true)
    }

    return appointmentsList
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachList => {
        if (eachList.id === id) {
          return {...eachList, isFavourite: !eachList.isFavourite}
        }
        return eachList
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {input, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      name: input,
      date: dateInput,
      isFavourite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      input: '',
      dateInput: '',
    }))
  }

  changeInput = event => {
    this.setState({input: event.target.value})
  }

  changeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {input, dateInput, starItems} = this.state
    const starredItemsList = this.getStarItemsList()
    const changeBgColor = starItems ? 'bg-blue star-btn' : 'star-btn'
    return (
      <div className="bg-container">
        <div className="content-container">
          <h1 className="heading">Add Appointments</h1>
          <div className="top-container">
            <form className="form-control" onSubmit={this.addAppointment}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                className="input-class"
                value={input}
                onChange={this.changeInput}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date"
                placeholder="dd/mm/yyyy"
                className="date-class"
                value={dateInput}
                onChange={this.changeDate}
              />
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointsment-star-btn-container">
            <p className="apointment">Appointments</p>
            <button
              type="button"
              className={changeBgColor}
              onClick={this.getStarItems}
            >
              Starred
            </button>
          </div>
          <ul className="list-container">
            {starredItemsList.map(eachItem => (
              <AppointmentItem
                key={eachItem.id}
                listDetails={eachItem}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
