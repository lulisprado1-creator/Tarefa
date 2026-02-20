import logo from './logo.svg';
import './App.css';
import {browserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { Home } from './Paginas/Home/Home.js';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home />} />
    </Routes>
    </BrowserRouter>

  );
}

export default App;
