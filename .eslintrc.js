// http://eslint.org/docs/user-guide/configuring  2：error 错误 1：warning 警告

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        "ecmaFeatures": {
            "jsx": true
        }
    },
    env: {
        browser: true,
        "es6": true,
        "jquery": true,
        "node": true,
        "worker": true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'react-app',
    // required to lint *.vue files
    plugins: [
        'html',
        'react'
    ],
    // add your custom rules here
    'rules': {
        "no-alert": 2,
        "no-caller": 2,
        "no-console": 0,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-debugger": 2,
        "no-delete-var": 2,
        "no-dupe-keys": 2,
        "no-dupe-args": 2,
        "no-duplicate-case": 2,
        "no-empty": 2,
        "no-empty-character-class": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-semi": 2,
        "no-fallthrough": 2,
        "no-func-assign": 2,
        "no-inner-declarations": 2,
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-mixed-requires": 2,
        "no-mixed-spaces-and-tabs": 2,
        "linebreak-style": [0, "windows"],
        "no-multiple-empty-lines": 2,
        "no-negated-in-lhs": 2,
        "no-new-require": 2,
        "no-obj-calls": 2,
        "no-octal": 2,
        "no-redeclare": 2,
        "no-regex-spaces": 2,
        "no-sparse-arrays": 1,
        "no-undef": 1,
        "no-tabs": "off",
        "no-trailing-spaces":"off", //不让有空行
        "spaced-comment":1,
        "no-unreachable": 2,
        "no-unused-vars": 1,
        "no-warning-comments": 0,//不能有警告备注 , { "terms": ["TODO", "FIXME", "xxx"], "LOCATION": "start" }
        "array-bracket-spacing": 1,
        "arrow-body-style": 2,
        //"comma-dangle": 1,
        "complexity": 1,
        "computed-property-spacing": 2,
        "curly": 1,
        "dot-notation": 2,
        "func-style": 1,
        "indent": ["error", 4],
        "key-spacing": 1,
        "eol-last":0,
        "max-depth": 2,
        "max-nested-callbacks": 2,
        "one-var": ["error", {
            // "let": "never",
            // "const": "never",
            "var": "always"
        }],
        "operator-assignment": 2,
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "semi-spacing": 2,
        // "space-after-keywords": 1,
        // "space-before-keywords": 1,
        "space-before-blocks": 2,
        "space-before-function-paren": 1,
        "space-in-parens": 2,
        "space-unary-ops": 2,
        "use-isnan": 2,
        "valid-jsdoc": 0,
        "valid-typeof": 2,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        "react/jsx-space-before-closing": 1,        // 总是在自动关闭的标签前加一个空格，正常情况下也不需要换行
        "jsx-quotes": 1,
        "react/jsx-closing-bracket-location": 1,    // 遵循JSX语法缩进/格式
        "react/jsx-boolean-value": 1,               // 如果属性值为 true, 可以直接省略
        "react/no-string-refs": 1,      // 总是在Refs里使用回调函数
        "react/self-closing-comp": 1,    // 对于没有子元素的标签来说总是自己关闭标签
        "react/jsx-no-bind": 0,          // 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去
        "react/sort-comp": 1,            // 按照具体规范的React.createClass 的生命周期函数书写代码
        "react/jsx-pascal-case": 1,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
