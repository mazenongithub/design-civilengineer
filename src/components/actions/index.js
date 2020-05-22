import { MYUSERMODEL, ALLUSERS, ALLCOMPANYS, PROJECT } from './types';

export const reduxProject = (project) => async dispatch => {

    dispatch({ type: PROJECT, payload: project })
}

export const reduxUser = (myusermodel) => async dispatch => {

    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}

export const reduxAllUsers = (allusers) => async dispatch => {
    dispatch({ type: ALLUSERS, payload: allusers })
}
export const reduxAllCompanys = (allcompanys) => async dispatch => {
    dispatch({ type: ALLCOMPANYS, payload: allcompanys })
}