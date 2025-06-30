import express from 'express'
const app = express()

app.get("/api/planets", async (req,res) => {
res.send("Hello!")

})




app.listen(3001, () => {
    //console.log("Server is running!")
})