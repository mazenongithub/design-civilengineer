import { combineReducers } from 'redux';
import myusermodel from './myusermodelreducer';
import allusers from './allusersreducer';
import allcompanys from './allcompanysreducer';
import project from './projectreducer'
export default combineReducers({
    myusermodel,
    allusers,
    allcompanys,
    project
})
