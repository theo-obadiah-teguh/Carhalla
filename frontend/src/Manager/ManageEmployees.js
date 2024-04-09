import React, { useState, useEffect } from 'react';
import HomeNavbar from "../Home/HomeNavBar";
import { Card, ListGroup, Button, Spinner, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employeeDetails, setEmployeeDetails] = useState({
        fullName: '',
        email: '',
        telephone: '',
        branchID: '',
        shift: '',
        startDate: ''
    });
    const [show, setShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (employee) => {
        setSelectedEmployee(employee);
        setShow(true);
    }

    const handleInputChange = (event) => {
        setEmployeeDetails({
            ...employeeDetails,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { fullName, email, telephone, branchID, shift, startDate } = employeeDetails;
        if (!fullName || !email || !telephone || !branchID || !shift || !startDate) {
            alert('Please fill in all fields before submitting');
            return;
        }
    
        updateEmployee(selectedEmployee.EmployeeID);
        handleClose();
    }

    const updateEmployee = async (id) => {
        try {
            const response = await axios.post('http://localhost:3500/basic/updatestaff', { employeeID: id, ...employeeDetails });
            console.log(response.data);
            alert("Employee Updated Succesfully");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(`Error in updating employee ${error.response.data}`);
        }
    }

    useEffect(() => {
        const getBranches = async () => {
            try {
                const response = await axios.post('http://localhost:3500/basic/getemployees');
                const employees = response.data;
                setEmployees(employees);
                console.log(employees);
            } catch (error) {
                console.error(error);
                alert(`Error in fetching employees ${error}`);
            }
        }
        getBranches();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" className='p-4 m-5'>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="ManageEmp">
            <HomeNavbar sticky = "top" exact/>
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Manage Employees </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <div className="d-flex flex-column align-items-center">
                {employees.map(employee => (
                    <Card style={{ width: '100%', marginBottom: '10px', transition: 'transform .2s', cursor: 'pointer' }} key={employee.id}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Card.Body>
                            <Card.Title>{employee.FullName}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>ID: {employee.EmployeeID}</ListGroup.Item>
                                <ListGroup.Item>Phone: {employee.Telephone}</ListGroup.Item>
                                <ListGroup.Item>Email: {employee.Email}</ListGroup.Item>
                            </ListGroup>
                            <Button variant="primary" onClick={() => handleShow(employee)}>Update details</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="fullName" value={employeeDetails.fullName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={employeeDetails.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formTelephone">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="text" name="telephone" value={employeeDetails.telephone} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBranchID">
                            <Form.Label>Branch ID</Form.Label>
                            <Form.Control type="text" name="branchID" value={employeeDetails.branchID} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formShift">
                            <Form.Label>Shift</Form.Label>
                            <Form.Control type="text" name="shift" value={employeeDetails.shift} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formStartDate" className='pb-4'>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate" value={employeeDetails.startDate} onChange={handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ManageEmployees;