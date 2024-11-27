const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Ket noi den MySql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users'
})

db.connect((err)=>{
    if(err)throw err;
    console.log('Connected to MySQL');
})


//API endpoint đẻ lấy dữ liệu
app.get('/users',(req,res)=>{
    db.query('SELECT * FROM users',(err,result)=>{
        if(err) {
            res.status(500).send(err);
            return;
        }
    res.json(result);
    })
})

//API endpoint truy xuat cu the
app.get("/users/:id", (req, res) => {
    const {id} = req.params
    const parseId = parseInt(id);
    if(isNaN(parseId)){
        res.status(400).send('Invalid ID');
        return;
    }
    const query = 'SELECT * FROM users WHERE ?';
    db.query(query,[parseId], (err, result) => {
        if(err){
            res.status(500).send(err);
            return;
        }
        if(result.length === 0){
            res.status(404).send('User not found');
            return;
        }
        res.json(result[0]);
    })
})

//API endpoint để thêm dữ liệu
app.post('/users', (req, res) => {
    const { name, email, phone, password } = req.body;
    const query = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, password], (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send('User added successfully');
    });
});


//API endpoint để sửa dữ liệu
app.put('/users/:id', (req, res) => {
    const { id } = req.params; 
    const { name, email, phone } = req.body; 

    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        res.status(400).send('Invalid ID'); // ID không phải số
        return;
    }

    // Truy vấn cập nhật
    const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(query, [name, email, phone, parseId], (err, result) => {
        if (err) {
            res.status(500).send(err); 
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('User not found'); 
            return;
        }
        res.status(200).send('User updated successfully'); 
    });
});




//API endpoint để xóa dữ liệu
app.delete('/users/:id', (req,res)=>{
    const {id} = req.params;
    const parseId = parseInt(id);
    if(isNaN(parseId)){
        res.status(400).send('Invalid ID');
        return;
    }
    const query = 'DELETE FROM users where id = ?';
    db.query(query,[parseId], (err, result)=>{
        if(err){
            res.status(500).send(err);
            return;
        } 
        res.status(200).send("Delete Successfully");

    })
})




app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});