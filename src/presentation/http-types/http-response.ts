

export class HttpResponse {
    constructor(
        public readonly body: any,
        public readonly headers: any = {
            "Content-Type": "application/json",
        },
        public readonly statusCode: number,
    ) { }
}