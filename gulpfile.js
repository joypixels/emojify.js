var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    path = require('path');

var paths = {
    dist: {
        root: './dist'
    }
};
paths.dist.scripts = path.join(paths.dist.root, 'js');
paths.dist.styles = path.join(paths.dist.root, 'css');

gulp.task('default', ['compile']);

gulp.task('compile', ['script', 'styles']);

gulp.task('script', function(){
    var pkg = require('./package.json');

    gulp.src('./emojify.dev.js')
        .pipe($.rename('emojify.js'))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.insert.prepend('/*! ' + pkg.name + ' - v' + pkg.version + ' - \n' +
            ' * Copyright (c) Hassan Khan ' + new Date().getFullYear() + '\n' +
            ' */'))
        .pipe($.uglify({
            preserveComments: 'some'
        }))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.scripts));
});


gulp.task('styles', function(){
    var emoticons = [
            'smile', 'scream', 'smirk', 'grinning', 'stuck_out_tongue_closed_eyes', 'stuck_out_tongue_winking_eye',
            'rage', 'frowning', 'sob', 'kissing_heart', 'wink', 'pensive', 'confounded', 'flushed', 'relaxed', 'mask',
            'heart', 'broken_heart'
        ],
        emoticonFilter = $.filter(function(file){
            var index = emoticons.indexOf(path.basename(file.path, path.extname(file.path)));
            if(index > -1){
                emoticons.splice(index, 1);
                return true;
            }
        });

    return gulp.src('./images/emoji/*.png')
        .pipe($.imageDataUri({
            customClass: function(className){
                return 'emoji-' + className
            }
        }))
        .pipe(emoticonFilter)
        .pipe($.concat('emojify-emoticons.css'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(emoticonFilter.restore())
        .pipe($.concat('emojify.css'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.styles));
});

gulp.task('test', ['test-node']);

gulp.task('test-node', function(){
    return gulp.src('./tests/node/*.js')
        .pipe($.mocha({
            reporter: 'spec'
        }));
});