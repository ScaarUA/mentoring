# Bohdan Huseinov's project build
##Javascript mentoring program

To make production build with minification, uglifing and concatination
```sh
$ npm run build
```

To run developement mode without minification, uglifing and concatination (for debug)
```sh
$ npm run build
```

To run all tests
```sh
$ npm test
```

To run all tests with coverage report
```sh
$ npm run "test:coverage"
```

To run tdd mode (run specific test only when modified spec or certain file)
```sh
$ npm run tdd
```

To test files in eslint
```sh
$ npm run eslint
```

> Pre-com          mit hook included which run tests and eslint checks before commit and allows or disallows that commit