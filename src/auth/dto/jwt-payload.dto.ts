// current user info in JWT
export class JwtPayload {
  userId: string;
  role: string;
  accessToken: string;
  iat: number;
  exp: number;
}
