import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "statuses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("status", 50).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
