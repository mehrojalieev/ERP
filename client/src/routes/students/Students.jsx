import React, { useEffect, useState } from "react";
import {Button, Modal } from "../../utils"
import {connect, useSelector} from "react-redux";
import { addStudent, loadStudents, editStudent, deleteStudent } from "../../redux/actions/student-actions";
import "./Students.scss"
import { FiEdit, FiTrash } from "react-icons/fi";

const Students = (props) => {
  const [activityType, setActivityType] = useState("create");
  const {students_data, isloading} = useSelector(state => state.student)
  const [tableHeaderContent, setTableHeaderContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [image, setImage] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [blockNo, setBlockNo] = useState("");
  const [status, setStatus] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if(students_data.length > 0){
      const {_id, __v, updatedAt, createdAt, ...studentdata} = students_data[0];
      setTableHeaderContent(Object.keys(studentdata))
    }
  }, [students_data])


  const handleOpenModal = () => {
    setIsModalOpen(true);
    setActivityType("create");
    setName("");
    setAddress("");
    setCity("");
    setContact("");
    setFatherContact("");
    setImage("");
    setRoomNo("");
    setStatus("");
    setBlockNo("");
    setCategory("");
  }

  useEffect(() => {
    props.loadStudents();
  }, [])

  const handleCreateNewStudent = (e) => {
    e.preventDefault();
    props.addStudent({
      name,
      address,
      category,
      city,
      contact,
      fatherContact,
      image,
      roomNo,
      blockNo,
      status
    })
    setIsModalOpen(false)
  }

  const handleEditStudentModal = (student, id) => {
    setStudentId(id)
    setIsModalOpen(true);
    setName(student.name);
    setAddress(student.address);
    setCity(student.city);
    setContact(student.contact);
    setFatherContact(student.fatherContact);
    setImage(student.image);
    setRoomNo(student.roomNo);
    setStatus(student.status);
    setBlockNo(student.blockNo);
    setCategory(student.category);
    setActivityType("edit")
  }

  const handleEditStudent = (e) => {
    e.preventDefault();

    props.editStudent({
      _id: studentId,
      name,
      address,
      category,
      city,
      contact,
      fatherContact,
      image,
      roomNo,
      blockNo,
      status
    })
    setIsModalOpen(false)
  }

  const handleDeleteStudent = (id) => {
    const isadminagreed = window.confirm('Are you really going to delete this student?');

    if(isadminagreed){
      props.deleteStudent(id)
    }
  }

  return (
    <>
      <div className="admin__content-header">
        <h1>Students</h1>
        <Button text="Add Student" click={handleOpenModal}/>
      </div>
      <div className="admin__content-body">
        <div className="students-searchbar">
          
          <form className="search-form">
            <input type="text" placeholder="Search..." />
            <Button text={"Search"}/>
          </form>
        <select>
            <option value="bachelors">BACHELORS</option>
            <option value="masters">MASTERS</option>
            <option value="phd">PHD</option>
          </select>
        </div>
       <div className="table-wrapper">
       {
            !isloading && students_data.length > 0 ? 
              <table className="students-table">
                  <thead>
                    <tr>
                      {tableHeaderContent &&
                        tableHeaderContent.map((thitem, index) => 
                          <th className="table__th" key={index}>{thitem}</th>  
                        )
                      }
                      <th className="table__th">manage</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      students_data.map(student => (
                        <tr key={student._id}>
                            {
                              tableHeaderContent &&
                              tableHeaderContent.map((thitem, index) => 
                                <td data-cell={thitem} className="table__td" key={index}>
                                  <span>
                                    {
                                      thitem === "image" ? <img src={student[thitem]} alt="" /> : student[thitem]
                                    }
                                  </span>
                                </td>  
                              )
                            }
                            <td data-cell="manage" className="table__td">
                              <div className="table-actions">
                                <Button icon={<FiEdit/>} click={ () => handleEditStudentModal(student, student._id)} />
                                <Button icon={<FiTrash/>} click={() => handleDeleteStudent(student._id)} /> 
                              </div>
                            </td>  
                        </tr>
                      ))
                    }
                  </tbody>
              </table> 
            : 
            <>
              {isloading ? <p>Loading...</p> : <p>No students to display</p>}
            </>
          }
       </div>
      </div>
      <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} >
        <form className="form add-student-form" onSubmit={ activityType === "create" ? handleCreateNewStudent : handleEditStudent}>
          <h2>{ activityType === "create" ? "Add Student" : "Edit Student" }</h2>
            <input type="text" placeholder="Enter student name" value={name}  onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Enter student address" value={address} onChange={e => setAddress(e.target.value)} />
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value={"select"}>Select student category</option>
              {
                ["bachelors", "masters", "phd"].map((item, index) => 
                  <option key={index} value={item} >{item}</option>
                )
              }
            </select>
            <input type="text" placeholder="Enter student city" value={city} onChange={e => setCity(e.target.value)} />
            <input type="text" placeholder="Enter student contact" value={contact} onChange={e => setContact(e.target.value)} />
            <input type="text" placeholder="Enter student father's contact" value={fatherContact} onChange={e => setFatherContact(e.target.value)} />
            <div className="form-image-wrapper">
              <img src={image ? image : "https://p.kindpng.com/picc/s/207-2074624_white-gray-circle-avatar-png-transparent-png.png"} alt="" />
              <input type="url" placeholder="Enter student image" value={image} onChange={e => setImage(e.target.value)} />
            </div>
            <select value={roomNo} onChange={e => setRoomNo(e.target.value)} >
              <option value="select">Select room no</option>
              {
                new Array(15).fill("").map((_, index) => 
                  <option key={index} value={index + 1}>{index + 1}</option>
                )
              }
            </select>
            <select  value={blockNo} onChange={e => setBlockNo(e.target.value)} >
              <option value="select">Select block no</option>
              {
                new Array(4).fill("").map((_, index) => 
                  <option key={index} value={index + 1}>{index + 1}</option>
                )
              }
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)} >
              {
                ["hostel", "home", "rent"].map((item, index) => 
                  <option key={index} value={item}>{item}</option>
                )
              }
            </select>
            <Button text={activityType === "create" ? "Add student" : "Edit student"} type="submit" isloading={false} appearence="primary" />
        </form>
      </Modal>
    </>
  );
};

export default connect(null, { addStudent, loadStudents, editStudent, deleteStudent }) (Students);
