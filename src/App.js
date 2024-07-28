import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Welcome from "./contents/Welcome";
import Footer from "./components/Footer";
import ModelPrediksi from "./contents/ModelPrediksi";
import Pasien from "./contents/Pasien";
import Admin from "./contents/Admin";
import Login from "./contents/Login";
import ModelPrediksiDua from "./contents/ModelPrediksiDua";
import HasilPrediksi from "./contents/HasilPrediksi";
import Register from "./contents/Register";

const App = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  console.log(isLoggedIn);

  return (
    <Router>
      {isLoggedIn === null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : isLoggedIn === "false" ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <Routes>
                <Route path="/dashboard" element={<Welcome />} />
                <Route path="/dashboard/data-pasien" element={<Pasien />} />
                <Route
                  path="/dashboard/model-prediksi-nb"
                  element={<ModelPrediksi />}
                />
                <Route
                  path="/dashboard/model-prediksi-rf"
                  element={<ModelPrediksiDua />}
                />
                <Route
                  path="/dashboard/hasil-prediksi"
                  element={<HasilPrediksi />}
                />
                <Route path="/dashboard/admin" element={<Admin />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
