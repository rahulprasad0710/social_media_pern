module.exports = {
    env: {
        node: true,
        es2021: true,
    },

    extends: ["airbnb-base", "eslint:recommended", "prettier"],
    parserOptions: {
        ecmaVersion: 14,
        sourceType: "module",
    },
    plugins: ["prettier"],
    rules: {
        "import/extensions": ["error", "ignorePackages"],
        "prettier/prettier": 0,
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "no-underscore-dangle": 0,
        "max-classes-per-file": 0,
        "react/prop-types": "off",
        "react-refresh/only-export-components": "warn",
    },
};
