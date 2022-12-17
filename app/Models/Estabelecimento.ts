import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Env from "@ioc:Adonis/Core/Env";

import Categoria from "./Categoria";
import MeiosPagamento from "./MeiosPagamento";

export default class Estabelecimento extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public nome: string;

  @column({
    consume: (value) => (value == null ? value : Env.get("API_URL") + value),
  })
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
    pivotTable: "estabelecimentos_meios_pagamentos",
    localKey: "id",
    pivotForeignKey: "estabelecimento_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "meio_pagamento_id",
  })
  public meiospagamentos: ManyToMany<typeof MeiosPagamento>;
}
