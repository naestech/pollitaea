import { UserModel } from "./User"

test("can be created", () => {
  const instance = UserModel.create({
    authenticated: false,
    id: "test",
    username: "test",
    email: "test",
    createdAt: "test",
  })
  expect(instance).toBeTruthy()
})
