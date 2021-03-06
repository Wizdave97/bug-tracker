const e=require('express');
const router=e.Router();

export default function logsRouterFactory(logs:{[key:string]:any}){
    router.get('/all',logs.getLogs)
    router.get('/feature',logs.getFeatureLogs)
    router.post('/postLog',logs.postLog)
    return router
}

logsRouterFactory.__inject=['logs']