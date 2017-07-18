const serviceStatus = {
    STATUS_6: '6',
    STATUS_2: '2',
    AVAILABLE: '0',
    STATUS_1: '1'
};
const errorCodes = {
    TWO: '2',
    ZERO: '0',
    ONE: '1',
    THREE: '3'
};
const userTypes = {
    IOS: '1'
}
const MESSAGES = {
    messageConfirmed: "Tu servicio ha sido confirmado!"
}

function post_confirm(params) {
    const id = params.service_id;
    let service = Service.find(id);
    // console.log(service);
    if (service != NULL) {
        if (service.status_id == serviceStatus.STATUS_6) {
            return { error: errorCodes.TWO };
        }
        if (service.driver_id == NULL && service.status_id == serviceStatus.STATUS_1) {
            service = Service.update(id, {
                driver_id: params.driver_id,
                status_id: serviceStatus.STATUS_2
                    //Up carro
                    //, pwd: md5(params.pwd)
            });
            Driver.update(params.driver_id, {
                available: serviceStatus.AVAILABLE
            });
            driverTmp = Driver.find(params.driver_id);
            Service.update(id, {
                car_id: driverTmp.car_id
                    //Up carro
                    //, pwd: md5(params.pwd)
            });
            notifyUser(id, service);
            return { error: errorCodes.ZERO };
        } else {
            return { error: errorCodes.ONE };
        }
    } else {
        return { error: errorCodes.THREE };
    }
};

function notifyUser(id, service) {
    //Notificar a usuario!!
    var pushMessage = MESSAGES.messageConfirmed;
    service = Service.find(id);
    push = Push.make();
    if (service.user.uuid == '') {
        return { error: errorCodes.ZERO };
    }
    if (service.user.type == userTypes.IOS) { //iPhone
        push.ios(service.user.uuid, pushMessage, 1, 'honk.wav', 'Open', { service_id: service.id });
    } else {
        push.android2(service.user.uuid, pushMessage, 1, 'default', 'Open', { service_id: service.id });
    }
    return {
        error: errorCodes.ZERO
    }
}