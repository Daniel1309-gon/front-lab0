import React from "react";
import axios from "axios";

const API_URL = "https://back-lab0.onrender.com/persona"; // Ajusta según tu servidor

const PeopleList = ({ personas, setPersonas, handleUpdatePersona }) => {
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log(response.data);
      // Actualizar el estado de personas
      setPersonas(personas.filter((persona) => persona.id !== id));
    } catch (error) {
      console.error("Error al eliminar persona:", error.message);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>TELEFONO</th>
          <th>EDAD</th>
          <th>SEXO</th>
        </tr>
      </thead>
      <tbody>
        {personas.map((persona) => (
          <tr key={persona.id}>
            <td>{persona.id}</td>
            <td>{persona.nombre}</td>
            <td>{persona.apellido}</td>
            <td>{persona.telefono}</td>
            <td>{persona.edad}</td>
            <td>{persona.sexo}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(persona.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdatePersona(persona.id)}
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

export default PeopleList;
