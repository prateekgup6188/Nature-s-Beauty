var express = require('express');
var app = express();
app.set("view engine","ejs");
app.set('port',process.env.PORT || 8080);
console.log("YelpCamp Server is listening");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get("/",function(req,res){
res.render("landing");
});
var campgrounds=[
    {name:"Camp 1",image:"https://images.pexels.com/photos/1840394/pexels-photo-1840394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Camp 2",image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
    {name:"Camp 3",image:"https://images.pexels.com/photos/1539225/pexels-photo-1539225.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
];
app.get("/campgrounds",function(req,res){
res.render("campgrounds",{campgrounds:campgrounds});
});
app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
    // |--> by default it redirects to get command
    // get data from the form and add to the campgrounds array
    // redirects to campgrounds page
});
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});
app.listen(app.get('port'));
module.exports=app;