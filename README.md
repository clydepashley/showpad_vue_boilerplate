# Showpad Vue boilerplate

Note: This project uses the standardJS linting (https://standardjs.com/)

### Project setup

* git clone
* change manifest.json in public folder

```
showpad auth
```

```
npm install
```

### Compiles, hot-reloads pand loads SDK

```
npm run serve
```

```
showpad experience serve --host http://localhost:8080
```

### Compiles, minifies and package for uploading

* change manifest version in public folder

```
npm run build
```

```
showpad experience package --src dist
```

### Upload package to showpad

* upload all assets from showpad/assets folder
* upload .showpad package from showpad folder
* set cover image from showpad folder
* go to edit and adjust settings to your needs
* ask Laurens if you need more help
