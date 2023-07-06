const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'/public')));


app.use('/',require('./routes/RootRoute'));
app.use('/search',require('./routes/SearchRoute'));


app.all('*',(req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
})