import { User } from '../models';

export const getUserByUserName = async (userName) => {
  return await User.findOne({
    where: {
      userName,
    },
  });
};
