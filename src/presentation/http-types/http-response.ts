export class HttpResponse {
  constructor(
    public readonly body: any,
    public readonly headers: any,
    public readonly statusCode: number,
  ) {}
}
