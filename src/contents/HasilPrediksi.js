import TablePrediksi from "../components/prediksi/TablePrediksi";

const HasilPrediksi = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Hasil Diagnosa</h1>
      <div className="card shadow mb-4">
        <div className="card-body">
          <TablePrediksi />
        </div>
      </div>
    </div>
  );
};

export default HasilPrediksi;
