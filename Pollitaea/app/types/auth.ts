/**
 * Signup Repsponse
 * @link https://kit.svelte.dev/docs/errors#type-safety
 */
export type ApiSecret = {
  secret: string
}

export type SignUpResponse = {
  username: string
  created_at: string
  email_confirm: boolean
}

export type APIError = {
  code: number
  message: string
}
