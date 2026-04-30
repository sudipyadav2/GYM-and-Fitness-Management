import "./Parallax.css";

export default function Parallax({ image, height = "100vh", children }) {
  return (
    <div
      className="parallax"
      style={{ backgroundImage: `url(${image})`, height }}
    >
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
}
