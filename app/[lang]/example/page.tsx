"use client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import I18nTypo from "@/components/ui/I18nTypo";
import { useAuth } from "@/context/Auth";
import { useTranslation } from "@/context/Translation";
import Link from "next/link";
import { Player as Lottie } from "@lottiefiles/react-lottie-player";

export default function Example() {
  const { lang, dict } = useTranslation();
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div>
      <LanguageSwitcher />
      <I18nTypo> {dict["onboard.welcome.title"]} </I18nTypo>
      <div>
        <p> {user ? user.id : "Not found ID"}</p>
        <p> {user ? user.name : "Not found Name"}</p>
      </div>
      <Lottie
        autoplay
        loop
        src="/lottie/cat.json"
        className="aspect-square h-[300px]"
      />
      <Link href={`/${lang}/try`}> To Another Page </Link>
    </div>
  );
}
