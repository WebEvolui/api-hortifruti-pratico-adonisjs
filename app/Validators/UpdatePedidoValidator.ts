import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePedidoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    status_id: schema.number([rules.exists({ table: 'statuses', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
