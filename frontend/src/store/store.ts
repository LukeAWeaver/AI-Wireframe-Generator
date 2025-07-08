import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers here as we create them
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
// import authReducer from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only user will be persisted
};

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  // Add more reducers here as we create them
  // auth: authReducer,
});

// Create a wrapper reducer that handles RESET_APP_STATE
const appReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP_STATE') {
    // Reset to initial state by returning undefined, which will be replaced with initial state
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Action creator for resetting app state
export const resetAppState = () => ({
  type: 'RESET_APP_STATE' as const,
}); 