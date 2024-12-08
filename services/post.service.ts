import { IAddPost, IPost } from '@/interfaces/post';
import apiService from './apiService';

export const getPostList = async (): Promise<IPost[]> => {
  try {
    const response = await apiService.get<IPost[]>('/posts');
    return response.data; // Add this line to return the data
  } catch (error: any) {
    console.error('Get list error:', error.response?.data || error.message);
    throw error;
  }
};
export const addPost = async (data: IAddPost): Promise<IPost> => {
  try {
    const response = await apiService.post<IPost>('/posts', data);
    return response.data;

  } catch (error: any) {
    console.error('Add post error:', error.response?.data || error.message);
    throw error;
  }
};
export const getPost = async (id: string | number): Promise<IPost> => {
  try {
    const response = await apiService.get<IPost>(`/posts/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Get post error:', error.response?.data || error.message);
    throw error;
  }
};


