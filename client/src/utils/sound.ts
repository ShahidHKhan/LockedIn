export function playBell() {
  try {
    const url = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
    const a = new Audio(url)
    // attempt to play and ignore promise rejection (browsers may block autoplay)
    a.play().catch(() => {})
  } catch (e) {
    // noop
  }
}
