import "server-only";
import type { Locale } from "./i18n-config";

const dictionaries = {
  enUS: () => import("./dictionaries/en-US.json").then((module) => module.default),
  thTH: () => import("./dictionaries/th-TH.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  switch (locale) {
    case "en-US":
      return await dictionaries.enUS();
    case "th-TH":
      return await dictionaries.thTH();
  }
}
