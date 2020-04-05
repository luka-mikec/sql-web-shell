module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/recommended'
    ],

    rules: {
        'no-console': process.env.NODE_ENV === 'nikadproduction' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'nikadproduction' ? 'error' : 'off',
        'vue/no-unused-vars': 'off',
        'vue/no-unused-components': 'off'
    }
}
