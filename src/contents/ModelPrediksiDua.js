import React from "react";
import FormPrediksiDua from "../components/prediksi/FormPrediksiDua";

const ModelPrediksiDua = () => {
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Model Prediksi Diabetes RF</h1>
      <div className="card shadow mb-4">
        <div className="card-body">
          <FormPrediksiDua />
        </div>
      </div>
    </div>
  );
};

export default ModelPrediksiDua;
