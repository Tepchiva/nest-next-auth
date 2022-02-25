import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '@graphql/user/user.module';
import { JwtLibModule } from '@lib/jwt';
import { HashLibModule } from '@lib/hash';

@Module({
  imports: [UserModule, JwtLibModule, HashLibModule],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}