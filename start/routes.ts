import Route from "@ioc:Adonis/Core/Route";

// Login para os 3 tipos de user
Route.post("/login", "AuthController.login");
Route.post("logout", "AuthController.logout");

Route.get("/cidades", "CidadesController.index");
Route.get(
  "/cidades/:id/estabelecimentos",
  "CidadesController.Estabelecimentos"
);

Route.get("/estabelecimentos/:id", "EstabelecimentosController.show");

Route.post("/cliente/cadastro", "ClientesController.store");

Route.group(() => {
  Route.get("auth/me", "AuthController.me");

  Route.resource("/enderecos", "EnderecosController").only([
    "store",
    "index",
    "update",
    "destroy",
  ]);

  Route.post("/pedidos", "PedidosController.store");
  Route.get("/pedidos", "PedidosController.index");
  Route.get("/pedidos/:hash_id", "PedidosController.show");

  Route.get("/estabelecimento/pedidos", "EstabelecimentosController.pedidos");
  Route.post("/pedidos/:hash_id/statuses", "PedidosController.statuses");
  Route.patch("/estabelecimento", "EstabelecimentosController.update");

  Route.put("/cliente", "ClientesController.update");

  // Estabelecimentos
  Route.resource("/estabelecimento/categorias", "CategoriasController").only([
    "store",
    "index",
    "update",
    "destroy",
  ]);

  Route.resource("/produtos", "ProdutosController").only([
    "store",
    "update",
    "destroy",
  ]);
}).middleware("auth");

Route.get("/", async () => {
  return {
    hortifruti: "prático",
  };
});
