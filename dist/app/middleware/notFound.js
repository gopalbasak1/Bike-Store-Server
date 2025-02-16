"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const notFound = (req, res, next) => {
    res.status(http_status_codes_1.default.NOT_FOUND).json({
        success: false,
        message: 'API Not Fond !!',
        error: '',
    });
};
exports.default = notFound;
