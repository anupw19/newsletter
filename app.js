const express = require("express");
const bodyParser = require("body-parser");
const requert = require("request");
const https = require("https");
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.Email;

    const data ={
            members:[
                {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
};

const jsonData = JSON.stringify(data);

const listId = "e0c06c1580";
const url = "https://us14.api.mailchimp.com/3.0/lists/"+listId;
// us14 is a personal code 

const options = {
    method:"POSt",
    auth:"anupw19:04feab3b86c317f918cb4fa37dbfa961-us14"
}

const request = https.request(url,options,function(response){

    if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }


    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();
    
})



app.post("/failure",function(req,res){
    res.redirect("/")
})


app.listen(port,function(req,res){
    console.log("server is running on port 3000");
})



// Email API KEY
// 04feab3b86c317f918cb4fa37dbfa961-us14

// list Id 
// e0c06c1580
