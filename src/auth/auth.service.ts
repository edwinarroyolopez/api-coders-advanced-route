import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(userDto: any): Promise<any> {
    try {
      const response = await axios.post('https://fakestoreapi.com/users', userDto);
      console.log(response)
      return response.data;
    } catch (error) {
      throw new Error('Error signing up the user');
    }
  }

  async login(credentials: any): Promise<any> {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', credentials);
      const { token } = response.data;
      if (token) {
        // Aquí se genera un JWT propio para manejar autenticación en la API local.
        const jwtPayload = { username: credentials.username };
        return {
          access_token: this.jwtService.sign(jwtPayload),
        };
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw new Error('Error logging in');
    }
  }
}
