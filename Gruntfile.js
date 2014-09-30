'use strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackEntries = require('./webpack.entries.js');

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  var pkgConfig = grunt.file.readJSON('package.json');
  pkgConfig.dist = grunt.option('dist') || pkgConfig.dist;

    grunt.initConfig({
        pkg: pkgConfig,

        webpack: {
            options: {
                entry: webpackEntries,
                output: {
                    publicPath: '/assets/js',
                    path: '<%= pkg.dist %>/assets',
                    filename: 'bundle-[name].js'
                },
                debug: false,
                devtool: false,
                stats: {
                    colors: true,
                    reasons: false
                },
                plugins: [
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin(),
                    new webpack.optimize.OccurenceOrderPlugin(),
                    new webpack.optimize.AggressiveMergingPlugin()
                ],
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
                module: {
                    loaders: [
                        { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
                        { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
                        { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
                        { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
                        { test: /\.jsx$/, loader: 'jsx-loader' }
                    ]
                }
            },
            dist: {
                cache: false
            }
        },

        'webpack-dev-server': {
            options: {
                port: 8000,
                webpack: {
                    entry: webpackEntries,
                    output: {
                        publicPath: '/assets',
                        filename: 'bundle-[name].js'
                    },
                    cache: true,
                    debug: true,
                    devtool: false,
                    stats: {
                        colors: true,
                        reasons: true
                    },
                    resolve: {
                        extensions: ['', '.js', '.jsx']
                    },
                    module: {
                        loaders: [
                            { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') },
                            { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
                            { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
                            { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
                            { test: /\.jsx$/, loader: 'jsx-loader' }
                        ]
                    },
                    plugins: [
                        new ExtractTextPlugin('css/style.css', {
                            allChunks: true
                        }),
                        new ExtractTextPlugin('css/style-old.css', {
                            allChunks: true
                        })
                    ]
                },
                publicPath: '/assets/',
                contentBase: './<%= pkg.src %>/'
            },
            start: {
                keepAlive: true
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
        sass: {                            
            dist: {                            
                options: {                       
                    style: 'expanded'
                },
                files: {                         
                    '<%= pkg.dist %>/assets/css/style-old.css': ['./<%= pkg.src %>/styles/old/style.scss']
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
                    module: 'commonjs',
                    target: 'es5',
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
                    hostname: 'localhost',
                    keepalive: true,
                    middleware: function(connect) {
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
            },
            aspnet: {
                path: 'http://facilitymanager.facilityflexware.com/'
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
                        dest: '<%= pkg.dist %>/assets/images/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/styles/old/fonts/*'],
                        dest: '<%= pkg.dist %>/assets/fonts/'
                    }
                ]
            }
        },

        clean: {
            dist: {
                options: {
                    force: true
                },
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= pkg.dist %>'
                        ]
                    }
                ]
            },
            aspnet: {
                options: {
                    force: true
                },
                files: [
                    {
                        src: [
                            '<%= pkg.dist %>/*.html'
                        ]
                    }
                ]
            }
        },
        processhtml: {
            options: {
            },
            dist: {
            }
        },
        inject: {
            baseDir: '<%= pkg.dist %>/../Areas/Frontend/Views/',
            acceptor: 'Index.cshtml'
        }
    });

    grunt.registerTask('inject', 'Injects destination htmls into related Razor views', function () {
        grunt.config.requires('inject.baseDir');
        grunt.config.requires('inject.acceptor');
        var processFiles = {};
        grunt.file.expand(grunt.config.get('pkg.dist') + '/*.html').forEach(function (filepath) {
            var filename = filepath.match(/\/([^/]*)$/)[1];
            var onlyName = filename.substr(0, filename.lastIndexOf('.')) || filename;
            var targetViewDir = grunt.config.get('inject.baseDir') + '/' + onlyName;
            if (grunt.file.exists(targetViewDir)) {
                var targetFile = targetViewDir + '/' + grunt.config.get('inject.acceptor');
                if (grunt.file.exists(targetFile)) {
                    processFiles[targetFile] = filepath;
                } else {
                    grunt.log.warn('Destination view "' + grunt.config.get('inject.acceptor')
                        + '" not found under ' + targetViewDir);
                }
            } else {
                grunt.log.warn('Destination directory "' + onlyName
                    + '" not found under ' + grunt.config.get('inject.baseDir'));
            }
        });
        grunt.config.set('processhtml.dist.files', processFiles);
        // inject html files into ASP.NET views
        grunt.task.run('processhtml:dist');
        // remove html files from ASP.NET app
        grunt.task.run('clean:aspnet');
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

  grunt.registerTask('build', ['clean', 'copy', 'typescript', 'webpack', 'stylus', 'autoprefixer', 'sass']);

  grunt.registerTask('default', []);

  grunt.registerTask('aspnet', ['build', 'inject']);
};
