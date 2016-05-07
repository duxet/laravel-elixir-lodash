var gulp    = require('gulp')
var template = require('gulp-template')
var Elixir = require('laravel-elixir')

var $ = Elixir.Plugins
var config = Elixir.config

Elixir.extend('lodash', function(src, output, options) {
    config.js.lodash = {
        folder: 'lodash',
        options: {}
    }

    new Elixir.Task('lodash', function() {
        var paths = prepGulpPaths(src, output)

        return gulp.src(paths.src.path)
          .pipe(template.precompile(options || config.js.lodash.options))
          .pipe($.concat(paths.output.name))
          .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
          .pipe(gulp.dest(paths.output.baseDir))
    })
    .watch(config.get('assets.js.lodash.folder') + '/**/*.html');
})

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src, config.get('assets.js.lodash.folder'))
        .output(output || config.get('public.js.outputFolder'), 'lodash.js')
}
