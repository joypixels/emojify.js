var gulp     = require('gulp'),
    $        = require('gulp-load-plugins')(),
    path     = require('path'),
    del      = require('del'),
    inquirer = require('inquirer'),
    paths    = {
        dist: {
            root: './dist'
        }
    };

paths.dist.scripts         = path.join(paths.dist.root, 'js');
paths.dist.styles          = path.join(paths.dist.root, 'css');
paths.dist.images          = { root: path.join(paths.dist.root, 'images') };
paths.dist.images.separate = path.join(paths.dist.images.root, 'separate');

gulp.task('default', ['compile']);

gulp.task('compile', ['script', 'images-and-styles']);

gulp.task('script', function(){
    var pkg = require('./package.json');

    gulp.src('./src/emojify.js')
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


gulp.task('images-and-styles', function(){
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

    return gulp.src('./src/images/emoji/*.png')
        .pipe(gulp.dest(paths.dist.images.separate))
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

gulp.task('clean', function(done){
    del(paths.dist.root, done);
});

gulp.task('bump', function(done){
    inquirer.prompt({
        type: 'list',
        name: 'bump',
        message: 'What type of bump would you like to do?',
        choices: ['patch', 'minor', 'major', "don't bump"]
    }, function(result){
        if(result.bump === "don't bump"){
            done();
            return;
        }

        gulp.src(['./bower.json', './package.json'])
            .pipe($.bump({type: result.bump}))
            .pipe(gulp.dest('./'))
            .on('end', done);
    });
});
