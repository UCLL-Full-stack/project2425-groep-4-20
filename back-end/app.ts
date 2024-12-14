import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import { userRouter } from './controller/user.routes';
import { playlistRouter } from './controller/playlist.routes'; 
import { albumRouter } from './controller/album.routes';
import { artistRouter } from './controller/artist.routes';
import { songRouter } from './controller/song.routes';
import { expressjwt } from 'express-jwt';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(helmet());

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use(expressjwt({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: ['HS256']
}).unless({
    path: [
        /^\/api-docs(\/.*)?$/,  
        '/users/login',         
        /^\/users(\/.*)?$/      
    ]
}));

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Playlist and User API',
        version: '1.0.0',
        description: 'API documentation for Playlist and User services',
    },
    servers: [
        {
            url: `http://localhost:${port}`,
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRouter);
app.use('/playlists', playlistRouter);
app.use('/albums', albumRouter);
app.use('/artists', artistRouter);
app.use('/songs', songRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Something went wrong!',
    });
});

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
});
