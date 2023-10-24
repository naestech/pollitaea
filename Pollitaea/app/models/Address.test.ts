import { AddressModel } from "./Address"

test("can be created", () => {
  const instance = AddressModel.create({})

  expect(instance).toBeTruthy()
})
