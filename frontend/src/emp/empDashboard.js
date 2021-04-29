import { useEffect, useState } from 'react'
import TrashIcon from '../assets/trash-fill.svg'
import {apicall} from '../apicall'
import EditIcon from '../assets/pencil-square.svg'
import EditEmp from './editEmp'

function EmpDashboard(){
    const [employees, setEmployees] = useState([])
    //const emp = [{id: 1, name: "Rahul", dept: "Finance", city: "Bangalore"}, {id: 2, name: "Rahul", dept: "Finance", city: "Bangalore"},
    //            {id: 3, name: "Rahul", dept: "Finance", city: "Bangalore"}, {id: 4, name: "Rahul", dept: "Finance", city: "Bangalore"}]

    const [editModalShow, setEditModalShow] = useState(false)
    //const [empToDel, setEmpToDel] = useState()
    const [empSel, setEmpSel] = useState()

    useEffect(() => {
        apicall('GET', '/emp/', (response, status) => {
            if (status === 200){
                console.log(response)
                setEmployees(response)
            }
            else{
                alert("Data not loaded")
            }
        })
    }, [])

    const handleAddEmployee = () => {
        //const id = document.getElementById("emp_id").value
        const name = document.getElementById("emp_name").value
        const dept = document.getElementById("emp_dept").value
        const city = document.getElementById("emp_city").value
        /**const newEmp = {
            id: id, name: name, dept: dept, city: city
        }*/
        const newEmp = {
            name: name, dept: dept, city: city
        }

        console.log(newEmp)
        //emp.concat(newEmp)
        //console.log(emp.concat(newEmp))
        //setEmployees(employees.concat(newEmp))
        //console.log(employees)

        apicall('POST', '/emp/', (response, status) => {
            if(status === 201){
                console.log(response)
                setEmployees(employees.concat(response))
                alert("Employee Successfully added.")
            }
            else{
                alert(response.message)
            }
        }, newEmp)
    }

    const handleEmpDelete = (id) => {
        apicall('DELETE', `/emp/${id}`, (response, status) => {
            if(status === 204){
                setEmployees(employees.filter(emp => emp.id !== id))
                alert("Employee Deleted Successfully.")
            } else{
                alert(response.message)
            }
        })
        
        //console.log(empToDel)
        console.log(employees)
    }
    return(
        <div className="container">            
            <h2>Add Employee</h2>
            <form>
                <div className="row mb-2">
                    {/**<div className="col">
                        <label htmlFor="emp_id">ID</label>
                        <input type="number" id="emp_id" className="form-control form-control-sm" />
    </div>*/}
                    <div className="col">
                        <label htmlFor="emp_name">Name</label>
                        <input type="text" id="emp_name" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="emp_dept">Department</label>
                        <input type="text" id="emp_dept" className="form-control form-control-sm" />
                    </div>
                    <div className="col">
                        <label htmlFor="emp_city">City</label>
                        <input type="text" id="emp_city" className="form-control form-control-sm" />
                    </div>
                </div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={handleAddEmployee}>Add</button>
                </div>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>City</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    { employees.map(e => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.dept}</td>
                            <td>{e.city}</td>
                            <td>
                                <button className="btn" onClick={() =>{ handleEmpDelete(e.id)}}>
                                    <img src={TrashIcon} alt="Delete"></img>
                                </button>
                                <button className="btn" onClick={() => {setEmpSel(e); setEditModalShow(true)}}>
                                    <img src={EditIcon} alt="Edit"></img>
                                </button>
                                <EditEmp show={editModalShow && empSel.id === e.id} onHide={() => setEditModalShow(false)} 
            employees={employees} setEmployees={setEmployees} emp={e}></EditEmp>
                            </td>
                        </tr>
                    ) )}
                    { /**<tr>
                        <td>1</td>
                        <td>Rahul</td>
                        <td>Finance</td>
                        <td>Bangalore</td>
                    </tr>
                    <tr>
                       <td>2</td>
                        <td>Steve</td>
                        <td>Marketing</td>
                        <td>Bangalore</td> 
                    </tr>
                    <tr>
                       <td>3</td>
                        <td>Mohan</td>
                        <td>Marketing</td>
                        <td>Mumbai</td> 
                    </tr>
                    <tr>
                       <td>4</td>
                        <td>Amit</td>
                        <td>HR</td>
                        <td>Mumbai</td> 
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default EmpDashboard