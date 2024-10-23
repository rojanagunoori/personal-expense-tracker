const express=require("express")
const router=express.Router()
const db=require("../db")

router.post("/",(req,res)=>{
    const { name, type } = req.body;
    const query=`
    INSERT INTO categories (name,type) VALUES (?,?)
    `;
    db.run(query,[name, type ],(err,row)=>{
        if(err){
            return res.status(400).json({error:err.message})
           
        }
        const getCategoryQuery=`SELECT * FROM categories WHERE id=?`;
        db.get(getCategoryQuery,[this.lastID],(err,row)=>{
            if(err){
                return res.status(500).json({ error: 'Error retrieving the categories' });
    
            }
            res.status(201).json({id:this.lastID,message:"Categories added successfully ",
                categories:row
            })
        })  
    })
})

router.get("/",(req,res)=>{
    const query=`SELECT * FROM categories`;
    db.all(query,[],(err,rows)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }
        res.status(200).json({message:"All Categories Getting Sucessfully",categories:rows})
    })
})

module.exports=router