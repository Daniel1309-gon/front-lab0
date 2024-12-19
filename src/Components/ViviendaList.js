import React from "react";
import axios from "axios";

const API_URL_VIVIENDA = "https://back-lab0.onrender.com/vivienda"; // Ajusta según tu servidor

const ViviendaList = ({ viviendas, setViviendas, handleUpdateVivienda }) => {
  const handleDelete = async (id_viv) => {
    try {
      const response = await axios.delete(`${API_URL_VIVIENDA}/${id_viv}`);
      console.log(response.data);
      // Actualizar el estado de personas
      setViviendas(viviendas.filter((vivienda) => vivienda.id_viv !== id_viv));
    } catch (error) {
      console.error("Error al eliminar vivienda:", error.message);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>DIRECCION</th>
          <th>CAPACIDAD</th>
          <th>NIVELES</th>
          <th>MUNICIPIO ID</th>
        </tr>
      </thead>
      <tbody>
        {viviendas.map((vivienda) => (
          <tr key={vivienda.id_viv}>
            <td>{vivienda.id_viv}</td>
            <td>{vivienda.direccion_id}</td>
            <td>{vivienda.capacidad}</td>
            <td>{vivienda.niveles}</td>
            <td>{vivienda.municipio_id_mun}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(vivienda.id_viv)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdateVivienda(vivienda.id_viv)}
                  className="btn btn-dark"
                >
                  Actualizar
                </button>
              </div>
            </td>
          </tr> 
        ))}
      </tbody>
    </table>
  );
};

export default ViviendaList;
