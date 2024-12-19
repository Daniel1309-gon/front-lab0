import { React } from "react";
import axios from "axios";

const API_URL_PERSONA = "https://back-lab0.onrender.com/persona"; // Ajusta según tu servidor
const Form = ({
  persona,
  setPersona,
  personas,
  setPersonas,
  isEditing,
  setIsEditing,
  handleUpdatePersona,
}) => {
  const handleChange = (e) => {
    setPersona({
      ...persona,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (
      persona.nombre === "" ||
      persona.apellido === "" ||
      persona.telefono === "" ||
      persona.edad === "" ||
      persona.sexo === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    } else if (parseInt(persona.edad) < 0) {
      alert("La edad no puede ser negativa");
      return;
    }

    if (isEditing) {
      // Actualizar persona (PUT)
      await handleUpdatePersona(persona.id);
      setIsEditing(false);
    } else {
      // Crear nueva persona (POST)
      try {
        const response = await axios.post(API_URL_PERSONA, persona);
        setPersonas([...personas, response.data]);
        console.log("Persona creada:", response.data);
      } catch (error) {
        console.error("Error al crear persona:", error.message);
        alert("Hubo un error al crear la persona. Inténtalo nuevamente.");
      }
    }

    // Reiniciar el formulario
    setPersona({
      nombre: "",
      apellido: "",
      telefono: "",
      edad: "",
      sexo: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          name="nombre"
          onChange={handleChange}
          id="nombre"
          className="form-control"
          type="text"
          value={persona.nombre}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="apellido" className="form-label">
          Apellido
        </label>
        <input
          name="apellido"
          onChange={handleChange}
          id="apellido"
          className="form-control"
          type="text"
          value={persona.apellido}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">
          Teléfono
        </label>
        <input
          name="telefono"
          onChange={handleChange}
          id="telefono"
          className="form-control"
          type="text"
          value={persona.telefono}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edad" className="form-label">
          Edad
        </label>
        <input
          name="edad"
          onChange={handleChange}
          id="edad"
          className="form-control"
          type="number"
          value={persona.edad}
          required
          min="0"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sexo" className="form-label">
          Sexo
        </label>
        <select
          name="sexo"
          onChange={handleChange}
          id="sexo"
          className="form-control"
          value={persona.sexo}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        {isEditing ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
};

export default Form;
