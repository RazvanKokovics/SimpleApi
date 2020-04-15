const extractErrors = (error) => {
  const { errors } = error;
  const extractedMessages = [];

  errors.map((error) => extractedMessages.push(error.message));

  return extractedMessages.join(' ');
};

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

export class CustomValidationError extends Error {
  constructor(message = '', ...args) {
    super(message, ...args);
    this.message = extractErrors(message);
    this.code = 422;
  }
}

export class CustomUniqueConstraintError extends Error {
  constructor(message = '', ...args) {
    super(message, ...args);
    this.message = message;
    this.code = 403;
  }
}

export class UnexpectedError extends Error {
  constructor(message = 'An error occured.', ...args) {
    super(message, ...args);
    this.message = message;
    this.code = 400;
  }
}
