export interface ErrorBody extends Error {
  code: string;
  statusCode: number;
}

export const errorMessages = {
  auth: {
    wrongCredentials: {
      message: 'Wrong credentials provided',
      code: '60001',
      statusCode: 401, // Unauthorized
    },
    userAlreadyExist: {
      message: 'User already exists',
      code: '60002',
      statusCode: 409, // Conflict
    },
    expiredToken: {
      message: 'Token expired',
      code: '60003',
      statusCode: 401, // Unauthorized
    },
    invalidToken: {
      message: 'Invalid token',
      code: '60004',
      statusCode: 401, // Unauthorized
    },
    notAllowed: {
      message: 'Not allowed',
      code: '60005',
      statusCode: 403, // Forbidden
    },
  },
  user: {
    notFound: {
      message: 'User not found',
      code: '60101',
      statusCode: 404, // Not Found
    },
  },
  role: {
    notFound: {
      message: 'Role not found',
      code: '60201',
      statusCode: 404, // Not Found
    },
  },
  category: {
    notFound: {
      message: 'Category not found',
      code: '60301',
      statusCode: 404, // Not Found
    },
  },
  product: {
    notFound: {
      message: 'Product not found',
      code: '60401',
      statusCode: 404, // Not Found
    },
    notFulfilled: {
      message: 'Not all product info is fulfilled',
      code: '60402',
      statusCode: 400, // Bad Request
    },
  },
  global: {
    internalError: {
      message: 'Something went wrong',
      code: '70000',
      statusCode: 500, // Internal Server Error
    },
  },
};
