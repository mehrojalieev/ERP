import "./Students.scss"
import React, { useEffect, useState } from 'react'
import useFetch from '../../services/hooks/useFetch'

const Students = () => {
  const [data, isLoading, error] = useFetch("./student/all")

  console.log(data);
  const [tableHeaderContent, setTableHeaderContent] = useState([])

  useEffect(() => {
    if (data?.students.length > 0) {
      const { _id, __v, updatedAt, createdAt, ...studentdata } = data.students[0]

      setTableHeaderContent(Object.keys(studentdata))
    }
  }, [data])

  console.log(tableHeaderContent);
  return (
    <>
      <div className='admin__content-header'>
        <h1>Students</h1>
      </div>
      <div className="admin__content-body">
        {
          !isLoading && data.students.length > 0 ?
            <table className="students-table">
              <thead>
                <tr>
                  {tableHeaderContent &&
                    tableHeaderContent.map(thitem =>
                      <th className='table__th' key={thitem}>{thitem.replace("_", " ")}</th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {
                  data.students.map((student, index) => 
                    <tr key={student._id}>
                      {
                        tableHeaderContent &&
                        tableHeaderContent.map((thitem, index) =>
                          <td className='table__td' key={index}>
                            {
                              thitem === "image" ? <img src={student[thitem]} /> : student[thitem]
                            }
                          </td>
                          )
                      }
                    </tr>
                   )
                }
              </tbody>
            </table>
            : <>
              {isLoading ? <p>Loading...</p> : <p>No Students to display</p>}
            </>
        }
      </div>

    </>
  )
}

export default Students