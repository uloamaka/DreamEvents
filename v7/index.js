const express    = require("express"),
  app            = express(),
  flash          = require("connect-flash"),
  passport       = require("passport"),
  mongoose       = require("mongoose"),
  bodyParser     = require("body-parser"),
  LocalStrategy  = require("passport-local").Strategy,
  User           = require("./models/user"),
  home           = require("./routes/home"),
  about          = require("./routes/about_us"),
  blog           = require("./routes/blog"),
  contact        = require("./routes/contact_us"),
  event          = require("./routes/event_service"),
  gallery        = require("./routes/gallery"),
  login          = require("./routes/login"),
  logout         = require("./routes/logout"),
  signup         = require("./routes/signup"),
  sendMailRouter = require("./routes/send_mail");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
  require("express-session")({
    secret: "my billions i am coming",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// require("dotenv").config();

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/splendid", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected successfully!"))
  .catch((err) => console.error("Could not connect to mongoDB", err));

// app.use(bodyParser.json());
app.use(express.json());
app.use("/", home);
app.use("/about", about);
app.use("/blogs", blog);
app.use("/contact", contact);
app.use("/event", event);
app.use("/gallery", gallery);
app.use("/login", login);
app.use("/logout", logout);
app.use("/signup", signup);
app.use("/send", sendMailRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on "http://localhost:${port}" ...`);
});
