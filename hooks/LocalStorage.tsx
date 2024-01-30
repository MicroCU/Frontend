import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState<T>(fallbackValue);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored === "undefined") {
      setValue(fallbackValue);
      return;
    }
    setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
