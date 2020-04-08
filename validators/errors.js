export class InexistentItem extends Error {
  constructor(message = '', ...args) {
    super(message, ...args);
    this.message = message;
    this.code = 404;
  }
}

export class WrongCredential extends Error {
  constructor(message = '', ...args) {
    super(message, ...args);
    this.message = message;
    this.code = 401;
  }
}

export const extractErrors = (error) => {
  const { errors } = error;
  const extractedMessages = [];

  errors.map((error) => extractedMessages.push(error.message));

  return extractedMessages.join(' ');
};
