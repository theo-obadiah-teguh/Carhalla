import { useState } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';

const AddEmployeesButton = () => {
    const [show, setShow] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        //logic to add employee
    };

    return (
        <div className="OrderButtonLanding">
            <div className="d-flex justify-content-start mb-5 px-2">
            <button type="submit" className="btn orderNowButton rounded-pill px-3 btn-primary d-flex align-items-center justify-content-center" onClick={handleShow}>
                    <PlusCircle color="white" size={1} />
                    <span>Add New Employee</span>
            </button>
            </div>
            <div className="line-separator my-5"></div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter New Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <input type="text" className="form-control mb-4" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter Full Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control mb-4" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddEmployeesButton;
