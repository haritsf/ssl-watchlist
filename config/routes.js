const express = require("express");
const passport = require("passport");

const app = express();

/* Routes */

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new", authRequired, (req, res) => {
  res.render("new");
});

app.get("/r", (req, res) => {
  res.render("register-success");
});

app.get("/home", authRequired, (req, res) => {
  res.render("home");
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
        reject(err);
      })(req, res, next);
    } else {
      reject(new Error("Please fill all fields"));
    }
  })
    .then(
      (user) =>
        new Promise((resolve, reject) => {
          req.login(user, (err) => {
            // save authentication
            if (err) return reject(err);
            return res.send('<script>location.href="/home";</script>');
          });
        })
    )
    .catch((error) => {
      let errorMsg = (error && error.message) || "";
      if (!error && req.query.required) errorMsg = "Authentication required";

      res.render("login", {
        csrfToken: req.csrfToken(),
        hasError: errorMsg && errorMsg.length > 0,
        error: errorMsg,
        form: req.body,
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
        reject("Please fill all fields");
      } else if (
        !(
          req.body.email.indexOf("@") !== -1 &&
          req.body.email.indexOf(".") !== -1
        )
      ) {
        reject("Invalid email address");
      } else if (req.body.password !== req.body.password2) {
        reject("Password don't match");
      } else if (await db.isUsernameInUse(req.body.username)) {
        reject("Username is taken");
      } else if (await db.isEmailInUse(req.body.email)) {
        reject("Email address is already registered");
      } else {
        resolve(true);
      }
    } else {
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
                resolve(createdUser);
              })
              .catch((err) => reject(err));
          } else {
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
        res.render("register-success");
      } else {
        res.render("register", {
          csrfToken: req.csrfToken(),
          hasError: false,
          form: req.body,
        });
      }
    })
    .catch((error) => {
      // console.log(error)
      res.render("register", {
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
  return res.send('<script>location.href="/";</script>');
});
