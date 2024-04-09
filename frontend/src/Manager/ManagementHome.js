import HomeNavbar from "../Home/HomeNavBar";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from "react";

const ManagementHome = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [minAmount, setMinAmount] = useState('');

    const handleClose1 = () => setShow(false);
    const handleShow1 = () => setShow(true);
    const handleInputChange1 = (event) => {
        setMinAmount(event.target.value);
    }

    const handleSubmit1 = (event) => {
        event.preventDefault();
        navigate('/methodamount', { state: { amount: minAmount } });
        handleClose1();
    }


    const handleEmployees = () => {
        navigate('/manageemployees');
    }

    const handleStats = () => {
        navigate('/managebranches');
    }

    const BusiestExit = () => {
        navigate('/busiestgate');
    }

    const EntriesByPlate = () => {
        navigate('/countbyplate');
    }

    const MethodTotal = () => {
        handleShow1();
    }

    const GateTotal = () => {
        navigate('/branchslots')
    }
    
    const SupportedGates = () => {
        navigate('/supportedgates')
    }

    const ProjectOnTable = () => {
        navigate('/projectontable')
    }

    const SelectStaff = () => {
        navigate('/selectstaff')
    }

    return (
        <div className="management-home">
            <HomeNavbar sticky="top" exact/>
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Management Panel </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={handleEmployees}>Manage Employees</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={handleStats}>Manage Branches</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={BusiestExit}>Find Busiest Exit Gate</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={EntriesByPlate}>How many times has every Plate# Entered</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={MethodTotal}>Total Revenue Per Method</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={GateTotal}>Total Parking slots with each client</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={SupportedGates}>Gates With All Payment Methods Used</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={ProjectOnTable}>Project On Any Table</button>
                    </div>
                    <div className="col-md-6 mb-4">
                        <button className="btn btn-primary rounded-pill px-5 py-3 w-100" onClick={SelectStaff}>Selection On Staff</button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Minimum Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit1}>
                        <Form.Group controlId="formMinAmount" className="pb-3">
                            <Form.Label>Minimum Amount 1</Form.Label>
                            <Form.Control type="number" value={minAmount} onChange={handleInputChange1} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
 
export default ManagementHome;
