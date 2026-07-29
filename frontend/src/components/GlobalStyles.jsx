import { colors, fonts } from "../theme";

// The one place that isn't inline: a reset, the font import, and
// @keyframes, none of which the style prop can express. Mount once at
// the app root — every other visual rule in the app is inline.
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        padding: 0;
      }

      #root {
        min-height: 100vh;
      }

      body {
        background: ${colors.bg};
        color: ${colors.text};
        font-family: ${fonts.body};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-family: ${fonts.heading};
      }

      p {
        margin: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        font-family: inherit;
        cursor: pointer;
      }

      button:disabled {
        cursor: not-allowed;
      }

      input, select, textarea {
        font-family: inherit;
      }

      table {
        border-collapse: collapse;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes pulseGlow {
        0%, 100% {
          opacity: 0.55;
        }
        50% {
          opacity: 1;
        }
      }
    `}</style>
  );
}

export default GlobalStyles;
