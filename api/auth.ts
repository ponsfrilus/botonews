const passport = require('passport');
import mysql from 'mysql2';
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;

import * as dotenv from 'dotenv';
import { replaceUser } from './lib/DB';
dotenv.config({ path: __dirname + '/.env' });

async function registerUser(userProfile:any, email:any) {
    let user:any = {
      "provider" : {}
    }
    switch(userProfile.provider) {
      case "github":
        user.provider.username = userProfile.username
      break;
      case "google":
        user.provider.username = `boto_${userProfile.id}`
      break;
    }
    user.provider.displayName = userProfile.displayName
    user.provider.given_name = userProfile.given_name
    user.provider.family_name = userProfile.family_name
    user.provider.name = userProfile.name
    user.provider.email = email
    user.provider.id = userProfile.id
    user.provider.language = userProfile.language
    user.provider.provider = userProfile.provider

    var replacedUser:any = await replaceUser(user.provider.username, email);
    return user;
}

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  });

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8081/github/callback",
  scope: ['user:email']
},
function(accessToken:any, refreshToken:any, userProfile:any, cb:any) {
    console.log(userProfile)
    return cb(null, userProfile);
}
));

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

passport.serializeUser(async function(userProfile:any, done:any) {
    let email;
    switch(userProfile.provider) {
      case "github":
        email = userProfile.emails[0].value
      break;
      case "google":
        email = userProfile.email
      break;
    }
    var user = await registerUser(userProfile, email)
    done(null, user)
});

passport.deserializeUser(function(userProfile:any, done:any) {
    done(null, userProfile)
});