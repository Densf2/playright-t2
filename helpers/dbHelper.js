
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "myNewPass",
    database: 'course_aqa_hillel'
})

connection.connect(function(err) {
    if(err) {
        console.error('error during connection to DB' + err.message)
    } else {
        console.log('successfully connected to DB')
    }
})

//create DataBase
// connection.query('CREATE DATABASE course_aqa_hillel',
//     function(err) {
//         if(err) console.error(err.message)
//         else console.log('DB created')
//     })

//create Table
// connection.query(`CREATE TABLE group (
//     id int primary key auto_increment,
//     name varchar(255) not null,
//     last_name varchar(255) not null,
//     age int not null
// )`, function(err) {
//     if(err) console.error(err.message)
//     else console.log('Table created')
// })

// connection.query(`CREATE TABLE Persons (
//     PersonID int primary key auto_increment,
//     LastName varchar(255),
//     FirstName varchar(255),
//     Address varchar(255),
//     City varchar(255)
// )`, function(err) {
//     if(err) console.error(err.message)
//     else console.log('Table created')
// })

connection.query(`INSERT INTO Persons(LastName, FirstName) VALUES('LFLF', 'MKMK')`, function(err) {
    if(err) console.error(err.message)
    else console.log('DATA ADDED')
})

connection.query('SELECT * FROM Persons',
    function(err, results) {
            if(err) console.error(err.message)
            else console.log(results)
    })

//in the end need to close connection
connection.end()
