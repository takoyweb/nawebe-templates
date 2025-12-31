# Nawebe Templates Registry

Централизованное хранилище шаблонов и блоков для проекта Nawebe.

## 🎯 Назначение

Этот репозиторий служит единым источником истины (Single Source of Truth) для:
- Шаблонов сайтов
- Компонентов блоков
- Их настроек и схем валидации

## 📁 Структура

```
nawebe-templates/
├── src/
│   ├── templates/          # YAML исходники шаблонов
│   └── blocks/             # YAML исходники блоков
├── public/
│   └── api/                # Сгенерированные JSON файлы (деплоятся)
├── scripts/
│   ├── build.js            # Сборка YAML → JSON
│   ├── validate.js         # Валидация
│   └── serve.js            # Локальный сервер для тестирования
└── vercel.json             # Конфигурация деплоя
```

## 🚀 Использование

### Разработка

```bash
npm install
npm run build      # Собрать JSON из YAML
npm run dev        # Локальный сервер для тестирования
```

### Деплой

Автоматически деплоится на Vercel при push в main ветку.

### API Endpoints

- `https://nawebe-templates.vercel.app/api/templates.json` - Список шаблонов
- `https://nawebe-templates.vercel.app/api/blocks.json` - Список блоков
- `https://nawebe-templates.vercel.app/api/version.json` - Текущая версия

## 📝 Добавление нового шаблона

1. Создайте `src/templates/your-template.yaml`
2. Опишите структуру шаблона
3. Запустите `npm run build`
4. Закоммитьте и запушьте изменения

## 📝 Добавление нового блока

1. Создайте `src/blocks/your-block.yaml`
2. Опишите схему блока
3. Запустите `npm run build`
4. Закоммитьте и запушьте изменения

