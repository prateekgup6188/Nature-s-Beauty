var mongoose   = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment    = require("./models/comment");

    var data = [
        {
            name:"Roadside",
            image:"https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg",
            description:"Peace!"
        },
        {
            name:"Scenery",
            image:"https://cdn2.outdoorphotographer.com/2019/11/Kiss_The_Landscape_Part2_05.jpg",
            description:"What a view!"
        },
        {
            name:"Nature's Beauty",
            image:"https://assets3.thrillist.com/v1/image/2703543/size/tmg-facebook_social.jpg",
            description:"It's just beautiful!"
        },
        {
            name:"Hill Top",
            image:"https://icons8.com/wp-content/uploads/2020/02/digital-illustration-brian-edward-miller.jpg",
            description:"Hikers!"
        }
    ];
    // Remove all campgrounds
    function seedDB(){
        Campground.remove({},function(err){
            if(err){
                console.log(err);
            }
            else{
                // console.log("All Campgrounds Removed");
                // add a few campgrounds
                data.forEach(function(seed){
                    Campground.create(seed,function(err,campground){
                        if(err){
                            console.log(err);
                        }
                        else{
                            //console.log("Added a campground");
                            //create a comment
                            Comment.create(
                                {
                                  text:"This Place is great!",
                                  author:"Homer"
                                },function(err,comment){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        // console.log("Created new comment");
                                    }
                                }); 
                        }
                    });
                });
            }
        });
    }

    module.exports = seedDB;