define( [
	'bus',
	'views/search',
	'models/game',
	'collections/search-results'
], function ( bus, SearchView, GameModel, GamesCollection )
{
	describe( 'SearchView', function ()
	{
		var searchView;

		beforeEach( function ()
		{
			searchView = new SearchView;
		} );

		describe( 'initialize', function ()
		{
			it( 'should create a collection of games for holding the search', function ()
			{
				expect( searchView.collection instanceof GamesCollection ).toBeTruthy();
			} );
		} );

		describe( 'search', function ()
		{
			beforeEach( function ()
			{
				spyOn( searchView, 'renderList' );
			} );

			it( 'should call renderList with the value of the search', function ()
			{
				searchView.search( {
					currentTarget : {
						value : 'gam'
					}
				} );

				expect( searchView.renderList ).toHaveBeenCalledWith( 'gam' );
			} );
		} );

		describe( 'renderList', function ()
		{
			beforeEach( function ()
			{
				searchView.results = $( '<ul id="results"></ul>' );
				searchView.myGamesCollection = new Backbone.Collection;

				spyOn( searchView, 'filterByName' ).andReturn( [
					{
						name : 'game1'
					},
					{
						name : 'game2'
					}
				] );
			} );

			it( 'should add all models passed to DOM elements', function ()
			{
				searchView.renderList( '' );

				expect( searchView.results[0].children.length ).toBe( 2 );
			} );
		} );

		describe( 'filterByName', function ()
		{
			beforeEach( function ()
			{
				searchView.collection = new GamesCollection( [
					{
						name : 'game1'
					},
					{
						name : 'game2'
					},
					{
						name : 'other1'
					},
					{
						name : '3emag'
					}
				] );
			} );

			it( 'should return an array of games filtered by title', function ()
			{
				expect( searchView.filterByName( 'game' ).length ).toBe( 2 );
			} );

			it( 'should not take into account the case of the search term or the model attribute', function ()
			{
				expect( searchView.filterByName( 'GaMe' ).length ).toBe( 2 );
			} );
		} );

		describe( 'onAddGame', function ()
		{
			beforeEach( function ()
			{
				spyOn( bus, 'trigger' );
			} );

			it( 'should trigger an event on the global bus', function ()
			{
				searchView.onAddGame( {
					currentTarget : $( '<button data-game-id></button>' )[0]
				} );

				expect( bus.trigger ).toHaveBeenCalled();
			} );

			it( 'should sand the correct model with the event', function ()
			{
				searchView.collection = new GamesCollection( [
					{
						name : 'game 1',
						short : 'game1'
					},
					{
						name : 'game 2',
						short : 'game2'
					}
				] );

				searchView.onAddGame( {
					currentTarget : $( '<button data-game-id="game1"></button>' )[0]
				} );

				expect( bus.trigger ).toHaveBeenCalledWith( 'game:added', searchView.collection.get( 'game1' ) );
			} );
		} );
	} );
} );