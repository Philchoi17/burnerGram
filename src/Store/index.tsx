import React from 'react'
import { Provider } from 'react-redux'
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
// import Reducer from '@reduxjs/toolkit'

// firebase
import * as RNFirebase from '@react-native-firebase/app'
import '@react-native-firebase/storage'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import '@react-native-firebase/database'
import '@react-native-firebase/functions'
import '@react-native-firebase/messaging'

// redux firebase
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'
// needed if using firestore
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

// redux thunk
import { getFirebase } from 'react-redux-firebase'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
// import { api } from '@/Services/api'
// import * as modules from '@/Services/modules'

// redux debug
import { composeWithDevTools } from 'redux-devtools-extension'

interface RRFProviderProps {
  children: any
}

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const reducer: any = {
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  // [api.reducerPath]: api.reducer,
  // ...Object.values(modules).reduce(
  //   (acc, module) => ({
  //     ...acc,
  //     [module.reducerPath]: module.reducer,
  //   }),
  //   {},
  // ),
}

// const initialState = {}
const preloadedState = {}

const middlewares = [thunk.withExtraArgument(getFirebase) /*logger*/]

const composeEnhancers = composeWithDevTools({})

const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    ...middlewares,
    // api.middleware,
  ],
  enhancers: [],
})

const rrfProps = {
  firebase: RNFirebase.default,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default function RRFProvider({ children }: RRFProviderProps) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {children}
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
