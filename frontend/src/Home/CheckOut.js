import { useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const CheckOutButton = () => {
    const [show, setShow] = useState(false);
    const [plateNumber, setPlateNumber] = useState("");
    const [method, setMethod] = useState("");
    const [gate, setGate] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        if (plateNumber === "" || method === "" || gate === "") {
            alert("Please fill in all fields");
            return;
        }

        axios.post("http://localhost:3500/enterexit/exit", {
            plateNumber: plateNumber,
            method: method,
            exitGate: gate
        }).then(res => {
            alert(`${res.data.amount}$ is to be charged`);
            handleClose();
        }).catch(error => {
            try {
                alert(`An error occurred Checkout failed. Reason: ${error.response.data}`);
            } catch (err) {
                alert(`An error occurred Checkout failed. Reason: ${error}`);
            }
        });

    };

    return (
        <div className="OrderButtonLanding">
            <div className="d-grid gap-2 col-4 mx-auto">
            <button type="submit" className="btn rounded-pill px-5 py-4 btn-primary d-flex align-items-center justify-content-center" onClick={handleShow}>
                    <ArrowRight color="white" size={48} />
                    <span>Check Out Vehicle</span>
            </button>
            </div>
            <div className="line-separator my-5"></div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Details To CheckOut</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={plateNumber} onChange={e => setPlateNumber(e.target.value)} placeholder="Enter Plate Number" />
                    </div>
                    <div className="mb-3">
                        <select className="form-control" value={method} onChange={e => setMethod(e.target.value)}>
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={gate} onChange={e => setGate(e.target.value)} placeholder="Enter Exit Gate" />
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

export default CheckOutButton;