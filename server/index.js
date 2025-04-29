import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-to-slack", async (req, res) => {
  const { webhookUrl, message } = req.body;

  if (!webhookUrl || !message) {
    return res
      .status(400)
      .json({ error: "Webhook URL and message are required" });
  }

  try {
    await axios.post(webhookUrl, { text: message });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending to Slack:", error);
    res.status(500).json({ error: "Failed to send message to Slack" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
