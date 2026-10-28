import { ui } from '../data'
import { useLang } from '../i18n'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer mono">
      <span>© {new Date().getFullYear()} van1dal</span>
      <span className="dim">{t(ui.footer)}</span>
      <a href="#top">↑ top</a>
    </footer>
  )
}
