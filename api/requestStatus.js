const commitsql = require('../database/commitsql')
//comment on column request.status is 'the order is : isTeamDate(0),isVisited(1),isShow(2),isAllotment(3),isReceptionist(4),isDelivered(5),isRejected(6),isCanceled(7)';

async function requestStatus(requestId) {
   
    reqStatusObject = {
        isTeamDate: false,
        isVisited: false,
        isShow: false,
        isAllotment: false,
        isReceptionist: false,
        isDelivered: false,
        isRejected: false,
        isCanceled: false,
    }
    console.log('requestId from status'+ requestId)
    let reqStatus = await commitsql(`SELECT status from request where id =$1  `, [requestId]);
    reqStatus = reqStatus.rows[0].status

    if ((reqStatus % 2) == 1) {
        reqStatus -= 1;
        reqStatusObject.isTeamDate = true
        //تم تحديد وقت زيارة
    }
    if (((reqStatus / 2) % 2) == 1) {
        reqStatus -= 2;
        reqStatusObject.isVisited = true

        //تمت الزيارة
    }
    if (((reqStatus / 4) % 2) == 1) {
        reqStatus -= 4;
        reqStatusObject.isShow = true

        //تم عرض الطلب للتبرع
    }
    if (((reqStatus / 8) % 2) == 1) {
        reqStatus -= 8;
        reqStatusObject.isAllotment = true

        //تم التخصيص

    }
    if (((reqStatus / 16) % 2) == 1) {
        reqStatus -= 16;
        reqStatusObject.isReceptionist = true

        //تم التقديم عن طريق الاستقبال
    }
    if (((reqStatus / 32) % 2) == 1) {
        reqStatus -= 32;
        reqStatusObject.isDelivered = true

        //تم تسليم (ما في عدنا تسليم)
    }
    if (((reqStatus / 64) % 2) == 1) {
        reqStatus -= 64;
        reqStatusObject.isRejected = true

        // تم رفض الطلب من قبل الادارة
    }
    if (((reqStatus / 128) % 2) == 1) {
        reqStatus -= 128;
        reqStatusObject.isCanceled = true

        // تم الغاء الطلب من قبل المستخدم

    }
    return reqStatusObject
}

async function canCancelRequest(requestId) {
    reqStatus = await requestStatus(requestId)
        return !reqStatus.isAllotment;
}
async function canSendTeam(requestId) {
    reqStatus = await requestStatus(requestId)
        return !reqStatus.isTeamDate&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}
async function canDonationRequest(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isShow && !reqStatus.isAllotment &&!reqStatus.isCanceled&&!reqStatus.isRejected;
}
async function canVisitAcceptance(requestId) {
    reqStatus = await requestStatus(requestId)
        return !reqStatus.isVisited&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}

async function canSetPriorityRequest(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isVisited&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}
async function canRequestAllotmentFund(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isVisited&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}
async function canRequestAllotmentStore(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isVisited&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}
async function canRequestBuying(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isVisited&&reqStatus.isAllotment&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}

async function canOfferToDonate(requestId) {
    reqStatus = await requestStatus(requestId)
        return !reqStatus.isShow&&reqStatus.isVisited&&!reqStatus.isAllotment&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}

async function canEnterForm(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isTeamDate&&!reqStatus.isVisited&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}

async function canUploadImages(requestId) {
    reqStatus = await requestStatus(requestId)
        return reqStatus.isTeamDate&&!reqStatus.isVisited&&!reqStatus.isCanceled&&!reqStatus.isRejected;
}



exports.canUploadImages=canUploadImages
exports.canEnterForm=canEnterForm
exports.canOfferToDonate=canOfferToDonate
exports.canRequestBuying=canRequestBuying
exports.canRequestAllotmentStore=canRequestAllotmentStore
exports.canRequestAllotmentFund=canRequestAllotmentFund
exports.canSetPriorityRequest=canSetPriorityRequest
exports.canVisitAcceptance=canVisitAcceptance
exports.canDonationRequest=canDonationRequest
exports.canSendTeam=canSendTeam
exports.canCancelRequest=canCancelRequest
exports.requestStatus=requestStatus
