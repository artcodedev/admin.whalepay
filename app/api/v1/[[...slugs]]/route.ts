
import { Elysia, t } from 'elysia'

/*
*** Utils
*/
import { Fetch } from '@/app/Utils/Fetch';
import { Answers } from '@/app/Utils/Answers';

interface AuthData {
    login: string
    password: string
}

interface AuthVerifyToken {
    token: string
}

const app = new Elysia({ prefix: '/api/v1' })

    /*
    *** Index page
    */
    .get('/', () => {return {index: "page"}})

    /*
    *** Auth
    */
    .post('/auth', async ({body}: {body: AuthData }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/auth`, { login: body.login, password: body.password });

    })

    /*
    *** Verify token
    */
    .post('/verify', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/verify`, { token: body.token});

    })


    /*
    *** Get all banks
    */
    .post('/get_banks', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/get_banks`, { token: body.token});

    })

    

export const GET = app.handle
export const POST = app.handle 