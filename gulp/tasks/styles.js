var gulp = require("gulp"),
postcss = require("gulp-postcss"),
/* transforming styles with JS plugins */
autoprefixer = require("autoprefixer"),
/* It combs through compiled CSS files to add or remove vendor prefixes */
cssvars = require("postcss-simple-vars"),
/* You can use variables inside values, selectors and at-rule’s parameters. */
nested = require("postcss-nested"),
/* unwrap nested rules */
cssImport = require("postcss-import"),
/* til að geta importað sheets í sheets */
mixins = require("postcss-mixins");


gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    /* er að setja allt sem ég vil nota inn í pípuna */
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    /* if an error occurs */
    /* without .on if an error occurs, it ends all other running gulp taksk (dafault behavior) */
    .pipe(gulp.dest('./app/temp/styles'));
});
