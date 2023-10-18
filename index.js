const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors()); // Allow all origins for now, you can configure this as needed
app.use(express.json());

// Your OpenAI API Key
const apiKey = process.env.api_key;

app.post("/ask", async (req, res) => {
  try {
    const userInput = req.body.userInput;

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: userInput,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const chatbotResponse = response.data.choices[0].text;
    res.json({ chatbotResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
