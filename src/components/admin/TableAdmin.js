const TableAdmin = (props) => {
  const adminList = props.adminList;
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Nama</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {adminList.map((admin, index) => (
          <tr key={admin.id}>
            <th scope="row">{index + 1}</th>
            <td>{admin.email}</td>
            <td>{admin.nama}</td>
            <td>
              <button className="btn btn-danger btn-circle btn-sm">
                <i className="fas fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableAdmin;
