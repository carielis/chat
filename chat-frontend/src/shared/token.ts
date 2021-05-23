import Cookies from 'js-cookie'

export const getToken = (): string => {
  return `Bearer ${Cookies.get("token")}`
}
