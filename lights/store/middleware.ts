import { Middleware } from '@reduxjs/toolkit';
import ToastsService from '../services/ToastsService';

export const errorToastMiddleware: Middleware = (_) => (next) => (action) => {
    if (action.type.endsWith('/rejected')) {
        const { error } = action;
        ToastsService.showErrorToast(error.message);
    }

    return next(action);
};
