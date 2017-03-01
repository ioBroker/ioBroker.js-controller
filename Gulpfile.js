// Include gulp
const fs = require('fs');
const path = require('path');


// Include Our Plugins
const gulp = require('gulp');
const gulpDebug = require('gulp-debug');
const gulpGitbook = require('gulp-gitbook');
const gulpServe   = require('gulp-serve');
var del = require('del');

const languages = ['en', 'de', 'ru'];
const dest = '_dist/';
const src = './src/';
const book = require(__dirname + '/' + src + '/book.json');

gulp.task('clean', function () {
    //return del([
   //     dest + '**/*'
    //]);
});
// copy from src to dist
gulp.task('prepare-dist', ['clean'], function () {
	gulp.src([src + '*.*', src + '.*'])
		.pipe(gulp.dest(dest));
			
	languages.forEach(function (lang) {
		gulp.src(src + lang + '/*/*.*')
			.pipe(gulp.dest(dest + lang + '/'));
		gulp.src(src + lang + '/*.*')
			.pipe(gulp.dest(dest + lang + '/'));
	});

    var sPipe = gulp.src(src + 'styles/*.*');
    languages.forEach(function (lang) {
        sPipe = sPipe.pipe(gulp.dest(dest + lang + '/styles/'));
    });
    gulp.src(src + 'styles/*.*').pipe(gulp.dest(dest + 'styles/'));

    var imPipe = gulp.src([src + 'img/*.*', src + 'img/*/*.*']);
    languages.forEach(function (lang) {
        imPipe = imPipe.pipe(gulp.dest(dest + lang + '/img/'));
    });
    gulp.src(src + 'styles/*.*').pipe(gulp.dest(dest + 'styles/'));

    var lPipe = gulp.src(src + '_layouts/*/*.*');
    languages.forEach(function (lang) {
        lPipe = lPipe.pipe(gulp.dest(dest + lang + '/_layouts/'));
    });
    gulp.src(src + '_layouts/*/*.*').pipe(gulp.dest(dest + '_layouts/'));

	var iPipe = gulp.src(src + '_i18n/*/*.*');
    languages.forEach(function (lang) {
        iPipe = iPipe.pipe(gulp.dest(dest + lang + '/_i18n/'));
    });
    gulp.src(src + '_i18n/*/*.*').pipe(gulp.dest(dest + '_i18n/'));
});

gulp.task('post-build', ['build-doc'], function () {
	if (book.pluginsConfig && book.pluginsConfig.favicon && fs.existsSync(__dirname + '/' + src + book.pluginsConfig.favicon)) {
        var gitbookFaviconPath = path.join(dest, '_book', 'gitbook', 'images', 'favicon.ico');
        fs.unlinkSync(gitbookFaviconPath);
        fs.createReadStream(__dirname + '/' + src + book.pluginsConfig.favicon).pipe(fs.createWriteStream(gitbookFaviconPath));
	}
});

// generate GitBook
gulp.task('build-doc', ['summary'], function (cb) {
  gulpGitbook('./_dist/', cb);
});

function getFileTitle(file) {
	var text = fs.readFileSync(file);
	var fileName = path.basename(file, '.md');
	
	var lines = text.toString().split('\n');
	var title = fileName.replace(/_/g, ' ').replace(/^\d+/, '').trim();
	lines.forEach(function (line) {
		if (line.trim().match(/^#\s/)) {
			title = line.substring(2).replace(/\r/, '').trim();
			return false;
		}
	});
	return title;
}

function collectStructure(dir, level) {
	var _tree = null;
    level = level || 0;
	
	var files = fs.readdirSync(dir);
	for (var f = 0; f < files.length; f++) {
		var stat = fs.statSync(dir + files[f]);
		//console.log('Check ' + dir + files[f]);
		if (files[f] === 'SUMMARY.md' || files[f][0] === '_') continue;
		if (stat.isDirectory()) {
			var child;
			if (fs.existsSync(dir + files[f] + '/README.md')) {
				child = {name: files[f], title: getFileTitle(dir + files[f] + '/README.md'), link: dir + files[f] + '/README.md', children: null};
			} else {
				child = {name: files[f], title: files[f].replace(/_/g, ' ').replace(/^\d+/, '').trim(), children: null};
			}
			_tree = _tree || [];
			_tree.push(child);
			//console.log('Add Folder ' + child.title + ' - ' + child.link);
			child.children = collectStructure(dir + files[f] + '/', level + 1);
			if (!child.children || !child.children.length) {
				child.children = null;
				if (!child.name.match(/\.md$/)) {
					_tree.splice(_tree.length - 1, 1);
				}
			}
		} else if (files[f].match(/\.md$/) && (level === 0 || files[f] !== 'README.md')) {
			_tree = _tree || [];
			var item = {name: files[f], title: getFileTitle(dir + files[f]), link: dir + files[f]};
			_tree.push(item);
			//console.log('Add ' + item.title + ' - ' + item.link);
		}
	}
	if (_tree) {
		_tree.sort(function (a, b) {
            var aL = a.name;
            var bL = b.name;
            if (aL === 'README.md') return -1;
            if (bL === 'README.md') return 1;
            if (aL === '100_footer') return 1;
            if (bL === '100_footer') return -1;
            var aM = aL.match(/^(\d+)[_\s]/);
            if (aM) aL = parseInt(aM[1], 10);

            var bM = bL.match(/^(\d+)[_\s]/);
            if (bM) bL = parseInt(bM[1], 10);

			if (aL.name > bL.name) return 1;
			if (aL.name < bL.name) return -1;
			return 0;
		});
	}
	return _tree;
}

function buildTree(tree, level) {
	var text = '';
	level = level || 0;
	tree.forEach(function (item) {
		if (!item.title) return;
		if (item.link) {
			text += new Array(level + 1).join('\t') + '* [' + item.title + '](' + item.link.substring(dest.length + 3) + ')\n';
		} else {
			text += new Array(level + 1).join('\t') + '* ' + item.title + '\n';
		}
		if (item.children) {
			text += buildTree(item.children, level + 1);
		}
	});
	
	return text;
}

gulp.task('summary', ['prepare-dist'], function () {
	languages.forEach(function (lang) {
		var tree = collectStructure(dest + lang + '/');
		//console.log(JSON.stringify(tree, null, 2));
		var summary = buildTree(tree);
		fs.writeFileSync(dest + lang + '/SUMMARY.md', summary);
    });	
});

// Start web server
gulp.task('serve', ['build'], gulpServe('_dist/_book'));

gulp.task('watch', function () {
    return gulp.watch([src + '*/*.*', src + '*.*'], ['build']);
});

gulp.task('build', ['clean', 'prepare-dist', 'summary', 'build-doc', 'post-build']);

gulp.task('default', ['build']);