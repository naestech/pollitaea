import { ApiSecret } from "app/types/auth"
import { api } from "../services/api/api"

/**
 * Fetch API Secret
 */
export const fetchSecret = async () => {
  return await api.apisauce
    .get<ApiSecret>("api/auth")
    .then((res) => res.data.secret)
    .catch(() => {
      return null
    })
}

/**
 * Create toast message
 */
export const createToast = (toast: any, title: string, duration?: number) => {
  if (duration) {
    toast.show(title, { duration, native: true })
  } else {
    toast.show(title, { native: true })
  }
}
