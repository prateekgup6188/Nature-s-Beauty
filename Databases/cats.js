const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/cats_app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
  var catSchema = new mongoose.Schema({
    name: String,
    age:Number,
    temperament:String
  });
  var Cat = mongoose.model("Cat",catSchema);
//   var george = new Cat({
//     name:"Norris",
//     age:17,
//     temperament:"Goory"
//   });
//   george.save(function(err,cat){
//     if(err)
//     {
//         console.log("Something went wrong");
//     }
//     else{
//         console.log("We just saved a new cat to DB");
//         console.log(cat);
//     }
//   });

// Cat.create({
//     name:"Meowth",
//     age:10,
//     temperament:"Nice"
// },function(err,cat){
//  if(err){
//     console.log(err);
//  }   
//  else{
//     console.log(cat);
//  }
// });

Cat.find({},function(err,cats){
    if(err)
    {
        console.log("Error");
        console.log(err);
    }
    else
    {
        console.log("all the cats....");
        console.log(cats);
    }
});