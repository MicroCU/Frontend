import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function Example({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <LanguageSwitcher />
      <p> {dictionary["onboard.welcome.title"]} </p>
    </div>
  );
}
