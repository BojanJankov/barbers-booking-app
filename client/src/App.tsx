import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import AboutUs from "./Pages/AboutUs/AboutUs";

function App() {
  return (
    <>
      <section
        className="min-h-screen bg-green-100 bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url(./images/background-img.jpg)",
        }}
      >
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
          </Routes>
        </main>
        <Footer />
      </section>
    </>
  );
}

export default App;
