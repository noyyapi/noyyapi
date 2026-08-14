import Navbar from "./components/Navbar";
import ScrollStory from "./components/ScrollStory";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Grain } from "./components/StageOverlays";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollStory />
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
