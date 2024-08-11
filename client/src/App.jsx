import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navigation from "./Pages/Auth/Navigation";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Navigation />

        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default App;
