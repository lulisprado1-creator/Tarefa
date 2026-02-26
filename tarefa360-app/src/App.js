import logo from './logo.svg';
import './App.css';
import { browserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './Paginas/Home/Home.js';
import { Usuarios } from './Paginas/Usuarios/Usuarios.js';
import { NovoUsuario } from './Paginas/NovoUsuario/NovoUsuario';
import { EditarUsuario } from './Paginas/Edicao/EditarUsuario.js';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/usuario/novo' element={<NovoUsuario />} />
        <Route path='/usuario/editar' element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
