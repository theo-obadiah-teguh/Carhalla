import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import HomeNavbar from "../Home/HomeNavBar";
import { useState, useEffect } from "react";
import axios from 'axios';

const ManageBranches = () => {
    const [loading, setLoading] = useState(true);
    const [branches, setBranches] = useState([]);
    useEffect(() => {
        const getBranches = async () => {
            try {
                const response = await axios.post('http://localhost:3500/basic/getbranchescomplete');
                console.log(response.data);
                const branchIds = response.data;
                setBranches(branchIds);
                console.log(branchIds);
            } catch (error) {
                console.error(error);
                console.log("Error in getBranches");
            }
        }
        getBranches();
        setLoading(false);
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.post('http://localhost:3500/basic/deletebranch', { branchID: id });
            console.log(response.data);
            alert("Branch Deleted Succesfully");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert(`Error in handleDelete ${error}`);
        }
    };

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
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Manage Branches </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <div className="d-flex flex-column align-items-center">
                {branches.map(outlet => (
                    <Card style={{ width: '100%', marginBottom: '10px', transition: 'transform .2s', cursor: 'pointer' }} key={outlet.id}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Card.Body>
                            <Card.Title>{outlet.ClientName}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>BranchId: {outlet.BranchID}</ListGroup.Item>
                                <ListGroup.Item>Type: {outlet.ClientType}</ListGroup.Item>
                            </ListGroup>
                            <Button variant="danger btn" onClick={(e) => { e.stopPropagation(); handleDelete(outlet.BranchID); }}>Delete</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}
 
export default ManageBranches;