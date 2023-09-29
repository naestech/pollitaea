import { RootStore } from "app/models"
import { createToast } from "app/utils/common"
import { supabase } from "app/utils/supabaseClient"
import { Buffer } from "buffer"
import {
  getMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  UIImagePickerPreferredAssetRepresentationMode,
} from "expo-image-picker"

/**
 * Profile picture updater
 * @param toast
 * @param hasAvatar
 * @param store
 */
export const handleProfileUpdate = async (toast, hasAvatar: boolean, store: RootStore) => {
  await getMediaLibraryPermissionsAsync()

  launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.Images,
    quality: 0.4,
    aspect: [1, 1],
    allowsEditing: true,
    preferredAssetRepresentationMode: UIImagePickerPreferredAssetRepresentationMode.Automatic,
    base64: true,
  })
    .then(async (img) => {
      if (!img.canceled) {
        const selectedImage = img.assets[0]
        const isPng = selectedImage.uri.toLowerCase().includes(".png")
        if (
          !(
            selectedImage.uri.toLowerCase().includes(".png") ||
            selectedImage.uri.toLowerCase().includes(".jpeg") ||
            selectedImage.uri.toLowerCase().includes(".jpg")
          )
        ) {
          createToast(toast, "Only jpg and png files allowed")
          return
        }
        const fileData = Uint8Array.from(Buffer.from(selectedImage.base64, "base64"))

        if (hasAvatar && isPng && store.user.avatar_url.includes("png")) {
          console.debug("Updating present avi")
          supabase.storage
            .from("avatars")
            .update(`/${store.user.id}/avatar.${isPng ? "png" : "jpg"}`, fileData, {
              upsert: true,
              contentType: `image/${isPng ? "png" : "jpg"}`,
              cacheControl: "500",
            })
            .then(({ data, error }) => {
              if (error?.message) {
                createToast(toast, "Error - " + error?.message)
              } else {
                console.debug("Good Upload")
                createToast(toast, "Nice pic")
                supabase
                  .from("profiles")
                  .update({
                    avatar_url: supabase.storage.from("avatars").getPublicUrl(data?.path).data
                      .publicUrl,
                  })
                  .eq("id", store.user.id)
                  .then((res) => console.log(res))
              }
            })
            .catch((err) => {
              createToast(toast, err.message)
              console.log("storage insert error")
              console.log(err)
            })
          //   supabase.storage
          //     .from("avatars")
          //     .update(`/${store.user.id}/avatar.${isPng ? "png" : "jpg"}`, fileData, {
          //       upsert: true,
          //       contentType: `image/${isPng ? "png" : "jpg"}`,
          //       cacheControl: "500",
          //     })
          //     .then(({ data, error }) => {
          //       console.debug(data, error)

          //       if (error?.message) {
          //         createToast(toast, "Error - " + error?.message)
          //       } else {
          //         console.debug("Good Upload")

          //         createToast(
          //           toast,
          //           "Successful save, image url - " +
          //             supabase.storage.from("avatars").getPublicUrl(data.path),
          //         )
          //         supabase
          //           .from("profiles")
          //           .update({
          //             avatar_url: supabase.storage.from("avatars").getPublicUrl(data.path).data
          //               .publicUrl,
          //           })
          //           .eq("id", store.user.id)
          //           .then((res) => console.log(res))
          //       }
          //     })
          //     .catch((err) => {
          //       createToast(toast, err.message)
          //       console.log("storage update error")
          //       console.log(err)
          //     })
        } else {
          console.debug("Creating new avi")
          supabase.storage
            .from("avatars")
            .upload(`/${store.user.id}/avatar.${isPng ? "png" : "jpg"}`, fileData, {
              upsert: true,
              contentType: `image/${isPng ? "png" : "jpg"}`,
              cacheControl: "500",
            })
            .then(({ data, error }) => {
              if (error?.message) {
                console.debug(error)
                createToast(toast, "Error - " + error?.message)
              } else {
                console.debug("Good Upload")
                const newAvi = supabase.storage.from("avatars").getPublicUrl(data?.path)
                  .data.publicUrl
                createToast(toast, "Nice pic")
                supabase
                  .from("profiles")
                  .update({
                    avatar_url: supabase.storage.from("avatars").getPublicUrl(data?.path).data
                      .publicUrl,
                  })
                  .eq("id", store.user.id)
                  .then((res) => {
                    console.log(res)
                    store.user.updateProfile(newAvi)
                  })
              }
            })
            .catch((err) => {
              createToast(toast, err.message)
              console.log("storage insert error")
              console.log(err)
            })
        }
      }
    })
    .catch((err) => {
      console.log("Error picking image")
      console.log(err)
    })
}
