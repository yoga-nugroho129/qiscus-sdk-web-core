export default {
  typing (topic, message) {
    vStore.dispatch('setTyping', { topic, message })
  },
  read (topic, message) {
    vStore.dispatch('setRead', { topic, message })
  }
}
