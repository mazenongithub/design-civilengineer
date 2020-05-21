import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import allusers from './allusersreducer';
import allcompanys from './allcompanysreducer'
export default combineReducers({
    myusermodel,
    allusers,
    allcompanys
})
