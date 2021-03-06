'use strict';
import business from '../buisness/business.container';
import auth from '../middleware/auth';
import applicationException from '../service/applicationException';
import { log } from 'util';
const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response, next) => {
        console.log('Jestem w endpoint auth: ',request.body)
       /*  let data = JSON.parse(request.body.data) */
        try {
            let result = await business(request).getUserManager(request).authenticate(request.body.login, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        console.log("Endpoint: ", request.body);
      /*   let data = JSON.parse(request.body.data) */
        try {
            let result = await business(request).getUserManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
      console.log('Logout...');
      console.log('UserID: ',request.body.userId);
      
      
        try {
            let result = await business(request).getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
});
}

export default userEndpoint;
