import { useState } from "react";

export const useLocalStorage = <K, T = K | null>(key: string): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(JSON.parse(localStorage.getItem(key) || 'null'))

  const setStateDecorator = (value: T) => {
    setState(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [state, setStateDecorator]
}
