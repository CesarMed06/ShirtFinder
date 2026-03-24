import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) { setLoading(false); return; }

    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${savedToken}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(savedToken);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch {
      localStorage.removeItem('token');
      setToken(null);
    }
    setLoading(false);
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Tu cuenta ha sido creada correctamente.',
          confirmButtonColor: '#E67E22',
          timer: 2000,
          showConfirmButton: false
        }).then(() => navigate('/login'));
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch {
      return { success: false, error: 'Error al conectar con el servidor' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        navigate('/');
        return { success: true };
      } else {
        return { success: false, error: data.message || data.error || 'Credenciales inválidas' };
      }
    } catch {
      return { success: false, error: 'Error al conectar con el servidor' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => { checkAuth(); }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
