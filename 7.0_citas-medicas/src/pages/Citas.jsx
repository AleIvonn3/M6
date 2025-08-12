import { Link } from 'react-router-dom';


const citas = [
  { id: 1, paciente: 'Juan Pérez', fecha: '2025-08-12', motivo: 'Consulta general' },
  { id: 2, paciente: 'Ana López', fecha: '2025-08-13', motivo: 'Revisión anual' },
];

function Citas() {
  return (
    <div>
      <h1>Lista de citas médicas</h1>
      <ul>
        {citas.map(cita => (
          <li key={cita.id}>
            <Link to={`/cita/${cita.id}`}>
              {cita.paciente} - {cita.fecha}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Citas;