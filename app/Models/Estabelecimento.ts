import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Categoria from "./Categoria";
import MeiosPagamento from "./MeiosPagamento";

export default class Estabelecimento extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public nome: string;

  @column()
  public logo: string | null;

  @column()
  public bloqueado: boolean;

  @column()
  public online: boolean;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Categoria, {
    foreignKey: "estabelecimento_id",
    localKey: "id",
  })
  public categorias: HasMany<typeof Categoria>;

  @manyToMany(() => MeiosPagamento, {
    pivotTable: "estabelecimento_meios_pagamento",
    localKey: "id",
    pivotForeignKey: "estabelecimento_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "meio_pagamento_id",
  })
  public meiospagamentos: ManyToMany<typeof MeiosPagamento>;
}
