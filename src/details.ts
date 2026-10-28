import type { Lang } from './data'

type Details = {
  features: Record<Lang, string[]>
  tree?: string
  run?: string
}

export const details: Record<string, Details> = {
  ownvim: {
    features: {
      ru: [
        'Панели на своих местах, как в IDE: проект, структура, тесты и БД слева; терминал, запуск, проблемы и задачи снизу',
        'Режимы Code · Tests · Debug · Git · Database по одной клавише, поиск везде на space space',
        'Код на экране через ~70 мс после запуска, буква появляется через ~6 мс после нажатия',
        'Настройка одним settings.jsonc с автодополнением ключей и валидацией — без Lua и без перезапуска',
        'Плагины, парсеры, LSP, форматтеры и линтеры ставятся сами при первом открытии языка',
        'Для бэкенда: ▶ у main и тестов, отладчик цепляется к Docker, эндпоинты Gin, .http-запросы, живой compose.yaml',
        'Расширения без кода (JSONC-бандлы) и на Go — работают без перезапуска',
        '60+ тем, включая любые темы из VS Code Marketplace',
      ],
      en: [
        'Panels where an IDE has them: project, structure, tests and DB on the left; terminal, run, problems and tasks at the bottom',
        'Code · Tests · Debug · Git · Database modes on one key, search everywhere on space space',
        'Code on screen ~70 ms after launch, a typed letter appears ~6 ms after the keypress',
        'Configured with one settings.jsonc with key completion and validation — no Lua, no restart',
        'Plugins, parsers, LSPs, formatters and linters install themselves the first time a language is opened',
        'Backend-first: ▶ next to main and tests, a debugger that attaches to Docker, Gin endpoints, .http requests, a live compose.yaml',
        'Extensions without code (JSONC bundles) and in Go — work without a restart',
        '60+ themes, including any VS Code Marketplace theme',
      ],
    },
    tree: `ownvim/
├── init.lua
├── defaults.jsonc   # все настройки по умолчанию
├── core/
├── lua/
├── extensions/      # расширения на Go и JSONC
├── themes/
├── icons/
├── snippets/
├── vscode/
└── scripts/`,
    run: `brew install neovim tree-sitter ripgrep go
git clone https://github.com/van1dalgrr-arch/ownvim ~/dev/ownvim
ln -s ~/dev/ownvim ~/.config/ownvim
echo 'alias ownvim="NVIM_APPNAME=ownvim nvim"' >> ~/.zshrc && exec zsh
ownvim`,
  },
  gw: {
    features: {
      ru: [
        'Дашборд, репозитории, PR, issues, GitHub Actions с логами, живая лента событий и код — в одном TUI на 8 вкладок',
        'Встроенный терминал по «:» с историей и родными цветами команд',
        'Merge PR, комментарии, создание и закрытие issue, перезапуск упавших job-ов прямо из TUI',
        'Фоновый демон следит за GitHub и шлёт важное в Telegram',
        'Можно без своего сервера: workflow раз в 5 минут запускает gw notify на серверах GitHub',
        'Полноценный CLI на Cobra: gw pr, gw issue, gw run logs, gw events',
      ],
      en: [
        'Dashboard, repos, PRs, issues, GitHub Actions with logs, a live event feed and code — one TUI with 8 tabs',
        'A built-in terminal on ":" with history and native command colors',
        'Merge PRs, comment, create and close issues, rerun failed jobs right from the TUI',
        'A background daemon watches GitHub and pushes what matters to Telegram',
        'No server needed: a workflow runs gw notify on GitHub runners every 5 minutes',
        'A full Cobra CLI: gw pr, gw issue, gw run logs, gw events',
      ],
    },
    tree: `github-watcher/
├── cmd/gw/           # точка входа
├── internal/
│   ├── cli/          # команды Cobra: daemon, notify, telegram…
│   ├── tui/          # Bubble Tea: вкладки, списки, код, терминал
│   ├── github/       # клиент go-github
│   ├── watcher/      # слежение за событиями
│   ├── notify/       # уведомления в Telegram
│   ├── server/
│   └── config/
└── bot/              # Telegram-бот на telebot v4`,
    run: `go install github.com/van1dalgrr-arch/github-watcher/cmd/gw@latest
gh auth login
gw                  # TUI
gw daemon           # уведомления
gw telegram TOKEN   # подключить телефон`,
  },
  logsence: {
    features: {
      ru: [
        'REST API для сбора логов на Gin',
        'Слои handler → service → repository, доменная модель отдельно',
        'Конфиг с валидацией, свой логгер в pkg/',
        'SQL-миграции и PostgreSQL через pgx и sqlx',
        'Docker и docker-compose, Makefile на все случаи: up, logs, db, test, reset',
      ],
      en: [
        'A REST API for log collection on Gin',
        'handler → service → repository layers, a separate domain model',
        'Config with validation, its own logger in pkg/',
        'SQL migrations and PostgreSQL via pgx and sqlx',
        'Docker and docker-compose, a Makefile for everything: up, logs, db, test, reset',
      ],
    },
    tree: `logsence/
├── cmd/api/main.go
├── internal/
│   ├── config/       # загрузка и валидация
│   ├── domain/       # модель лога
│   ├── handler/      # HTTP
│   ├── service/      # бизнес-логика
│   └── repository/   # PostgreSQL
├── pkg/logger/
├── migrations/
├── config.yml
└── docker-compose.yml`,
    run: `make up      # PostgreSQL + API в Docker
make logs
make test`,
  },
  OrderGo: {
    features: {
      ru: [
        'REST API для заказов на Gin',
        'YAML-конфиг, отдельные слои config, domain, handler, repository, server, service',
        'Интерфейс OrderRepository и реализация на PostgreSQL через sqlx',
        'Создание заказа и получение по ID',
        'Docker Compose с PostgreSQL, Makefile: run, test, up, logs, db',
      ],
      en: [
        'An orders REST API on Gin',
        'YAML config, separate config, domain, handler, repository, server, service layers',
        'An OrderRepository interface and a PostgreSQL implementation with sqlx',
        'Create an order and fetch it by ID',
        'Docker Compose with PostgreSQL, a Makefile: run, test, up, logs, db',
      ],
    },
    tree: `OrderGo/
├── cmd/api/main.go
└── internal/
    ├── config/       # конфигурация
    ├── domain/       # модели
    ├── handler/      # HTTP-хендлеры
    ├── repository/   # доступ к БД
    ├── server/       # сервер и роуты
    └── service/      # бизнес-логика`,
    run: `make up     # поднять в Docker
make run    # локально
make test`,
  },
  watchdog: {
    features: {
      ru: [
        'Каждые 5 секунд шлёт GET /health на целевой сервер',
        'Пишет [OK], если сервер жив, и [ERROR], если не отвечает',
        'Тестовый сервер для проверки в комплекте',
        'Собирается в Docker-образ',
      ],
      en: [
        'Sends GET /health to the target server every 5 seconds',
        'Logs [OK] when the server is alive and [ERROR] when it is not',
        'Ships with a test server to try it out',
        'Builds into a Docker image',
      ],
    },
    tree: `┌──────────────┐
│   watchdog   │
└──────┬───────┘
       │ GET /health  (каждые 5 с)
       ▼
┌──────────────┐
│  server:8080 │
└──────┬───────┘
       ├── 200 OK ──► [OK]
       └── error ───► [ERROR]`,
    run: `go run .
# или
docker build -t watchdog .`,
  },
  Pulse: {
    features: {
      ru: [
        'Свой API поверх Gin: Gin спрятан внутри',
        'Лёгкий контекст pulse.Ctx',
        'GET / POST / PUT / DELETE, параметры пути и query',
        'Биндинг тела запроса, JSON-ответы, управление статусом',
        'Поддержка middleware',
      ],
      en: [
        'Its own API on top of Gin, with Gin hidden inside',
        'A lightweight pulse.Ctx context',
        'GET / POST / PUT / DELETE, path and query params',
        'Request body binding, JSON responses, status control',
        'Middleware support',
      ],
    },
    run: `app := pulse.New()

app.Get("/users/:id", func(c *pulse.Ctx) {
    c.JSON(map[string]any{"id": c.Param("id")})
})

app.Run(":8080")`,
  },
  dotfiles: {
    features: {
      ru: ['Весь dev-сетап на macOS в одном репозитории', 'install.sh ставит ownvim, gw и всё остальное', 'Ghostty, шрифты, алиасы'],
      en: ['My whole macOS dev setup in one repo', 'install.sh installs ownvim, gw and the rest', 'Ghostty, fonts, aliases'],
    },
  },
}
