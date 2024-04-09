import { useState } from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ViewPurchasesButton = () => {
    const [show, setShow] = useState(false);
    const [plateNumber, setPlateNumber] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3500/basic/getslot', { plateNumber: plateNumber });
            if (response.data.message === "None") {
                alert("No slot found for this plate number");
                handleClose();
            } else {
                alert(`Found at Slot ID: ${response.data.slotID}, Zone ID: ${response.data.zoneID}`);
                handleClose();
            }
        } catch (err) {
            alert(`An error occurred. ${err}`);
        }
    };

    return (
        <div className="OrderButtonLanding">
            <div className="d-grid gap-2 col-4 mx-auto">
            <button type="submit" className="btn rounded-pill px-5 py-4 btn-primary d-flex align-items-center justify-content-center" onClick={handleShow}>
                    <ArrowRight color="white" size={48} />
                    <span className="mx-2">Find Car By Plate#</span>
            </button>
            </div>
            <div className="line-separator my-5"></div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Plate Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" value={plateNumber} onChange={e => setPlateNumber(e.target.value)} placeholder="Enter Plate Number" />
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

export default ViewPurchasesButton;
