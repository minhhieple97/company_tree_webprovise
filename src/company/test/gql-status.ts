import request from 'supertest';
export const getGqlErrorStatus = (response: request.Response): number => {
  return response.body.errors[0].extensions.status;
};

export const getGqlErrorMessage = (response: request.Response): string => {
  return response.body.errors[0].extensions.originalError.message;
};
