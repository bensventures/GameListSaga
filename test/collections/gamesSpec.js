define( [
	'collections/games',
	'utilities/storageInterface'
], function ( GamesCollection, storage )
{
	describe( 'fetchLocal', function ()
	{
		var games;

		beforeEach( function ()
		{
			games = new GamesCollection;

			spyOn( storage, 'getItem' );
			spyOn( games, 'reset' );
		} );

		it( 'should reset the collection with an empty array if empty', function ()
		{
			games.fetchLocal();

			expect( games.reset ).toHaveBeenCalledWith( [] );
		} );

		it( 'should reset the collection with local data if present', function ()
		{
			var expectedModels = [
				{
					'name' : 'game1'
				}
			];

			storage.getItem.andReturn( expectedModels );

			games.fetchLocal();

			expect( games.reset ).toHaveBeenCalledWith( expectedModels );
		} );
	} );
} );