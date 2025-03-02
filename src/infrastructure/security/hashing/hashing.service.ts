import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private async salt() {
    return await bcrypt.genSalt();
  }
  async encrypt(string: string): Promise<string> {
    const salt = await this.salt();
    return await bcrypt.hash(string, salt);
  }
  async decrypt(string: string, encryptedString: string): Promise<boolean> {
    return await bcrypt.compare(string, encryptedString);
  }
}
