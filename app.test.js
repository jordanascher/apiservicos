const request = require("supertest");
const app = require("./app");

describe("GET /usuarios ", () => {
    test("It should respond with an Ok", async () => {
        const response = await request(app).get("/usuarios");
        expect(response.statusCode).toBe(200);
    });
});

describe("POST /usuarios/cadastrar ", () => {
    test("It should respond with an Ok", async () => {
        const response = (await request(app).post("/usuarios/cadastrar").send({
            "email": "jordanaschercosta@hotmail.com",
            "nome" : "Jordana Scher Costa",
            "senha": "sol123",
            "confirmeSenha":"sol123"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json'));
        expect(response.text).toBe("{\"email\":\"jordanaschercosta@hotmail.com\",\"nome\":\"Jordana Scher Costa\",\"senha\":\"sol123\",\"confirmeSenha\":\"sol123\",\"id\":1}");
        expect(response.statusCode).toBe(200);
    });
});