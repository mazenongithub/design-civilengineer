import { MYUSERMODEL, ALLUSERS, ALLCOMPANYS, PROJECT,CSIS } from './types';

export const reduxProject = (project) => async dispatch => {

    dispatch({ type: PROJECT, payload: project })
}

export const reduxCSIs = (csis) => async dispatch => {
    dispatch({ type: CSIS, payload:csis })
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