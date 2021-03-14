const Joi =require('joi');

const RegisterSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
})

const LoginSchema = Joi.object({
  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','vn'] } }),
  pushTokens:Joi.array()
})
    
const registerValidation = (data) => {
  const {name,email,password} = data;
  return RegisterSchema.validate({email,name,password});
}

const loginValidation = (data) => {
  const {email,password,pushTokens} = data;
  return LoginSchema.validate({email,password,pushTokens})
};



const _registerValidation = registerValidation;
export { _registerValidation as registerValidation };


const _loginValidation = loginValidation;
export { _loginValidation as loginValidation };