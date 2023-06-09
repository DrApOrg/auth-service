"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const Exceptions_1 = require("../../domain/Exceptions");
const PhoneRegistrationError_1 = require("@domain/Exceptions/PhoneRegistrationError");
const ErrorHandler = (err, req, res, next) => {
    let ErrorPayload = {
        message: '',
        statuscode: 500
    };
    // TODO: change Registration Error control
    switch (err) {
        case new Exceptions_1.AuthenticationError:
            ErrorPayload.message = err.message;
            ErrorPayload.statuscode = 401;
            break;
        case new Exceptions_1.EmailRegistrationError:
            ErrorPayload.message = err.message;
            ErrorPayload.statuscode = 409;
            break;
        case new PhoneRegistrationError_1.PhoneRegistrationError:
            ErrorPayload.message = err.message;
            ErrorPayload.statuscode = 409;
            break;
        case new PhoneRegistrationError_1.PhoneRegistrationError:
            ErrorPayload.message = err.message;
            ErrorPayload.statuscode = 409;
            break;
        default:
            ErrorPayload.message = err.message;
            ErrorPayload.statuscode = 500;
            break;
    }
    res
        .status(ErrorPayload.statuscode)
        .send(ErrorPayload);
};
exports.ErrorHandler = ErrorHandler;
