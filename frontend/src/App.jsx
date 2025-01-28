import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mx-auto p-4 w-full container">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/cart"
            element={<Cart />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
