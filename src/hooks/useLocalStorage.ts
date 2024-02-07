import { useState } from 'react'

interface useLocalStorageProps {
  keyName: string
  defaultValue: any
}

export const useLocalStorage = ({
  keyName,
  defaultValue
}: useLocalStorageProps) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)
      if (value) {
        return value
      } else {
        window.localStorage.setItem(keyName, defaultValue)
        return defaultValue
      }
    } catch (err) {
      return defaultValue
    }
  })
  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, newValue)
    } catch (err) {}
    setStoredValue(newValue)
  }
  return [storedValue, setValue]
}
