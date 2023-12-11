import api from "@/apiOperations/api";

interface LoginResponse {
  access: string;
  refresh: string;
}

function login(username: string, password: string): Promise<LoginResponse> {
  return api.post('/auth/jwt/create/', {username, password})
    .then((response) => {
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      return response.data;
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('O nome de usuário ou a senha estão incorretos');
        }
        throw new Error('Something went wrong');
      }
      throw error;
    });
}

export default login;
