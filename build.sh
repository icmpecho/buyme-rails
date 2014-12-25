#!/bin/bash

cleancss public/css/material-ui.css -o public/css/material-ui.min.css
cleancss public/lib/material-design-fonticons/styles/mdfi.css -o public/lib/material-design-fonticons/styles/mdfi.min.css
browserify src/app/*.js src/app/**/*.js -o public/js/app.js -v
browserify src/user/*.js src/user/**/*.js -o public/js/user.js -v
uglifyjs public/js/app.js -o public/js/app.min.js
uglifyjs public/js/user.js -o public/js/user.min.js