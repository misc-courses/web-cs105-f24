import "../styles/globals.css";

import React, { useState } from "react";
import PageContext from "../components/PageContext";

function MyApp({ Component, pageProps, props }) {
  const [sections, setSections] = useState([]);

  return (
    <PageContext.Provider value={{ sections, setSections }}>
      <Component {...pageProps} />
    </PageContext.Provider>
  );
}

export default MyApp;
