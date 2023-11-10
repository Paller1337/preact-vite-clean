Этот проект использует Preact, TypeScript, SASS, GSAP, css-loader и autoprefixer.

## Установка

Для начала установите `preact-cli`:

```bash
npm install -g preact-cli
```


## Создание проекта

Создайте новый проект Preact:

```bash
preact create default my-preact-app
cd my-preact-app
```


## Добавление TypeScript

Создайте новый проект Preact:

```bash
npm install typescript --save-dev
```

Создайте `tsconfig.json` с базовыми настройками TypeScript.

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "ESNext",
		"moduleResolution": "bundler",
		"noEmit": true,
		"allowJs": true,
		"checkJs": true,

		/* Preact Config */
		"jsx": "react-jsx",
		"jsxImportSource": "preact",
		"skipLibCheck": true,
		"paths": {
			"react": ["./node_modules/preact/compat/"],
			"react-dom": ["./node_modules/preact/compat/"]
		}
	},
	"include": ["node_modules/vite/client.d.ts", "**/*"]
}
```


## Добавление SASS

Установите SASS и его загрузчик:

```bash
npm install sass sass-loader --save-dev
```


## Интеграция GSAP

Установите GSAP для анимаций:

```bash
npm install gsap --save
```


## ИНастройка css-loader и autoprefixer

Установите `css-loader`, `autoprefixer`, и `postcss-loader`:

```bash
npm install css-loader autoprefixer postcss-loader --save-dev
```

Настройте их для обработки CSS в вашем проекте.


## Запуск проекта

Запустите проект:

```bash
npm run dev
```

Откройте `http://localhost:8080`, чтобы увидеть ваше приложение в действии.


## Структура проекта

- `src`: Исходный код вашего приложения
- `src/components`: Компоненты Preact
- `src/styles`: Стили SASS
