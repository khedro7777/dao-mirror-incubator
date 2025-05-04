
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation, LanguageKey } from "@/utils/translations";

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: LanguageKey): string => {
    return getTranslation(language, key);
  };
  
  return { t };
};
