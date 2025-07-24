import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setUser, updateUsername, updateBuildCount, clearUser } from '../store/slices/userSlice';
import { generateWireframe, incrementBuildCount } from '../services/api';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const setUserData = useCallback((username: string, uuid: string, build_count?: number) => {
    dispatch(setUser({ username, uuid, build_count }));
  }, [dispatch]);

  const updateUserUsername = useCallback((username: string) => {
    dispatch(updateUsername(username));
  }, [dispatch]);

  const generateUserWireframe = useCallback(async (prompt: string) => {
    try {
      const wireframe = await generateWireframe(prompt);
      return wireframe;
    } catch (error) {
      console.error('Failed to generate wireframe:', error);
      throw error;
    }
  }, []);

  const incrementUserBuildCount = useCallback(async (username: string) => {
    try {
      const response = await incrementBuildCount(username);
      dispatch(updateBuildCount(response.build_count || 0));
      return response.build_count;
    } catch (error) {
      console.error('Failed to increment build count:', error);
      throw error;
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return {
    username: user.username,
    uuid: user.uuid,
    build_count: user.build_count,
    isAuthenticated: user.isAuthenticated,
    setUserData,
    updateUserUsername,
    incrementUserBuildCount,
    generateUserWireframe,
    logout,
  };
}; 