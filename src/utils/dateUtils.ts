
import { getTranslation } from "@/utils/translations";
import type { Language } from "@/utils/translations";

/**
 * Formats a date string into a relative time string (e.g., "2 days ago")
 */
export const formatTimeAgo = (dateString: string, language: Language = "en") => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} ${diffDays > 1 ? getTranslation(language, 'days') : getTranslation(language, 'day')} ${getTranslation(language, 'ago')}`;
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours > 1 ? getTranslation(language, 'hours') : getTranslation(language, 'hour')} ${getTranslation(language, 'ago')}`;
  } else if (diffMins > 0) {
    return `${diffMins} ${diffMins > 1 ? getTranslation(language, 'minutes') : getTranslation(language, 'minute')} ${getTranslation(language, 'ago')}`;
  } else {
    return getTranslation(language, 'justNow');
  }
};
