import React from 'react'

const Card = ({icon,title, length, description}) => {
  return (
    <>
    <div className="content-card flex-row">
    <div className="card-header">
       {icon}
       </div>
       <div className="card-body">
       <h3>{title}</h3>
        <span>{length}</span>
        <p>{description}</p>
       </div>
    </div>
    </>
  )
}

export default Card
