const express = require('express');
const passport = require('passport');
const router = express.Router();
//const passport = require('passport')

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

//  router.post('/signup', (req, res, next) => {
//    passport.authenticate('local.signup', {
//      successRedirect: '/profile',
//      failureRedirect: '/signup',
//      failureFlash: true
//    })})
// IGUAL QUE LO DE ARRIBA
   router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
   }))
  router.get('/profile', (req, res) => {
    res.send('This is your profile')
  })
router.get('/signin', (req, res) => {
  res.render('auth/signin')
})
router.post('/signin', (req, res) => {
  res.send('Login correcto')
})
module.exports = router;