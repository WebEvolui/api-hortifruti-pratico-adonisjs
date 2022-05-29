import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "enderecos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("cliente_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clientes");
      table
        .integer("cidade_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cidades");
      table.string("rua").notNullable();
      table.string("numero").nullable();
      table.string("bairro").notNullable();
      table.string("ponto_referencia").nullable();
      table.string("complemento").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
