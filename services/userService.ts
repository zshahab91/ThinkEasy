import { IAddUser, ILogin, IUser, SignupResponse } from '@/interfaces/auth';
import apiService from './apiService';
import { useAppDispatch } from '@/store/store';
import { setUserDataState } from '@/store/authSlice';
export const signup = async (data: IAddUser): Promise<void> => {
  try {
    const response = await apiService.post<SignupResponse>('/auth/signup', data);
    // Save the token to localStorage
    const token = response.data.accessToken;
    localStorage.setItem('token', token);
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};
export const login = async (data: ILogin): Promise<SignupResponse> => {
    try {
      const response = await apiService.post<SignupResponse>('/auth/login', data);
      // Save the token to localStorage
      const token = response.data.accessToken;
      localStorage.setItem('token', token);
      return response.data;

    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };


