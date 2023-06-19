const express= require('express');
const app=express();
const bodyparser=require('body-parser');
const mysql=require("mysql2");
const cors = require("cors");

const db= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"879085",
    database:"crud_contact",
    port: '3306'

});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlget = "SELECT * FROM contact_bd";
    db.query(sqlget,(error,result)=>{
        res.send(result)
    })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact}=req.body;
    const sqlinsert = "INSERT INTO contact_bd (name,email,contact) VALUES (?,?,?)" ;
    db.query(sqlinsert,[name,email,contact],(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});


app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlremove = "DELETE FROM contact_bd WHERE id = ?" ;
    db.query(sqlremove,id,(error,result)=>{
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req,res)=>{
    const {id}= req.params;
    const sqlget ="SELECT * FROM contact_bd WHERE id=?";
    db.query(sqlget,id,(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


app.put("/api/update/:id",(req,res)=>{
    const {id}= req.params;
    const {name,email,contact}=req.body;
    const sqlupdate ="UPDATE contact_bd SET name=?,email=?,contact=? WHERE id=?";
    db.query(sqlupdate,[name,email,contact,id],(error,result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});



app.get("/",(req,res)=>{
    
    // res.send("Hello world");
    res.send("Hello");
})


app.listen(5000,()=>{
    console.log("server is runing on port 5000");
})





