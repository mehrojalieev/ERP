import { useState, useEffect, useRef } from 'react';
import { Button, Modal } from "../../utils";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import { loadAttendance, loadStudents } from '../../redux/actions/studentaction';
import axios from "../../services/api";
import "./Attendance.scss";

const Attendance = (props) => {

  new Date().toLocaleDateString()


  const { students_data, isloading } = useSelector(state => state.student);
  const { attendance_data } = useSelector(state => state.attendance);
  console.log(attendance_data)
  const key = ['roomNo', 'date', 'data', 'classStart', 'classEnd']
  const roomNo = useRef();
  const date = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const studentsData = new Map();
  students_data.forEach(student => {
    studentsData.set(student.name, { present: true })
  })

  const data = {}
  const attendanceDetails = new Map();
  attendanceDetails.set("classStart", "08:30");
  attendanceDetails.set("classEnd", "11:30");




  const details = {}
  attendanceDetails.forEach((value, key) => {
    details[key] = value;
  })

  useEffect(() => {
    props.loadStudents();
    props.loadAttendance();
  }, [])


  const handleCreateNewAttendance = (e) => {
    e.preventDefault();

    // console.log(studentsData.entries());
    studentsData.forEach((value, key) => {
      data[key] = value;
    })
    axios.post("/attendance/", {
      roomNo: [roomNo.current.value],
      date: date.current.value,
      data,
      details
    })
      .then(() => {
        setIsModalOpen(false)
      })
      .catch(error => console.log(error))
  }




  return (
    <>
      <div className='admin__content-header'>
        <h1>Attendance</h1>
        <Button text={"Create new attendance"} isloading={false} click={() => setIsModalOpen(true)} />
      </div>
      <div className='admin__content-body'>
        <table className='attendance-table'>
          <thead>
            <tr>
              {
                key.map((theitem, index) =>
                  <th className='table__th' key={index}>{theitem}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              attendance_data.map(tditem =>
                <tr>
                  <td className='table__td'>{tditem.roomNo[0][0] === "select" ? "7" : tditem.roomNo}</td>
                  <td className='table__td'>{tditem.date}</td>
                  <td className='table__td'>{tditem.date}</td>
                  <td className='table__td'>{tditem.details.classStart}</td>
                  <td className='table__td'>{tditem.details.classEnd}</td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>

      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <form className='form' onSubmit={handleCreateNewAttendance}>
          <input type="date" ref={date} />
          <select ref={roomNo} >
            <option value="select">Select room no</option>
            {
              new Array(15).fill("").map((_, index) =>
                <option key={index} value={index + 1}>{index + 1}</option>
              )
            }
          </select>
          {!isloading && students_data.length > 0 ?
            students_data.map(student =>
              <div className='student-attendance-item' key={student._id}>
                <h4>{student.name}</h4>
                <div className='checbox-wrapper'>
                  <input id={student._id} type="checkbox" defaultChecked onChange={(e) => studentsData.set(student.name, { present: e.target.checked })} />
                  <label htmlFor={student._id}></label>
                </div>
              </div>
            )
            :
            <>{isloading && <p>Loading...</p>}</>
          }

          <Button text={"Save attendance"} isloading={false} />
        </form>
      </Modal>
    </>
  )
}

export default connect(null, { loadStudents, loadAttendance })(Attendance)