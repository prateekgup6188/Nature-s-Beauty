var express     = require("express");
var router      = express.Router();
var Campgrounds = require("../models/campgrounds");
var middleware  = require("../middleware");
// INDEX - Get all campgrounds
router.get("/campgrounds",function(req,res){
    Campgrounds.find({},function(err,allCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/index",{campgrounds:allCampground});
        }
    });
});

// Create - Add new Campgrounds to DB
router.post("/campgrounds",middleware.IsLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name:name,image:image,description:desc,author:author};
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
router.get("/campgrounds/new",middleware.IsLoggedIn,function(req,res){
    res.render("campground/new");
});

// SHOW - shows more info about one campground
router.get("/campgrounds/:id",function(req,res){
    // find campground with provided id
    // render show template with that campground 
    Campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/show",{campground:foundCampground});
        }
    });
});

// Edit 
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundCampground){
            res.render("campground/edit",{campground:foundCampground});
        });
    });

// Update
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// Destroy

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campgrounds.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});
module.exports = router;