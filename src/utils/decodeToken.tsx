import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    role?: string; 
  }
  

export const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const decodedToken: DecodedToken = jwtDecode(token);
    return {
        ...decodedToken,
    };
};
