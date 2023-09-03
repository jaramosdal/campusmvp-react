import { useState } from "react"

export const useInput = (defaultValue) => {
  const [currentValue, setValue] = useState(defaultValue)
  const updateValue = event => setValue(event.target.value)
  return [currentValue, updateValue]
}