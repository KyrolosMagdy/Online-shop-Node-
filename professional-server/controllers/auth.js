const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if(message.length){
    message = message[0]
  } else {
    message = null
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage: message 
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('error', 'email or password dont match');
        return req.session.save(err => {
          res.redirect('/signup');
        });
      }
      bcrypt.compare(password, user.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            return res.redirect('/');
          });
        }
        return res.redirect('/login')
      })
      .catch(err => {
        console.log(err);
        res.redirect('/login')
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email: email }).then(userDoc => {
    if (userDoc) {
      return res.redirect('/signup');
    }
    return bcrypt.hash(password, 15)
      .then(hashPassword => {
        const user = new User({
          email,
          password: hashPassword,
          cart: { items: [] }
        });
        return user.save()
      })
      .then(result => {
        res.redirect('/login');
      });
  })
    .catch(err => {
      console.log(err)
    })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};