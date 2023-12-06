import { useState, useEffect, useRef } from 'react';
import { Button, Modal } from "../../utils";
import { connect } from "react-redux";
import { loadStudents } from '../../redux/actions/studentaction';
import { useSelector } from 'react-redux';
import axios from "../../services/api";
import "./Attendance.scss";


const Attendance = (props) => {
  const { students_data, isloading } = useSelector(state => state.student);
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
  }, [])

  const handleCreateNewAttendance = (e) => {
    e.preventDefault();

    // console.log(studentsData.entries());
    studentsData.forEach((value, key) => {
      data[key] = value;
    })
    console.log(date)
    console.log(roomNo)
    console.log(data)

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
        <h2>Attendance</h2>
      </div>

      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <form className='form' onSubmit={handleCreateNewAttendance}>
          <div className="form-action">
            <input type="date" ref={date} />
            <select ref={roomNo} >
              <option value="select">Select room no</option>
              {
                new Array(15).fill("").map((_, index) =>
                  <option key={index} value={index + 1}>{index + 1}</option>
                )
              }
            </select>
          </div>
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

export default connect(null, { loadStudents })(Attendance)