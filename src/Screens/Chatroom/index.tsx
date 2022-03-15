import * as React from 'react'
import {
  GiftedChat,
  GiftedChatProps,
  IMessage,
  InputToolbar,
  InputToolbarProps,
} from 'react-native-gifted-chat'
import {
  useFirebase,
  useFirestore,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
  useFirestoreConnect,
  isLoaded,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Text, Button, SearchBar } from '@/Components'
import Logger from '@/Utils/Logger'
import { useAppSelector } from '@/Hooks'

const { useEffect, useState, useCallback } = React
export default function Chatroom({}) {
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { auth } = firebase
  const { profile } = useAppSelector((state) => state.firebase)

  const [messages, setMessages] = useState<IMessage[]>([])

  const RenderInputToolbar = (props: InputToolbarProps) => (
    // Config.chatFeatureMediaUploadOn() ? (
    //   <InputToolbar {...props} onPressActionButton={openDropdown} />
    // ) : (
    <InputToolbar {...props} />
  )
  // )

  const onSend = useCallback((messages = []) => {
    setMessages((prevMsgs) => GiftedChat.append(prevMsgs, messages))
    // addMessageToFirestore(chatMsg({ ...messages[0], uid }))
  }, [])

  return (
    <MainContainer
      headerProps={{
        heading: 'Chatroom',
      }}>
      <GiftedChat
        placeholder={'Say Hi...'}
        inverted
        messages={messages}
        // messages={currentChat
        //   ?.map((chat: any) => {
        //     return { ...chat, createdAt: new Date(chat.createdAt.toDate()) }
        //   })
        //   .sort((a: any, b: any) => b.createdAt - a.createdAt)}
        showAvatarForEveryMessage
        onSend={onSend}
        // user={chatUser(profile, uid)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={RenderInputToolbar}
      />
    </MainContainer>
  )
}
