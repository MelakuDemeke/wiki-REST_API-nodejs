const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');


const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Articles = new mongoose.model('article',articlesSchema);

app.route('/articles')
.get(
    function (req,res) {
        Articles.find({},function(err,found){
            if (!err){
                res.send(found);
            }else{
                res.send(err);
            }
        })
    }
)
.post(
    function(req,res){
        const newArticle = new Articles( {
            title: req.body.title,
            content: req.body.content
        });
    
        newArticle.save(function(err){
            if (!err){
                res.send("New article added")
            } else{
                res.send(err)
            }
        });
    }
)
.delete(
    function (req,res){
        Articles.deleteMany(function(err){
            if (!err){
                res.send("all Article deleted successfully");
            }else{
                res.send(err);
            }
        });
    }
);


// app.delete('/articles', function (req,res){
//     const _id = req.body._id;

//     Articles.findByIdAndRemove(_id,function(err){
//         if (!err){
//             res.send("Article deleted");
//         }else{
//             res.send(err);
//         }
//     })

// });

app.listen("3000",()=>{
    console.log("server started at http://localhost:3000");
});