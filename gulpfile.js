var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    path = require('path'),
    minimatch = require('minimatch'),
    through2 = require('through2');

gulp.task('default', ['compile']);

gulp.task('compile', ['script', 'styles']);

gulp.task('script', function(){
    var pkg = require('./package.json');

    gulp.src('./emojify.js')
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
        .pipe(gulp.dest('./'));
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
        .pipe(gulp.dest('./'))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'))
        .pipe(emoticonFilter.restore())
        .pipe($.concat('emojify.css'))
        .pipe(gulp.dest('./'))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('test', ['test-node']);

gulp.task('test-node', function(){
    return gulp.src('./tests/node/*.js')
        .pipe($.mocha({
            reporter: 'spec'
        }));
});

gulp.task('update', function(done){
    var emoji = '';

    $.download('https://github.com/arvida/emoji-cheat-sheet.com/archive/master.zip')
        .pipe($.unzip())
        .pipe($.filter(function(file){
            return minimatch(file.path, '**/public/graphics/emojis/*.png');
        }))
        .pipe($.rename({ dirname: './' }))
        .pipe(gulp.dest('./images/emoji'))
        .pipe(through2({ objectMode: true }, function(file, enc, cb){
            emoji += ',' + path.basename(file.path, path.extname(file.path));
            this.push(file);
            cb();
        }, function(){
            gulp.src('./emojify.js')
                .pipe($.replace(/(\/\*##EMOJILIST\*\/).+$/m, '$1"' + emoji.substr(1) + '";'))
                .pipe(gulp.dest('./'))
                .on('end', done);
        }));
});
