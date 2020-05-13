var express        = require('express'),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    flash          = require("connect-flash"),
    LocalStrategy  = require("passport-local"),
    Campgrounds    = require("./models/campgrounds"),
    Comment        = require("./models/comment"),
    seedDB         =  require("./seeds"),
    User           = require("./models/user"),
    methodOverride = require("method-override");
    // seedDB();
    console.log(process.env.DATABASEURL);
    mongoose.connect('mongodb://localhost/yelp_camp',{
    //mongoose.connect('mongodb+srv://Prateek:prateek6188@cluster0-p1zxm.mongodb.net/test?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected in v3!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

  // mongodb+srv://Prateek:prateek6188@cluster0-p1zxm.mongodb.net/test?retryWrites=true&w=majority

var  commentRoutes    = require("./routes/comments"),
     campgroundRoutes = require("./routes/campgrounds"),
     indexRoutes       = require("./routes/index");

app.set("view engine","ejs");
app.set('port',process.env.PORT || 8080);
console.log("YelpCamp Server is listening");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport config
app.use(require("express-session")({
    secret:"Nature is Ultimate!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
res.locals.currentUser = req.user;
res.locals.error       = req.flash("error");
res.locals.success     = req.flash("success");
next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(app.get('port'));
module.exports=app;