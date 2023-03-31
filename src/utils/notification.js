import { StyleSheet } from 'react-native'
import { isIPhoneX } from '@/utils/platform'
import colors from '@/colors'
import { showMessage } from '@/components/flash-message'

export const showNotification = ({
  title = null,
  message = null,
  type: _type = 'success',
  duration = 2.5 * 1000,
  ...rest
}) => {
  if (!message) return

  const getTitle = () => {
    if (title) return title
    if (_type === 'success') return 'Success!'
    if (_type === 'error') return 'Error!'
  }

  const type = _type === 'error' ? 'danger' : _type
  const icon = { icon: type, style: styles.icon }
  let additionalParams = { ...styles.bgColor(_type) }

  showMessage({
    type,
    duration,
    icon,
    message: message,
    description: '',
    titleStyle: styles.title(_type),
    descriptionStyle: styles.message(_type),
    floating: true,
    style: styles.notification,
    ...additionalParams,
    ...rest
  })
}

const bgColor = {
  success: colors.danger,
  error: colors.danger
}

const styles = StyleSheet.create({
  bgColor: type => ({
    backgroundColor: bgColor[type]
  }),
  notification: {
    ...(isIPhoneX() && {
      marginTop: 5
    })
  },
  title: type => ({
    fontSize: 14,
    textAlign: 'left'
  }),
  message: type => ({
    fontSize: 14,
    textAlign: 'left'
  }),
  icon: {
    marginLeft: 0,
    marginRight: 12
  }
})
