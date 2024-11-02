import React from 'react'; // Importa la biblioteca React para usar JSX y componentes.
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderizar la aplicación en el DOM.
import App from './App'; // Importa el componente principal de la aplicación.
import './index.css'; // Importa los estilos globales.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
