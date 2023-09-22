import { User as SupaUser } from "@supabase/supabase-js"
import { NavList } from "app/components"
import { Profile } from "app/config/schema"
import { supabase } from "app/utils/supabaseClient"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

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
    avatar_url: types.maybe(types.string),
    external_url: types.maybe(types.string),
    full_name: types.maybe(types.string),
    location: types.maybe(types.string),
    role: types.maybe(types.string),
    tag: types.maybe(types.string),
    createdAt: types.maybe(types.string),
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
      self.avatar_url = "https://placehold.co/150.png"
      self.external_url = undefined
      self.full_name = "Jane Doe"
      self.location = "District of Columbia"
      self.role = "STOCK"
      self.tag = "Local voter"
    },
    login(supaUser: SupaUser) {
      self.authenticated = true
      self.id = supaUser.id
      self.username = supaUser.user_metadata.username
      self.email = supaUser.email
      self.createdAt = supaUser.created_at
    },
    logout(navigation: NavList) {
      // Actually log out if this isn't a trial
      if (self.authenticated) {
        supabase.auth
          .signOut()
          .then((res) => {
            console.log("successful logout")
            navigation.navigate("Welcome")
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
      self.avatar_url = undefined
      self.external_url = undefined
      self.full_name = undefined
      self.location = undefined
      self.role = undefined
      self.tag = undefined
    },
    hydrateProfile(profile: Profile, user: SupaUser) {
      self.authenticated = true
      self.id = user.id
      self.username = profile.username
      self.email = user.email
      self.createdAt = user.created_at
      self.avatar_url = profile.avatar_url
      self.external_url = profile.external_url
      self.full_name = profile.full_name
      self.location = profile.location
      self.role = profile.role
      self.tag = profile.tag
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
    avatar_url: undefined,
    external_url: undefined,
    full_name: undefined,
    location: undefined,
    role: undefined,
    tag: undefined,
  })
