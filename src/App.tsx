import SlackSender from "./components/SlackSender";
import "./styles/SlackSender.scss";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="app-container">
      <h1>Slack Delayed Message Sender</h1>
      <SlackSender />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
