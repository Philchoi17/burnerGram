import * as React from 'react'
import { ScrollView } from 'react-native'
import { Div } from 'react-native-magnus'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
  ExtendedFirebaseInstance,
  ExtendedFirestoreInstance,
} from 'react-redux-firebase'

import { MainContainer } from '@/Containers'
import { Text } from '@/Components'
import { FeedCard } from '@/Components/Cards'
import Logger from '@/Utils/Logger'
import { useAppSelector } from '@/Hooks'

interface Props {}

export default function ProfileFeed({}: Props): React.ReactElement {
  const { params } = useRoute()
  const [firebase, firestore]: [
    ExtendedFirebaseInstance,
    ExtendedFirestoreInstance,
  ] = [useFirebase(), useFirestore()]

  const { profile } = useAppSelector(({ firebase }) => firebase)

  const { posts: feedPosts }: any = params

  const handleLike = (uid: any, feedPost: any) => {}
  const handleDislike = (uid: any, feedPost: any) => {}
  const handleComment = (feedPost: any) => {}
  const handleSupport = (profile: any, feedPostId: any) => {}

  // Logger.debug('posts =', posts)
  return (
    <MainContainer
      headerProps={{
        heading: 'Profile Feed',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Div p="md">
          <Text>User Feed</Text>
          {feedPosts.map((feedPost: any, idx: number) => {
            return (
              <FeedCard
                key={String(idx)}
                downloadURL={feedPost.downloadURL}
                postOwner={feedPost.postOwner}
                description={feedPost.description}
                updatedAt={feedPost.updatedAt}
                handleLike={() => handleLike(profile.uid, feedPost)}
                liked={feedPost.likedUsers.includes(profile.uid)}
                handleDislike={() => handleDislike(profile.uid, feedPost)}
                disliked={feedPost.dislikedUsers.includes(profile.uid)}
                likedCount={feedPost.likedUsers?.length || 0}
                dislikedCount={feedPost.dislikedUsers?.length || 0}
                handleComment={() => handleComment(feedPost)}
                commentCount={feedPost.commentCount}
                handleSupport={() => handleSupport(profile, feedPost.id)}
                moreOptions={() => {}}
                supportCount={feedPost.supportCount}
                profile={profile}
              />
            )
          })}
        </Div>
      </ScrollView>
    </MainContainer>
  )
}
