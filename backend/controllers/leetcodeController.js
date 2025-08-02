const axios = require("axios");
const LeetCodeSession = require("../models/LeetCodeSession");

const LEETCODE_BASE = "https://leetcode.com/graphql";

// 🔹 LOGIN to LeetCode
exports.loginToLeetCode = async (req, res) => {
  const { username, password } = req.body;
  const userId = req.user._id;

  try {
    // Step 1: Get CSRF token
    const csrfRes = await axios.get("https://leetcode.com/accounts/login/");
    const csrfToken = csrfRes.headers["set-cookie"]
      .find(c => c.startsWith("csrftoken"))
      .split("=")[1].split(";")[0];

    // Step 2: Login
    const loginRes = await axios.post(
      "https://leetcode.com/accounts/login/",
      { login: username, password },
      {
        headers: {
          "Content-Type": "application/json",
          "x-csrftoken": csrfToken,
          cookie: `csrftoken=${csrfToken}`,
        },
        maxRedirects: 0,
        validateStatus: (status) => status === 302 || status === 200,
      }
    );

    // Step 3: Extract cookies
    const cookies = loginRes.headers["set-cookie"];
    const leetcodeSession = cookies.find(c => c.startsWith("LEETCODE_SESSION")).split(";")[0].split("=")[1];
    const newCsrfToken = cookies.find(c => c.startsWith("csrftoken")).split(";")[0].split("=")[1];

    // Step 4: Save in DB
    await LeetCodeSession.findOneAndUpdate(
      { userId },
      { leetcodeSession, csrfToken: newCsrfToken },
      { upsert: true }
    );

    res.json({ message: "LeetCode connected successfully!" });
  } catch (err) {
    console.error("LeetCode login failed:", err.message);
    res.status(500).json({ error: "LeetCode login failed" });
  }
};

// 🔹 GET Problems by topic
exports.getProblemsByTopic = async (req, res) => {
  const { topic } = req.params;
  const userId = req.user._id;

  try {
    const session = await LeetCodeSession.findOne({ userId });
    if (!session) return res.status(401).json({ error: "LeetCode not connected" });

    const query = `
      query getTopicProblems($slug: String!) {
        topicTag(slug: $slug) {
          name
          questions {
            questionFrontendId
            title
            titleSlug
            difficulty
            isPaidOnly
          }
        }
      }
    `;

    const response = await axios.post(
      LEETCODE_BASE,
      { query, variables: { slug: topic.toLowerCase().replace(/ /g, "-") } },
      {
        headers: {
          "Content-Type": "application/json",
          cookie: `LEETCODE_SESSION=${session.leetcodeSession}; csrftoken=${session.csrfToken}`,
        },
      }
    );

    res.json(response.data.data.topicTag.questions);
  } catch (err) {
    console.error("Error fetching problems:", err.message);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
};

// 🔹 SUBMIT Solution
exports.submitSolution = async (req, res) => {
  const { titleSlug, code, lang } = req.body;
  const userId = req.user._id;

  try {
    const session = await LeetCodeSession.findOne({ userId });
    if (!session) return res.status(401).json({ error: "LeetCode not connected" });

    const submitRes = await axios.post(
      `https://leetcode.com/problems/${titleSlug}/submit/`,
      { lang, question_id: null, typed_code: code },
      {
        headers: {
          "Content-Type": "application/json",
          cookie: `LEETCODE_SESSION=${session.leetcodeSession}; csrftoken=${session.csrfToken}`,
        },
      }
    );

    res.json({ status: "submitted", data: submitRes.data });
  } catch (err) {
    console.error("Submit error:", err.message);
    res.status(500).json({ error: "Failed to submit solution" });
  }
};
