import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Address model, used for refreshing user's saved addy
 * Input from user, cleaned by api, saved to db and pulled from db until update after another search
 */
export const AddressModel = types
  .model("Address")
  .props({
    street: types.maybe(types.string),
    city: types.maybe(types.string),
    state: types.maybe(types.string),
    zip: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get formattedAddress() {
      return self.street + " " + self.city + " " + self.state + " " + self.zip
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAddress(normalizedAddress: NormalizedAddress) {
      self.street = normalizedAddress.line1
      self.city = normalizedAddress.city
      self.state = normalizedAddress.state
      self.zip = normalizedAddress.zip
    },
    clearAddress() {
      self.street = null
      self.city = null
      self.state = null
      self.zip = null
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Address extends Instance<typeof AddressModel> {}
export interface AddressSnapshotOut extends SnapshotOut<typeof AddressModel> {}
export interface AddressSnapshotIn extends SnapshotIn<typeof AddressModel> {}
export const createAddressDefaultModel = () => types.optional(AddressModel, {})

type NormalizedAddress = {
  line1: string
  city: string
  state: string
  zip: string
}
