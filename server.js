import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const app = express();

app.set("port", 8080);
app.set("ip", "127.0.0.1");
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
    allowedHeaders: ["Content-Type"],
    exposedHeaderss: ["Access-Control-Allow-Origin"],
  })
);
app.use(cookieParser());

const USERS = new Map();
USERS.set("APPGYVER", { username: "APPGYVER", role: "Admin" });
USERS.set("Roman", { username: "Roman", role: "user" });

const SESSIONS = new Map();

app.post("/login", (req, res) => {
  console.log(req.body);
  const user = USERS.get(req.body.username);
  if (!user) {
    return res.sendStatus(401);
  } else {
    const sessionId = crypto.randomUUID();
    SESSIONS.set(sessionId, user);
    res
      .cookie("sessionId", sessionId, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        expires: new Date(Date.now() + 5000),
        priority: "high",
      })
      .send(`Authenticated as ${user.username}`);
  }
});

app.get("/adminData", (req, res) => {
  console.dir(req.cookies);
  const user = SESSIONS.get(req.cookies.sessionId);
  if (!user) {
    return res.sendStatus(401);
  } else if (user.role !== "Admin") {
    return res.sendStatus(403);
  } else {
    return res.send("Admin route reached! Here are all admin secrets! :D");
  }
});

const port = app.get("port");
const ip = app.get("ip");

app.listen(port, ip, () => {
  console.log(`Server is running on port ${port} and ip ${ip} ...`);
});
