
import { Elysia } from 'elysia'

/*
*** Utils
*/
import { Fetch } from '@/app/Utils/Fetch';
import { Answers } from '@/app/Utils/Answers';
import { AuthData, AuthVerifyToken, UpdateBank, UpdateCard } from '@/app/RouteModels';


const app = new Elysia({ prefix: '/api/v1' })

    /*
    *** Index page
    */
    .get('/', () => {return {index: "page"}})

    /*
    *** Auth
    */
    .post('/auth', async ({body}: {body: AuthData }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/auth`, body);

    })

    /*
    *** Verify token
    */
    .post('/verify', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/verify`, body);

    })

    /*
    *** Get all banks
    */
    .post('/get_banks', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/get_banks`, body);

    })

    /*
    *** Update status bank
    */
    .post('/update_banks', async ({body}: {body: UpdateBank }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/update_banks`, body);

    })

    /*
    *** Get all cards
    */
    .post('/get_cards', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/get_cards`, body);

    })

    /*
    *** Update all cards
    */
    .post('/update_card', async ({body}: {body: UpdateCard }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/update_card`, body);

    })


    /*
    *** Get all transactions
    */
    .post('/get_transactions', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/get_transactions`, body);

    })


    /*
    *** Update transaction
    */
    .post('/update_transaction', async ({body}: {body: AuthVerifyToken }): Promise<Answers> => {

        return await Fetch.request(`http://localhost:5000/api/admin/update_transaction`, body);

    })

    

export const GET = app.handle
export const POST = app.handle 