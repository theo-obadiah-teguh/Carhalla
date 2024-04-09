import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeNavbar from "../Home/HomeNavBar";

const SelectOnStaff = () => {
    const [attributes, setAttributes] = useState([]);
    const [whereClause, setWhereClause] = useState('');
    const [queryResult, setQueryResult] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:3500/basic/allattributes', { table: 'Staff' })
            .then(response => {
                setAttributes(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleWhereClauseChange = (event) => {
        setWhereClause(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3500/basic/selectstaff', { whereClause: whereClause });
            setQueryResult(response.data);
        } catch (error) {
            try {
                alert(`An error occurred Checkout failed. Reason: ${error.response.data}`);
            } catch (err) {
                alert(`An error occurred Checkout failed. Reason: ${error}`);
            }
        }
    };

    return (
        <div className="SelectOnStaff">
            <HomeNavbar sticky="top" exact/>
            <h2 className="m-5 text-center" style={{color: "black", fontWeight: "bold"}}> Select On Staff </h2>
            <div className="line-separator mb-5" style={{borderTop: "2px solid black", width: "90%", marginLeft: "5%", marginRight: "5%"}}></div>
            <h3 className="mb-3 mx-4">Attributes Of Table to work with in statement:</h3>
            <ul className="list-group mb-3 mx-4">
                {attributes.map((attribute, index) => (
                    <li key={index} className="list-group-item">{attribute}</li>
                ))}
            </ul>

            <div className="input-group mb-3 mt-5 mx-4">
                <input type="text" className="form-control" value={whereClause} onChange={handleWhereClauseChange} placeholder="Insert Where clause condition" />
            </div>

            <button type="submit" className="btn btn-primary mx-4 px-4" onClick={handleSubmit}>Submit</button>

            <table className="table mt-5 mx-2 mb-5">
                <thead>
                    <tr>
                        {attributes.map((attribute, index) => (
                            <th key={index}>{attribute}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {queryResult.map((row, index) => (
                        <tr key={index}>
                            {attributes.map((attribute, index) => (
                                <td key={index}>{row[attribute]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default SelectOnStaff;