import React from "react";
import axios from "axios";

const API_URL_MUNICIPIO = "http://localhost:3000/municipio";

const MunicipalityList = ({
  municipios,
  handleUpdateMunicipio,
  setMunicipios,
}) => {


    const handleDelete = async (id_mun) => {
        try {
          const response = await axios.delete(`${API_URL_MUNICIPIO}/${id_mun}`);
          console.log(response.data);
          // Actualizar el estado de municipios
          setMunicipios(municipios.filter((municipio) => municipio.id_mun !== id_mun));
        } catch (error) {
          console.error("Error al eliminar persona:", error.message);
        }
      };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Área</th>
          <th>Presupuesto</th>
          <th>Id gobernador</th>
        </tr>
      </thead>
      <tbody>
        {municipios.map((municipio) => (
          <tr key={municipio.id_mun}>
            <td>{municipio.id_mun}</td>
            <td>{municipio.nombre}</td>
            <td>{municipio.area}</td>
            <td>{municipio.presupuesto}</td>
            <td>{municipio.persona_id}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(municipio.id_mun)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdateMunicipio(municipio.id_mun)}
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

export default MunicipalityList;
