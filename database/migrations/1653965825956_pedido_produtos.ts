import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "pedido_produtos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("pedido_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("pedidos");
      table
        .integer("produto_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("produtos");
      table.decimal("valor", 10, 2).notNullable();
      table.decimal("quantidade", 10, 3).notNullable();
      table.string("observacao").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
