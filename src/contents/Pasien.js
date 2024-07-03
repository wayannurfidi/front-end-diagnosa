import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import TablePasien from "../components/pasien/TablePasien";
import FormPasien from "../components/pasien/FormPasien";

const Pasien = () => {
  const [pasienList, setPasienList] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    fetchingPasien();
  }, []);

  const fetchingPasien = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Pasien"));
      const pasienData = [];
      querySnapshot.forEach((doc) => {
        pasienData.push({ id: doc.id, ...doc.data() });
      });
      setPasienList(pasienData);
    } catch (error) {
      console.error("Error fetching pasien data: ", error);
    }
  };

  const handleModalClose = () => {
    setModalAdd(false);
    fetchingPasien();
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Daftar Pasien</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="row d-flex align-items-center">
            <div className="col-md-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Tabel data pasien
              </h6>
            </div>
            <div className="col-md-9">
              <button
                onClick={() => setModalAdd(true)}
                className="btn btn-primary btn-icon-split btn-sm">
                <span className="icon text-white-50">
                  <i className="fas fa-plus" />
                </span>
                <span className="text">Tambah data pasien</span>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <TablePasien
              pasienList={pasienList}
              fetchingPasien={fetchingPasien}
            />
          </div>
        </div>
      </div>
      <FormPasien show={modalAdd} onHide={handleModalClose} />
    </div>
  );
};

export default Pasien;
