import { Ionicons } from '@expo/vector-icons'
import { MasonryFlashList } from '@shopify/flash-list'
import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native'

import Colors from '@/constants/Colors'
import { defualtStyle as defaultStyles } from '@/constants/style'
import { useListNews } from '@/hooks/useListNews'

const Listings = () => {
  const [nextPage, setNextPage] = useState(2)

  const { isLoading, isFetchingNextPage, news, fetchNextPage } = useListNews()

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={Colors.dark} />
      </View>
    )
  }

  if (news?.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'mon-b',
            fontSize: 14,
            justifyContent: 'flex-end',
          }}>
          SIN DATA
        </Text>
      </View>
    )
  }

  return (
    <View style={defaultStyles.container}>
      <StatTile />
      <MasonryFlashList
        showsVerticalScrollIndicator
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Linking.openURL(item.url)
            }}>
            <View style={styles.listing}>
              <Image
                source={{
                  uri: item.urlToImage
                    ? item.urlToImage
                    : 'https://th.bing.com/th/id/OIP.AC9frN1qFnn-I2JCycN8fwHaEK?rs=1&pid=ImgDetMain',
                }}
                style={styles.image}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                  gap: 2,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'mon-b',
                    }}
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'mon-sb',
                      textAlign: 'justify',
                    }}
                    numberOfLines={3}>
                    {item.content}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'mon-b',
                      textAlign: 'justify',
                      paddingTop: 5,
                    }}
                    numberOfLines={3}>
                    {`${new Date(item.publishedAt).toDateString()}`}
                  </Text>
                </View>
                <View
                  style={{
                    // flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'mon-b',
                      fontSize: 14,
                      justifyContent: 'flex-end',
                    }}
                    numberOfLines={1}>
                    Autor {item.author}
                  </Text>
                  <Ionicons name="link" size={20} color="#888" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        estimatedItemSize={200}
        onEndReached={() => {
          setNextPage(state => state + 1)
          fetchNextPage({
            pageParam: nextPage,
          })
        }}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <></>
          )
        }
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}

function StatTile() {
  return (
    <View style={stylesTitle.container}>
      <Text style={stylesTitle.value}>News</Text>
    </View>
  )
}

const stylesTitle = StyleSheet.create({
  container: {
    minWidth: 100,
    paddingHorizontal: 16,
    marginTop: 40,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  title: {
    color: '#888',
    textAlign: 'center',
  },
})

const styles = StyleSheet.create({
  listing: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  image: {
    width: '30%',
    height: 140,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
})

export default Listings
