import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

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
}
