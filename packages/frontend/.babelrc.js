module.exports = {
    extends: '../config/.babelrc.js',
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                displayName: true
            }
        ]
    ]
};
