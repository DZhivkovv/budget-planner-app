import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

// Import the configuration settings for the axios library.
import './config/axios'

import './App.css';


function App() {
  return (
    // Wrapping the application with BrowserRouter enables routing
    <BrowserRouter>
      
      {/* All routes in the application */}
      <Routes>
        {/* Route for the Registration page, accessible at '/register' */}
        <Route element={<Register />} path='/register'></Route>
        {/* Route for the Login page, accessible at '/login' */}
        <Route element={<Login />} path='/login'></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
