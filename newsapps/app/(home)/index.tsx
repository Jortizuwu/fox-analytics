import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Listings from '@/components/listings'

const Page = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Listings />
    </GestureHandlerRootView>
  )
}

export default Page
