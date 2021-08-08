const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer"),
        process.env.NODE_ENV === "production" ? purgecss({
            content: ['./**/*.html', './**/*.vue', './src/**/*.js']
        }) : '',
        require('cssnano')({
            preset: 'default',
        })
    ]
}
