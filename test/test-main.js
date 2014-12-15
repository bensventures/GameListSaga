var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function ( path )
{
	return '../../' + path.replace( /^\/base\//, '' ).replace( /\.js$/, '' );
};

Object.keys( window.__karma__.files ).forEach( function ( file )
{
	if ( TEST_REGEXP.test( file ) )
	{
		// Normalize paths to RequireJS module names.
		allTestFiles.push( pathToModule( file ) );
	}
} );

require.config( {
	// Karma serves files under /base, which is the basePath from your config file
	baseUrl : '/base/app/js',

	paths : {
		jquery : '../../bower_components/jquery/dist/jquery',
		backbone : '../../bower_components/backbone/backbone',
		underscore : '../../bower_components/underscore/underscore',
		bus : 'utilities/bus',
		unveil : 'vendor/jquery.unveil',
		velocity : '../../bower_components/velocity/velocity.min',
		text : '../../bower_components/requirejs-text/text',
		templates : '../templates'
	},

	shim : {
		velocity: {
			deps: [ 'jquery' ]
		},
		unveil : {
			deps : [ 'jquery' ]
		}
	},

	// dynamically load all test files
	deps : allTestFiles,

	// we have to kickoff jasmine, as it is asynchronous
	callback : window.__karma__.start
} );
