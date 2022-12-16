import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "pedidos";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("hash_id").unique().notNullable();
      table
        .integer("cliente_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("clientes");
      table
        .integer("estabelecimento_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("estabelecimentos");
      table
        .integer("meio_pagamento_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("meios_pagamentos");
      table
        .integer("pedido_endereco_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("pedido_enderecos");
      table.decimal("valor", 10, 2).notNullable();
      table.decimal("troco_para", 10, 2).nullable();
      table.decimal("custo_entrega", 10, 2).notNullable().defaultTo(0);
      table.string("observacao").nullable();
      table.timestamp("created_at").nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
