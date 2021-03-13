import { object, string, array } from '@hapi/joi';

const registerValidation = (data) => {
  const schema = object({
    name: string().min(6).required(),
    email: string().min(6).required().email(),
    password: string().min(6).required(),
  });
  return schema.validate(data);
};
const loginValidation = (data) => {
  const schema = object({
    email: string().min(6).required().email(),
    password: string().min(6).required(),
    pushTokens: array(),
  });
  return schema.validate(data);
};

const _registerValidation = registerValidation;
export { _registerValidation as registerValidation };
const _loginValidation = loginValidation;
export { _loginValidation as loginValidation };
