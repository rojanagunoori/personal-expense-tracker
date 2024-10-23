const express=require("express")
const router=express.Router()
const db=require("../db")

router.get("/",(req,res)=>{
    const query=`
    SELECT type,SUM(amount) AS total FROM transactions GROUP BY type
    `;
    db.all(query,[],(err,rows)=>{
        if(err){
            return res.status(500).json({error:err.message})
        }
        const summary=rows.reduce((acc,row)=>{
            if(row.type==="income"){
                acc.totalIncome=row.total;
            }else if(row.type==="expense"){
                acc.totalExpense=row.total
            }
            return acc;
        },{totalIncome:0,totalExpense:0});
        const balance=summary.totalIncome-summary.totalExpense;
        res.json({...summary,balance})
    })
})


module.exports=router