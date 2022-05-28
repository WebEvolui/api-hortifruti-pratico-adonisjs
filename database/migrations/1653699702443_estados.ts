import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "estados";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("uf", 2).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
