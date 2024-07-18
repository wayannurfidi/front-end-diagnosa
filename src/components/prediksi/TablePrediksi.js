import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase";

const TablePrediksi = () => {
  const [listPrediksi, setListPrediksi] = useState([]);

  useEffect(() => {
    getAllPrediksi();
  }, []);

  const getAllPrediksi = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "PrediksiDiabetes"));
      const dataPrediksi = [];
      querySnapshot.forEach((doc) => {
        dataPrediksi.push({ id: doc.id, ...doc.data() });
      });
      setListPrediksi(dataPrediksi);
    } catch (error) {
      console.error("Error fetching pasien data: ", error);
    }
  };

  const handleDelete = () => {
    console.log("Hapus");
  };
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nama Pasien</th>
          <th scope="col">Model Prediksi</th>
          <th scope="col">Hasil</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {listPrediksi.map((prediksi, index) => (
          <tr key={prediksi.id}>
            <th scope="row">{index + 1}</th>
            <td>{prediksi.NamaPasien}</td>
            <td>{prediksi.ModelPrediksi}</td>
            <td>{prediksi.Hasil}</td>
            <td>
              <button
                className="btn btn-danger btn-circle btn-sm"
                onClick={() => handleDelete(prediksi.id)}>
                <i className="fas fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePrediksi;
