import React, { useState, useEffect, useMemo, useRef } from 'react';
import Planeta from './Planeta';

function App() {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);

  // Estados requeridos
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(1000);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null);
  const vueloRef = useRef(null);

  // Función para iniciar el intervalo
  const iniciarVuelo = () => {
    if (!vueloRef.current) {
      vueloRef.current = setInterval(() => {
        setCombustible(prev => (prev > 0 ? prev - 1 : 0));
        setDistancia(prev => (combustible > 0 ? prev + 1 : prev));
      }, 1000);
    }
  };

  // Función para detener el intervalo
  const detenerVuelo = () => {
    if (vueloRef.current) {
      clearInterval(vueloRef.current);
      vueloRef.current = null;
    }
  };

  // Efecto de montaje
  useEffect(() => {
    console.log('¡El panel de control está listo!');
    iniciarVuelo();

    return () => {
      detenerVuelo();
      console.log('El panel de control se ha apagado.');
    };
    // eslint-disable-next-line
  }, []);

  // Efecto cuando cambia el combustible
  useEffect(() => {
    if (combustible !== 1000) {
      console.log('¡Combustible actualizado!');
    }
  }, [combustible]);

  // Guardar planetas en localStorage
  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  // Memo para mensaje de estado
  const mensajeEstado = useMemo(() => {
    if (estadoNave === 'En órbita') return 'La nave está en órbita.';
    if (estadoNave === 'Aterrizando') return '¡Aterrizando en el planeta!';
    return 'Estado desconocido.';
  }, [estadoNave]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
      distancia // Guarda la distancia actual al registrar el planeta
    };

    setPlanetas([...planetas, nuevoPlaneta]);
    setNombre('');
    setDescripcion('');
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  const handleDelete = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
    // Si el planeta eliminado era el seleccionado, limpiar selección
    if (planetaSeleccionado === index) setPlanetaSeleccionado(null);
  };

  const handleAterrizar = () => {
    setEstadoNave('Aterrizando');
    detenerVuelo();
    if (planetas.length > 0) {
      const ultimo = planetas[planetas.length - 1];
      setPlanetasVisitados([...planetasVisitados, ultimo.nombre]);
    }
  };

  const handleSeguirExpedicion = () => {
    setEstadoNave('En órbita');
    iniciarVuelo();
  };

  // Mostrar detalles del planeta seleccionado
  const mostrarDetalles = (index) => {
    setPlanetaSeleccionado(index === planetaSeleccionado ? null : index);
  };

  return (
  <div className="app-layout">
    {
    /* Columna 1: Título y estado */}
    <div className="col-uno">
      <h1>Bitácora de Exploración</h1>
      <div>
        <p>Distancia: {distancia} km</p>
        <p>Combustible: {combustible}</p>
        <p>Estado: {mensajeEstado}</p>
      </div>
    </div>
    {
    /* Columna 2: Formulario */}
    <div className="col-dos">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          ref={inputImagenRef}
          onChange={e => setImagen(e.target.files[0])}
        />
        <button type="submit">Registrar planeta</button>
      </form>
      <button
  className="aterrizar"
  onClick={handleAterrizar}
  disabled={estadoNave === 'Aterrizando'}
>
  Aterrizar
</button>
<button
  className="seguir-expedicion"
  onClick={handleSeguirExpedicion}
  disabled={estadoNave === 'En órbita'}
>
  Seguir expedición
</button>
    </div>
    {
    /* Columna 3: Planetas Registrados */}
    <div className="col-tres">
      <h2>Planetas Registrados</h2>
      <ul>
        {planetas.map((planeta, index) => (
          <li key={index} style={{marginBottom: '10px'}}>
            <button
              style={{fontWeight: 'bold', cursor: 'pointer', background: 'none', border: 'none', color: 'yellow'}}
              onClick={() => mostrarDetalles(index)}
            >
              {planeta.nombre}
            </button>
            {planetaSeleccionado === index && (
              <div style={{marginLeft: '20px'}}>
                <p>{planeta.descripcion}</p>
                <p>Distancia recorrida: {planeta.distancia ?? 0} km</p>
                {planeta.imagen && (
                  <img src={planeta.imagen} alt={planeta.nombre} style={{maxWidth: '100px'}} />
                )}
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    {
    /* Columna 4: Planetas Visitados */}
    <div className="col-cuatro">
      <h2>Planetas Visitados</h2>
      <div>
        {planetasVisitados.map((nombre, idx) => (
          <Planeta key={idx} nombre={nombre} />
        ))}
      </div>
    </div>
  </div>
);
}

export default App;