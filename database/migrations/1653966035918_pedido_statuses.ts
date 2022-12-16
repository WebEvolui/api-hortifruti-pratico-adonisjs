import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "pedido_statuses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("pedido_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("pedidos");
      table
        .integer("status_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("statuses");
      table.string("observacao").nullable();
      table.timestamp("created_at").nullable();
      table.primary(["pedido_id", "status_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
