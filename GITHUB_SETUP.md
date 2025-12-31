# 🚀 Настройка GitHub Pages для Template Registry

## ⚠️ Важно по безопасности

**НИКОГДА не публикуйте пароли!** Используйте Personal Access Token для работы с Git.

---

## 📋 Пошаговая инструкция

### Шаг 1: Создайте Personal Access Token

1. Зайдите на GitHub: https://github.com
2. Войдите в свой аккаунт (artemmedvedev.pro@yandex.ru)
3. Перейдите: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
4. Нажмите **Generate new token (classic)**
5. Заполните:
   - **Note**: `Nawebe Templates Deploy`
   - **Expiration**: `No expiration` или `90 days`
   - **Select scopes**: отметьте все галочки в разделе **repo**
6. Нажмите **Generate token**
7. **СКОПИРУЙТЕ токен и сохраните** (он больше не покажется!)

Пример токена: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### Шаг 2: Создайте репозиторий на GitHub

1. На GitHub нажмите **+** → **New repository**
2. Заполните:
   - **Repository name**: `nawebe-templates`
   - **Description**: `Centralized template and block registry for Nawebe`
   - **Public** или **Private** (на ваш выбор)
   - **НЕ** ставьте галочки на README, .gitignore, license
3. Нажмите **Create repository**

---

### Шаг 3: Инициализируйте Git и запушьте код

Откройте терминал и выполните команды:

```bash
# Перейдите в папку проекта
cd /Users/artemmedvedev/Desktop/project/nawebe-templates

# Инициализируйте Git
git init

# Добавьте все файлы
git add .

# Сделайте первый коммит
git commit -m "Initial commit: Template Registry with GitHub Actions"

# Переименуйте ветку в main (если нужно)
git branch -M main

# Подключите remote (ЗАМЕНИТЕ на ваш URL)
git remote add origin https://github.com/artemmedvedev/nawebe-templates.git

# Запушьте код
git push -u origin main
```

При запросе учетных данных:
- **Username**: `artemmedvedev` (ваш GitHub username)
- **Password**: вставьте ваш **Personal Access Token** (НЕ пароль!)

---

### Шаг 4: Включите GitHub Pages

1. На странице репозитория зайдите в **Settings**
2. В левом меню выберите **Pages**
3. В разделе **Source** выберите:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Нажмите **Save**

**Примечание:** Ветка `gh-pages` появится автоматически после первого запуска GitHub Actions (в течение 1-2 минут после push).

---

### Шаг 5: Дождитесь первого деплоя

1. Зайдите на вкладку **Actions** в вашем репозитории
2. Вы увидите запущенный workflow "Build and Deploy to GitHub Pages"
3. Дождитесь, пока он станет зеленым ✅ (1-2 минуты)

---

### Шаг 6: Получите URL вашего Template Registry

После успешного деплоя ваш Template Registry будет доступен по адресу:

```
https://artemmedvedev.github.io/nawebe-templates/api/templates.json
```

Проверьте в браузере - должен открыться JSON с шаблонами.

---

### Шаг 7: Обновите настройки в проектах

#### Локальный проект

Создайте/обновите `/Users/artemmedvedev/Desktop/project/nawebe/backend/.env`:

```env
# Другие настройки...

# Template Registry (GitHub Pages)
TEMPLATE_REGISTRY_URL=https://artemmedvedev.github.io/nawebe-templates/api
TEMPLATES_SYNC_ENABLED=true
TEMPLATES_SYNC_INTERVAL=5m
```

Перезапустите backend:
```bash
cd /Users/artemmedvedev/Desktop/project/nawebe/backend
# Остановите текущий процесс (Ctrl+C в терминале где он запущен)
go run cmd/api/main.go
```

#### Production сервер (nawebe.ru)

Подключитесь по SSH и обновите `.env`:

```bash
ssh root@nawebe.ru
cd /var/www/nawebe/backend

# Отредактируйте .env
nano .env

# Добавьте/обновите:
TEMPLATE_REGISTRY_URL=https://artemmedvedev.github.io/nawebe-templates/api
TEMPLATES_SYNC_ENABLED=true
TEMPLATES_SYNC_INTERVAL=5m

# Перезапустите backend
docker-compose restart backend
```

---

## ✅ Проверка работы

### Локально

```bash
# Проверьте GitHub Pages
curl https://artemmedvedev.github.io/nawebe-templates/api/templates.json

# Проверьте синхронизацию в backend
curl http://localhost:8080/api/v1/templates
```

### Production

```bash
# Проверьте логи backend
ssh root@nawebe.ru
docker-compose logs -f backend | grep Sync
```

Вы должны увидеть:
```
[TemplateSync] Starting auto-sync...
[TemplateSync] ✅ Updated template: Универсальный
```

---

## 🔄 Рабочий процесс после настройки

Теперь для обновления шаблонов вам нужно только:

1. **Редактируйте YAML файлы** в `src/templates/` или `src/blocks/`

2. **Коммитьте и пушьте:**
```bash
cd /Users/artemmedvedev/Desktop/project/nawebe-templates

git add .
git commit -m "Updated templates"
git push
```

3. **Всё!** Через 2-3 минуты:
   - GitHub Actions соберет JSON
   - Задеплоит на GitHub Pages
   - Локальный backend синхронизируется (максимум 5 минут)
   - Production backend синхронизируется (максимум 5 минут)

---

## 🐛 Troubleshooting

### GitHub Actions не запускается

1. Проверьте, что файл `.github/workflows/deploy.yml` существует
2. Зайдите в **Actions** → включите workflows если они отключены

### Ветка gh-pages не создается

1. Проверьте логи в **Actions**
2. Убедитесь, что workflow выполнился успешно (зеленая галочка)

### 404 Not Found на GitHub Pages

1. Подождите 5-10 минут после первого деплоя
2. Проверьте Settings → Pages - включен ли Pages
3. Убедитесь, что выбрана ветка `gh-pages`

### CORS ошибки

GitHub Pages автоматически поддерживает CORS для статических файлов. Если проблемы:
1. Проверьте, что запрос идет на правильный URL
2. Проверьте в браузере Developer Tools → Network

---

## 🔒 Безопасность

✅ Personal Access Token храните в безопасном месте  
✅ Не публикуйте токены в коде  
✅ Используйте токен только для Git операций  
✅ Включите 2FA на GitHub  
✅ Периодически ротируйте токены (каждые 90 дней)

---

## 📚 Дополнительная информация

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

