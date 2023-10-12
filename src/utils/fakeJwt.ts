export const createFakeJwt = (payload: string) => `some.secret.${payload}`;

export const decodeFakeJwt = (token?: string) => token?.split(".").pop();
