import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Components/Navbar.js";
import PeopleList from "./Components/PeopleList.js";
import Form from "./Components/Form.js";
import MunicipalityList from "./Components/MunicipalityList.js";
import MunicipalityForm from "./Components/MunicipalityForm.js";
import axios from "axios";
import DireccionList from "./Components/DireccionList.js";
import DireccionForm from "./Components/DireccionForm.js";
import ViviendaList from "./Components/ViviendaList.js"
import ViviendaForm from "./Components/ViviendaForm.js"
import RelacionList from "./Components/RelacionList.js"
import RelacionForm from "./Components/RelacionForm.js"

const API_URL_PERSONA = "https://back-lab0.onrender.com/persona"; // Ajusta según tu servidor
const API_URL_MUNICIPIO = "https://back-lab0.onrender.com/municipio"; // Ajusta según tu servidor
const API_URL_DIRECCION = "https://back-lab0.onrender.com/direccion"; // Ajusta según tu servidor
const API_URL_VIVIENDA = "https://back-lab0.onrender.com/vivienda"; // Ajusta según tu servidor
const API_URL_PERSONA_HAS_VIVIENDA = "https://back-lab0.onrender.com/relacion"; // Ajusta según tu servidor

function App() {
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    edad: 0,
    sexo: "",
  });
  const [municipio, setMunicipio] = useState({
    nombre: "",
    area: 0,
    presupuesto: 0,
    persona_id: 0,
  });
  const [direccion, setDireccion] = useState({
    calle_principal: "",
    calle_secundaria: "",
    cod_postal: 0,
  });
  const [vivienda, setVivienda] = useState({
    direccion_id: 0,
    capacidad: 0,
    niveles: 0,
    municipio_id_mun: 0,
  });
  const [relacion, setRelacion] = useState({
    persona_id: 0,
    vivienda_id_viv: 0,

  });

  const [personas, setPersonas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [viviendas, setViviendas] = useState([]);
  const [relaciones, setRelaciones] = useState([]);
  const [currentView, setCurrentView] = useState("persona"); // Estado para controlar la vista actual

  useEffect(() => {
    const getPersonas = async () => {
      try {
        const response = await axios.get(API_URL_PERSONA);
        setPersonas(response.data); // Axios devuelve los datos en la propiedad `data`
      } catch (error) {
        console.error("Error al obtener personas:", error.message);
      }
    };
    getPersonas();
  }, []);

  useEffect(() => {
    const getMunicipios = async () => {
      try {
        const response = await axios.get(API_URL_MUNICIPIO);
        setMunicipios(response.data); // Axios devuelve los datos en la propiedad `data`
      } catch (error) {
        console.error("Error al obtener municipios:", error.message);
      }
    };
    getMunicipios();
  }, []);
  useEffect(() => {
    const getDirecciones = async () => {
      try {
        const response = await axios.get(API_URL_DIRECCION);
        setDirecciones(response.data); // Axios devuelve los datos en la propiedad `data`
      } catch (error) {
        console.error("Error al obtener direcciones:", error.message);
      }
    };
    getDirecciones();
  }, []);
  useEffect(() => {
    const getViviendas = async () => {
      try {
        const response = await axios.get(API_URL_VIVIENDA);
        setViviendas(response.data); // Axios devuelve los datos en la propiedad `data`
      } catch (error) {
        console.error("Error al obtener viviendas:", error.message);
      }
    };
    getViviendas();
  }, []);
  useEffect(() => {
    const getRelaciones = async () => {
      try {
        const response = await axios.get(API_URL_PERSONA_HAS_VIVIENDA);
        setRelaciones(response.data); // Axios devuelve los datos en la propiedad `data`
      } catch (error) {
        console.error("Error al obtener relaciones:", error.message);
      }
    };
    getRelaciones();
  }, []);

  const handleUpdatePersona = async (id) => {
    try {
      // Enviar los datos editados al servidor
      const response = await axios.put(`${API_URL_PERSONA}/${id}`, persona);

      console.log("Persona actualizada:", response.data);

      // Actualizar el estado local reemplazando la persona editada
      setPersonas(personas.map((p) => (p.id === id ? response.data : p)));

      // Reiniciar el formulario
      setPersona({
        nombre: "",
        apellido: "",
        telefono: "",
        edad: "",
        sexo: "",
      });
    } catch (error) {
      console.error("Error al actualizar persona:", error.message);
      alert("Hubo un error al actualizar la persona. Inténtalo nuevamente.");
    }
  };

  const handleUpdateMunicipio = async (id_mun) => {
    try {
      const response = await axios.put(
        `${API_URL_MUNICIPIO}/${id_mun}`,
        municipio
      );
      console.log("Municipio actualizado:", response.data);
      setMunicipios(
        municipios.map((municipio) =>
          municipio.id_mun === id_mun ? response.data : municipio
        )
      );
      setMunicipio({
        nombre: "",
        area: 0,
        presupuesto: 0,
        gobernador: 0,
      });
    } catch (error) {
      console.error("Error al actualizar municipio:", error.message);
      alert("Hubo un error al actualizar el municipio. Inténtalo nuevamente.");
    }
  };

  const handleUpdateDireccion = async (id_direccion) => {
    try {
      const response = await axios.put(
        `${API_URL_DIRECCION}/${id_direccion}`,
        direccion
      );
      console.log("Dirección actualizada:", response.data);
      setDirecciones(
        direcciones.map((direccion) =>
          direccion.id_direccion === id_direccion ? response.data : direccion
        )
      );
      setDireccion({
        calle_principal: "",
        calle_secundaria: "",
        cod_postal: 0,
      });
    } catch (error) {
      console.error("Error al actualizar dirección:", error.message);
      alert("Hubo un error al actualizar la dirección. Inténtalo nuevamente.");
    }
  };
  const handleUpdateVivienda = async (id_viv) => {
    try {
      const response = await axios.put(
        `${API_URL_VIVIENDA}/${id_viv}`,
        vivienda
      );
      console.log("Vivienda actualizada:", response.data);
      setViviendas(
        viviendas.map((vivienda) =>
          vivienda.id_viv === id_viv ? response.data : vivienda
        )
      );
      setVivienda({
        direccion_id: 0,
        capacidad: 0,
        niveles: 0,
        municipio_id_mun: 0,
      });
    } catch (error) {
      console.error("Error al actualizar vivienda:", error.message);
      alert("Hubo un error al actualizar la vivienda. Inténtalo nuevamente.");
    }
  };
  const handleUpdateRelacion = async (persona_id, vivienda_id_viv) => {
    try {
      const response = await axios.put(
        `${API_URL_PERSONA_HAS_VIVIENDA}/${persona_id}/${vivienda_id_viv}`,
        relacion
      );
      console.log("Relación actualizada:", response.data);
      setRelaciones(
        relaciones.map((relacion) =>
          relacion.persona_id === persona_id && relacion.vivienda_id_viv === vivienda_id_viv ? response.data : relacion
        )
      );
      setRelacion({
        persona_id:0,
        vivienda_id_viv:0
      });
    } catch (error) {
      console.error("Error al actualizar relación:", error.message);
      alert("Hubo un error al actualizar la relación. Inténtalo nuevamente.");
    }
  };

  return (
    <Fragment>
      <Navbar brand="Laboratorio 0" setCurrentView={setCurrentView} />
      <div className="container">
        <div className="row">
          {currentView === "persona" && (
            <>
              <div className="col-7">
                <h2 style={{ textAlign: "center" }}>Lista de personas</h2>
                <PeopleList
                  personas={personas}
                  setPersonas={setPersonas}
                  persona={persona}
                  setPersona={setPersona}
                  handleUpdatePersona={handleUpdatePersona}
                />
              </div>

              <div className="col-5">
                <h2 style={{ textAlign: "center" }}>Formulario personas</h2>
                <Form
                  persona={persona}
                  setPersona={setPersona}
                  personas={personas}
                  setPersonas={setPersonas}
                  handleUpdatePersona={handleUpdatePersona}
                />
              </div>
            </>
          )}

          {currentView === "municipio" && (
            <>
              <div className="col-7">
                <h2 style={{ textAlign: "center" }}>Lista de municipios</h2>
                <MunicipalityList
                  municipios={municipios}
                  setMunicipios={setMunicipios}
                  municipio={municipio}
                  setMunicipio={setMunicipio}
                  handleUpdateMunicipio={handleUpdateMunicipio}
                />
              </div>
              <div className="col-5">
                <h2 style={{ textAlign: "center" }}>Formulario municipios</h2>
                <MunicipalityForm
                  municipio={municipio}
                  setMunicipio={setMunicipio}
                  municipios={municipios}
                  setMunicipios={setMunicipios}
                  handleUpdateMunicipio={handleUpdateMunicipio}
                />
              </div>
            </>
          )}

          {currentView === "direccion" && (
            <>
              <div className="col-7">
                <h2 style={{ textAlign: "center" }}>Lista de direcciones</h2>
                <DireccionList
                  direccion={direccion}
                  setDireccion={setDireccion}
                  direcciones ={direcciones}
                  setDirecciones ={setDirecciones}
                  handleUpdateDireccion={handleUpdateDireccion}
                />
              </div>
              <div className="col-5">
                <h2 style={{ textAlign: "center" }}>Formulario direcciones</h2>
                <DireccionForm
                  direccion={direccion}
                  setDireccion={setDireccion}
                  direcciones={direcciones}
                  setDirecciones={setDirecciones}
                  handleUpdateDireccion={handleUpdateDireccion}
                />
              </div>
            </>
          )}
          {currentView === "vivienda" && (
            <>
              <div className="col-7">
                <h2 style={{ textAlign: "center" }}>Lista de viviendas</h2>
                <ViviendaList
                  vivienda={vivienda}
                  setVivienda={setVivienda}
                  viviendas ={viviendas}
                  setViviendas ={setViviendas}
                  handleUpdateVivienda={handleUpdateVivienda}
                />
              </div>
              <div className="col-5">
                <h2 style={{ textAlign: "center" }}>Formulario viviendas</h2>
                <ViviendaForm
                  vivienda={vivienda}
                  setVivienda={setVivienda}
                  viviendas ={viviendas}
                  setViviendas ={setViviendas}
                  handleUpdateVivienda={handleUpdateVivienda}
                />
              </div>
            </>
          )}
          {currentView === "relacion" && (
            <>
              <div className="col-7">
                <h2 style={{ textAlign: "center" }}>Lista de relaciones</h2>
                <RelacionList
                  relacion={relacion}
                  setRelacion={setRelacion}
                  relaciones ={relaciones}
                  setRelaciones ={setRelaciones}
                  handleUpdateRelacion={handleUpdateRelacion}
                />
              </div>
              <div className="col-5">
                <h2 style={{ textAlign: "center" }}>Formulario relaciones</h2>
                <RelacionForm
                  relacion={relacion}
                  setRelacion={setRelacion}
                  relaciones ={relaciones}
                  setRelaciones ={setRelaciones}
                  handleUpdateRelacion={handleUpdateRelacion}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default App;
