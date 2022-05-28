import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class CidadesEstabelecimento extends BaseModel {
  @column({ isPrimary: true })
  public cidade_id: number;

  @column({ isPrimary: true })
  public estabelecimento_id: number;

  @column()
  public custo_entrega: number;
}
