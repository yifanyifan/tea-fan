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