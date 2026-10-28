import { createContext, useContext } from 'react'
import type { Lang } from './data'

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'ru',
  setLang: () => {},
})

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  const t = <V,>(v: Record<Lang, V>) => v[lang]
  return { lang, setLang, t }
}
