/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @deprecated
     * @returns Message OK
     * @throws ApiError
     */
    public static get(): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

}
