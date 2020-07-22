let eventHandler = () => {}

export default {
  inserted(el, binding) {
    eventHandler = event => {
      if (!el.contains(event.target)) {
        binding.value()
      }
    }

    document.addEventListener('click', eventHandler, true)
  },

  unbind() {
    document.removeEventListener('click', eventHandler, true)
  }
}
