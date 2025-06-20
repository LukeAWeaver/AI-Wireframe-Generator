import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setUser, updateUsername, clearUser } from '../store/slices/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const setUserData = useCallback((username: string, uuid: string) => {
    dispatch(setUser({ username, uuid }));
  }, [dispatch]);

  const updateUserUsername = useCallback((username: string) => {
    dispatch(updateUsername(username));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return {
    username: user.username,
    uuid: user.uuid,
    isAuthenticated: user.isAuthenticated,
    setUserData,
    updateUserUsername,
    logout,
  };
}; 