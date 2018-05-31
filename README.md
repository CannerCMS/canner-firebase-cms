# canner-firebase-cms

[![](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/Canner/CannerCMS?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

Canner CMS for Firebase, for Firebase, for blog, ecommerce, mobile apps and even chatbot! This project is based on Canner, a open source CMS framework  https://framework.canner.io/

## Live demo

https://fir-cms-15f83.firebaseapp.com/login

## Tutorial

https://framework.canner.io/docs/tutorial-community-firebase.html

## Preview

![preview](./preview/1.png)
![preview](./preview/2.png)
![preview](./preview/3.png)
![preview](./preview/4.png)

## How it works

It is based on Canner CMS framework (https://framework.canner.io/), used `JSX` (canner-script) to declare how you Firebase data structure and UI in your CMS.

A simple blog post exmaple:

![preview](./preview/syntax.png)


Learn how to write schema [canner-script](https://framework.canner.io/docs/guides-writing-schema.html)

## Import default user

```
firebase auth:import firebase-default-user.json
```

### Default user

- **Username:** admin-test@canner.io
- **Password:** admin-test

## Development

```
npm start
```

## Build script

```
npm run build
```

## Deploy hosting

```
npm run deploy
```

## License

Apache license 2.0