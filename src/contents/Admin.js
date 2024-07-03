import { useEffect, useState } from "react";
import TableAdmin from "../components/admin/TableAdmin";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import FormAdmin from "../components/admin/FormAdmin";

const Admin = () => {
  const [adminList, setAdminList] = useState([]);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    fetchingAdmin();
  }, []);

  const fetchingAdmin = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "User"));
      const userData = [];
      querySnapshot.forEach((doc) => {
        userData.push({ id: doc.id, ...doc.data() });
      });
      setAdminList(userData);
    } catch (error) {
      console.error("Error fetching pasien data: ", error);
    }
  };

  const handleModalClose = () => {
    setModalAdd(false);
    fetchingAdmin();
  };

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Daftar Admin</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="row d-flex align-items-center">
            <div className="col-md-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Tabel data admin
              </h6>
            </div>
            <div className="col-md-9">
              <button
                onClick={() => setModalAdd(true)}
                className="btn btn-primary btn-icon-split btn-sm">
                <span className="icon text-white-50">
                  <i className="fas fa-plus" />
                </span>
                <span className="text">Tambah admin</span>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <TableAdmin adminList={adminList} />
          </div>
        </div>
      </div>
      <FormAdmin show={modalAdd} onHide={handleModalClose} />
    </div>
  );
};

export default Admin;
