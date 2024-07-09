import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface Credential {
  id: string;
  loginUrl: string;
  username: string;
  passcode: string;
}

interface CredentialsState {
  credentials: Credential[];
}

const initialState: CredentialsState = {
  credentials: [],
};

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    addCredential: (state, action: PayloadAction<Credential>) => {
      state.credentials.push(action.payload);
    },
    deleteCredential: (state, action: PayloadAction<string>) => {
      state.credentials = state.credentials.filter(
        (credential) => credential.id !== action.payload
      );
    },
    updateCredential: (state, action: PayloadAction<Credential>) => {
      const index = state.credentials.findIndex(
        (credential) => credential.id === action.payload.id
      );
      if (index !== -1) {
        state.credentials[index] = action.payload;
      }
    },
  },
});

export const { addCredential, deleteCredential, updateCredential } = credentialsSlice.actions;

export const selectCredentials = (state: RootState) => state.credentials.credentials;

export default credentialsSlice.reducer;
