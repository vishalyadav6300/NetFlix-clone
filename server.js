const exp=require("express");

const app=exp();
const mongodbclient=require('mongodb').MongoClient;
//importing express async handler
const expressAsyncHandler=require('express-async-handler');

const path=require('path');

const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name: 'mogalamohnivishal',
    api_key: '913125216547184',
    api_secret: '-buEd72983pclaadfO_mo_AkXN4'
})


//configure multjer-storage-cloudinary
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "movies",
            public_id: file.fieldname + '-' + Date.now()
        }
    }
})


//configure multer
const multerObj = multer({ storage: clStorage })

app.use(exp.json());
app.use(exp.static(path.join(__dirname,'./dist/NETFLIX-CLONE/')));


let dburl="mongodb+srv://Vishal:vish6300@vishal.jjymm.mongodb.net/MovieDB?retryWrites=true&w=majority";
let databaseObj;
let movieCollectionObj;
mongodbclient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
    if(error)
    console.log("Error in db connection",error);
    else
    {
        databaseObj=client.db("MovieDB");
        movieCollectionObj=databaseObj.collection("movies");
        console.log("connected to database");
    }
})


let mutipleUpload=multerObj.fields([{name:'photo'},{name:'video'}]);

app.post("/movies", mutipleUpload, expressAsyncHandler(async (req, res, next) => {

    //get user obj
    res.send({message:"hii"});
    let newMovie = JSON.parse(req.body.movieObj)
    //search for existing user
    let movie = await movieCollectionObj.findOne({ Moviename: newMovie.Moviename })
    //if user existed
    if (movie !== null) {
        res.send({ message: "Movie Profile already existed" });
    }
    else {
        //add image url
        console.log(req.file[0].path,req.file[1].path)
        newMovie.profileImage = req.file[0].path;
        newMovie.trailerLink=req.file[1].path;
        delete newMovie.photo;
        delete newMovie.video;
        //insert
        await movieCollectionObj.insertOne(newMovie)
        res.send({ message: "Movie Profile created" })
    }                                                                                                                                                                                                                                                                                                                                       
}))


app.get('/allmovies',expressAsyncHandler(async(req,res)=>{
    let movies=await movieCollectionObj.find().toArray();
    res.send({message:'sent data','details':movies})
}))


const port=3001;
app.listen(port,()=>console.log(`server on port ${port}...`));