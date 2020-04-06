import { User } from '../models';

export const getUsers = async () => {
  return await User.findAll();
};

export const addUser = async (user) => {
  const { userName, email, firstName, lastName, password } = user;

  return await User.create({
    firstName,
    lastName,
    email,
    password,
    userName,
  });
};

export const deleteUser = async (userName) => {
  return await User.destroy({
    where: {
      userName,
    },
  });
};

export const updateUser = async (user) => {
  const { userName, email, firstName, lastName } = user;

  return await User.update(
    { email, firstName, lastName },
    {
      where: {
        userName,
      },
    },
  );
};
