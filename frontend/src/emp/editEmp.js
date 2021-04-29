import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import {apicall} from '../apicall'

export default function EditEmp(props){
    const [name, setName] = useState(props.emp.name)
    const [dept, setDept] = useState(props.emp.dept)
    const [city, setCity] = useState(props.emp.city)

    

    const handleEmpUpdate = () => {
        const id = props.emp.id
        const updEmp = {
            name: name,
            dept: dept,
            city: city
        }

        console.log(updEmp)

        apicall('PUT', `/emp/${id}/`, (response, status) => {
            if(status === 200){
                console.log(response)
                props.setEmployees(props.employees.filter(emp => emp.id !== props.emp.id).concat(response))
                props.onHide()
            }
            else {
                alert(response.message)
            }
        }, updEmp)
    }

    return(
        <Modal show={props.show} onHide={props.onHide} size="lg" aria-labelledby="modal1" centered>
            <Modal.Header closeButton>
                <Modal.Title id="modal1">Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="row mb-2">
                        <label htmlFor="emp_id">ID</label>
                        <input type="text" id="emp_id" className="form-control form-control-sm" disabled defaultValue={props.emp.id} />
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="emp_name">Name</label>
                        <input type="text" id="emp_name" className="form-control form-control-sm" defaultValue={name} 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="emp_dept">Department</label>
                        <input type="text" id="emp_dept" className="form-control form-control-sm" defaultValue={dept}
                        onChange={(e) => setDept(e.target.value)} />
                    </div>
                    <div className="row mb-2">
                        <label htmlFor="emp_city">City</label>
                        <input type="text" id="emp_city" className="form-control form-control-sm" defaultValue={city} 
                        onChange={(e) => setCity(e.target.value)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary rounded-pill" onClick={handleEmpUpdate}>Update</button>
            </Modal.Footer>
        </Modal>
    )
}