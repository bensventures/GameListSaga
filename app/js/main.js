;
( function ()
{
	'use strict';

	require.config( {
		paths : {
			jquery : '../../bower_components/jquery/dist/jquery.min',
			velocity : '../../bower_components/velocity/velocity.min',
			unveil : 'vendor/jquery.unveil',
			backbone : '../../bower_components/backbone/backbone',
			underscore : '../../bower_components/underscore/underscore-min',
			text : '../../bower_components/requirejs-text/text',
			bus : 'utilities/bus',
			templates : '../templates'
		},
		shim : {
			velocity : {
				deps : [ 'jquery' ]
			},
			unveil : {
				deps : [ 'jquery' ]
			}
		}
	} );

	require( [
		'backbone',
		'router',
		'views/home',
		'views/search',
		'views/game'
	], function ( Backbone, Router, HomeView, SearchView, GameView )
	{
		var homeView = new HomeView( {
				el : document.getElementById( 'home-view' )
			} ),
			searchView = new SearchView( {
				el : document.getElementById( 'search-view' )
			} ),
			gameView = new GameView( {
				el : document.getElementById( 'game-view' )
			} ),
			router = new Router( {
				homeView : homeView,
				searchView : searchView,
				gameView : gameView
			} );

		gameView.myGamesCollection = searchView.myGamesCollection = homeView.collection;

		Backbone.history.start();
	} );
}() );
