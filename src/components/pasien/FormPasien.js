import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { db } from "../../config/Firebase";
import Swal from "sweetalert2";

const FormPasien = (props) => {
  const [namaPasien, setNamaPasien] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleSave = async () => {
    try {
      const pasien = {
        namaPasien,
        tanggalLahir,
        alamat,
      };
      const docRef = await addDoc(collection(db, "Pasien"), pasien);
      console.log("Pasien berhasil disimpan dengan ID: ", docRef.id);
      setNamaPasien("");
      setTanggalLahir("");
      setAlamat("");

      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil disimpan",
        icon: "success",
      });

      props.onHide();
      props.fetchPasien();
    } catch (error) {
      console.error("Error karena: ", error.message);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="mx-3 px-3">
          Form tambah pasien
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="m-3 px-3">
          <Form.Group as={Row} controlId="formNamaPasien">
            <Form.Label column sm={3}>
              Nama Pasien
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Masukkan nama pasien"
                value={namaPasien}
                onChange={(e) => setNamaPasien(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formTanggalLahir" className="my-3">
            <Form.Label column sm={3}>
              Tanggal Lahir
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                value={tanggalLahir}
                pattern="\d{4}-\d{2}-\d{2}"
                onChange={(e) => setTanggalLahir(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formAlamat">
            <Form.Label column sm={3}>
              Alamat
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                placeholder="Masukkan alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="px-3">
        <Button variant="primary" className="mx-3 px-3" onClick={handleSave}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormPasien;
