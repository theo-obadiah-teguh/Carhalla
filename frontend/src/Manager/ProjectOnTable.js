import HomeNavbar from "../Home/HomeNavBar";
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProjectOnTable = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:3500/basic/alltables')
            .then(response => {
                setTables(response.data.map(table => table.Tables_in_cpms_db));
            })
            .catch(error => {
                console.error(`Error fetching data: ${error}`);
            });
    }, []);

    const handleSubmitTables = async (event) => {
        event.preventDefault();
        console.log(selectedTable);
        try {
        const attributes = await axios.post('http://localhost:3500/basic/allattributes', {table: selectedTable})
        setAttributes(attributes.data);
        } catch (error) {
            try{
                alert(`Error fetching data. Reason: ${error.response.data}`);
            } catch (err) {
                alert(`Error fetching data. Reason: ${error}`);
            }
        }
    };

    const handleAttributeChange = (event) => {
        if (event.target.checked) {
            setSelectedAttributes([...selectedAttributes, event.target.value]);
        } else {
            setSelectedAttributes(selectedAttributes.filter(attribute => attribute !== event.target.value));
        }
    };

    const handleSubmitAttributes = (event) => {
        event.preventDefault();
        navigate('/viewprojectedtable', { state: {table: selectedTable, attributes: selectedAttributes}});
    };
    
    return (
        <div className="Project">
            <HomeNavbar sticky = "top" exact/>
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Select Table To Project On </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <Form onSubmit={handleSubmitTables} className="mx-4">
                <Form.Group controlId="tableSelect mx-5 p-2">
                    <Form.Label>Select Table</Form.Label>
                    <Form.Control as="select" name="tableSelect" onChange={event => setSelectedTable(event.target.value)}>
                        <option value="">Select a table</option>
                        {tables.map((table, index) => (
                            <option key={index} value={table}>{table}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary m-3 px-3" type="submit">
                    Submit
                </Button>
            </Form>

            {attributes.length > 0 && (
                <>
                    <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Select The attributes you wish to see </h2>
                    <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
                    <Form onSubmit={handleSubmitAttributes} className="mx-4">
                        {attributes.map((attribute, index) => (
                            <Form.Check 
                                key={index}
                                type="checkbox"
                                label={attribute}
                                value={attribute}
                                onChange={handleAttributeChange}
                            />
                        ))}
                        <Button variant="primary m-3 px-3" type="submit">
                            Submit
                        </Button>
                    </Form>
                </>
            )}
        </div>
    );
}
 
export default ProjectOnTable;