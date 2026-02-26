import FilmGrainBackground from "./FilmGrainBackground"

export default function ComingSoonPage() {
  return (
    <div
      style={{ position: "relative", minHeight: "100svh", overflow: "hidden" }}
    >
      <FilmGrainBackground />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100svh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "#505050",
            marginBottom: "2rem",
          }}
        >
          Portfolio
        </p>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 300,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#d4d4d4",
            lineHeight: 1,
            margin: 0,
          }}
        >
          Claudia Jiménez
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "3rem",
            height: "1px",
            background: "#484848",
            margin: "2rem auto",
          }}
        />

        {/* Role */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#787878",
            margin: 0,
            fontWeight: 400,
          }}
        >
          UX&thinsp;/&thinsp;UI Designer
        </p>

        {/* Coming soon tag */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(0.55rem, 1vw, 0.65rem)",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "#3a3a3a",
            marginTop: "3.5rem",
          }}
        >
          Coming soon
        </p>
      </div>
    </div>
  )
}
