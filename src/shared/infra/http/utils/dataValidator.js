const joi = require("joi");

function validate(schema, fields) {
    const check = schema.validate(fields);
  
    if (check.error) return check.error.details[0].message;
  
    return false;
}

function validateUserData(name, email, phone, password) {
    const schema = joi.object({
      name: joi.string().trim().required().messages({
        "string.empty": "Preencha os campos vazios!",
        "string.base": "Nome inválido!",
        "any.required": "Nome é obrigatório!",
      }),
      email: joi.string().email().required().messages({
        "string.empty": "Preencha os campos vazios!",
        "string.base": "E-mail inválido!",
        "string.email": "E-mail inválido!",
        "any.required": "E-mail é obrigatório!",
      }),
      phone: joi.string().required().pattern(new RegExp('^9[0-9]')).min(9).max(9).messages({
        "string.empty": "Preencha os campos vazios!",
        'string.min': 'Número de telefone inválido!',
        'string.max': 'Número de telefone inválido!',
        'string.pattern.base': 'Número de telefone inválido!',
        'any.required': 'Número de telefone é obrigatório!'
      }),
      password: joi.string().trim().required().min(6).messages({
        "string.empty": "Preencha os campos vazios!",
        "string.min": "Senha deve ter pelo menos 6 caracteres!",
        'any.required': 'Senha é obrigatória!'
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

function validateProducerData(name, email, password) {
  const schema = joi.object({
    name: joi.string().trim().required().messages({
      "string.empty": "Preencha os campos vazios!",
      "string.base": "Nome inválido!",
      "any.required": "Nome é obrigatório!",
    }),
    email: joi.string().email().required().messages({
      "string.empty": "Preencha os campos vazios!",
      "string.base": "E-mail inválido!",
      "string.email": "E-mail inválido!",
      "any.required": "E-mail é obrigatório!",
    }),
    password: joi.string().trim().required().min(6).messages({
      "string.empty": 'Preencha os campos vazios!',
      "string.min": "Senha deve ter pelo menos 6 caracteres!",
      'any.required': 'Senha é obrigatória!'
    }),
  });

  const validator = validate(schema, {
    name,
    email,
    password,
  });

  return validator;
};

function validateLoginData(email, password) {
    const schema = joi.object({
      email: joi.string().required().messages({
        "string.empty": "Preencha os campos vazios!",
        "any.required": "Preencha os campos vazios!",
      }),
      password: joi.string().required().messages({
        "string.empty": "Preencha os campos vazios!",
        "any.required": "Preencha os campos vazios!",
      })
    });
  
    const validator = validate(schema, {
      email,
      password,
    });
  
    return validator;
};

module.exports = { validateUserData, validateProducerData, validateLoginData };
  