import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactPage from "./Pages/Contact/Contact";
import { LoginPage } from "./Pages/Login/Login";
import { RegisterPage } from "./Pages/Register/Register";

function App() {
  return (
    <>
      <section className="min-h-screen bg-dark">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </main>
        <Footer />
      </section>
    </>
  );
}

export default App;
