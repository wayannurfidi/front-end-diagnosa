import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { db, auth } from "../../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const FormAdmin = (props) => {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
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
        email,
        nama,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "User"), admin);
      console.log("Admin berhasil ditambahkan dengan ID: ", docRef.id);

      // Clear form fields
      setEmail("");
      setNama("");
      setPassword("");

      // Tutup modal
      props.onHide();
    } catch (error) {
      console.error("Error adding admin: ", error.message);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="mx-3 px-3">
            Form tambah admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-3 px-3">
            <Form.Group as={Row} controlId="formEmail">
              <Form.Label column sm={3}>
                Nama Admin
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  placeholder="Masukan email.."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formNama" className="my-3">
              <Form.Label column sm={3}>
                Nama
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Masukan nama lengkap"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPassword" className="mt-3">
              <Form.Label column sm={3}>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  placeholder="Masukan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
};

export default FormAdmin;
