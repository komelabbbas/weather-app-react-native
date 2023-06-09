import { StatusBar } from 'expo-status-bar'
import { LogBox } from 'react-native'
import AppProvider from './src'
import { ImageBackground } from 'react-native'

import bgImg from './assets/background.png'
import { FlashMessage } from '@/components/flash-message'

console.warn = () => {}
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

export default function App() {
  return (
    <ImageBackground source={bgImg} style={{ width: '100%', height: '100%' }}>
      <StatusBar style="auto" />
      <AppProvider />
      <FlashMessage position="top" />
    </ImageBackground>
  )
}
