import PropTypes from "prop-types";
import React, { useState } from "react";

export default function Collapsable({ children, message }) {
  const [hidden, setHidden] = useState(true);

  const revealMsg = message || "Click to reveal";

  if (hidden) {
    return (
      <div
        onClick={() => setHidden(false)}
        style={{
          border: "1px solid #555",
          backgroundColor: "#def",
          display: "inline-block",
          padding: 10,
          marginBottom: 20,
        }}
      >
        {revealMsg}
      </div>
    );
  } else {
    return (
      <div>
        <div
          onClick={() => setHidden(true)}
          style={{
            border: "1px solid #555",
            backgroundColor: "#def",
            display: "inline-block",
            padding: 10,
            marginBottom: 20,
          }}
        >
          Click to hide
        </div>
        <div
          style={{
            border: "1px dashed #ccc",
            padding: 20,
            marginBottom: 20,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

Collapsable.propTypes = {
  children: PropTypes.node.isRequired,
};
