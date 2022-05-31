import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Cidade from "App/Models/Cidade";

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public clienteId: number;

  @column()
  public cidadeId: number;

  @column()
  public rua: string;

  @column()
  public numero: string | null;

  @column()
  public bairro: string;

  @column()
  public pontoReferencia: string | null;

  @column()
  public complemento: string | null;

  @hasOne(() => Cidade, {
    localKey: "cidadeId",
    foreignKey: "id",
  })
  public cidade: HasOne<typeof Cidade>;
}
