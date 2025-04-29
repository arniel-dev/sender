import SlackSender from "./components/SlackSender";
import "./styles/SlackSender.scss";

function App() {
  return (
    <div className="app-container">
      <h1>Slack Delayed Message Sender</h1>
      <SlackSender />
    </div>
  );
}

export default App;
