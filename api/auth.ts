const passport = require('passport');
import mysql from 'mysql2';
var GoogleStrategy = require('passport-google-oauth2').Strategy;
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8081/google/callback",
    passReqToCallback   : true
  },
  function(req:any, accessToken:any, refreshToken:any, userProfile:any, done:any) {
    return done(null, userProfile)
  }
));

passport.serializeUser(function(userProfile:any, done:any) {
    let user:any = {
        "google" : {}
    }
    user.google.displayName = userProfile.displayName
    user.google.given_name = userProfile.given_name
    user.google.family_name = userProfile.family_name
    user.google.name = userProfile.name
    user.google.email = userProfile.email
    user.google.id = userProfile.id
    user.google.language = userProfile.language
    console.log("serialize", user)
    done(null, user)
});

passport.deserializeUser(function(userProfile:any, done:any) {
    console.log("deserialize", userProfile)
    done(null, userProfile)
});