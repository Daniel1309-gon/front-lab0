import React from "react";
import axios from "axios";

const API_URL_MUNICIPIO = "https://back-lab0.onrender.com/municipio";
const MunicipalityForm = ({
  municipio,
  setMunicipio,
  municipios,
  setMunicipios,
  handleUpdateMunicipio,
  isEditing,
  setIsEditing,
}) => {
  const handleChange = (e) => {
    setMunicipio({
      ...municipio,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación y envío de datos
    if (
      municipio.nombre === "" ||
      municipio.area === "" ||
      municipio.presupuesto === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    } else if (parseInt(municipio.area) < 0) {
      alert("El área no puede ser negativa");
      return;
    }

    if (isEditing) {
      // Actualizar persona (PUT)
      await handleUpdateMunicipio(municipio.id_mun);
      setIsEditing(false);
    } else {
      // Crear nueva persona (POST)
      try {
        const response = await axios.post(API_URL_MUNICIPIO, municipio);
        setMunicipios([...municipios, response.data]);
        console.log("Municipio creado:", response.data);
      } catch (error) {
        console.error("Error al crear municipio:", error.message);
        alert("Hubo un error al crear el municipio. Inténtalo nuevamente.");
      }
    }

    setMunicipio({
        nombre: "",
        area: 0,
        presupuesto: 0,
        persona_id: 0
      });
    // Lógica para agregar o actualizar
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          name="nombre"
          value={municipio.nombre}
          onChange={handleChange}
          className="form-control"
          id="nombre"
          type="text"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="area" className="form-label">
          Área
        </label>
        <input
          name="area"
          value={municipio.area}
          onChange={handleChange}
          className="form-control"
          id="area"
          type="number"
          min='0'
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="presupuesto" className="form-label">
          Presupuesto
        </label>
        <input
          name="presupuesto"
          value={municipio.presupuesto}
          onChange={handleChange}
          className="form-control"
          id="presupuesto"
          type="number"
          min='0'
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="persona_id" className="form-label">
          ID Gobernador
        </label>
        <input
          name="persona_id"
          value={municipio.persona_id}
          onChange={handleChange}
          className="form-control"
          id="persona_id"
          type="number"
          min='0'
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Guardar Municipio
      </button>
    </form>
  );
};

export default MunicipalityForm;
