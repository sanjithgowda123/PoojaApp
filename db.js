const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',             // Assuming MySQL is hosted locally
    user: 'pooja',                 // Replace with your MySQL username
    password: 'Harrypotter@007',   // Replace with your MySQL password
    database: 'PoojaAppDB'         // Replace with the name of your MySQL database
});

// Function to add a new user to the database
function addUser(name, email) {
    return new Promise((resolve, reject) => {
        // Define the SQL query to insert a new user
        const query = 'INSERT INTO Users (name, email) VALUES (?, ?)';
        const values = [name, email];

        // Execute the query
        pool.query(query, values, (error, results) => {
            if (error) {
                // Reject with error if query execution fails
                reject(error);
                return;
            }

            // Resolve with the newly added user
            const newUser = { id: results.insertId, name, email };
            resolve(newUser);
        });
    });
}

// Function to get all users from the database
function getAllUsers() {
    return new Promise((resolve, reject) => {
        // Define the SQL query to select all users
        const query = 'SELECT * FROM Users';

        // Execute the query
        pool.query(query, (error, results) => {
            if (error) {
                // Reject with error if query execution fails
                reject(error);
                return;
            }

            // Resolve with the list of users
            resolve(results);
        });
    });
}

module.exports = {
    addUser,
    getAllUsers
};
