import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const ViewProjectedTable = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const { table, attributes } = location.state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3500/basic/selectattributes', { table, attributes });
                setData(response.data);
            } catch (error) {
                try{
                    alert(`Error fetching data. Reason: ${error.response.data}`);
                } catch (err) {
                    alert(`Error fetching data. Reason: ${err}`);
                }
            }
        };
        fetchData();
    }, [table, attributes]);

    return (
        <div className="Projected table">
            <h2 className="m-5" style={{color: "black", fontWeight: "bold"}}> Your Query Result From {table} </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <Table striped bordered hover className='table-responsive'>
                <thead className="thead-dark">
                    <tr>
                        {attributes.map((attribute, index) => (
                            <th key={index}>{attribute}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {attributes.map((attribute, index) => {
                                let value = row[attribute];
                                if (isNaN(value) && !isNaN(Date.parse(value))) {
                                    value = new Date(value).toLocaleString();
                                }
                                return <td key={index}>{value}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
 
export default ViewProjectedTable;