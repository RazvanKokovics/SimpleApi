import { User } from '../models';

export const getUsers = () => {
  return User.findAll();
};

export const addUser = async (user) => {
  const { userName, email, firstName, lastName, password, role } = user;

  return await User.create({
    firstName,
    lastName,
    email,
    password,
    userName,
    role,
  });
};

export const deleteUser = async (userName) => {
  await User.destroy({
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
