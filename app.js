import express from "express";
import cors from "cors";

const app = express();

// Allow FE to send JSON form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow React FE
app.use(cors());

// Middleware example
app.use("/users", (req, res, next) => {
  console.log("Middleware: /users hit");
  next();
});

// ===============================
//       LOGIN ROUTE
// ===============================
app.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) return next({ msg: "Username is required", status: 400 });

  if (username.length < 5)
    return next({
      msg: "Username must be at least 5 characters",
      status: 400,
    });

  if (!password) return next({ msg: "Password is required", status: 400 });


  
  return res.status(200).send({
    msg: "Login successful",
    status: 200,
  });
});

// Example route
app.get("/users/sid", (req, res) => {
  console.log("GET /users/sid");
  res.send("Users route sid working!");
});

// ===============================
//       GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.msg || "Something went wrong");
});

// ===============================
//        START SERVER
// ===============================
app.listen(7777, () => console.log("Server running on http://localhost:7777"));
