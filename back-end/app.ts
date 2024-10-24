import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes'; // Zorg ervoor dat dit pad klopt
import { playlistRouter } from './controller/playlist.routes'; // Zorg ervoor dat dit pad klopt

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

// Swagger definitie
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Playlist and User API',
        version: '1.0.0',
        description: 'API documentation for Playlist and User services',
    },
    servers: [
        {
            url: `http://localhost:${port}`, // Zorg ervoor dat dit klopt met je serverconfiguratie
        },
    ],
};

// Swagger options
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./controller/*.routes.ts'], // Dit is het pad naar je routebestanden
};

// Swagger-spec genereren
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI instellen
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Gebruik routers voor gebruikers en afspeellijsten
app.use('/users', userRouter);
app.use('/playlists', playlistRouter);

app.use((err: any, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(400).json({
        status: 'application error',
        message: err.message 
    });
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
