"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
    }));
    app.enableCors({
        origin: [
            'http://127.0.0.1:5500',
            'http://localhost:5500',
            'http://localhost:8081',
            'http://127.0.0.1:5502',
        ],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('SanaPay API')
        .setDescription('API Documentation for SanaPay')
        .setVersion('2.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port);
    console.log(`
🚀 SanaPay Backend is running!

🔗 API Base : http://localhost:${port}/api
📚 Swagger  : http://localhost:${port}/api/docs
🌐 Frontend: Live Server (5500 / 8081)
🔐 Env     : ${process.env.NODE_ENV || 'development'}
`);
}
bootstrap();
//# sourceMappingURL=main.js.map