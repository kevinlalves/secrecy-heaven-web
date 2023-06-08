import Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': 'O e-mail é obrigatório',
      'string.empty': 'O e-mail é obrigatório',
      'string.email': 'O e-mail está inválido',
    }),
  password: Joi.string().trim().min(6).max(30).required().messages({
    'any.required': 'A senha é obrigatória',
    'string.empty': 'A senha é obrigatória',
    'string.min': 'A senha deve conter no mínimo 6 caractéres',
    'string.max': 'A senha deve conter no máximo 30 caractéres',
  }),
});
