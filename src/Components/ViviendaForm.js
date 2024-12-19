import { React } from "react";
import axios from "axios";

const API_URL_VIVIENDA = "http://localhost:3000/vivienda"; // Ajusta según tu servidor
const ViviendaForm = ({
  vivienda,
  setVivienda,
  viviendas,
  setViviendas,
  isEditing,
  setIsEditing,
  handleUpdateVivienda,
}) => {
  const handleChange = (e) => {
    setVivienda({
      ...vivienda,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (
      vivienda.direccion_id === "" ||
      vivienda.capacidad === "" ||
      vivienda.niveles === "" ||
      vivienda.municipio_id_mun === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    } else if (parseInt(vivienda.niveles) < 0 || parseInt(vivienda.niveles) < 0) {
      alert("No puedes ingresar valores negativos");
      return;
    }

    if (isEditing) {
      // Actualizar persona (PUT)
      await handleUpdateVivienda(vivienda.id_viv);
      setIsEditing(false);
    } else {
      // Crear nueva persona (POST)
      try {
        const response = await axios.post(API_URL_VIVIENDA, vivienda);
        setViviendas([...viviendas, response.data]);
        console.log("Vivienda creada:", response.data);
      } catch (error) {
        console.error("Error al crear persona:", error.message);
        alert("Hubo un error al crear la persona. Inténtalo nuevamente.");
      }
    }

    // Reiniciar el formulario
    setVivienda({
      direccion_id: 0,
      capacidad: 0,
      niveles: 0,
      municipio_id_mun: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="direccion_id" className="form-label">
          Id de la dirección
        </label>
        <input
          name="direccion_id"
          onChange={handleChange}
          id="direccion_id"
          className="form-control"
          type="number"
          value={vivienda.direccion_id}
          required
          min='0'
        />
      </div>
      <div className="mb-3">
        <label htmlFor="capacidad" className="form-label">
            Capacidad   
        </label>
        <input
          name="capacidad"
          onChange={handleChange}
          id="capacidad"
          className="form-control"
          type="number"
          value={vivienda.capacidad}
          required
          min='0'
        />
      </div>
      <div className="mb-3">
        <label htmlFor="niveles" className="form-label">
          Número de niveles
        </label>
        <input
          name="niveles"
          onChange={handleChange}
          id="niveles"
          className="form-control"
          type="number"
          value={vivienda.niveles}
          required
          min='0'
        />
      </div>
      <div className="mb-3">
        <label htmlFor="municipio_id_mun" className="form-label">
          Id del municipio
        </label>
        <input
          name="municipio_id_mun"
          onChange={handleChange}
          id="municipio_id_mun"
          className="form-control"
          type="number"
          value={vivienda.municipio_id_mun}
          required
          min="0"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

export default ViviendaForm;
