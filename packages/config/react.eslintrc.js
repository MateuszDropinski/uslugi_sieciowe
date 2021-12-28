module.exports = {
    plugins: [
        'react-hooks',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'react/jsx-no-useless-fragment': 'error',
    },
    overrides: [
        {
            files: ['*.ts'],
            rules: {
                'react-hooks/rules-of-hooks': 'off',
            },
        },
    ],
};
