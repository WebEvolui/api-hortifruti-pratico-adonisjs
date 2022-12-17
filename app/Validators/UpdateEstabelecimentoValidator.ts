import { CustomMessages, rules, schema } from "@ioc:Adonis/Core/Validator";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateEstabelecimentoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    user_id: this.ctx.auth.user!.id,
  });

  public schema = schema.create({
    nome: schema.string.optional({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    logo: schema.file.nullableAndOptional({
      size: "5mb",
      extnames: ["jpg", "png", "jpeg"],
    }),
    online: schema.boolean.optional(),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({
        table: "users",
        column: "email",
        whereNot: { id: this.refs.user_id },
      }),
    ]),
    password: schema.string.optional({}, [
      rules.minLength(8),
      rules.maxLength(255),
    ]),
  });

  public messages: CustomMessages = {};
}
