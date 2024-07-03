import Swal from "sweetalert2";

const Navbar = () => {
  const handleLogout = () => {
    Swal.fire({
      title: "Yakin ingin keluar?",
      showCancelButton: true,
      confirmButtonText: "Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userEmail");
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil logout",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            window.location.href = "/";
          },
        });
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars" />
        </button>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <button className="nav-link dropdown-toggle" onClick={handleLogout}>
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                Keluar
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
