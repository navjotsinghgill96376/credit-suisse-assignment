const app=require('./app')
app.listen(process.env.PORT, () => {
    console.log('Server started listening on Port :' + process.env.PORT)
})