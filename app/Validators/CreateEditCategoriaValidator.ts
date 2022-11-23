import { rules } from "@ioc:Adonis/Core/Validator";
import { CustomMessages, schema } from "@ioc:Adonis/Core/Validator";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateEditCategoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string({ trim: true }, [rules.maxLength(255)]),
    descricao: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
    posicao: schema.number.optional([rules.unsigned(), rules.range(1, 99999)]),
    ativo: schema.boolean.optional(),
  });

  public messages: CustomMessages = {};
}
