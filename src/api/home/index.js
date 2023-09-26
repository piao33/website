import requests from '../axios';

function getBannerApi() {
    return requests({
        method: 'get',
        url: '/business/web/getBusRotationChartList'
    })
}

function getSpecialApi() {
    return requests({
        method: 'get',
        url: `/business/web/getBusSpecialSubject`,
    })
}

function getNoticeApi() {
    return requests({
        method: 'get',
        url: `/business/web/getBusNotice`,
    })
}

export {
    getBannerApi,
    getSpecialApi,
    getNoticeApi,
}