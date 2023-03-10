const passport =require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')
passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { email, fullname } = req.body
    const newUser = {
        username,
        password,
        email,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password)
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId
    console.log(result)
    return done(null, newUser)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser( async (id, done) =>{
    const [rows] = await pool.query('SELECT * FROM users WHERE ID = ?', [id])
    done(null, rows[0])
})