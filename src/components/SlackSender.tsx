import { useState } from "react";
import axioxPrivate from "../api/useAxiosPrivate.ts";

const SlackSender = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(0);
  const [unit, setUnit] = useState<"seconds" | "minutes" | "hours">("seconds");
  const axios = axioxPrivate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let delayInMs = delay * 1000;
    if (unit === "minutes") delayInMs = delay * 60 * 1000;
    if (unit === "hours") delayInMs = delay * 60 * 60 * 1000;

    const messagetemplate = `From Arniel Canillo's Slack Bot: ${message}`;

    setTimeout(async () => {
      try {
        await axios.post("send-to-slack", {
          webhookUrl,
          message: messagetemplate,
        });
        alert("Message sent to Slack!");
      } catch (error) {
        console.error("Failed to send message", error);
        alert("Failed to send message. Check console.");
      }
    }, delayInMs);
  };

  return (
    <form className="slack-sender-form" onSubmit={handleSubmit}>
      <label>
        Slack Webhook URL:
        <input
          type="text"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          required
        />
      </label>

      <label>
        Message:
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>

      <label>
        Delay:
        <input
          type="number"
          min="0"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Time Unit:
        <select
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value as "seconds" | "minutes" | "hours")
          }
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </label>

      <button type="submit">Schedule Slack Message</button>
    </form>
  );
};

export default SlackSender;
