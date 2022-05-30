const express = require("express");
// const Handlebars = require('handlebars')
const hbs = require("express-handlebars");
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csurf = require("csurf");
const helmet = require("helmet");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("./config/db")(session);
const { Op } = require("sequelize");
const path = require("path");

const moment = require("moment");
const BASEURL = "../dashboard";

const sslChecker = require("ssl-checker");
const getSslDetails = async (hostname) => await sslChecker(hostname);

const PORT = process.env.PORT || 4008;

// Load Model
const GroupModel = require("./models/group");
const ProductModel = require("./models/product");

GroupModel.hasMany(ProductModel, { foreignKey: "id_function" });
ProductModel.belongsTo(GroupModel, { foreignKey: "id_function" });

// express app
const app = express();
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    // hbs: allowInsecurePrototypeAccess(Handlebars),
    helpers: require("./config/helpers"),
    defaultView: "default",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.use(cookieParser());
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "awesome auth",
    store: db.SessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

// security
const csrf = csurf({ cookie: true });
app.use(helmet());
app.use(csrf);
app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403).render("error", { message: "Invalid form submission!" });
});

// passport
app.use(passport.initialize());
app.use(passport.session());
const passportConfig = { failureRedirect: "/login" };

const authRequired = (req, res, next) => {
  if (req.user) return next();
  else res.redirect("/login?required=1");
};

app.use((req, res, next) => {
  res.locals.baseUrl = BASEURL;
  res.locals.user = req.user;
  res.locals.isLoggedIn = req.user && req.user.uid > 0;
  next();
});

passport.use(
  new LocalStrategy((username, password, done) => {
    db.getUserByUsername(username)
      .then(async (user) => {
        if (!user) return done(new Error("User not found!"), false);
        if (!(await db.isPasswordHashVerified(user.password_hash, password)))
          return done(new Error("Invalid Password"), false);
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.uid);
});

passport.deserializeUser((uid, cb) => {
  db.getUserById(uid)
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      cb(err, null);
    });
});

app.get("/hit/:url", (req, res) => {
  try {
    let urlHit = `${req.params.url}`;
    sslChecker(urlHit, {
      method: "GET",
      port: 443,
    }).then((result) =>
      res.status(201).send({
        status: 200,
        message: "Response Ok",
        url: urlHit,
        result: result,
      })
    );
  } catch (error) {
    res.status(404).send(error);
  }
});

/* Routes */

app.get("/", (req, res) => {
  res.redirect("/login");
  // res.render('partials/client/index')
  console.log(
    `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
});

app.get("/r", (req, res) => {
  console.log(
    `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  res.render("register-success");
});

app.get("/dashboard/summary", authRequired, async (req, res) => {
  const countGroups = await GroupModel.count();
  const countApps = await ProductModel.count();
  const countOngo = await ProductModel.count({
    where: {
      days_remain: {
        [Op.gt]: 60,
      },
    },
  });
  const countWarn = await ProductModel.count({
    where: {
      days_remain: {
        [Op.lte]: 60,
      },
    },
  });
  const joinProduct = await ProductModel.findAndCountAll({
    include: [
      {
        model: GroupModel,
        required: true,
      },
    ],
  }).then((products) => {
    products.rows.forEach((element) => {
      let now = moment(new Date()),
        end = moment(element.valid_to),
        days = end.diff(now, "days");
      element.hitung_hari = days;
    });
    return products;
  });

  // console.log(joinProduct)

  res.render("partials/dashboard/component/summary", {
    isSummary: true,
    sub: "General",
    title: "Summary",
    user: {
      name: res.locals.user.username,
      email: res.locals.user.email,
    },
    countGroups: countGroups,
    countApps: countApps,
    countOngo: countOngo,
    countWarn: countWarn,
    allProducts: joinProduct,
  });
  console.log(
    `username ${req.user.username} at ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`
  );
});

app.get("/dashboard/watchlist", authRequired, async (req, res) => {
  const joinProduct = await ProductModel.findAll({
    include: [
      {
        model: GroupModel,
        required: true,
      },
    ],
    where: {
      days_remain: {
        [Op.lte]: 60,
      },
    },
  }).then((products) => {
    return products;
  });

  res.render("partials/dashboard/component/watchlist", {
    isWatchlist: true,
    sub: "General",
    title: "Watchlist",
    user: {
      name: res.locals.user.username,
      email: res.locals.user.email,
    },
    allProducts: joinProduct,
  });
  console.log(
    `username ${req.user.username} at ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`
  );
});

app.get("/dashboard/function", authRequired, async (req, res) => {
  console.log(
    `username ${req.user.username} at ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`
  );

  const allGroups = await GroupModel.findAll();

  res.render("partials/dashboard/component/function", {
    isFunction: true,
    sub: "Component",
    title: "Function Unit",
    user: {
      name: res.locals.user.username,
      email: res.locals.user.email,
    },
    allGroups: allGroups,
  });
});

app.get("/dashboard/application", authRequired, async (req, res) => {
  console.log(
    `username ${req.user.username} at ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`
  );

  const joinProduct = await ProductModel.findAll({
    include: [
      {
        model: GroupModel,
        required: true,
      },
    ],
  }).then((products) => {
    products.forEach((element) => {
      let now = moment(new Date()),
        end = moment(element.valid_to),
        days = end.diff(now, "days");
      element.hitung_hari = days;
    });
    return products;
  });

  if (req.query.getSSL) {
    const productByID = await ProductModel.findByPk(
      parseInt(req.query.getSSL)
    ).then((results) => {
      return results;
    });

    const getSSL = await sslChecker(productByID.domain, {
      method: "GET",
      port: 443,
    })
      .then(async (result) => {
        console.log(result);
        productByID.days_remain = result.daysRemaining;
        productByID.valid_from = new Date(result.validFrom);
        productByID.valid_to = new Date(result.validTo);
        productByID.updatedAt = new Date();
        await productByID.save();
        return result;
      })
      .catch((error) => {
        res.redirect("back");
      });

    dateFrom = new Date(getSSL.validFrom).toLocaleString("id-ID");
    dateTo = new Date(getSSL.validTo).toLocaleString("id-ID");

    res.render("partials/dashboard/component/application", {
      isApplication: true,
      sub: "Component",
      title: "Application",
      user: {
        name: res.locals.user.username,
        email: res.locals.user.email,
      },
      allProducts: joinProduct,
      hasSSL: true,
      hasilSSL: getSSL,
      dariTanggal: dateFrom,
      sampaiTanggal: dateTo,
      namaDomain: productByID.domain,
    });
  } else {
    res.render("partials/dashboard/component/application", {
      isApplication: true,
      sub: "Component",
      title: "Application",
      user: {
        name: res.locals.user.username,
        email: res.locals.user.email,
      },
      allProducts: joinProduct,
      hasSSL: false,
    });
  }
});

app.get("/dashboard/application/:id", authRequired, async (req, res) => {
  console.log(
    `username ${req.user.username} at ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`
  );
  const productByID = await ProductModel.findByPk(parseInt(req.params.id)).then(
    (results) => {
      return results;
    }
  );

  res.render("partials/dashboard/component/application-details", {
    isApplication: true,
    sub: "Component",
    title: "Application",
    user: {
      name: res.locals.user.username,
      email: res.locals.user.email,
    },
    product: productByID,
  });
});

app.all("/login", (req, res, next) => {
  new Promise((resolve, reject) => {
    if (req.method === "GET") {
      return reject();
    }
    if (req.body.username && req.body.password) {
      passport.authenticate("local", (err, user, info) => {
        if (!err && user) {
          return resolve(user);
        }
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        reject(err);
      })(req, res, next);
    } else {
      console.log(
        `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      reject(new Error("Please fill all fields"));
    }
  })
    .then(
      (user) =>
        new Promise((resolve, reject) => {
          req.login(user, (err) => {
            // save authentication
            if (err) return reject(err);
            console.log(
              `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
            );
            return res.send(
              '<script>location.href="/dashboard/summary"</script>'
            );
          });
        })
    )
    .catch((error) => {
      let errorMsg = (error && error.message) || "";
      if (!error && req.query.required) errorMsg = "Authentication required";
      console.log(
        `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      res.render("partials/client/component/login", {
        csrfToken: req.csrfToken(),
        hasError: errorMsg && errorMsg.length > 0,
        error: errorMsg,
        form: req.body,
        notRegister: true,
        stateMuted: "text-muted",
      });
    });
});

app.all("/register", (req, res) => {
  new Promise(async (resolve, reject) => {
    if (Object.keys(req.body).length > 0) {
      // console.log(req.body)
      if (
        !(req.body.email && req.body.email.length > 5) ||
        !(req.body.username && req.body.username.length > 1) ||
        !(req.body.password && req.body.password.length > 3) ||
        !(req.body.password2 && req.body.password2.length > 3)
      ) {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        reject("Please fill all fields");
      } else if (
        !(
          req.body.email.indexOf("@") !== -1 &&
          req.body.email.indexOf(".") !== -1
        )
      ) {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        reject("Invalid email address");
      } else if (req.body.password !== req.body.password2) {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        reject("Password don't match");
      } else if (await db.isUsernameInUse(req.body.username)) {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        reject("Username is taken");
      } else if (await db.isEmailInUse(req.body.email)) {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        reject("Email address is already registered");
      } else {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        resolve(true);
      }
    } else {
      console.log(
        `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
      );
      resolve(false);
    }
  })
    .then(
      (isValidFormData) =>
        new Promise((resolve, reject) => {
          if (Object.keys(req.body).length > 0 && isValidFormData) {
            db.createUserRecord({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
            })
              .then((createdUser) => {
                // console.log('====> user created...')
                // console.log(creationSuccessful)
                // authenticate?
                console.log(
                  `you're at ${req.protocol}://${req.get("host")}${
                    req.originalUrl
                  }`
                );
                resolve(createdUser);
              })
              .catch((err) => reject(err));
          } else {
            console.log(
              `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
            );
            resolve(false);
          }
        })
    )
    .then((createdUserRecord) => {
      if (createdUserRecord) {
        // Log them in in the session
        req.login(createdUserRecord, (err) => {
          console.log(err);
        });
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        res.render("partials/client/component/register-success");
      } else {
        console.log(
          `you're at ${req.protocol}://${req.get("host")}${req.originalUrl}`
        );
        res.render("partials/client/component/register", {
          csrfToken: req.csrfToken(),
          hasError: false,
          form: req.body,
          notLogin: true,
          stateMuted: "text-muted",
        });
      }
    })
    .catch((error) => {
      // console.log(error)
      res.render("partials/client/component/register", {
        csrfToken: req.csrfToken(),
        hasError: true,
        error,
        form: req.body,
      });
    });
});

app.get("/logout", authRequired, (req, res) => {
  req.logout();
  console.log("Last User has been Ejected");
  return res.send('<script>location.href="/"</script>');
});

// App start
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
