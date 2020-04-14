var express = require("express");
var router  = express.Router();
var Campgrounds = require("../models/campgrounds");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

//Comments routes
router.get("/campgrounds/:id/comments/new",middleware.IsLoggedIn,function(req,res){
    Campgrounds.findById(req.params.id,function(err,campground)
    {
        if(err){
            console.log(err);
        }
        else{
            res.render("comment/new",{campground:campground});   
        }
    });
});

//Comments Create
router.post("/campgrounds/:id/comments",middleware.IsLoggedIn,function(req,res){
    Campgrounds.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","Something went wrong!");
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(); 
                    campground.comments.push(comment);  
                    campground.save();
                    req.flash("success","Successfully added comment!");
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//Comment Edit Route
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comment/edit",{campground_id: req.params.id,comment:foundComment});   
        }
    });
});     

//Comment Update
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,UpdatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })

});

//Destroy comment route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Comment deleted successfully");
            res.redirect("/campgrounds/"+req.params.id);    
        }
    });
});
module.exports = router;