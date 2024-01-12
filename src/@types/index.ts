"use strict"

import  express, {Request, Response, NextFunction}  from "express";
import usersRoute from "../routes/users.route";
import statusRoute from "../routes/status.route";
import errorHandler from "../middlewares/error-handler.middleware";

const app = express();

//configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// configuração de Rotas
app.use(usersRoute);
app.use(statusRoute);

// app.get('/status', (req: Request, res: Response, next: NextFunction) => {
//     res.status(200).send({
//         foo: 'bar'
//     })
// });
//configuração de erros de rota
app.use(errorHandler);

app.listen(3000, () =>{
    console.log('Aplicação executando na porta: 3000!');
})