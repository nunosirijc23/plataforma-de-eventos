const joi = require("joi");

function validate(schema, fields) {
    const check = schema.validate(fields);
  
    if (check.error) return check.error.details[0].message;
  
    return false;
}

function validateUserData(name, email, phone, password) {
    const schema = joi.object({
      name: joi.string().required().messages({
        "string.empty": "nome é obrigatório!",
        "string.base": "nome inválido!",
        "any.required": "nome é obrigatório!",
      }),
      email: joi.string().email().required().messages({
        "string.empty": "email é obrigatório!",
        "string.base": "email inválido!",
        "string.email": "email inválido!",
        "any.required": "email é obrigatório!",
      }),
      phone: joi.string().required().pattern(new RegExp('^9[0-9]')).min(9).max(9).messages({
        'string.min': 'número de telefone inválido!',
        'string.max': 'número de telefone inválido!',
        'string.pattern.base': 'número de telefone inválido!',
        'any.required': 'número de telefone é obrigatório!'
      }),
      password: joi.string().required().min(6).messages({
        "string.empty": 'senha é obrigatória!',
        "string.min": "senha deve ter pelo menos 6 caracteres!",
        'any.required': 'senha é obrigatória!'
      }),
    });
  
    const validator = validate(schema, {
      name,
      email,
      phone,
      password,
    });
  
    return validator;
};

function validateLoginData(email, password) {
    const schema = joi.object({
      email: joi.string().required().messages({
        "string.empty": "email é obrigatório!",
        "any.required": "email é obrigatório!",
      }),
      password: joi.string().required().messages({
        "string.empty": "senha é obrigatória!",
        "any.required": "senha é obrigatória!",
      })
    });
  
    const validator = validate(schema, {
      email,
      password,
    });
  
    return validator;
};

module.exports = { validateUserData, validateLoginData };
  