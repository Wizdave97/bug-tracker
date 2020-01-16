const e=require('express');
const router=e.Router();

export default function featuresRouterFactory(features:{[key:string]:any}){
    router.get('/all',features.getFeatures)
    router.get('/feature',features.getFeature)
    router.post('/postFeature',features.postFeature)
    router.put('/putFeature',features.putFeature)
    router.delete('/deleteFeature',features.deleteFeature)
    return router
}

featuresRouterFactory.__inject=['features']