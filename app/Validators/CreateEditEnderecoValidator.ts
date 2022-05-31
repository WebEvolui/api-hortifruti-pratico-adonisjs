import { CustomMessages, rules, schema } from "@ioc:Adonis/Core/Validator";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateEditEnderecoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cidade_id: schema.number([
      rules.exists({ table: "cidades", column: "id" }),
    ]),
    rua: schema.string({ trim: true }, [rules.maxLength(255)]),
    numero: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(20),
    ]),
    bairro: schema.string({ trim: true }, [rules.maxLength(255)]),
    ponto_referencia: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
    complemento: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {};
}
