export const percentage = (duration: number, elapsed: number) => {
  if (duration <= 0) {
    return 0
  }
  return (elapsed / duration) * 100
}

export const minutes = (seconds: number) => Math.floor(seconds / 60)

export const seconds = (seconds: number) =>
  Math.floor(seconds % 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })
