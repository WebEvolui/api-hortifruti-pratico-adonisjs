import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Estabelecimento from "App/Models/Estabelecimento";
import EstabelecimentoMeiosPagamento from "App/Models/EstabelecimentoMeiosPagamento";
import MeiosPagamento from "App/Models/MeiosPagamento";

export default class MeiosPagamentoSeeder extends BaseSeeder {
  public async run() {
    await MeiosPagamento.createMany([
      {
        nome: "Dinheiro",
      },
      {
        nome: "Cartão Crédito/Débito",
      },
      {
        nome: "PIX",
      },
      {
        nome: "Picpay",
      },
    ]);

    const estabelecimentos = await Estabelecimento.all();
    for (const estabelecimento of estabelecimentos) {
      await EstabelecimentoMeiosPagamento.createMany([
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 1,
        },
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 2,
        },
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 3,
        },
        {
          estabelecimento_id: estabelecimento.id,
          meio_pagamento_id: 4,
        },
      ]);
    }
  }
}
