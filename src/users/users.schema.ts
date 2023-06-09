import { EntitySchema } from 'typeorm';
import { User } from './users.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    userID: {
      type: String,
      primary: true,
      generated: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    nickname: {
      type: Boolean,
    },
  },
});
