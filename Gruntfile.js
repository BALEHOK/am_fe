'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');

module.exports = function (grunt) {
  // Let *load-grunt-tasks* require everything
  require('load-grunt-tasks')(grunt);

  // Read configuration from package.json
  var pkgConfig = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkgConfig,

    webpack: {
      options: webpackDistConfig,

      dist: {
        cache: false
      }
    },

    'webpack-dev-server': {
      options: {
        port: 8000,
        webpack: webpackDevConfig,
        publicPath: '/assets/',
        contentBase: './<%= pkg.src %>/',
      },

      start: {
        keepAlive: true,
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ['./<%= pkg.src %>/styles'],
          urlfunc: 'url64', // use url64('test.png') in our code to trigger Data URI embedding
          'include css': true,
          compress: false
        },
        files: {
          '<%= pkg.dist %>/assets/css/ie/ie-lt-10.css': './<%= pkg.src %>/styles/ie/ie-lt-10.styl', // 1:1 compile
          '<%= pkg.dist %>/assets/css/style.css': ['./<%= pkg.src %>/styles/*.styl'] // compile and concat into single file
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1']
      },
      mainCss: {
        expand: true,
        flatten: true,
        src: '<%= pkg.dist %>/assets/css/*.css',
        dest: '<%= pkg.dist %>/assets/css/'
      },
      ieCss: {
        expand: true,
        flatten: true,
        src: '<%= pkg.dist %>/assets/css/ie/*.css',
        dest: '<%= pkg.dist %>/assets/css/ie/'
      }
    },
    typescript: {
      base: {
        src: ['./<%= pkg.src %>/scripts/**/*.ts'],
        dest: '',
        options: {
          module: 'commonjs', //or commonjs
          target: 'es5', //or es3
          basePath: './<%= pkg.src %>/scripts/',
          sourceMap: true,
          declaration: true
        }
      }
    },

    connect: {
      options: {
        port: 8000
      },

      dist: {
        options: {
          keepalive: true,
          middleware: function (connect) {
            return [
              mountFolder(connect, pkgConfig.dist)
            ];
          }
        }
      }
    },

    open: {
      options: {
        delay: 500
      },
      dev: {
        path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
      },
      dist: {
        path: 'http://localhost:<%= connect.options.port %>/'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    copy: {
      dist: {
        files: [
          // includes files within path
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/*'],
            dest: '<%= pkg.dist %>/',
            filter: 'isFile'
          },
          {
            flatten: true,
            expand: true,
            src: ['<%= pkg.src %>/images/*'],
            dest: '<%= pkg.dist %>/images/'
          },
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open:dist', 'connect:dist']);
    }

    grunt.task.run([
      'typescript',
      'open:dev',
      'webpack-dev-server'
    ]);
  });

  grunt.registerTask('test', ['karma']);

  grunt.registerTask('build', ['clean', 'copy', 'typescript', 'webpack', 'stylus', 'autoprefixer']);

  grunt.registerTask('default', []);
};
