const express=require("express")
const router=express.Router()

const db=require("../db")


  
router.post('/', (req, res) => {
    const { type, category_id, amount, date, description } = req.body;

    const query = `
      INSERT INTO transactions (type, category_id, amount, date, description)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(query, [type, category_id, amount, date, description], function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const getTransactionQuery = `SELECT * FROM transactions WHERE id = ?`;
      
      db.get(getTransactionQuery, [this.lastID], (err, row) => {
        if (err) {
          return res.status(500).json({ error: 'Error retrieving the transaction' });
        }
       
        res.status(201).json({
          message: 'Transaction added successfully',
          transaction: row
        });
      });
    });
  });
  

router.get("/",(req,res)=>{
const query=`SELECT * FROM transactions`
db.all(query,[],(err,row)=>{
    if(err){
        return res.status(500).json({error:err.message})
    }
    res.status(200).json({
        message: 'Get All Transaction successfully',
        transaction: row
    })
})
})

router.get("/:id",(req,res)=>{
    const query=`SELECT * FROM transactions WHERE id=?`;

    db.get(query,[req.params.id],(err,row)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }
        if(!row){
            return res.status(404).json({message:"Transaction not found"})
        }
        res.status(200).json({
            message:"Get Transaction by ID successfully",
            transaction:row
        })
    })
})


router.put("/:id",(req,res)=>{
    const { type, category_id, amount, date, description } = req.body;
    const query=`
    UPDATE transactions SET type=?, category_id =?,amount=?, date=?, description=? WHERE id=?
    `;
    db.run(query,[ type, category_id, amount, date, description],(err,row)=>{
        if(err){
            return res.status(400).json({error:err.message})
        }
        if(this.changes===0){
            return res.status(404).json({message:"Transaction not found"})
        }
        res.status(200).json({message: 'Transaction updated Sucessfully',transaction:row})
    })
})


router.delete("/:id",(req,res)=>{
    const query=`DELETE FROM transactions WHERE id=?`
    db.run(query,[req.params.id],(err,row)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }
        if(this.changes===0){
            return res.status(404).json({message: 'Transaction not found'})
        }
        res.json({message: 'Transaction deleted sucessfully',transaction:row})
    })
})

module.exports=router