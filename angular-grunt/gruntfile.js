  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      ts: {
        default: {
          tsconfig: './tsconfig.json'
        }
      },
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: [
            'dist/**/*.js'
          ],
          dest: 'dist/js/app.js'
        }
      },
      sass: {
        options: {
          implementation: require('sass')
        },
        dist: {
          options: {
            style: 'expanded'
          },
          files: {
            'dist/css/styles.css': 'src/app/**/*.scss'
          }
        }
      },
      cssmin: {
        dist: {
          files: {
            'dist/css/styles.min.css': ['dist/css/styles.css']
          }
        }
      },
      uglify: {
        build: {
          options: {
            sourceMap: true
          },
          files: {
            'dist/js/app.min.js': 'dist/js/app.js'
          }
        }
      },
      copy: {
        main: {
          files: [
            { expand: true, cwd: 'src/assets/images', src: ['**'], dest: 'dist/assets/images' }
          ]
        }
      },
      imagemin: {
        dynamic: {
          files: [{
            expand: true,
            cwd: 'src/assets/images',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/assets/images'
          }]
        }
      },
      watch: {
        scripts: {
          files: ['src/app/**/*.ts', 'src/sass/**/*.scss'],
          tasks: ['concat', 'sass', 'cssmin', 'uglify'],
          options: {
            livereload: true
          }
        }
      }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['ts','concat', 'sass', 'cssmin', 'uglify', 'copy', 'imagemin']);
  };
