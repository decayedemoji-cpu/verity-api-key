const express = require("express");
const { OpenAI } = require("openai");

const app = express();
app.use(express.json());

// Pulls your secret API key safely from Render's environment variables
const openai = new OpenAI({ apiKey: process.env.AI_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message, playerName, systemPrompt } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Fast, accurate, and cheap for horror text generations
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Player ${playerName} says: "${message}"` }
      ],
      max_tokens: 40,
      temperature: 0.8
    });

    // Extract the message string cleanly from OpenAI's structured response array
    const replyText = response.choices[0].message.content.trim();
    res.json({ reply: replyText });

  } catch (error) {
    console.error("OpenAI Gateway Error:", error);
    res.status(500).json({ reply: "..." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Verity AI Engine online on port ${PORT}`))
