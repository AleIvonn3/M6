import { useParams } from 'react';
import Citas from './Citas'


const citas = [
  { id: 1, paciente: 'Juan Pérez', fecha: '2025-08-12', motivo: 'Consulta general' },
  { id: 2, paciente: 'Ana López', fecha: '2025-08-13', motivo: 'Revisión anual' },
];

function CitaDetalle() {
  const { id } = useParams();
  const cita = citas.find(c => c.id === Number(id));

  if (!cita) {
    return <h2>Cita no encontrada</h2>;
  }

  return (
    <div>
      <h1>Detalle de la cita</h1>
      <p><strong>ID:</strong> {cita.id}</p>
      <p><strong>Paciente:</strong> {cita.paciente}</p>
      <p><strong>Fecha:</strong> {cita.fecha}</p>
      <p><strong>Motivo:</strong> {cita.motivo}</p>
    </div>
  );
}

export default CitaDetalle;