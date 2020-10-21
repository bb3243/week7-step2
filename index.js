let express = require("express");
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let Datastore = require('nedb');
let db = new Datastore('trump.db');
db.loadDatabase();

let currentDate = Date();

//let inputText = document.getElementById("trump-input").value;
//let inputText2 = document.getElementById("trump-input2").value;
app.post('/wordSearch', (req, res)=> {
    console.log(req.body);
    let obj = { date: currentDate,
                firstWord: inputText,
                //firstWordCount: results.length, 
                secondWord: inputText2,
                //secondWordCount: results2.length,
            }

    db.insert(obj, (err,newDocs) => {
        if(err){
            res.json({task:"try failed"});   
        }else{
            res.json({task:"success"});
            console.log('new document inserted')
        }  
    })
})
app.use('/', express.static('public'));

app.get('/words', (req, res)=>{
    db.find({},(err, docs)=>{
        if(err){
            res.json({task:"try failed"});   
        }else{
            let obj = {data: docs};
            res.json(obj);
        }  
})

app.listen(5000, ()=> {
    console.log('listening at localhost:5000');
})
})