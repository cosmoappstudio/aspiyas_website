import express from "express";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { initDb } from "./src/db/index.js";
import db from "./src/db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-in-prod";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // Initialize DB
  initDb();

  // --- API ROUTES ---

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // Login
  app.post("/api/auth/login", (req: any, res: any) => {
    const { username, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.json({ success: true });
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ success: true });
  });

  app.get("/api/auth/me", authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  // Pages CRUD
  app.get("/api/pages", (req, res) => {
    const pages = db.prepare("SELECT * FROM pages ORDER BY created_at DESC").all();
    res.json(pages);
  });

  app.get("/api/pages/:slug", (req, res) => {
    const page = db.prepare("SELECT * FROM pages WHERE slug = ?").get(req.params.slug);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.json(page);
  });

  app.post("/api/pages", authenticateToken, (req, res) => {
    const { slug, title, content, language } = req.body;
    try {
      const result = db.prepare(
        "INSERT INTO pages (slug, title, content, language) VALUES (?, ?, ?, ?)"
      ).run(slug, title, content, language || 'tr');
      res.json({ id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/pages/:id", authenticateToken, (req, res) => {
    const { slug, title, content, language } = req.body;
    try {
      db.prepare(
        "UPDATE pages SET slug = ?, title = ?, content = ?, language = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(slug, title, content, language, req.params.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/pages/:id", authenticateToken, (req, res) => {
    db.prepare("DELETE FROM pages WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Blogs CRUD
  app.get("/api/blogs", (req, res) => {
    const blogs = db.prepare("SELECT * FROM blogs ORDER BY created_at DESC").all();
    res.json(blogs);
  });

  app.get("/api/blogs/:slug", (req, res) => {
    const blog = db.prepare("SELECT * FROM blogs WHERE slug = ?").get(req.params.slug);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  });

  app.post("/api/blogs", authenticateToken, (req, res) => {
    const { slug, title, excerpt, content, image_url, language } = req.body;
    try {
      const result = db.prepare(
        "INSERT INTO blogs (slug, title, excerpt, content, image_url, language) VALUES (?, ?, ?, ?, ?, ?)"
      ).run(slug, title, excerpt, content, image_url, language || 'tr');
      res.json({ id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.put("/api/blogs/:id", authenticateToken, (req, res) => {
    const { slug, title, excerpt, content, image_url, language } = req.body;
    try {
      db.prepare(
        "UPDATE blogs SET slug = ?, title = ?, excerpt = ?, content = ?, image_url = ?, language = ? WHERE id = ?"
      ).run(slug, title, excerpt, content, image_url, language, req.params.id);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  app.delete("/api/blogs/:id", authenticateToken, (req, res) => {
    db.prepare("DELETE FROM blogs WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Settings
  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj: any = {};
    // @ts-ignore
    settings.forEach(s => settingsObj[s.key] = s.value);
    res.json(settingsObj);
  });

  app.post("/api/settings", authenticateToken, (req, res) => {
    const { key, value } = req.body;
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
    res.json({ success: true });
  });


  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
