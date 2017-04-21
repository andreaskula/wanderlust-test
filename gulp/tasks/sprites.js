var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require("del");

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task("beginClean", function() {
  return del(["./app/temp/sprite", "./app/assets/images/sprites"]);
});

gulp.task('createSprite', ["beginClean"], function() {
  /* ("name of the task that we want to create, what we want the task to do") */
  return gulp.src('./app/assets/images/icons/**/*.svg')
  /* 1. tek allar myndirnar sem eru í icons og ef það eru fleiri möppur */
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
    /* 2. bý til nýja möppu í temp og tengi þær saman í terminal með að setja inn: gulp createSprite (en eyddi þeim því við vildum bæta config fyrir ofan)*/
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
  /* copySpriteCSS is dependent on ["createSprite"] */
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], function() {
  return del("./app/temp/sprite");
});

gulp.task('icons', ["beginClean", 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', "endClean"]);
/* when we run icons in gulp all of these will run */
