import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  readAllCat(): string {
    return 'get all cat api';
  }
  readCat() {
    return 'one cat';
  }
  updateCat() {
    return 'update cat';
  }
  deleteCat() {
    return 'delete cat';
  }
}
