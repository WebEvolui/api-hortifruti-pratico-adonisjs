import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import Env from "@ioc:Adonis/Core/Env";

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public descricao: string | null;

  @column()
  public posicao: number;

  @column()
  public ativo: boolean;

  @column({
    consume: (value) => (value == null ? value : Env.get("API_URL") + value),
  })
  public imagem: string | null;

  @column()
  public preco: number;

  @column()
  public unidade: string;

  @column()
  public categoria_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column.dateTime()
  public deletedAt: DateTime | null;
}
