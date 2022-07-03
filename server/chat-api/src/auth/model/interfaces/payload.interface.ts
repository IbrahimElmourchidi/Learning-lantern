/**
 * this interface defines What info JWT payload Contains
 */
export interface PayloadI {
  /**@ignore */
  sub: string;
  /**@ignore */
  FirstName: string;
  /**@ignore */
  LastName: string;
  /**@ignore */
  EmailConfirmed: boolean;
  /**@ignore */
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

/**
 * chat-api_1        | {
chat-api_1        |   jti: 'f5a5819d-47f1-453f-bdc1-64b89e2b2294',
chat-api_1        |   sub: 'a3ed8b93-9247-4f6d-9891-8e442fc713a2',
chat-api_1        |   FirstName: 'Ibrahim',
chat-api_1        |   LastName: 'Elmourchidi',
chat-api_1        |   EmailConfirmed: 'False',
chat-api_1        |   'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Student',
chat-api_1        |   exp: 1659461385,
chat-api_1        |   iss: 'http://5001',
chat-api_1        |   aud: 'User'
chat-api_1        | }
 */
