# Mobile App Development

```
project = "Mobile App Development"

```

# babel-plugin-module-resolver

```

for paths in src folder to point @ at src
i.e -> @/Components/ExampleComponent

https://www.npmjs.com/package/babel-plugin-module-resolver

yarn add babel-plugin-module-resolver -D

const presets = ['module:metro-react-native-babel-preset']
const plugins = []

plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    extensions: ['.js', '.json', '.tsx', '.ts'],
    alias: {
      '@': './src',
    },
  },
])

module.exports = {
  presets,
  plugins,
}
```

# react-native-clean-project

```
https://www.npmjs.com/package/react-native-clean-project

yarn add -D react-native-clean-project

"scripts": {
  "clean": "react-native-clean-project"
}
```

# react-native-rename --> to rename project

```
https://github.com/junedomingo/react-native-rename#readme

yarn add react-native-rename

1. git checkout -b rename-app
2. npx react-native-rename <newName>
3. npx react-native-rename "Travel App" -b com.<bundleIdentifier>
bundleIdentifier example: junedomingo.travelapp
```

# App Icon and Splash Screen

```
Configuration
Change the appicon#
To help generate appicons, you can use an online tool like appicon to generate for both iOS and Android all icons and image sets.

iOS 🍎#
To change the appicon of the iOS application, you need to replace all the content of

src > ios > *name_of_your_app* > Images.xcassets > AppIcon.appiconset
with your appicons generated with appicon for example.

Android 🤖#
To change the appicon of the Android application, you need to replace all the content of

src > android > app > src > res
with your appicons generated with appicon for example.

Change the splash screen icon
iOS 🍎#
You can use the same tool (appicon) to generate image sets (@1x, @2x, @3x). Then you just have to replace : Splash_icon@1x.png, Splash_icon@2x.png, Splash_icon@3x.png with yours in :

src > ios > *name_of_your_app* > Images.xcassets > SplashIcon.imageset
Android 🤖#
You just have to replace the splash_icon.png located at :

src > android > app > src > res > drawable
```

# @react-native-async-storage/async-storage

```
https://github.com/react-native-async-storage/async-storage#readme

yarn add @react-native-async-storage/async-storage
```

# react-native-magnus

```
styling framework for react-native

1. yarn add react-native-magnus
2. yarn add color react-native-animatable react-native-modal react-native-vector-icons deepmerge validate-color

```

# react-native-vector-icons

```
https://github.com/oblador/react-native-vector-icons

some platform configurations needed to be done to run icons correctly
```

# react-navigation

```
https://reactnavigation.org/docs/getting-started
1. yarn add @react-navigation/native
2. yarn add react-native-screens react-native-safe-area-context
DEPRACATED:
react-native-gesture-handler react-native-reanimated
3. npx pod-install ios || cd ios && pod install ( i think )
4. android/app/src/main/java/<your package name>/MainActivity.java ->
  a.) add in MainActivity class:
    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
    }
  b.) import android.os.Bundle; --> add at top of file
5. yarn add @react-navigation/native-stack
6. yarn add @react-navigation/bottom-tabs

* if side drawer is wanted:
https://reactnavigation.org/docs/drawer-navigator#installation
1. yarn add @react-navigation/drawer
2. yarn add react-native-gesture-handler react-native-reanimated

```

# State Management --> redux

```
https://redux.js.org/introduction/getting-started

toolkit:
yarn add @reduxjs/toolkit react-redux

```

# react-native-community/hooks

```
https://github.com/react-native-community/hooks

yarn add @react-native-community/hooks

```

# zoontek/react-native-permissions

```
https://github.com/zoontek/react-native-permissions

yarn add react-native-permissions
```

# react-redux-firebase

```

https://github.com/prescottprue/react-redux-firebase
http://react-redux-firebase.com/

yarn add react-redux-firebase

```

# RNFirebase

```

https://rnfirebase.io/
https://rnfirebase.io/

yarn add @react-native-firebase/app
yarn add @react-native-firebase/auth
yarn add @react-native-firebase/storage
yarn add @react-native-firebase/firestore
yarn add @react-native-firebase/functions
yarn add @react-native-firebase/messaging
yarn add @react-native-firebase/database # for walkaround createUser bug

```

# redux-firestore

```

https://github.com/prescottprue/redux-firestore

yarn add redux-firestore

```

# redux-logger

```

https://github.com/LogRocket/redux-logger

yarn add redux-logger
yarn add -D @types/redux-logger

```

# redux-devtools-extension

```

https://github.com/zalmoxisus/redux-devtools-extension

yarn add -D redux-devtools-extension

```

# patch-package

```
https://www.npmjs.com/package/patch-package

yarn add patch-package postinstall-postinstall

package.json -->
 "scripts": {
+  "postinstall": "patch-package"
 }

 useage: npx patch-package package-name

 needed for:
 *react-native-gifted-chat
  TypeError: _reactNative.Keyboard.removeListener is not a function. (In '_reactNative.Keyboard.removeListener('keyboardWillShow', invertibleProps.onKeyboardWillShow)', '_reactNative.Keyboard.removeListener' is undefined)
```

# formik and yup

```
https://formik.org/docs/overview

https://www.npmjs.com/package/formik

yarn add formik
yarn add yup

import * as React from 'react'
import { Formik, FormikProps } from 'formik'

interface Props {
  initialValues: any
  onSubmit: any
  validationSchema: object
  children: any
}

export default function ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  )
}


```

# @react-native-google-signin/google-signin

```
https://www.npmjs.com/package/@react-native-google-signin/google-signin

yarn add @react-native-google-signin/google-signin
```

# react-native-image-picker

```
https://www.npmjs.com/package/react-native-image-picker

yarn add react-native-image-picker

```

# react-native-uuid

```
https://www.npmjs.com/package/react-native-uuid

yarn add react-native-uuid

import uuid from 'react-native-uuid';
uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'
```

# dayjs

```
https://day.js.org/docs/en/timezone/timezone
https://www.npmjs.com/package/dayjs

yarn add dayjs

```

# react-native-progress

```
https://github.com/oblador/react-native-progress

yarn add react-native-progress

yarn add react-native-svg
```

TODO: will use

# react-native-iap@next

```

yarn add react-native-iap@next

https://github.com/dooboolab/react-native-iap
```
