const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "https://localhost:4114";
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// Public routes
app.get("/", (_req, res) => res.send("TotallySecure backend is running. Try /totallysecure/ping"));
app.get("/totallysecure/ping", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// 1) Admin allowlist API (TOKEN PROTECTED) — mounted BEFORE the IP gate
const adminAllowlistRoutes = require("../routes/adminAllowlistRoutes.js/index.js");
app.use("/totallysecure/admin/allowlist", adminAllowlistRoutes);

// 2) IP gate for the rest of /totallysecure
const { ipAllowlistDb } = require("../services/ipAllowlistDb.js");
app.use("/totallysecure", ipAllowlistDb());

// 3) Your other /totallysecure routes
const authRoutes = require("../routes/authRoutes");
app.use("/totallysecure/auth", authRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: "Not found", path: req.originalUrl }));

module.exports = app;
