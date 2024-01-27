import { getDictionary } from "@/get-dictionary";
import OnBoardContent from "./onboard";
import { Locale } from "@/i18n-config";

export default async function Onboard({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <OnBoardContent dictionary={dictionary} />;
}
