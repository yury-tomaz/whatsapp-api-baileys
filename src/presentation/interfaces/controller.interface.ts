import { HttpRequest } from "../http-types/http-request";
import { HttpResponse } from "../http-types/http-response";

export interface ControllerInterface{
    handle(request: HttpRequest): Promise<HttpResponse>;
}