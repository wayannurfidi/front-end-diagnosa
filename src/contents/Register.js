import React, { useState } from "react";
import { db, auth } from "../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user.uid);

      // Simpan informasi admin ke koleksi 'User' di Firestore
      const admin = {
        nama,
        email,
        hp,
        tanggalLahir,
        kelamin,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "User"), admin);
      console.log("Admin berhasil ditambahkan dengan ID: ", docRef.id);
      Swal.fire(
        {
          icon: "success",
          title: "Berhasil",
          text: "Selamat, Anda Berhasil Registrasi",
          showConfirmButton: false,
          timer: 1500,
        },
        () => {
          window.location.href = "/";
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error adding admin: ", error.message);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Anda Gagal Masuk, Periksa Kembali Data Anda ",
        showConfirmButton: true,
        timer: 5000,
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
                      <h1 className="h4 text-gray-900 mb-4">Registrasi!</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          placeholder="Nama Lengkap..."
                          onChange={(e) => setNama(e.target.value)}
                        />
                      </div>
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
                          type="number"
                          inputMode="numeric"
                          className="form-control form-control-user"
                          placeholder="Nomor handphone..."
                          onChange={(e) => setHp(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control form-control-user"
                          placeholder="Tanggal Lahir..."
                          onChange={(e) => setTanggalLahir(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <Form.Select
                          aria-label="Default select example"
                          className="form-control rounded-pill fs-6 py-2 px-3"
                          onChange={(e) => setKelamin(e.target.value)}>
                          <option disabled selected>
                            Jenis kelamin...
                          </option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </Form.Select>
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
                        onClick={handleRegister}
                        className="btn btn-primary btn-user btn-block">
                        Register
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <p className="small">
                        Sudah memiliki akun?
                        <Link to="/"> Login!</Link>
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

export default Register;
