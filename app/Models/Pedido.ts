import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Cliente from "App/Models/Cliente";
import PedidoStatus from "App/Models/PedidoStatus";
import Estabelecimento from "./Estabelecimento";
import PedidoProduto from "./PedidoProduto";
import PedidoEndereco from "./PedidoEndereco";
import MeiosPagamento from "./MeiosPagamento";

export default class Pedido extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public hash_id: string;

  @column()
  public cliente_id: number;

  @column()
  public estabelecimento_id: number;

  @column()
  public meio_pagamento_id: number;

  @column()
  public pedido_endereco_id: number;

  @column()
  public valor: number;

  @column()
  public troco_para: number | null;

  @column()
  public custo_entrega: number;

  @column()
  public observacao: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @hasOne(() => Cliente, {
    foreignKey: "id",
    localKey: "cliente_id",
  })
  public cliente: HasOne<typeof Cliente>;

  @hasMany(() => PedidoStatus, {
    foreignKey: "pedido_id",
    localKey: "id",
  })
  public pedido_status: HasMany<typeof PedidoStatus>;

  @hasOne(() => Estabelecimento, {
    foreignKey: "id",
    localKey: "estabelecimento_id",
  })
  public estabelecimento: HasOne<typeof Estabelecimento>;

  @hasMany(() => PedidoProduto, {
    foreignKey: "pedido_id",
    localKey: "id",
  })
  public produtos: HasMany<typeof PedidoProduto>;

  @hasOne(() => PedidoEndereco, {
    foreignKey: "id",
    localKey: "pedido_endereco_id",
  })
  public endereco: HasOne<typeof PedidoEndereco>;

  @hasOne(() => MeiosPagamento, {
    foreignKey: "id",
    localKey: "meio_pagamento_id",
  })
  public meio_pagamento: HasOne<typeof MeiosPagamento>;
}
