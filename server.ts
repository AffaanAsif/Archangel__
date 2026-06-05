import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for sending email
  app.post("/api/contact", async (req, res) => {
    try {
      const { email, name, message } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      console.log(`Received contact request from ${email}`);

      // Basic Nodemailer configuration. 
      // Replace with actual SMTP settings via env variables for production.
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER || "your_email@gmail.com",
          pass: process.env.SMTP_PASS || "your_app_password"
        }
      });

      // Send the email (this is mock-ish until user configures real ENV vars)
      // But we will structure it so the form actually calls this backend.
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER, // user gets the email in their own account
          replyTo: email,
          subject: `New Contact Request from ${name || email}`,
          text: `You have received a new contact submission.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message || "No message provided."}`
        });
        console.log("Email sent successfully!");
      } else {
        console.warn("SMTP_USER and SMTP_PASS not set. Email delivery skipped. Pretending success.");
      }

      res.status(200).json({ success: true, message: "Request submitted successfully" });
    } catch (error) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
