import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// type ValueOrFunction<T> = T | ((prevState: T) => T);

// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [state, setState] = useState(() => {
//     try {
//       const value = window.localStorage.getItem(key);
//       return value ? JSON.parse(value) : initialValue;
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   const setValue = (value: ValueOrFunction<T>): void => {
//     try {
//       const valueToStore = value instanceof Function ? value(state) : value;
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       setState(value);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [state, setValue];
// }
