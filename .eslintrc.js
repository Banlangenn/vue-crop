module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node": true,
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
        // 这里填入你的项目需要的个性化配置
        "no-console": 0,
        "new-cap": 0,
        "@typescript-eslint/no-parameter-properties": 0,  // 禁止给类的构造函数的参数添加修饰符
        "no-useless-constructor": 0, // 构造函数不能有参数
        "@typescript-eslint/explicit-member-accessibility": 0,
        "no-return-await": 0, // 不能返回 await
        // 个人配置建议
        "comma-spacing": [2, { "before": false, "after": true }], // 逗号前后的空格
        "indent": ["error", 4], // 缩进风格
        "quotes": [2, "single"], // 单引号
        "no-multi-spaces": 2, // 不能有多余空格
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }], // 对象字面量中冒号的前后空格
        "arrow-spacing": 2, // =>的前/后括号
        "space-unary-ops": 2, // 一元运算符的前/后要不要加空格
        "quote-props": [2, "as-needed", {// 尽量少的给属性名加引号
            "keywords": false,
            "unnecessary": true,
            "numbers": false }
        ],
        "no-multiple-empty-lines": [2, {
            "max": 2, "maxBOF": 1, "maxEOF": 0 
            }
        ],// 不允许多个空行.该规则目的在于，当你读代码时，减少滚动。当超过最大空行数，该规则将发出警告。
        "semi": [2, "never"],
        "semi-style": 2,
        // "object-curly-newline": 2, // 要求需要有一致的换行符
        "no-trailing-spaces": [2, { "skipBlankLines": true }],// 禁用行尾空白
        "object-curly-spacing": [2, "always", { "objectsInObjects": false }],// 该规则强制在对象字面量、解构赋值 和 import/export 说明符的花括号中使用一致的空格。 { key: value }与{key: value}
        "keyword-spacing":  [2, { "before": true, "after": true }], // 该规则强制关键字和类似关键字的符号周围空格的一致性
        "spaced-comment":  [2, "always", { "exceptions": ["-", "+"] }],
        "space-infix-ops": 2,
        "space-in-parens": [2, "never"],
        "comma-dangle": [2, "never"],

        // "object-curly-newline": [2, { "multiline": true }]
        // "space-before-keywords": 2,
        "space-before-blocks": [2, "always"]
    }
}