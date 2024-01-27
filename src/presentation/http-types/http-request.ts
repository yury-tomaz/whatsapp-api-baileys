export class HttpRequest {
    public url: string;
    public body: any;
    public headers: any;
    public params: any;
    public query: any;
    public file: any;
    public protocol: string;
    

    constructor(props: HttpRequest) {
        this.url = props.url;
        this.body = props.body;
        this.headers = props.headers;
        this.params = props.params;
        this.query = props.query;
        this.protocol = props.protocol;
        this.file = props.file;
    }
}