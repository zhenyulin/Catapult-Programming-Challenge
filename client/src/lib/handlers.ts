export const handleIntInput = (handler: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
  handler(parseInt(e.target.value) || 0)
}

export const handleFloatInput = (handler: Function) => (valueString: string) => {
  const value = valueString.replace(/^\$/, '')
  handler(value || 0.0)
}

const handlers = {
  handleIntInput,
  handleFloatInput,
}

export default handlers
