import { Controller, Post, Get, UseGuards, Body, Param, Delete, Req, BadRequestException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CartDto } from './dtos/cart.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() userDto: any) {
    return this.authService.signup(userDto);
  }

  @Post('login')
  async login(@Body() credentials: any) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('products')
  async getProducts(@Req() req) {
    console.log({ path: 'getProducts - controller', user: req.user})
    return this.authService.getProducts(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('products/:id')
  async getProductById(@Param('id') id: string, @Req() req) {
    console.log({ path: 'getProductById - controller', user: req.user})
    return this.authService.getProductById(id, req.user.userId);
  }

  // Endpoint para dar "me gusta" a un producto
  @UseGuards(JwtAuthGuard)
  @Post('products/:id/like')
  async likeProduct(@Param('id') id: string, @Req() req) {
    console.log({ path: 'likeProduct - controller', user: req.user})
    return this.authService.likeProduct(req.user.userId, id);
  }

  // Endpoint para quitar "me gusta" de un producto
  @UseGuards(JwtAuthGuard)
  @Delete('products/:id/like')
  async unlikeProduct(@Param('id') id: string, @Req() req) {
    console.log({ path: 'unlikeProduct - controller', user: req.user})
    return this.authService.unlikeProduct(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(@Body() cartDto: CartDto, @Req() req) {
    console.log({ path: 'checkout - controller', user: req.user})
    // Verificar que totalItems y priceTotal coincidan con los productos del carrito
    const calculatedTotalItems = cartDto.products.reduce((sum, product) => sum + product.quantity, 0);
    const calculatedPriceTotal = cartDto.products.reduce((sum, product) => sum + product.quantity * product.price, 0);

    if (calculatedTotalItems !== cartDto.totalItems) {
      throw new BadRequestException('El número total de artículos no coincide con los productos.');
    }

    if (calculatedPriceTotal !== cartDto.priceTotal) {
      throw new BadRequestException('El precio total no coincide con el cálculo de los productos.');
    }

    // Si todo es correcto, retornar el mensaje de éxito
    return { message: 'Venta realizada correctamente' };
  }
}
