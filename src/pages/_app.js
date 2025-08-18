import "@/styles/globals.css";
import { use, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return <p>Loading...</p>;
  }
  if (loaded) {
    return <Component {...pageProps} />;
  }
}
