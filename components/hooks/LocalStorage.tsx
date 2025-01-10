/* eslint-disable no-console */
import { useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const value = window.localStorage.getItem(key);

      if (value) return JSON.parse(value);
      window.localStorage.setItem(key, JSON.stringify(initialValue));

      return initialValue;
    } catch (error) {
      console.log(error);
    }
  });

  const setValue = (value: T) => {
    if (typeof window === "undefined") return initialValue;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
}

export default useLocalStorage;
