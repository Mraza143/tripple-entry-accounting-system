import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Entry from "./Pages/Entry";
import Check from "./Pages/Check";
import ReverseCheck from "./Pages/ReverseCheck";
import Show from "./Pages/Show";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/entry" element={<Entry />} />
        <Route exact path="/show" element={<Show />} />
        <Route exact path="/check" element={<Check />} />
        <Route exact path="/reverse_check" element={<ReverseCheck />} />
      </Routes>
    </div>
  );
}

export default App;
