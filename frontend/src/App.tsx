import UserList from './components/UserList'; // Importa el componente UserList
import './App.css'; // Si tienes estilos globales

function App() {
  return (
    <div className="App">
      <UserList /> {/* Renderiza el componente UserList */}
    </div>
  );
}

export default App;