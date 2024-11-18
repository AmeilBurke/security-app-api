export type RequestWithAccount = Request & {
  account: {
    sub: number;
    email: string;
    iat: number;
    exp: number;
  };
};