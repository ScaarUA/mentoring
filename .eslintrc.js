module.exports = {
    "globals": {
        "expect": true,
        "assert": true,
        "should": true
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "plugins": [
        "mocha",
        "react"
    ],
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "react/jsx-uses-react": [2],
        "react/jsx-uses-vars": [2],
        "indent": [2, 4],
        "quotes": [2, "single"],
        "semi": [2, "always"],
        "mocha/no-global-tests": "error",
        "max-nested-callbacks": [1, 4],
        "newline-after-var": [2, "always"],
        "no-multiple-empty-lines": [2, {"max": 2}]
    }
};