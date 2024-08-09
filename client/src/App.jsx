import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navigation from "./Pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Navigation />
        {/* Your App components here */}
        <Outlet />
      </div>
    </>
  );
};

export default App;
