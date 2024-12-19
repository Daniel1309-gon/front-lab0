import { React } from "react";
import axios from "axios";

const API_URL_DIRECCION = "http://localhost:3000/direccion"; // Ajusta según tu servidor
const Form = ({
  direccion,
  setDireccion,
  direcciones,
  setDirecciones,
  isEditing,
  setIsEditing,
  handleUpdateDireccion,
}) => {
  const handleChange = (e) => {
    setDireccion({
      ...direccion,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar datos
    if (
      direccion.calle_principal === "" ||
      direccion.calle_secundaria === "" ||
      direccion.cod_postal === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    } else if (parseInt(direccion.cod_postal) < 0) {
      alert("El código postal no puede ser negativo.");
      return;
    }

    if (isEditing) {
      // Actualizar persona (PUT)
      await handleUpdateDireccion(direccion.id_direccion);
      setIsEditing(false);
    } else {
      // Crear nueva persona (POST)
      try {
        const response = await axios.post(API_URL_DIRECCION, direccion);
        setDirecciones([...direcciones, response.data]);
        console.log("Dirección creada:", response.data);
      } catch (error) {
        console.error("Error al crear dirección:", error.message);
        alert("Hubo un error al crear la dirección. Inténtalo nuevamente.");
      }
    }

    // Reiniciar el formulario
    setDireccion({
        calle_principal:'',
        calle_secundaria:'',
        cod_postal:0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="calle_principal" className="form-label">
          Calle principal
        </label>
        <input
          name="calle_principal"
          onChange={handleChange}
          id="calle_principal"
          className="form-control"
          type="text"
          value={direccion.calle_principal}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="calle_secundaria" className="form-label">
          Calle secundaria
        </label>
        <input
          name="calle_secundaria"
          onChange={handleChange}
          id="calle_secundaria"
          className="form-control"
          type="text"
          value={direccion.calle_secundaria}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cod_postal" className="form-label">
          Código postal
        </label>
        <input
          name="cod_postal"
          onChange={handleChange}
          id="cod_postal"
          className="form-control"
          type="number"
          value={direccion.cod_postal}
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

export default Form;
