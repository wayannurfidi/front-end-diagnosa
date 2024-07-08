import FormPrediksi from "../components/prediksi/FormPrediksi";

const ModelPrediksi = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Model Prediksi Diabetes</h1>
      <div className="card shadow mb-4">
        <div className="card-body">
          <FormPrediksi />
        </div>
      </div>
    </div>
  );
};

export default ModelPrediksi;
