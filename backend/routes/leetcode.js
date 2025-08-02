const express = require("express");
const puppeteer = require("puppeteer");
const auth = require("../middleware/auth"); // JWT auth
const router = express.Router();

router.post("/login", auth, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://leetcode.com/accounts/login/", {
      waitUntil: "networkidle2",
    });

    // Fill form
    await page.type("#id_login", username, { delay: 50 });
    await page.type("#id_password", password, { delay: 50 });

    // Submit form and wait for nav
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // Get session cookie
    const cookies = await page.cookies();
    const leetcodeSession = cookies.find(
      (cookie) => cookie.name === "LEETCODE_SESSION"
    );

    await browser.close();

    if (!leetcodeSession) {
      return res.status(401).json({ error: "Login failed or captcha required" });
    }

    // Save to user profile in DB (optional)
    // await User.findByIdAndUpdate(req.userId, { leetcodeSession: leetcodeSession.value });

    res.json({
      message: "Connected to LeetCode successfully!",
      session: leetcodeSession.value,
    });
  } catch (err) {
    console.error("LeetCode login error:", err);
    res.status(500).json({ error: "Failed to connect to LeetCode" });
  }
});

module.exports = router;
