import { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollStory from "./components/ScrollStory";
import MobileStory from "./components/MobileStory";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Grain } from "./components/StageOverlays";

function App() {
  // Touch devices get MobileStory: a normal, natively-scrolling layout
  // where the video just autoplays instead of being scrubbed by JS. The
  // pinned scroll-scrub version stays for mouse/trackpad users, where the
  // eased scrubbing effect works well and doesn't fight the OS's own
  // scroll physics the way it does on touchscreens.
  const [isTouch] = useState(() => window.matchMedia("(pointer: coarse)").matches);

  return (
    <>
      <Navbar />
      <main>
        {isTouch ? <MobileStory /> : <ScrollStory />}
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <Grain />
    </>
  );
}

export default App;
