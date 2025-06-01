import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactPage from "./Pages/Contact/Contact";
import { LoginPage } from "./Pages/Login/Login";
import { RegisterPage } from "./Pages/Register/Register";
import BarbersPage from "./Pages/BarbersPage/BarbersPage";
import AddBarberPage from "./Pages/AddBarberPage/AddBarberPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import EditBarberPage from "./Pages/EditBarberPage/EditBarberPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import BarbersBookingPage from "./Pages/BarbersBookingPage/BarbersBookingPage";
import EditBarberFormPage from "./Pages/EditBarberFormPage/EditBarberFormPage";
import BarberAppointmentsPage from "./Pages/BarberAppointmentsPage/BarberAppointmentsPage";

function App() {
  return (
    <>
      <section className="min-h-screen flex flex-col bg-dark">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/barbers" element={<BarbersPage />} />
            <Route
              path="/barbers/:barberId/booking"
              element={<BarbersBookingPage />}
            />

            <Route element={<ProtectedRoutes />}>
              <Route path="/add-barber" element={<AddBarberPage />} />
              <Route
                path="/barber-appointments/:id"
                element={<BarberAppointmentsPage />}
              />
              <Route path="/edit-barber/:id" element={<EditBarberPage />} />
              <Route
                path="/edit-barber/form/:id"
                element={<EditBarberFormPage />}
              />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </section>
    </>
  );
}

export default App;
