---
title: Graceful shutdown для Gin за 20 строк
date: 2026-10-22
summary: Как не обрывать запросы при перезапуске контейнера — сигналы, http.Server и таймаут.
tags: Go, Gin, Docker
---

`r.Run(":8080")` удобен, но при `docker stop` процесс получает `SIGTERM`, и запросы, которые ещё выполняются, обрываются. Лечится стандартной библиотекой.

## Свой http.Server вместо r.Run

```go
srv := &http.Server{
    Addr:    ":8080",
    Handler: r,
}

go func() {
    if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
        log.Fatal(err)
    }
}()
```

## Ждём сигнал и даём запросам доработать

```go
ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
defer stop()
<-ctx.Done()

shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

if err := srv.Shutdown(shutdownCtx); err != nil {
    log.Printf("shutdown: %v", err)
}
```

`Shutdown` перестаёт принимать новые соединения и ждёт, пока текущие запросы закончатся, — но не дольше таймаута.

## Не забыть про Docker

Docker ждёт 10 секунд после `SIGTERM`, потом шлёт `SIGKILL`. Таймаут в коде должен быть меньше — или увеличь `stop_grace_period` в `docker-compose.yml`.

И запускай бинарник напрямую (`CMD ["/app"]`), а не через `sh -c` — иначе сигнал получит шелл, а не твой сервис.
