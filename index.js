const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nazare'
});

db.connect((err) => {
    if (err) { 
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Get all customers
app.get('/v1/customers', (req, res) => {
    db.query('SELECT * FROM level', (err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        res.json(results);
    });
});

// // Get a specific customer
app.get('/v1/customers/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM level WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Database query error');
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('customer not found');
        }
    });
});

// // Create a new customer
// app.post('/v1/customers', (req, res) => {
//     const newcustomer = req.body;
//     db.query('INSERT INTO level SET ?', newcustomer, (err, result) => {
//         if (err) {
//             return res.status(500).send('Database insert error');
//         }
//         newcustomer.id = result.insertId;
//         res.status(201).json(newcustomer);
//     });
// });

// // Update a customer
// app.put('/v1/customers/:id', (req, res) => {
//     const id = req.params.id;
//     const updatedcustomer = req.body;
//     db.query('UPDATE level SET ? WHERE id = ?', [updatedcustomer, id], (err, result) => {
//         if (err) {
//             return res.status(500).send('Database update error');
//         }
//         if (result.affectedRows > 0) {
//             res.json({ id, ...updatedcustomer });
//         } else {
//             res.status(404).send('customer not found');
//         }
//     });
// });

// // Delete a customer
// app.delete('/v1/customers/:id', (req, res) => {
//     const id = req.params.id;
//     db.query('DELETE FROM level WHERE id = ?', [id], (err, result) => {
//         if (err) {
//             return res.status(500).send('Database delete error');
//         }
//         if (result.affectedRows > 0) {
//             res.status(204).send();
//         } else {
//             res.status(404).send('customer not found');
//         }
//     });
// });

app.listen(5000, () => {
    console.log('API is running on port 5000');
});
