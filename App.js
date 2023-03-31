import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { LogBox } from 'react-native'
import AppProvider from './src'

console.warn = () => {}
LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppProvider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
