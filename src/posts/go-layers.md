---
title: Слои в Go-сервисе: handler → service → repository
date: 2026-10-29
summary: Как я раскладываю REST-сервис на Go по слоям и почему интерфейс репозитория живёт рядом с сервисом.
tags: Go, архитектура
---

Почти все мои сервисы — `logsence`, `OrderGo` — устроены одинаково:

```
cmd/api/main.go
internal/
├── config/
├── domain/
├── handler/
├── service/
└── repository/
```

## Кто за что отвечает

- **handler** — HTTP: разобрать запрос, провалидировать, вызвать сервис, отдать JSON. Никакого SQL.
- **service** — бизнес-логика. Не знает ни про Gin, ни про PostgreSQL.
- **repository** — доступ к данным. Знает про SQL и ничего не знает про HTTP.
- **domain** — модели, которыми слои обмениваются.

## Интерфейс — у потребителя

Сервису нужен репозиторий, поэтому интерфейс объявляет сервис:

```go
type OrderRepository interface {
    Create(ctx context.Context, o domain.Order) (int64, error)
    GetByID(ctx context.Context, id int64) (domain.Order, error)
}

type OrderService struct {
    repo OrderRepository
}
```

А `repository` просто реализует его на `sqlx`. Плюс сразу два: сервис тестируется с фейковым репозиторием без базы, а сменить хранилище — значит написать новую реализацию, не трогая логику.

## Сборка в main

Всё связывается в одном месте:

```go
db := sqlx.MustConnect("pgx", cfg.DSN)
repo := repository.NewOrders(db)
svc := service.NewOrders(repo)
h := handler.NewOrders(svc)

r := gin.Default()
h.Register(r)
r.Run(cfg.Addr)
```

Никаких глобальных переменных и DI-фреймворков — зависимости видны прямо в `main.go`.
