import { Card, ListGroup, Spinner } from "react-bootstrap";
import HomeNavbar from "../Home/HomeNavBar";
import { useState, useEffect } from "react";
import axios from 'axios';

const BusiestGate = () => {
    const [loading, setLoading] = useState(true);
    const [gates, setGates] = useState([]);
    useEffect(() => {
        const getEntries = async () => {
            try {
                const response = await axios.post('http://localhost:3500/basic/busiestgate');
                console.log(response.data);
                const plates = response.data;
                setGates(plates);
                console.log(plates);
            } catch (error) {
                console.error(error);
                alert(`Error in getting gates ${error}`);
            }
        }
        getEntries();
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
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> The Busiest Exit Gates Are: </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <div className="d-flex flex-column align-items-center">
                {gates.map(gate => (
                    <Card style={{ width: '100%', marginBottom: '10px', transition: 'transform .2s', cursor: 'pointer' }} key={gate.id}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Card.Body>
                            <Card.Title>{`Gate Id: ${gate.ExitGateID}`}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Number Of Exits: {gate.exits}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
 
export default BusiestGate;