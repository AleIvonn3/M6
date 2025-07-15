function Tarjeta() {
  // Definimos la información estática de la tarjeta
  const nombre = "Alejandra Mendoza";
  const profesion = "Desarrolladora Web";
  const mensaje = "¡Bienvenido a mi tarjeta de presentación!";

  // Retornamos el JSX que representa la tarjeta
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh'
    }}>
      <div style={{ border: '5px solid #ccc', padding: '20px', width: '500px', textAlign: 'center' }}>
        <h2>{nombre}</h2>
        <h4>{profesion}</h4>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}

export default Tarjeta;