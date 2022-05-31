import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "estabecimento_meios_pagamentos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("estabecimento_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("estabecimentos");
      table
        .integer("meio_pagamento_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("meios_pagamentos");
      table.primary(["estabecimento_id", "meio_pagamento_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
