import api from "@/apiOperations/api";
import {AxiosError} from "axios";

type MeResponse = {
  id: number;
  username: string;
  email: string;
  status: 'logged_in';
  logged_in: true;
} | {
  status: 'logged_out';
  logged_in: false;
}

async function getMe(): Promise<MeResponse> {
  if (!localStorage.getItem('token')) {
    return {status: 'logged_out', logged_in: false};
  }
  try {
    const response = await api.get('/auth/users/me');
    return {...response.data, status: 'logged_in', logged_in: true} as MeResponse;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      if (axiosError.response.status === 403) {
        localStorage.removeItem('token');
        return {status: 'logged_out', logged_in: false};
      }
      throw new Error('Something went wrong');
    }
    throw error;
  }
}

export default getMe;
