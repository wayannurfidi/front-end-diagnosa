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
          href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
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
            <i className="fas fa-fw fa-chart-area" />
            <span>Data Pasien</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/model-prediksi" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/model-prediksi">
            <i className="fas fa-fw fa-chart-area" />
            <span>Model Prediksi</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/dashboard/admin" ? "active" : ""
          }`}>
          <Link className="nav-link" to="/dashboard/admin">
            <i className="fas fa-fw fa-chart-area" />
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
