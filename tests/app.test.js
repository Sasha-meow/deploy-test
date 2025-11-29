const request = require("supertest");

describe("Application Server Basic Tests", () => {
    let server;

    beforeAll((done) => {
        server = require("../app");
        setTimeout(done, 1000);
    });

    afterAll((done) => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    test("GET-запрос на / должен возвращать 200", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
    });

    test("GET-запрос на / должен возвращать HTML с приветственным сообщением", async () => {
        const response = await request(server).get("/");
        expect(response.text).toContain("Добро пожаловать в приложение!");
        expect(response.headers["content-type"]).toContain("text/html");
    });

    test("Сервер должен быть запущен и доступен", () => {
        expect(server.listening).toBe(true);
    });
});