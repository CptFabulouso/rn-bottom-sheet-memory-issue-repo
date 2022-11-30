# rn-bottom-sheet memory issue repo

## to reproduce

- run `yarn`
- run `npx react-native run-android`
- run `adb logcat -s TooLargeTool`
- on phone and app do repeatedly:
  - click on "Go to modal screen"
    - there's no need to show the modal, we call `present()` on mount
  - navigate back with back button
  - minimize app with home button (no need on iOS)

In Metro logs you can see the ModalContent never unmounts.

And to look at memory issues:

### Android

In console you should see logs from adb with `MainActivity.onSaveInstanceState wrote: Bundle{some_number} contains 4 keys and measures {some_size} KB when serialized as a Parcel` and as you repeat the steps, `some_size` keeps incrementing, which will in the end lead to app crash with `Exception java.lang.RuntimeException: android.os.TransactionTooLargeException: data parcel size {some_size} bytes`. I think it crashes at 500 KB, so you would have to do quite a lot of repeating, but that depends on by how many bytes it increments and how long you are using the app. The only point is it's increasing.

### iOS

Look at Memory in xCode in Debug navigator

## Possible fix

Look at patch in `./patches`. Apply with `yarn patch-package`.
