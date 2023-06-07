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
    // firstName: {
    //   type: String,
    // },
    // lastName: {
    //   type: String,
    // },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
  },
});
