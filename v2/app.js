var express  = require('express'),
    app      = express(),
    //mongoose setup
    mongoose = require("mongoose");
    mongoose.connect('mongodb://localhost/yelp_camp',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected in v2!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
app.set("view engine","ejs");
app.set('port',process.env.PORT || 8080);
console.log("YelpCamp Server is listening");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Schema setup
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String
});
var Campgrounds = mongoose.model("Campground",campgroundSchema);

// Campgrounds.create({
//     name:"Camp 1",
//     image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     description:"This is a beautiful campside view!"
// },function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(campground);
//     }
// });


app.get("/",function(req,res){
res.render("landing");
});

// INDEX - Get all campgrounds
app.get("/campgrounds",function(req,res){
    Campgrounds.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{campgrounds:allCampground});
        }
    });
});

// Create - Add new Campgrounds to DB
app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name,image:image,description:desc};
    Campgrounds.create(newCampground,function(err,newlyCreated){
        if(err){
            res.send("Url Not found!");
        }
        else{
            // redirects to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - Show form to create new campgrounds
app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req,res){
    // find campground with provided id
    // render show template with that campground 
    Campgrounds.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{campground:foundCampground});
        }
    });
});
app.listen(app.get('port'));
module.exports=app;