import React, { useEffect, useState } from 'react'
import instance from '../../services/api'

const Students = () => {
  const [allStudentsData, setAllStudentsData] = useState([])

  useEffect(() => {
    instance("/student/all")
      .then(response => {
        setAllStudentsData(response.data.students)
        console.log(response.data.students)
      })
  }, [])

  return (
    <>
      <div className='admin__content-header'>
        <h1>Students</h1>
      </div>
    <div className='students'>
      {
          <table>
            <thead>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Contact</th>
              <th>Block</th>
              <th>Room</th>
              <th>Status</th>
              <th>Image</th>
            </thead>
            <tbody>
              {
                allStudentsData.map(student =>
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
                    <td>{student.city}</td>
                    <td>{student.contact}</td>
                    <td>{student.blockNo}</td>
                    <td>{student.roomNo}</td>
                    <td>{student.status}</td>
                    <td><img src={student.image} /></td>
                  </tr>
                )
              }
            </tbody>
          </table>
        }
      </div>
    </>
  )
}

export default Students