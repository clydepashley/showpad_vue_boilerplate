# Showpad vue boilerplate

* note: This project uses the standardJS linting (https://standardjs.com/)
* note: This project uses showpad_library (https://gitlab.showpad.io/laurens.dhondt/showpad_library)
* note: This project uses vue_remote_devtools (https://github.com/vuejs/vue-devtools/blob/master/shells/electron)

### Project setup

* git clone
* change manifest.json in public folder

```
showpad auth
```

```
npm install
```

### Compiles, hot-reloads, loads SDK, Devtools

```
npm run serve
```

```
showpad experience serve --host http://localhost:8080
```

* if you need vue devtools

```
vue-devtools
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
* set correct tags (view showpad-export.csv file)
* upload .showpad package from showpad folder
* set cover image from showpad folder
* go to edit and adjust settings to your needs
* ask Laurens if you need more help
