const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const pool = require("./db");
require("dotenv").config({ path: __dirname + "/../.env" });
const app = express();
app.use(express.json());

// ตั้งค่า session
app.use(session({ secret: "yourSecret", resave: false, saveUninitialized: true }));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// ตั้งค่า Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const [rows] = await pool.query("SELECT * FROM users WHERE google_id = ?", [profile.id]);
        
        let user;
        if (rows.length === 0) {
          // ถ้า user ยังไม่มีใน DB → insert
          const [result] = await pool.query(
            "INSERT INTO users (email, name, google_id) VALUES (?, ?, ?)",
            [profile.emails[0].value, profile.displayName, profile.id]
          );
          user = { id: result.insertId, ...profile };
        } else {
          user = rows[0];
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
// บันทึกข้อมูล user ใน session

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Route login google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback จาก google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Login success with Google!");
  }
);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
