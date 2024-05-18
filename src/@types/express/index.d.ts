declare namespace Express {
  export interface Request {
    user?: {
      realm_access: {
        roles: string[];
      };
    };
  }
}
