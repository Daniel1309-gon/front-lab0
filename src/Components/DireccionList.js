import React from "react";
import axios from "axios";

const API_URL_DIRECCION = "http://localhost:3000/direccion"; // Ajusta según tu servidor

const DireccionList = ({ direcciones, setDirecciones, handleUpdateDireccion }) => {
  const handleDelete = async (id_direccion) => {
    try {
      const response = await axios.delete(`${API_URL_DIRECCION}/${id_direccion}`);
      console.log(response.data);
      // Actualizar el estado de personas
      setDirecciones(direcciones.filter((direccion) => direccion.id_direccion !== id_direccion));
    } catch (error) {
      console.error("Error al eliminar dirección:", error.message);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>CALLE PRINCIPAL</th>
          <th>CALLE SECUNDARIA</th>
          <th>COD. POSTAL</th>
        </tr>
      </thead>
      <tbody>
        {direcciones.map((direccion) => (
          <tr key={direccion.id_direccion}>
            <td>{direccion.id_direccion}</td>
            <td>{direccion.calle_principal}</td>
            <td>{direccion.calle_secundaria}</td>
            <td>{direccion.cod_postal}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(direccion.id_direccion)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdateDireccion(direccion.id_direccion)}
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

export default DireccionList;
