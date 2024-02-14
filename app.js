const express = require("express");
const expressEjsLayout = require("express-ejs-layouts");
const auth = require("./routes/auth");
const student = require("./routes/student");
const sequelize = require("./utility/database");
const app = express();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const multer = require('multer')

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use('/images',express.static("images"))
app.use(
  session({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true,// if you do SSL outside of node.
    saveUninitialized:false 
  })
);
app.use(expressEjsLayout);
app.set("layout", "layout/template");
app.use(express.urlencoded({ extended: false }));

const fileFilter = (req,file,cb)=>{
  if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
    cb(null,true)
  }else{
    cb(null,false)
  }
}
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images')
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toISOString()+file.originalname)
  }
})

app.use(multer({fileFilter:fileFilter,storage:storage}).single('image'))
app.use(auth, student);

app.get("/", (req, res) => {
  res.render("index", {isAuthenticated:req.session.isLoggedIn,us:req.session.user});
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, function () {
      console.log("app is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
