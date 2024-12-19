import React from "react";

const Navbar = ({ setCurrentView }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Laboratorio 0
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentView("persona")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 15,
                }}
              >
                Personas
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentView("municipio")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 15,
                }}
              >
                Municipios
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentView("direccion")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 15,
                }}
              >
                Direcciones
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentView("vivienda")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 15,
                }}
              >
                Viviendas
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={() => setCurrentView("relacion")}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 15,
                }}
              >
                Personas propietarias
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
