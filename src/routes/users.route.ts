import { Response, Request, NextFunction, Router }  from "express";
import { StatusCodes} from "http-status-codes";
import useRepositores from "../repositories/use.repositores";
import { DatabaseError } from "pg";
// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await useRepositores.findAllUsers();
    res.status(StatusCodes.OK).send({users})
});
usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid =  req.params.uuid;
        const user = await useRepositores.findById(uuid);
        res.status(StatusCodes.OK).send({user})
    } catch (error) {
        next(error);
    }
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    const uuid = await useRepositores.create(newUser)
    res.status(StatusCodes.CREATED).send(uuid);
});
usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;
    await useRepositores.update(modifiedUser)
    res.status(StatusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await useRepositores.remove(uuid);
    res.sendStatus(StatusCodes.OK);
});
export default usersRoute;