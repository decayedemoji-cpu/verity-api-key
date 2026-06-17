const express = require("express");
const { OpenAI } = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.AI_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message, playerName, systemPrompt } = req.body;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Free, fast, and perfect for horror dialogue
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Player ${playerName} says: "${message}"` }
      ],
      max_tokens: 50
    });

    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "..." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Verity backend active on port ${PORT}`));
