import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar">
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/">
          <div className="sidebar-brand-icon ">
            <i className="fas fa fa-medkit" />
          </div>
          <div className="sidebar-brand-text mx-3">
            Sistem Diagnosa
          </div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li
          className={`nav-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Master Data</div>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/data-pasien" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/data-pasien">
            <i className="fas fa fa-child" />
            <span>Data Pasien</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/model-prediksi-nb" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/model-prediksi-nb">
            <i className="fas fa fa-check-circle" />
            <span>Diagnosa Naive Bayes</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/model-prediksi-rf" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/model-prediksi-rf">
            <i className="fas fa fa-tree" />
            <span>Diagnosa Random Forest</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/hasil-prediksi" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/hasil-prediksi">
            <i className="fas fa fa-list-alt" />
            <span>Hasil Diagnosa</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/admin" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/admin">
            <i className="fas fa fa-users" />
            <span>Data Admin</span>
          </Link>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
      </ul>
    </>
  );
};

export default Sidebar;
