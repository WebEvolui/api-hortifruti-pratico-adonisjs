import { faker } from "@faker-js/faker";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Categoria from "App/Models/Categoria";
import Produto from "App/Models/Produto";

export default class CategoriaProdutoSeeder extends BaseSeeder {
  public async run() {
    for (let iEst = 1; iEst <= 20; iEst++) {
      let categoria = await Categoria.create({
        nome: faker.commerce.department(),
        descricao: faker.lorem.word(),
        posicao: 1,
        estabelecimento_id: iEst,
      });

      await Produto.createMany([
        {
          nome: faker.commerce.productName(),
          imagem: null,
          descricao: faker.lorem.sentence(),
          preco: faker.number.float({ min: 5, max: 100, precision: 0.5 }),
          categoria_id: categoria.id,
          posicao: 1,
          unidade: "KG",
        },
        {
          nome: faker.commerce.productName(),
          imagem: null,
          descricao: faker.lorem.sentence(),
          preco: faker.number.float({ min: 5, max: 100, precision: 0.5 }),
          categoria_id: categoria.id,
          posicao: 2,
          unidade: "KG",
        },
        {
          nome: faker.commerce.productName(),
          imagem: null,
          descricao: faker.lorem.sentence(),
          preco: faker.number.float({ min: 5, max: 100, precision: 0.5 }),
          categoria_id: categoria.id,
          posicao: 3,
          unidade: "UN",
        },
      ]);
    }
  }
}
