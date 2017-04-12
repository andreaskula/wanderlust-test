var gulp = require("gulp"),
watch = require("gulp-watch"),
/* hérna eru allir pakkarnir sem ég náði í í gegn um transmission og vil nota */
browserSync = require("browser-sync").create();
/*lætur síðuna poppa upp þegar ég geri gulp watch sjá neðar */

gulp.task("watch", function () {

  browserSync.init({
    notify: false, /* no need to reset the page when we change something */
    server: {
      baseDir: "app"
    }
  });

  /* kóðinn fyrir ofan lætur síðuna reloadast þegar ég geri gulp watch */
  /* kóðinn fyrir neðan uppfærir síðuna sjálfkrafa þegar ég breyti og seiva html */

   watch("./app/index.html", function () {
     browserSync.reload();
   });

   watch("./app/assets/styles/**/*.css", function() {
     gulp.start('cssInject');
   });

});

gulp.task("cssInject", ["styles"], function() { /*name, what we want to run, what it should do(function)*/
  return gulp.src("./app/temp/styles/styles.css")
    .pipe(browserSync.stream());
});
