export class LoginDTO {
  email: string;
  password: string;
  redirect_uri: string;
  client_id: string;
  code_challenge: string;
  code_challenge_method: string;
}
