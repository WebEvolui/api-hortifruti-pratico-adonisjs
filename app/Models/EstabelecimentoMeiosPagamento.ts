import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class EstabelecimentosMeiosPagamento extends BaseModel {
  @column({ isPrimary: true })
  public estabelecimento_id: number;

  @column({ isPrimary: true })
  public meio_pagamento_id: number;
}
