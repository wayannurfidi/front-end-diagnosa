import React, { useState } from "react";
import { auth } from "../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", email);

      Swal.fire(
        {
          icon: "success",
          title: "Berhasil",
          text: "Selamat, Anda Berhasil Masuk ",
          showConfirmButton: false,
          timer: 1500,
        },
        () => {
          window.location.href = "/dashboard";
        }
      );
      window.location.href = "/dashboard";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Anda Gagal Masuk, Periksa Kembali Passowrd dan Email Anda ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <div className="row justify-content-center my-5 py-4">
        <div className="col-xl-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row p-5">
                <div className="col-sm-8 mx-auto">
                  <div className="py-2">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Login!</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <hr />
                      <button
                        onClick={handleLogin}
                        className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <p className="small">
                        Belum memiliki akun?
                        <Link to="/register"> Daftar!</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
