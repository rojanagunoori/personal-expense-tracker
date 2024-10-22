


const express=require("express")
const transcationRouter=require("./routes/transcations")
const categoriesRouter=require("./routes/categories")
const summaryRouter=require("./routes/summary")

const db=require("./db")

const app=express()

app.use(express.json())

app.use("/transcations",transcationRouter)
app.use("/categories",categoriesRouter)
app.use("/summary",summaryRouter)
app.use("/",(req,res)=>{
    res.json("Hello ,This is working.")
})
console.log('Current working directory:', process.cwd());


const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})