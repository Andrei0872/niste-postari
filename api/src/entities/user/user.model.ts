export interface User {
  id: number;
  username: string;
  password: string;
}

export type PublicUser = Omit<User, 'password'>;
export type UserCookieData = Pick<User, 'id' | 'username'>;

export const getPublicUser = (u: User): PublicUser => {
  const { password, ...rest } = u;

  return rest;
}