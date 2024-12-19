import React from "react";
import axios from "axios";

const API_URL_PERSONA_HAS_VIVIENDA = "http://localhost:3000/relacion"; // Ajusta según tu servidor

const RelacionList = ({ relaciones, setRelaciones, handleUpdateRelacion }) => {
  const handleDelete = async (persona_id, vivienda_id_viv) => {
    try {
        const response = await axios.delete(
            `${API_URL_PERSONA_HAS_VIVIENDA}/${persona_id}/${vivienda_id_viv}`,
          );
          console.log("Relacion eliminada:", response.data);
      setRelaciones(relaciones.filter((relacion) => relacion.persona_id !== persona_id || relacion.vivienda_id_viv !== vivienda_id_viv));
    } catch (error) {
      console.error("Error al eliminar relación:", error.message);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID dueño</th>
          <th>ID vivienda</th>
        </tr>
      </thead>
      <tbody>
        {relaciones.map((relacion) => (
          <tr key={`${relacion.persona_id}-${relacion.vivienda_id_viv}`}>
            <td>{relacion.persona_id}</td>
            <td>{relacion.vivienda_id_viv}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(relacion.persona_id, relacion.vivienda_id_viv)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdateRelacion(relacion.persona_id, relacion.vivienda_id_viv)}
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

export default RelacionList;
