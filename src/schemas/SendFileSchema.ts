import Joi from 'joi';

export const SendFileSchema = Joi.object({
  file: Joi.required(),
});
