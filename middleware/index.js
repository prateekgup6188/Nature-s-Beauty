var middlewareObj={};
var Campgrounds = require("../models/campgrounds");
var Comment     = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campgrounds.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","Comment not found!");
                res.redirect("back");
            }
            else{
                // Current user is the owner?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                // Current user is the owner?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.IsLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }
}
module.exports = middlewareObj;