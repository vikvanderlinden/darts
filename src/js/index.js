import './../css/index.css'

if (process.env.NODE_ENV === 'development') {
    require('./../../dist/index.html');
}

require("vue")
require("vuex")
