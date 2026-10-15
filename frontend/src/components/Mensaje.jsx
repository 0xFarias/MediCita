// tipo: 'exito' | 'error' | 'info'
export default function Mensaje({ tipo = 'info', children }) {
  return (
    <div className={`mensaje mensaje-${tipo}`} role="status">
      {children}
    </div>
  );
}
