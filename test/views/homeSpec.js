define( [
	'backbone',
	'config',
	'views/home'
], function ( backbone, config, HomeView )
{
	describe( 'HomeView', function ()
	{
		var homeView;

		beforeEach( function ()
		{
			spyOn( HomeView.prototype, 'initialize' );

			homeView = new HomeView;
		} );

		afterEach( function ()
		{
			homeView.remove();
		} );

		describe( 'render', function ()
		{
			beforeEach( function ()
			{
				spyOn( homeView, 'renderList' );
				spyOn( homeView, 'renderCounter' );
			} );

			it( 'should render the list of games', function ()
			{
				homeView.render();

				expect( homeView.renderList ).toHaveBeenCalled()
			} );

			it( 'should render the counter of games', function ()
			{
				homeView.render();

				expect( homeView.renderCounter ).toHaveBeenCalled()
			} )
		} );

		describe( 'renderList', function ()
		{
			beforeEach( function ()
			{
				homeView.gamesList = $( '<div id="games-list"></div>' );
			} );

			it( 'should populate the games list', function ()
			{
				homeView.collection = new Backbone.Collection( [
						{
							name : 'game1',
							short : 'game1'
						},
						{
							name : 'game2',
							short : 'game2'
						}
					]
				);

				homeView.renderList();

				expect( homeView.gamesList[0].children.length ).toBe( 2 );
			} );
		} );

		describe( 'renderCounter', function ()
		{
			beforeEach( function ()
			{
				homeView.counter = $( '<div id="counter"></div>' );
			} );

			it( 'should render the template in the counter node', function ()
			{
				homeView.collection = {
					length : 5
				};

				homeView.renderCounter();

				// Testing the innerText text to be independent from markup changes
				expect( homeView.counter.text() ).toBe( '5 games' );
			} );
		} );
	} );
} );
