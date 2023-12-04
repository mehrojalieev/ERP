import React from 'react'
import instance from "../../services/api/index"

const Attendance = () => {
  
  instance("/student/all")
    .then(response => console.log(response))
  return (
    <>
      <div className='admin__content-header'>
        <h1>Attendance</h1>
        </div>
    </>
  )
}

export default Attendance