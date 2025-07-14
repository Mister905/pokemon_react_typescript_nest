export class AuthResponseDto {
  access_token!: string;
  user!: {
    id: number;
    username: string;
    name?: string;
  };
}
