import { User as SupaUser } from "@supabase/supabase-js"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { supabase } from "app/utils/supabaseClient"

/**
 * User model for managing current user or viewed users
 */
export const UserModel = types
  .model("User")
  .props({
    authenticated: types.boolean,
    id: types.maybe(types.string),
    username: types.maybe(types.string),
    email: types.maybe(types.string),
    createdAt: types.maybe(types.string),
    profilePic: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    trialLogin(username: string) {
      self.authenticated = false
      self.id = undefined
      self.username = username
      self.email = "user@pollitaea.app"
      self.createdAt = Date.now().toLocaleString()
      self.profilePic = "https://placehold.co/150.png"
    },
    login(supaUser: SupaUser) {
      self.authenticated = true
      self.id = supaUser.id
      self.username = supaUser.user_metadata.username
      self.email = supaUser.email
      self.createdAt = supaUser.created_at
    },
    logout() {
      // Actually log out if this isn't a trial
      if (self.authenticated) {
        supabase.auth
          .signOut()
          .then((res) => {
            console.log(res)
            console.log("successful logout")
          })
          .catch((err) => {
            console.log(err)
            console.log("Error during signout")
          })
      }
      self.authenticated = false
      self.id = undefined
      self.username = undefined
      self.email = undefined
      self.createdAt = undefined
      self.profilePic = undefined
    },
    setProfilePic(url: string) {
      self.profilePic = url
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () =>
  types.optional(UserModel, {
    authenticated: false,
    id: undefined,
    username: undefined,
    email: undefined,
    createdAt: undefined,
    profilePic: undefined,
  })
