import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { User } from './schemas/user.schema';
import { Like } from './schemas/like.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Like.name) private likeModel: Model<Like>,
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

    const { password: _, ...userWithoutPassword } = user.toObject();

    // Generar el token JWT
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword
    };
  }

  async getProducts(userId: string): Promise<any> {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data;

      // Agregar el estado de "me gusta" para cada producto
      for (const product of products) {
        const like = await this.likeModel.findOne({ userId, productId: product.id });
        product.isLiked = !!like;
      }

      return products;
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  async getProductById(id: string, userId: string): Promise<any> {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      const product = response.data;

      // Verificar si el producto tiene "me gusta" por el usuario
      const like = await this.likeModel.findOne({ userId, productId: id });
      product.isLiked = !!like;

      return product;
    } catch (error) {
      throw new NotFoundException('Producto no encontrado');
    }
  }

  // Método para dar "me gusta" a un producto
  async likeProduct(userId: string, productId: string): Promise<any> {
    const like = await this.likeModel.findOne({ userId, productId });
    if (!like) {
      const newLike = new this.likeModel({ userId, productId });
      await newLike.save();
    }
    return { message: 'Producto marcado como me gusta' };
  }

  // Método para quitar "me gusta" de un producto
  async unlikeProduct(userId: string, productId: string): Promise<any> {
    await this.likeModel.deleteOne({ userId, productId });
    return { message: 'Me gusta eliminado' };
  }

}
