import { createContext, useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

const initialState = {
  user:      null,
  token:     null,
  tenant:    null,
  loading:   true,
  error:     null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, ...action.payload, loading: false, error: null };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const token  = await AsyncStorage.getItem('c365_token');
      const user   = await AsyncStorage.getItem('c365_user');
      const tenant = await AsyncStorage.getItem('c365_tenant');
      if (token && user) {
        dispatch({
          type: 'SET_SESSION',
          payload: {
            token,
            user:   JSON.parse(user),
            tenant: tenant ? JSON.parse(tenant) : null,
          },
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email, password, subdomain = 'sknlp') => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await AsyncStorage.setItem('c365_subdomain', subdomain);
      const res = await authAPI.login(email, password);
      const { user, token } = res.data;

      await AsyncStorage.setItem('c365_token',  token);
      await AsyncStorage.setItem('c365_user',   JSON.stringify(user));
      await AsyncStorage.setItem('c365_tenant', JSON.stringify(user.tenant));

      dispatch({
        type: 'SET_SESSION',
        payload: { user, token, tenant: user.tenant },
      });
      return { success: true };
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try { await authAPI.logout(); } catch {}
    await AsyncStorage.multiRemove(['c365_token', 'c365_user', 'c365_tenant', 'c365_subdomain']);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
