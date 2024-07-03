import Swal from "sweetalert2";
import { hitungUmur, formatTanggal } from "../../functions/Utiliti";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/Firebase";

const TablePasien = (props) => {
  const pasienList = props.pasienList;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pasien akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus data!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "Pasien", id));
          console.log("Menghapus pasien dengan ID: ", id);
          props.fetchingPasien();
          Swal.fire("Terhapus!", "Data pasien telah dihapus.", "success");
        } catch (error) {
          console.error("Error saat menghapus data: ", error);
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama</th>
            <th scope="col">Tanggal Lahir</th>
            <th scope="col">Umur</th>
            <th scope="col">Alamat</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pasienList.map((pasien, index) => (
            <tr key={pasien.id}>
              <th scope="row">{index + 1}</th>
              <td>{pasien.namaPasien}</td>
              <td>{formatTanggal(pasien.tanggalLahir)}</td>
              <td>{hitungUmur(pasien.tanggalLahir)} Tahun</td>
              <td>{pasien.alamat}</td>
              <td>
                <button
                  className="btn btn-danger btn-circle btn-sm"
                  onClick={() => handleDelete(pasien.id)}>
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TablePasien;
