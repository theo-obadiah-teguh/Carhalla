const mysql = require("mysql");
const express = require('express'); 

const router = express.Router();

const db = mysql.createConnection({
    host: "database-1.cfygwy4i0v9o.us-east-2.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "password",
    database: "cpms_db",
})

db.connect((err) => {
    if (err) {
        res.status(500).send(err.message);
        return;
    }
    console.log("Database connected.");
});

router.post('/gettowers', (req, res) => {
    let query = 'SELECT TowerID FROM Tower WHERE BranchID = ?'
    try{
        db.query(query, [req.body.branchid], (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(rows);
        });} catch (err) {
            console.log(err);
            res.status(500).send(err.message);
            return;
        }
});

router.post('/getbranches', (req, res) => {
    let query = 'SELECT BranchID, ClientName FROM BranchClient'
    try{
        db.query(query, (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(rows);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

router.post('/getbranchescomplete', (req, res) => {
    let query = 'SELECT * FROM BranchClient'

    try{
        db.query(query, (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(rows);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

router.post('/getemployees', (req, res) => {
    let query = 'SELECT * FROM Staff'
    try{
        db.query(query, (err, rows) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(rows);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});


router.post('/getslot', (req, res) => {
    let query = 'SELECT ParkingSlotID, ParkingZoneID FROM Occupy WHERE plateNumber = ?'
    try{
    db.query(query, [req.body.plateNumber], (err, response) => {
        if (err) {
            res.json({
                message: "None"
            });
            return;
        }
        if (response.length == 0) {
            res.json({
                message: "None"
            });
        } else {
            res.json({
                message: "Success",
                slotID: response[0].ParkingSlotID,
                zoneID: response[0].ParkingZoneID
            });
        }
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});


//Delete Query to delete a branch and cascade
router.post('/deletebranch', (req, res) => {
    let query = 'DELETE FROM BranchClient WHERE BranchID = ?'
    db.query(query, [req.body.branchID], (err, reponse) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send("Branch Deleted Successfully");
    });
});

//Update query to update the staff table
router.post('/updatestaff', async (req, res) => {

    const checkBranch= async () => {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM BranchClient WHERE BranchID = ?;", [req.body.branchID], (err, result, fields) => {
                if (err) {
                    reject(err);
                    return;
                } else if (result.length == 0) {
                    reject(new Error("Invalid BranchId. Please enter a valid BranchId."));
                    return;
                } else {
                    resolve();
                }
            });
        });
    };
    
    try {
        await checkBranch();
    } catch (err) {
        res.status(500).send(err.message);
        return;
    }

    let query2 = `UPDATE Staff 
    SET FullName = ?, email = ?, Telephone = ?, BranchID = ?, Shift = ?, StartDate = ? 
    WHERE EmployeeID = ?;`
    const values = [req.body.fullName, req.body.email, req.body.telephone, req.body.branchID, req.body.shift, req.body.startDate, req.body.employeeID]
    console.log(values);
    try{
    db.query(query2, values, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send("Employee Updated Successfully");
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Aggregation query to count how many times specific plate number has entered
router.post('/countentries', (req, res) => {
    let query = `SELECT PlateNumber, COUNT(*) AS entries FROM Enters
    GROUP BY PlateNumber;`
    try{
    db.query(query, (err, response) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(response);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});


// Nested Aggregation query to find the busiest gate
router.post('/busiestgate', (req, res) => {
    let query = `SELECT ExitGateID, COUNT(*) AS exits
    FROM Exits
    GROUP BY ExitGateID 
    HAVING COUNT(*) >= ALL (
        SELECT COUNT(*)
        FROM Exits e
        GROUP BY e.ExitGateID);`
    try{
    db.query(query, (err, response) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(response);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Having Aggregation query to find total amount of payments made by each method over certain amount
router.post('/methodamt', (req, res) => {
    let query = `SELECT Method, SUM(Amount) AS total
    FROM Payment p
    GROUP BY Method
    HAVING SUM(Amount) > ?;`
    try{
    db.query(query, [req.body.amount], (err, response) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(response);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Join Query to find the total slots for each client.
router.post('/branchslots', (req, res) => {
    let query = `SELECT bc.ClientName , SUM(t.TowerTotalSlots) AS totalSlots
    FROM BranchClient bc, Tower t
    WHERE bc.BranchID = t.BranchID
    GROUP BY bc.ClientName
    ORDER BY totalSlots DESC;`
    try{
    db.query(query, (err, response) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(response);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Divison Query to get gate which supports all payment methods.
router.post('/gatewithmethod', (req, res) => {
    let query = `SELECT DISTINCT p1.ExitGateID
    FROM Payment p1
    WHERE NOT EXISTS (
        SELECT DISTINCT p2.Method
        FROM Payment p2
        EXCEPT
        SELECT DISTINCT p3.Method
        from Payment p3
        WHERE p3.ExitGateID = p1.ExitGateID
    );`
    try {
    db.query(query, (err, response) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(response);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Verify password for manager login
router.post('/verify', (req, res) => {
    if (req.body.password === "0000") {
        res.send("1");
    } else {
        res.send("0");
    }
});

//For Projection: All Table names
router.post('/alltables', (req, res) => {
    let query = `SHOW TABLES;`
    try {
    db.query(query, (err, response) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(response);
    })} catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});


//For projection: All attributes of a given table
router.post('/allattributes', async (req, res) => {
    let tablesQuery = `SHOW TABLES;`
    let columnsQuery = `SHOW COLUMNS FROM ${req.body.table};`
    try {
        // Get all tables
        const tables = await new Promise((resolve, reject) => {
            db.query(tablesQuery, (err, response) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(response.map(table => table.Tables_in_cpms_db));
            });
        });

        // Check if table exists
        if (!tables.includes(req.body.table)) {
            res.status(400).send('Table does not exist');
            return;
        }

        // Get columns
        db.query(columnsQuery, (err, response) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            const columnNames = response.map(column => column.Field);
            res.send(columnNames);
        })
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Projection on selected table with selected attributes
router.post('/selectattributes', (req, res) => {
    const { table, attributes } = req.body;
    if (!table || !attributes || !Array.isArray(attributes) || attributes.some(attr => typeof attr !== 'string')) {
        res.status(400).send('Invalid request body');
        return;
    }

    const placeholders = attributes.map(() => '??').join(', ');
    const query = `SELECT ${placeholders} FROM ??;`;

    try {
        db.query(query, [...attributes, table], (err, response) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(response);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

//Selection query on staff table
router.post('/selectstaff', (req, res) => {
    const { whereClause } = req.body;
    if (!whereClause || typeof whereClause !== 'string') {
        res.status(400).send('Invalid request body');
        return;
    }

    const query = `SELECT * FROM Staff WHERE ${whereClause};`;

    try {
        db.query(query, (err, response) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.send(response);
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
        return;
    }
});

module.exports = router;