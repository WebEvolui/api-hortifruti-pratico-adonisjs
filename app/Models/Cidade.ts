import Estabelecimento from 'App/Models/Estabelecimento';
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Estado from "App/Models/Estado";

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nome: string;

  @column()
  public estado_id: number;

  @column()
  public ativo: boolean;

  @hasOne(() => Estado, {
    foreignKey: "id",
    localKey: "estado_id",
  })
  public estado: HasOne<typeof Estado>;

  @manyToMany(() => Estabelecimento, {
    pivotTable: "cidades_estabelecimentos",
    localKey: "id",
    pivotForeignKey: "cidade_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "estabelecimento_id",
  })
  public estabelecimentos: ManyToMany<typeof Estabelecimento>;
}
