import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  carousel: {
    height: null,
    width: null,
  },
  clothing: {
    height: 180,
    width: 180,
  },
  footer: {
    maxHeight: 80,
    flex: -1,
    alignSelf: 'flex-end'
  },
  cameraRoll: {
    flex: 3,
  },
  marker: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
});

export default styles