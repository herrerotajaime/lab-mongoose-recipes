const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.collection.drop()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title : {type: String, unique: true},
  level: {type:String, enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"]},
  ingredients: {type:Array},
  cuisine: {type:String,required: true},
  dishType: {type:String, enum: ["Breakfast","Dish","Snack","Drink","Dessert","Other"]},
  image: {type:String,  default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration:{type: Number, min: [0]},
  creator: {type:String},
  created: {type:Date, default: Date.now}
});


const Recipe = mongoose.model('Recipe', recipeSchema);


Recipe.create({
  title:'Yatecomo',
  level: 'Easy Peasy',
  cuisine: 'Chinese',
  disType: 'Dish',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 3,
  creator: 'Lee',
  created: '2015'
})
.then(()=> Recipe.insertMany(data))
.then(()=>Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
 .then(()=>Recipe.deleteOne({ title: "Carrot Cake"}))
.then(()=>mongoose.disconnect())
.catch(err=>console.log('Ouch!',err)))