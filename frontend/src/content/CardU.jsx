import React from 'react'

const CardU = ({icon,title, length, description}) => {
  return (
    <>
      <div className="user-card flex-row">
        <div className="user-card-details">
          <h4>{title}</h4>
          <span>{length}</span>
          <p>{description}</p>
        </div>
        <div className="user-card-icon">
          {icon}
        </div>
      </div>
    </>
  )
}

export default CardU