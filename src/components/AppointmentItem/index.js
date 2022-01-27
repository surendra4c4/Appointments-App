// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {listDetails, toggleStar} = props
  const {id, name, date, isFavourite} = listDetails
  const reqDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const imageUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changeStar = () => {
    toggleStar(id)
  }

  return (
    <li className="list-item">
      <div className="name-star-container">
        <p className="name">{name}</p>
        <button
          type="button"
          className="button"
          onClick={changeStar}
          testid="star"
        >
          <img src={imageUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {reqDate}</p>
    </li>
  )
}

export default AppointmentItem
