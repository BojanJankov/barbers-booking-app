import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

function App() {
  return (
    <>
      <section className="min-h-screen bg-green-100">
        <Header />
        <main>
          <Routes>
            <Route path="/"></Route>
          </Routes>
        </main>
        <Footer />
      </section>
    </>
  );
}

export default App;
