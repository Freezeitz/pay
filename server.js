import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: "YOUR_NEW_SECRET_KEY"
});

app.post("/chat", async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are J.A.R.V.I.S, an intelligent assistant." },
                { role: "user", content: req.body.message }
            ]
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
