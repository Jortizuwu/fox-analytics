import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // eslint-disable-next-line no-void
    void WebBrowser.warmUpAsync()
    return () => {
      // eslint-disable-next-line no-void
      void WebBrowser.coolDownAsync()
    }
  }, [])
}
