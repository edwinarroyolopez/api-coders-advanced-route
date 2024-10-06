import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import axios from 'axios'; 
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signup(userDto: any): Promise<any> {
    try {
      console.log({ userDto })
      // Cifrar la contraseña antes de guardarla
      const salt = await bcrypt.genSalt(10);
      userDto.password = await bcrypt.hash(userDto.password, salt);

      const newUser = new this.userModel(userDto);
      const userSaved = await newUser.save();
      console.log({ userSaved })
      // Retornar la información del usuario creado
      return {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        name: newUser.name,
        phone: newUser.phone,
      };
    } catch (error) {
      throw new Error('Error signing up the user');
    }
  }

  async login(credentials: any): Promise<any> {
    const { username, password } = credentials;

    // Buscar al usuario por nombre de usuario
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar la contraseña cifrada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    // Generar el token JWT
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProducts(): Promise<any> {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }
}
