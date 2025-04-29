import { useState } from "react";
import axioxPrivate from "../api/useAxiosPrivate.ts";
import { toast } from "react-toastify";
import LoadingScreen from "./LoadingScreen.tsx";
import { isValidUrl } from "../utils/index.ts";

const SlackSender = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(0);
  const [unit, setUnit] = useState<"seconds" | "minutes" | "hours">("seconds");
  const [isSending, setIsSending] = useState(false);
  const axios = axioxPrivate();

  const canSend = !!delay && message && webhookUrl && isValidUrl(webhookUrl);

  const resetInputField = () => {
    setWebhookUrl("");
    setMessage("");
    setDelay(0);
    setUnit("seconds");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    setIsSending(true);
    toast.info(`Message will be sent in ${delay} ${unit}`);
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
        toast.success("Message sent to Slack!");
      } catch (error) {
        toast.error(
          `Failed to send message. Check webhook URL. Error: ${error}`
        );
      } finally {
        setIsSending(false);
        resetInputField();
      }
    }, delayInMs);
  };

  return (
    <>
      {isSending && <LoadingScreen />}
      <form className="slack-sender-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Slack Webhook URL:</label>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Delay:</label>
          <input
            type="number"
            min="0"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-group">
          <label>Time Unit:</label>
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
        </div>

        <button onClick={handleSubmit} disabled={!canSend || isSending}>
          {delay ? `Send in ${delay} ${unit}` : "Send"}
        </button>
      </form>
    </>
  );
};

export default SlackSender;
