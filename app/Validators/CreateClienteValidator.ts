import { CustomMessages, rules, schema } from "@ioc:Adonis/Core/Validator";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateClienteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(180)]),
    telefone: schema.string({ trim: true }, [
      rules.mobile({ locale: ["pt-BR"] }),
      rules.maxLength(15),
    ]),
  });

  public messages: CustomMessages = {
    required: "{{ field }} é obrigatório para o cadastro",
    "email.email": "{{ field }} deve ser um email válido",
    "email.unique": "{{ field }} já está em uso",
    "password.minLength": "{{ field }} deve ter no mínimo 8 caracteres",
    "password.maxLength": "{{ field }} deve ter no máximo 180 caracteres",
    "telefone.mobile": "{{ field }} deve ser um telefone válido",
  };
}
