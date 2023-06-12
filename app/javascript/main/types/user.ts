export default interface User {
  id?: string | number,
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

// ПЕРЕДЕЛАТЬ ИНТЕРФЕЙСЫ ВПОСЛЕДСТВИИ ТАК
// type role = 'unconfirmed_user' | 'user' | 'tech_support' | 'moderator' | 'admin'
// interface UserForm extends User {
  // password: string,
  // password_confirmation?: string
// }
//
// interface UserShow extends User {
  // created_at: Date
// }