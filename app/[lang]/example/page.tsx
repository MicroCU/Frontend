"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useDictionaryContext } from "@/context/Dictionary";

export default function Example() {
  const dictionary = useDictionaryContext();

  return (
    <div>
      <LanguageSwitcher />
      <p> {dictionary["onboard.welcome.title"]} </p>
    </div>
  );
}
