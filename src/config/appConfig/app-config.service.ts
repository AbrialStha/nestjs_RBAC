import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get name(): string {
    return this.config.get<string>('app.name');
  }

  get port(): number {
    return this.config.get<number>('app.port');
  }

  get env(): string {
    return this.config.get<string>('app.env');
  }

  get jwt() {
    return {
      secret: this.config.get<string>('jwt.secret'),
      expiresIn: this.config.get<string>('jwt.expiresIn'),
    };
  }
}
