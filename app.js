const http = require("http");
const os = require("os");

class ApplicationServer {
    constructor() {
        this.port = process.env.APP_PORT || 8080;
        this.hostname = "0.0.0.0";
        this.startTime = new Date();
    }

    createServer() {
        return http.createServer((request, response) => {
            this.handleRequest(request, response);
        });
    }

    handleRequest(request, response) {
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

        const serverInfo = {
            message: "Добро пожаловать в приложение!",
            uptime: Math.floor((new Date() - this.startTime) / 1000),
            hostname: os.hostname(),
            platform: os.platform(),
            timestamp: new Date().toISOString(),
            commit: process.env.RENDER_GIT_COMMIT || "local"
        };

        const htmlResponse = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Системная информация</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .container { max-width: 800px; margin: 0 auto; }
                    .info { background: #f5f5f5; padding: 20px; border-radius: 8px; }
                    .message { color: #2c3e50; font-size: 24px; margin-bottom: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="message">${serverInfo.message}</div>
                    <div class="info">
                        <h3>Информация о сервере:</h3>
                        <p><strong>Время работы:</strong> ${serverInfo.uptime} секунд</p>
                        <p><strong>Имя хоста:</strong> ${serverInfo.hostname}</p>
                        <p><strong>Платформа:</strong> ${serverInfo.platform}</p>
                        <p><strong>Текущее время:</strong> ${serverInfo.timestamp}</p>
                        <p><strong>Коммит:</strong> ${serverInfo.commit}</p>
                        <p>Проверка автоматического деплоя</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        response.end(htmlResponse);
    }

    initialize() {
        const server = this.createServer();

        server.listen(this.port, this.hostname, () => {
            console.log("✅ Приложение запущено и доступно!");
            console.log(`⏰ Сервер стартовал в: ${this.startTime.toLocaleString()}`);
        });

        server.on("error", (error) => {
            console.error("❌ Ошибка запуска сервера:", error.message);
        });

        return server;
    }
}

const appServer = new ApplicationServer();
module.exports = appServer.initialize();
