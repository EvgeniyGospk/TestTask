# Архитектура ZenPulse (прототип)

Этот документ фиксирует архитектурные решения для прототипа **ZenPulse: AI Meditation App**. Цель — быстро собрать приложение под тестовое задание, но так, чтобы код оставался расширяемым: экраны не знали деталей подписок/AI, а бизнес-правила тестировались отдельно.

## Цели

- Быстрое прототипирование без “каши” в UI-слое.
- Single Responsibility: каждый модуль отвечает за одну вещь.
- Лёгкая замена моков (подписка/AI) на реальные интеграции.
- Контроль мобильной вёрстки: SafeArea, маленькие экраны, предсказуемые отступы.
- Возможность показать “инженерность” в истории коммитов и документации.

## Нецели (сознательные упрощения)

- Реальные in-app purchases (StoreKit/Billing) — заменяются моками.
- Реальный LLM по сети — опционально, по умолчанию мок, чтобы прототип работал оффлайн.
- Полноценный бэкенд, аккаунты, синхронизация.

---

## Слои и зависимости

### 1) UI слой: `screens/*` и `components/ui/*`

**Отвечает за:**
- layout, стили, композицию компонентов;
- показ состояний: loading/error/empty;
- вызов use-case функций через провайдеры/сервисы.

**Не отвечает за:**
- правила доступа (locked/unlocked);
- хранение подписки в storage;
- сборку AI промпта.

### 2) Feature слой: `features/*`

**Отвечает за:**
- модель предметной области фичи;
- правила доступа (`domain/*`);
- фичевые компоненты (карточки, списки), которые можно переиспользовать в разных экранах.

### 3) Services/Infrastructure: `services/*`

**Отвечает за:**
- подписку (мок покупок + персистентность);
- AI генерацию (мок/реальный провайдер);
- storage (AsyncStorage/secure store) как адаптер.

---

## Предлагаемая структура каталогов

```text
src/
  app/
    App.tsx
    navigation/
      RootNavigator.tsx
      routes.ts
    providers/
      SubscriptionProvider.tsx
  screens/
    PaywallScreen/
      PaywallScreen.tsx
    MeditationsScreen/
      MeditationsScreen.tsx
  features/
    meditations/
      data/
        meditations.ts
      domain/
        access.ts
      components/
        MeditationCard.tsx
  services/
    subscription/
      subscription.service.ts
      subscription.types.ts
    ai/
      ai.service.ts
      prompts.ts
      ai.types.ts
    storage/
      storage.ts
  components/
    ui/
      Screen.tsx
      Button.tsx
  theme/
    colors.ts
    spacing.ts
    typography.ts
```

### Правила по SRP

- `Screen.tsx` — только “обвязка” экрана: SafeArea + стандартные паддинги + maxWidth.
- `PaywallScreen.tsx` — только UI/UX paywall + вызов `buyPremium()`; никаких условий “кто premium”.
- `features/meditations/domain/access.ts` — единственное место, где живёт правило locked/unlocked.
- `services/*` — минимум логики UI, максимум “инфры” (storage, промпты, моки, API).

---

## Навигация и флоу

Минимальная навигация для прототипа — stack из 2 экранов:

- `Paywall`
- `Meditations`

Варианты входной точки:
- **Вариант A (понятнее для демо):** всегда начинать с Paywall, чтобы показать покупку.
- **Вариант B (логичнее для продукта):** если `isSubscribed=true` → сразу Meditations.

### Gating (заблокированный контент)

Правило:
- если `session.premiumOnly === true` и `isSubscribed === false` → карточка locked (визуально) и при нажатии ведёт на `Paywall`.

Важно: правило вычисляется в `access.ts`, а экран использует готовый результат (например, `getSessionAccess()`), чтобы UI был “тонким”.

---

## Модели данных (пример)

### MeditationSession

Минимально для списка:
- `id: string`
- `title: string`
- `durationMinutes: number`
- `image: ImageSource` (asset)
- `premiumOnly: boolean`

### SubscriptionState

- `isSubscribed: boolean`
- (опционально) `selectedPlan: 'monthly' | 'yearly'`
- (опционально) `updatedAt: number`

### Mood (AI)

3 варианта настроения, кодируются как enum/union (без привязки к отображению).

---

## Подписка: провайдер и сервис

### SubscriptionProvider (UI-граница)

Экспортирует:
- `isSubscribed`
- `buyPremium()` — мок успешной покупки
- `resetSubscription()` — удобно для демо/отладки (опционально)

Provider внутри использует `SubscriptionService`, а не AsyncStorage напрямую.

### SubscriptionService (инфраструктура)

Отвечает за:
- чтение/запись `isSubscribed` в storage;
- мок покупки: симулировать задержку, затем сохранить флаг.

Почему сервис:
- чтобы позже заменить реализацией RevenueCat/StoreKit/Billing, не меняя UI/feature слой.

---

## AI: сервис и промпты

AI изолируется в `services/ai/*`:

- `prompts.ts` — сборка текста промпта (чистые функции, удобно тестировать).
- `ai.service.ts` — оркестрация (mock vs real provider), задержка, ошибки, fallback.

UI вызывает `generateAffirmation(mood)` и получает:
- `text` (готово к показу)
- (опционально) `meta` (какой провайдер/модель, чтобы дебажить)

---

## UI/UX: SafeArea и маленькие экраны

Обязательные практики под мобилку:
- `Screen` как единая обёртка: SafeArea + базовые паддинги + `maxWidth` контейнера.
- Вертикально длинные экраны (Paywall) — через ScrollView.
- Длинные тексты (AI результат) — через ScrollView/контейнер с переносом.
- Кликабельные зоны — минимум 44pt по высоте; при необходимости `hitSlop`.

Почему это важно:
- это типичная зона, где AI “угадывает” плохо и ломает UI на маленьких экранах.

---

## Тестируемость: где держать “чистую” логику

Чтобы тесты были быстрыми и полезными:

- Правила доступа вынести в `features/.../domain` (чистые функции).
- Сборку промпта вынести в `services/ai/prompts.ts` (чистые функции).
- UI покрывать интеграционными тестами только на критические флоу (навигация + gating).

Список тестов и чеклист ручной проверки: `docs/QA_CHECKLIST.md`.

---

## Расширение (как добавлять фичи без “перепахивания”)

### Добавить новый тип контента (например, “дыхание”)

1. Создать `src/features/breathing/*` (data/domain/components).
2. Добавить экран в `src/screens/*` и подключить в навигации.
3. Переиспользовать `services/subscription` для gating.

### Подключить реальные покупки

1. Ввести интерфейс `SubscriptionService` (если ещё нет).
2. Реализовать `RevenueCatSubscriptionService` (или другой провайдер).
3. Подменить реализацию в provider (composition root), не меняя экраны.

### Подключить реальный LLM

1. Добавить `RealAiProvider` в `ai.service.ts`.
2. Вынести ключи в ENV/Config (не коммитить секреты).
3. Сохранить мок как fallback при отсутствии сети/ключей.

