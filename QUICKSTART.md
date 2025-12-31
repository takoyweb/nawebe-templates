# 🚀 Быстрый старт - Template Registry

## Запуск локально

### 1. Установка зависимостей

```bash
cd /Users/artemmedvedev/Desktop/project/nawebe-templates
npm install
```

### 2. Валидация и сборка

```bash
# Проверить корректность YAML файлов
npm run validate

# Собрать JSON из YAML
npm run build
```

### 3. Запуск сервера

```bash
# Запустить локальный сервер на порту 3001
npm run dev
```

Сервер будет доступен на: `http://localhost:3001`

### 4. Проверка работы

```bash
# Проверить версию
curl http://localhost:3001/api/version.json

# Получить шаблоны
curl http://localhost:3001/api/templates.json

# Получить блоки
curl http://localhost:3001/api/blocks.json
```

## Добавление нового шаблона

### 1. Создайте YAML файл

Создайте `src/templates/my-template.yaml`:

```yaml
id: <сгенерируйте UUID>
name: Мой шаблон
version: 1.0.0
description: Описание шаблона
category: business
price: 0
preview: /previews/my-template.png
is_active: true
is_system: false
blocks:
  - hero
  - services
default_settings:
  fontFamily: Inter, system-ui, sans-serif
  maxWidth: 1200
```

### 2. Валидация и сборка

```bash
npm run validate
npm run build
```

### 3. Готово!

Backend автоматически подтянет изменения в течение 5 минут.

## Добавление нового блока

### 1. Создайте YAML файл

Создайте `src/blocks/my-block.yaml`:

```yaml
type: my-block
version: 1.0.0
name: My Block
description: Описание блока
category: content
is_active: true
preview: /previews/blocks/my-block.png

schema:
  title:
    type: string
    required: true
    default: Заголовок
    description: Заголовок блока

defaults:
  title: Заголовок
```

### 2. Валидация и сборка

```bash
npm run validate
npm run build
```

## Полезные команды

```bash
# Валидация всех файлов
npm run validate

# Сборка JSON
npm run build

# Запуск локального сервера
npm run dev

# Проверка работы
curl http://localhost:3001/api/templates.json | python3 -m json.tool
```

## Структура YAML файлов

### Шаблон (Template)

**Обязательные поля:**
- `id` - UUID шаблона
- `name` - Название
- `version` - Версия (формат: X.Y.Z)
- `blocks` - Массив типов блоков

**Опциональные поля:**
- `description` - Описание
- `category` - Категория
- `price` - Цена (число)
- `preview` - URL превью
- `is_active` - Активен ли (boolean)
- `is_system` - Системный ли (boolean)
- `default_settings` - Настройки по умолчанию (объект)

### Блок (Block)

**Обязательные поля:**
- `type` - Тип блока (уникальный идентификатор)
- `name` - Название
- `version` - Версия (формат: X.Y.Z)
- `schema` - Схема настроек (объект)
- `defaults` - Значения по умолчанию (объект)

**Опциональные поля:**
- `description` - Описание
- `category` - Категория
- `preview` - URL превью
- `is_active` - Активен ли (boolean)

## Troubleshooting

### Ошибки валидации

```bash
npm run validate
```

Исправьте ошибки согласно сообщениям валидатора.

### Сервер не запускается

```bash
# Проверьте, не занят ли порт 3001
lsof -i :3001

# Если занят, убейте процесс
kill -9 <PID>
```

### JSON не обновляется

```bash
# Удалите старые файлы и пересоберите
rm -rf public/api/*.json
npm run build
```

## Следующие шаги

- Прочитайте [полную документацию](../nawebe/TEMPLATE_REGISTRY.md)
- Изучите существующие шаблоны в `src/templates/`
- Изучите существующие блоки в `src/blocks/`

