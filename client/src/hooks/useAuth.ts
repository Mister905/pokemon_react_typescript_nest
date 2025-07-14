import { useAppSelector, useAppDispatch } from './index';
import { login as loginAction, logout as logoutAction, initializeAuth } from '../features/auth';
import { useEffect } from 'react';
import type { User } from '../features/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  // Initialize auth on first load
  useEffect(() => {
    if (loading) {
      dispatch(initializeAuth());
    }
  }, [dispatch, loading]);

  const login = (token: string, user: User) => {
    dispatch(loginAction({ token, user }));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    loading,
  };
};
