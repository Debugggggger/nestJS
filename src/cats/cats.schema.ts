import { EntitySchema } from 'typeorm';
import { Cat } from './cats.entity';

export const UserSchema = new EntitySchema<Cat>({
  name: 'Cat',
  target: Cat,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      generated: true,
    },
    age: {
      type: Number,
      generated: true,
    },
    breed: {
      type: String,
      generated: true,
    },
    isActive: {
      type: Boolean,
      generated: true,
    },
  },
});
