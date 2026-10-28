export type Lang = 'ru' | 'en'
type T = Record<Lang, string>

export const GITHUB_USER = 'van1dalgrr-arch'

export const contacts = {
  email: 'van1dalgrr@gmail.com',
  github: `https://github.com/${GITHUB_USER}`,
}

export const ui = {
  nav: {
    top: { ru: 'главная', en: 'home' },
    about: { ru: 'обо мне', en: 'about' },
    projects: { ru: 'проекты', en: 'projects' },
    activity: { ru: 'активность', en: 'activity' },
    terminal: { ru: 'терминал', en: 'terminal' },
    contact: { ru: 'контакты', en: 'contact' },
  },
  pages: {
    cv: { ru: 'резюме', en: 'cv' },
    blog: { ru: 'блог', en: 'blog' },
    back: { ru: '← на главную', en: '← home' },
  },
  status: {
    working: { ru: 'сейчас пилю', en: 'now hacking on' },
  },
  project: {
    features: { ru: 'Что умеет', en: 'Features' },
    tree: { ru: 'Как устроен', en: 'How it is built' },
    run: { ru: 'Запуск', en: 'Run it' },
    repo: { ru: 'Открыть на GitHub', en: 'Open on GitHub' },
    next: { ru: 'Следующий проект', en: 'Next project' },
    notFound: { ru: 'Такого проекта нет', en: 'No such project' },
  },
  cv: {
    download: { ru: 'Скачать PDF', en: 'Download PDF' },
    summary: { ru: 'О себе', en: 'Summary' },
    skills: { ru: 'Навыки', en: 'Skills' },
    experience: { ru: 'Опыт', en: 'Experience' },
    projects: { ru: 'Проекты', en: 'Projects' },
    contacts: { ru: 'Контакты', en: 'Contacts' },
    teamRole: {
      ru: 'Go-разработчик в команде. Пишу бэкенд, участвую в ревью, держу общие договорённости по коду и API.',
      en: 'Go developer in a team. Writing the backend, doing reviews, keeping shared code and API conventions.',
    },
  },
  blog: {
    title: { ru: 'Блог', en: 'Blog' },
    sub: { ru: 'Заметки про Go, бэкенд и инструменты', en: 'Notes on Go, backend and tools' },
    read: { ru: 'мин чтения', en: 'min read' },
    all: { ru: '← все заметки', en: '← all posts' },
    notFound: { ru: 'Такой заметки нет', en: 'No such post' },
  },
  hero: {
    line1: { ru: 'Привет,', en: 'Hi,' },
    line2: { ru: 'я', en: "I'm" },
    line3: { ru: 'Go-разработчик.', en: 'Go developer.' },
    tagline: { ru: 'Backend Developer / Go · PostgreSQL · Docker', en: 'Backend Developer / Go · PostgreSQL · Docker' },
    ctaContact: { ru: 'Написать мне!', en: 'Contact me!' },
  },
  about: {
    title: { ru: 'Обо мне', en: 'About' },
    summary: {
      ru: 'Бэкенд-разработчик на Go из Санкт-Петербурга. Пишу REST-сервисы на Gin с PostgreSQL и Redis, упаковываю в Docker, гоняю тесты и линтеры в CI на каждый пуш. Делаю инструменты для разработчиков: терминальный IDE на Neovim и GitHub-клиент для терминала с уведомлениями в Telegram.',
      en: 'Go backend developer from Saint Petersburg. I build REST services on Gin with PostgreSQL and Redis, ship them in Docker, and run tests and linters in CI on every push. I make developer tools: a Neovim-based terminal IDE and a terminal GitHub client with Telegram alerts.',
    },
    text: {
      ru: 'Я бэкенд-разработчик на Go. Люблю, когда сервис устроен по слоям, конфиг лежит в одном месте, а деплой — это git push. Работаю в команде над бэкендом kinoza-back, а в свободное время делаю инструменты для себя: свой терминальный IDE на Neovim, GitHub-клиент в терминале и сервисы для логов и мониторинга.',
      en: 'I am a Go backend developer. I like services with clean layers, config in one place and deploys that are just a git push. I work on the kinoza-back backend in a team, and in my spare time I build tools for myself: a Neovim-based terminal IDE, a GitHub client for the terminal, and services for logs and monitoring.',
    },
    facts: [
      { k: { ru: 'город', en: 'city' }, v: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' } },
      { k: { ru: 'основной язык', en: 'main language' }, v: { ru: 'Go', en: 'Go' } },
      { k: { ru: 'ещё умею', en: 'also' }, v: { ru: 'Java / Spring Boot', en: 'Java / Spring Boot' } },
      { k: { ru: 'редактор', en: 'editor' }, v: { ru: 'ownvim (свой)', en: 'ownvim (my own)' } },
    ],
  },
  stats: {
    repos: { ru: 'публичных репо', en: 'public repos' },
    followers: { ru: 'подписчиков', en: 'followers' },
    since: { ru: 'на GitHub с', en: 'on GitHub since' },
    stars: { ru: 'звёзд', en: 'stars' },
  },
  projects: {
    title: { ru: 'Проекты', en: 'Projects' },
    sub: { ru: 'То, что я написал и чем пользуюсь сам', en: 'Things I built and actually use' },
    code: { ru: 'код', en: 'code' },
    team: { ru: 'командный', en: 'team' },
  },
  activity: {
    title: { ru: 'Недавно в работе', en: 'Recently active' },
    sub: { ru: 'Живые данные с GitHub', en: 'Live from GitHub' },
  },
  palette: {
    placeholder: { ru: 'Куда перейти?', en: 'Where to?' },
    empty: { ru: 'Ничего не найдено', en: 'Nothing found' },
    sections: { ru: 'Разделы', en: 'Sections' },
    projects: { ru: 'Проекты', en: 'Projects' },
    actions: { ru: 'Действия', en: 'Actions' },
    copyEmail: { ru: 'Скопировать email', en: 'Copy email' },
    switchLang: { ru: 'Switch to English', en: 'Переключить на русский' },
  },
  terminal: {
    title: { ru: 'Поговори с терминалом', en: 'Talk to the terminal' },
    sub: { ru: 'Набери help — или просто нажми на команду', en: 'Type help — or just click a command' },
  },
  contact: {
    title: { ru: 'Давай сделаем что-нибудь', en: "Let's build something" },
    sub: {
      ru: 'Открыт к работе бэкенд-разработчиком на Go. Пиши — отвечаю быстро.',
      en: 'Open to Go backend roles. Drop me a line — I reply fast.',
    },
    copy: { ru: 'скопировать', en: 'copy' },
    copied: { ru: 'скопировано!', en: 'copied!' },
  },
  footer: { ru: 'собрано на React + Framer Motion', en: 'built with React + Framer Motion' },
} satisfies Record<string, unknown>

export type Project = {
  name: string
  repo: string
  tagline: T
  desc: T
  tags: string[]
  team?: boolean
}

export const projects: Project[] = [
  {
    name: 'ownvim',
    repo: 'https://github.com/van1dalgrr-arch/ownvim',
    tagline: { ru: 'Терминальный IDE для бэкенда на Neovim', en: 'A terminal IDE for backend work, built on Neovim' },
    desc: {
      ru: 'Панели как в GoLand, режимы Code · Tests · Debug · Git · Database, настройка одним JSON без Lua. Код на экране через ~70 мс, отладчик цепляется к Docker, расширения на Go без перезапуска, 60+ тем.',
      en: 'GoLand-style panels, Code · Tests · Debug · Git · Database modes, configured with one JSON file, no Lua. Code on screen in ~70 ms, a debugger that attaches to Docker, Go extensions without restart, 60+ themes.',
    },
    tags: ['Neovim', 'Lua', 'Go', 'LSP', 'DAP'],
  },
  {
    name: 'gw',
    repo: 'https://github.com/van1dalgrr-arch/github-watcher',
    tagline: { ru: 'GitHub в терминале + Telegram-уведомления', en: 'GitHub in your terminal + Telegram alerts' },
    desc: {
      ru: 'PR, issues, GitHub Actions с логами и живая лента событий в одном TUI. Фоновый демон следит за репозиториями и шлёт важное в Telegram.',
      en: 'PRs, issues, GitHub Actions with logs and a live event feed in one TUI. A background daemon watches your repos and pushes what matters to Telegram.',
    },
    tags: ['Go', 'Bubble Tea', 'Cobra', 'go-github', 'telebot'],
  },
  {
    name: 'logsence',
    repo: 'https://github.com/van1dalgrr-arch/logsence',
    tagline: { ru: 'Сервис сбора логов', en: 'Log collection service' },
    desc: {
      ru: 'REST API со слоями handler → service → repository, миграции и PostgreSQL в docker-compose.',
      en: 'REST API with handler → service → repository layers, migrations and PostgreSQL in docker-compose.',
    },
    tags: ['Go', 'Gin', 'pgx', 'sqlx', 'Docker'],
  },
  {
    name: 'kinoza-back',
    repo: 'https://github.com/orionvega2343-cloud/kinoza-back',
    tagline: { ru: 'Бэкенд кино-сервиса, командный проект', en: 'Movie service backend, team project' },
    desc: {
      ru: 'Пишу Go-бэкенд в команде: ревью, общие договорённости по коду и API.',
      en: 'Writing the Go backend as part of a team: reviews, shared code and API conventions.',
    },
    tags: ['Go', 'PostgreSQL', 'Team'],
    team: true,
  },
  {
    name: 'Pulse',
    repo: 'https://github.com/van1dalgrr-arch/Pulse',
    tagline: { ru: 'HTTP-фреймворк поверх Gin', en: 'An HTTP framework on top of Gin' },
    desc: {
      ru: 'Свой чистый API: контекст, middleware, биндинг тела и параметров — а Gin спрятан внутри.',
      en: 'Its own clean API: context, middleware, body and param binding — with Gin hidden inside.',
    },
    tags: ['Go', 'Gin', 'HTTP'],
  },
  {
    name: 'OrderGo',
    repo: 'https://github.com/van1dalgrr-arch/OrderGo',
    tagline: { ru: 'REST API заказов', en: 'Orders REST API' },
    desc: {
      ru: 'Чистая структура приложения: YAML-конфиг, Gin, PostgreSQL, Redis, Docker Compose.',
      en: 'Clean application layout: YAML config, Gin, PostgreSQL, Redis, Docker Compose.',
    },
    tags: ['Go', 'Gin', 'PostgreSQL', 'Redis'],
  },
  {
    name: 'watchdog',
    repo: 'https://github.com/van1dalgrr-arch/watchdog',
    tagline: { ru: 'Мониторинг аптайма', en: 'Uptime monitor' },
    desc: {
      ru: 'Каждые 5 секунд стучится в /health и сообщает, жив ли сервер.',
      en: 'Hits /health every 5 seconds and tells you whether the server is alive.',
    },
    tags: ['Go', 'Docker', 'DevOps'],
  },
  {
    name: 'dotfiles',
    repo: 'https://github.com/van1dalgrr-arch/dotfiles',
    tagline: { ru: 'Весь мой dev-сетап на macOS', en: 'My whole macOS dev setup' },
    desc: {
      ru: 'Одна команда install.sh — и на новом маке всё как у меня: терминал, шрифты, ownvim, gw.',
      en: 'One install.sh and a fresh Mac looks like mine: terminal, fonts, ownvim, gw.',
    },
    tags: ['Shell', 'macOS', 'Ghostty'],
  },
]

export const skills: { group: T; items: string[] }[] = [
  { group: { ru: 'Язык', en: 'Language' }, items: ['Go', 'Java / Spring Boot'] },
  { group: { ru: 'Бэкенд', en: 'Backend' }, items: ['Gin', 'REST', 'sqlx', 'pgx', 'Cobra', 'Bubble Tea'] },
  { group: { ru: 'Данные', en: 'Data' }, items: ['PostgreSQL', 'Redis', 'SQL-миграции'] },
  { group: { ru: 'Инфра', en: 'Infra' }, items: ['Docker', 'Docker Compose', 'GitHub Actions', 'Linux', 'Make'] },
  { group: { ru: 'Инструменты', en: 'Tools' }, items: ['Git', 'Bash', 'Neovim', 'Lua'] },
]

export const stack = [
  'Go', 'Gin', 'PostgreSQL', 'Redis', 'Docker', 'Docker Compose', 'GitHub Actions',
  'Linux', 'Git', 'Bash', 'Bubble Tea', 'sqlx', 'pgx', 'REST', 'Java', 'Spring Boot', 'Neovim', 'Lua',
]
