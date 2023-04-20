import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Play } from './pages/Play';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Play />} path="/play" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
