import UserType from "../models/use.models";
import db from "../db";
import DataBaseError from "../models/errs/use.errs";


class UseRepositories{
    async findAllUsers(): Promise<UserType[]>{
        const query =`
            SELECT uuid, username
            FROM application_user
        `;
        const {rows} = await db.query<UserType>(query);
        return rows || [];
    }
    async findById(uuid: string): Promise<UserType> {
        try {
            const query =`
                SELECT uuid, username
                FROM application_user
                WHERE uuid = $1
            `;

            const values = [uuid];

            const {rows} = await db.query<UserType>(query, values);
            const [user] = rows;
            return user;
        } catch (error) {
            throw new DataBaseError('Erro na consulta por ID', error);
        }
    }
    async create(user: UserType): Promise<String>{
        const script =`
            INSERT INTO application_user(
                username,
                password
            )
            VALUES ($1, crypt($2, 'my_salt'))
            RETURNING uuid
        `;
        const values = [user.username, user.password];
        const {rows} = await db.query<{uuid: string}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async update(user: UserType): Promise<void>{
        const string =`
            UPDATE application_user
            SET
                username = $1,
                password = crypt($2, 'my_salt')
            WHERE uuid = $3
        `;

        const values = [user.username, user.password, user.uuid];

        await db.query<{uuid: string}>(string, values);
    }
    async remove(uuid: string): Promise<void>{
        const script =`
            DELETE
            FROM application_user
            WHERE uuid = $1
        `;

        const values = [uuid];
        await db.query(script, values);
    }
}

export default new UseRepositories();