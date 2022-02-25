import { ConfigLibService } from '@lib/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class JwtLibService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigLibService
  ) {}

  async getTokens(userId: string | number): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId },
        {
          secret: this.configService.env.JWT_AT_SECRET,
          expiresIn: this.configService.env.JWT_AT_EXPIRE
        }
      ),
      this.jwtService.signAsync(
        { sub: userId },
        {
          secret: this.configService.env.JWT_RT_SECRET,
          expiresIn: this.configService.env.JWT_RT_EXPIRE
        }
      )
    ]);
    return { accessToken, refreshToken };
  }
}
