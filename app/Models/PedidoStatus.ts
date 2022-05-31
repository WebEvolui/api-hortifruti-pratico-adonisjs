import { HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import Status from "./Status";

export default class PedidoStatus extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public pedido_id: number;

  @column({ isPrimary: true })
  public status_id: number;

  @column()
  public observacao: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @hasOne(() => Status, {
    localKey: "status_id",
    foreignKey: "id",
  })
  public status: HasOne<typeof Status>;
}
