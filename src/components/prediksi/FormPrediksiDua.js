import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { db } from "../../config/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const FormPrediksiDua = () => {
  const [listPasien, setListPasien] = useState([]);
  const [namaPasien, setNamaPasien] = useState("");
  const [pregnancies, setPregnancies] = useState(null);
  const [glucose, setGlucose] = useState(null);
  const [bloodPressure, setBloodPressure] = useState(null);
  const [skinThickness, setSkinThickness] = useState(null);
  const [insulin, setInsulin] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] =
    useState(null);
  const [age, setAge] = useState(null);

  useEffect(() => {
    getAllPasien();
  }, []);

  const getAllPasien = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Pasien"));
      const pasienData = [];
      querySnapshot.forEach((doc) => {
        pasienData.push({ id: doc.id, ...doc.data() });
      });
      setListPasien(pasienData);
    } catch (error) {
      console.error("Error fetching pasien data: ", error);
    }
  };

  const handleSelectPasien = (e) => {
    setNamaPasien(e.target.value);
  };

  const handleCek = async () => {
    try {
      const dataset = {
        Pregnancies: parseFloat(pregnancies),
        Glucose: parseFloat(glucose),
        BloodPressure: parseFloat(bloodPressure),
        SkinThickness: parseFloat(skinThickness),
        Insulin: parseFloat(insulin),
        BMI: parseFloat(bmi),
        DiabetesPedigreeFunction: parseFloat(diabetesPedigreeFunction),
        Age: parseFloat(age),
      };
      console.log(dataset);
      const response = await axios.post(
        "http://localhost:5000/diabetes-cek-rf",
        dataset
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.diagnosis,
        showConfirmButton: true,
      });

      // Simpan data ke firebase
      const dataPrediksi = {
        NamaPasien: namaPasien,
        ModelPrediksi: "Random Forest",
        Hasil: response.data.diagnosis,
        Pregnancies: parseFloat(pregnancies),
        Glucose: parseFloat(glucose),
        BloodPressure: parseFloat(bloodPressure),
        SkinThickness: parseFloat(skinThickness),
        Insulin: parseFloat(insulin),
        BMI: parseFloat(bmi),
        DiabetesPedigreeFunction: parseFloat(diabetesPedigreeFunction),
        Age: parseFloat(age),
      };

      await addDoc(collection(db, "PrediksiDiabetes"), dataPrediksi);
      console.log("Data atas nama: ", namaPasien, " berhasil disimpan!");

      // setPregnancies(null);
      // setGlucose(null);
      // setBloodPressure(null);
      // setSkinThickness(null);
      // setInsulin(null);
      // setBmi(null);
      // setDiabetesPedigreeFunction(null);
      // setAge(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="formNamaPasien">
          <Form.Label column sm={3}>
            Nama Pasien
          </Form.Label>
          <Col sm={9}>
            <Form.Select
              aria-label="Default select example"
              value={namaPasien}
              onChange={handleSelectPasien}>
              <option>Pilih Pasien</option>
              {listPasien.map((pasien) => (
                <option key={pasien.id} value={pasien.namaPasien}>
                  {pasien.namaPasien}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <div className="row d-flex align-items-center">
          <div className="col">
            <Form.Group as={Row} controlId="formPregnancies" className="my-3">
              <Form.Label column sm={6}>
                Pregnancies
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan jumlah kehamilan"
                  value={pregnancies}
                  onChange={(e) => setPregnancies(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group as={Row} controlId="formGlucose">
              <Form.Label column sm={4}>
                Glucose
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan level glukosa"
                  value={glucose}
                  onChange={(e) => setGlucose(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        <div className="row d-flex align-items-center">
          <div className="col">
            <Form.Group as={Row} controlId="formBloodPressure" className="my-3">
              <Form.Label column sm={6}>
                Blood Pressure
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan tekanan darah"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group as={Row} controlId="formSkinThickness">
              <Form.Label column sm={4}>
                Skin Thickness
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan ketebalan kulit"
                  value={skinThickness}
                  onChange={(e) => setSkinThickness(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        <div className="row d-flex align-items-center">
          <div className="col">
            <Form.Group as={Row} controlId="formInsulin" className="my-3">
              <Form.Label column sm={6}>
                Insulin
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan level insulin"
                  value={insulin}
                  onChange={(e) => setInsulin(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group as={Row} controlId="formBmi">
              <Form.Label column sm={4}>
                BMI
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan BMI"
                  value={bmi}
                  onChange={(e) => setBmi(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        <div className="row d-flex align-items-center">
          <div className="col">
            <Form.Group
              as={Row}
              controlId="formDiabetesPedigreeFunction"
              className="my-3">
              <Form.Label column sm={6}>
                Diabetes Pedigree Function
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan fungsi silsilah diabetes"
                  value={diabetesPedigreeFunction}
                  onChange={(e) => setDiabetesPedigreeFunction(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group as={Row} controlId="formAge">
              <Form.Label column sm={4}>
                Age
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  placeholder="Masukkan usia"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </Form>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary btn-icon-split mt-3"
          onClick={handleCek}>
          <span className="icon text-white-50">
            <i className="fas fa-check" />
          </span>
          <span className="text">Diagnosa diabetes</span>
        </button>
      </div>
    </>
  );
};

export default FormPrediksiDua;
