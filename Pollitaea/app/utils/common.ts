import { ApiSecret } from "app/services/api"
import { api } from "../services/api/api"

/**
 * Fetch API Secret
 */
export const fetchSecret = async (id?: string) => {
  return await api.apisauce
    .get<ApiSecret>(
      "api/auth",
      {},
      {
        headers: {
          id: id || "NEW_USER",
        },
      },
    )
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
