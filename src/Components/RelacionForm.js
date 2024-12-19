import { React } from "react";
import axios from "axios";

const API_URL_PERSONA_HAS_VIVIENDA = "https://back-lab0.onrender.com/relacion"; // Ajusta según tu servidor
const Form = ({
  relacion,
  setRelacion,
  relaciones,
  setRelaciones,
  isEditing,
  setIsEditing,
  handleUpdateRelacion,
}) => {
  const handleChange = (e) => {
    setRelacion({
      ...relacion,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (
      relacion.persona_id === "" ||
      relacion.vivienda_id_viv === ""

    ) {
      alert("Todos los campos son obligatorios");
      return;
    } else if (parseInt(relacion.persona_id) < 0 || parseInt(relacion.vivienda_id_viv) < 0) {
      alert("No pueden haber valores negativos");
      return;
    }

    if (isEditing) {
      // Actualizar persona (PUT)
      await handleUpdateRelacion(relacion.persona_id, relacion.vivienda_id_viv);
      setIsEditing(false);
    } else {
      // Crear nueva persona (POST)
      try {
        const response = await axios.post(API_URL_PERSONA_HAS_VIVIENDA, relacion);
        setRelaciones([...relaciones, response.data]);
        console.log("Relación creada:", response.data);
      } catch (error) {
        console.error("Error al crear relación:", error.message);
        alert("Hubo un error al crear la relación. Inténtalo nuevamente.");
      }
    }

    // Reiniciar el formulario
    setRelacion({
        persona_id:0,
        vivienda_id_viv:0
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="persona_id" className="form-label">
          Id dueño
        </label>
        <input
          name="persona_id"
          onChange={handleChange}
          id="persona_id"
          className="form-control"
          type="number"
          value={relacion.persona_id}
          required
          min='0'
        />
      </div>
      <div className="mb-3">
        <label htmlFor="vivienda_id_viv" className="form-label">
          Id vivienda
        </label>
        <input
          name="vivienda_id_viv"
          onChange={handleChange}
          id="vivienda_id_viv"
          className="form-control"
          type="number"
          value={relacion.vivienda_id_viv}
          required
          min='0'
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {isEditing ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

export default Form;
