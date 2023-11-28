import requests from '../axios';

function signInApi({userType, userPwd,userName,companyName,legalPerson, creditCode,status,tel}) {
    return requests({
        method: 'post',
        url: '/business/web/addRegisterUser',
        data: {userType, userPwd,userName,companyName,legalPerson, creditCode, status,tel}
    })
}

function loginApi({tel, userPwd, companyName, userType}) {
    return requests({
        method: 'post',
        url: `/business/web/login`,
        data: {tel, userPwd,userType,companyName}
    })
}

function logoutApi({tel}) {
    return requests({
        method: 'post',
        url: `/business/web/logout/${tel}`,
        // data: {tel}
    })
}

function editUserApi({userType, userPwd, userName,companyName,status,tel, userId}) {
    return requests({
        method: 'post',
        url: '/business/web/updateRegisterUser',
        data: {userType, userPwd,userName,companyName,status,tel, userId}
    })
}

function getUserApi({tel}) {
    return requests({
        method: 'get',
        url: `/business/web/getUserByTel/${tel}`,
    })
}

export {
    signInApi,
    loginApi,
    logoutApi,
    editUserApi,
    getUserApi,
}