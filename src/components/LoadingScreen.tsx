import "../styles/LoadingScreen.scss";

export default function LoadingScreen() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      <p>Sending your message...</p>
    </div>
  );
}
