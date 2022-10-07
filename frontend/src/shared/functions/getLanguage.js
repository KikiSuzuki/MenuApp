export function getLanguage(lang) {
  if (lang.includes('kz')) {
    return 'kz';
  }
  return 'ru';
}

export default getLanguage;
