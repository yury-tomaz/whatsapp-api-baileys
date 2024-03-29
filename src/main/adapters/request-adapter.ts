import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import { HttpRequest } from '../../presentation/http-types/http-request';
import { HttpResponse } from '../../presentation/http-types/http-response';

export interface ControllerInterface {
    handle(request: HttpRequest): Promise<HttpResponse>;
}

export async function requestAdapter(
    request: ExpressRequest,
    response: ExpressResponse,
    controller: ControllerInterface,
    render?: string
): Promise<void> {
    let body: any = null;
    if (request.body) {
        body = request.body;
    }

    const http_request = new HttpRequest({
        body,
        headers: request.headers,
        query: request.query,
        params: request.params,
        url: request.originalUrl,
        protocol: request.protocol,
        file: request.file,
    });

    const http_response = await controller.handle(http_request);

    if (render) {
        return response.render(render, http_response.body);
    }

    response.status(http_response.statusCode).json(http_response.body);
}
