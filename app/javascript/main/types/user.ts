type Role = 'unconfirmed_user' | 'user' | 'tech_support' | 'moderator' | 'admin' | ''

enum Roles {
  UnconfirmedUser = 'unconfirmed_user',
  User = 'user',
  TechSupport = 'tech_support',
  Moderator = 'moderator',
  Admin = 'admin',
  Empty = '',
}

interface UserModel {
  readonly id: number | string,
  email: string,
  name?: string,
  password?: string,
  password_confirmation?: string,
  role?: Role,
  created_at?: string
}

interface User {
  email: string,
}

interface UserLogin extends User {
  password: string,
}

interface UserSignup extends User, UserLogin {
  name: string,
  password_confirmation: string,
}

interface UserIndex extends User {
  id: string | number,
  name: string,
  role: Role,
}

interface UserShow extends User, UserIndex {
  created_at: string
}

interface UserEdit extends User {
  id: string | number,
  name: string,
}

export { User, UserLogin, UserSignup, UserIndex, UserShow, UserEdit, UserModel }