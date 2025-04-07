interface User {
  id: number
  username: string
  nickname: string
  phone: string
  email: string
  balance: number
  status: 0 | 1
  registerTime: string
  lastLoginTime: string
}

interface UserQueryParams {
  username?: string
  phone?: string
  status?: 0 | 1
  page: number
  size: number
}

interface UserInfo {
  loginStatus: boolean
  adminname: string
  token?: string
}

interface LoginForm {
  username: string
  password: string
}

interface LoginResponse {
  code: string
  data: UserInfo
  msg: string
} 