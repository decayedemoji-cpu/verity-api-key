const express = require("express");
const { GoogleGenAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.AI_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message, playerName, systemPrompt } = req.body;
    const fullPrompt = `${systemPrompt}\n\nPlayer ${playerName} says: "${message}"\nVerity's response:`;
    
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const replyText = result.response.text().trim();
    
    res.json({ reply: replyText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "..." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Verity backend active on port ${PORT}`));
