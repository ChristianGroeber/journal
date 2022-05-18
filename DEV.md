## Project setup
```
yarn install
```

### Compiles for development (on port 86)
```
yarn start
docker-compose up -d
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Build for production
```
docker-compose -f docker-compose.build.yml build
```