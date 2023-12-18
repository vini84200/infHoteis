import api from "@/apiOperations/api";

export function register(username: string, password: string, email: string): Promise<void> {
  return api.post('/auth/users/', {username, password, email})
}
