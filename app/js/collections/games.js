;
define( [
	'config',
	'backbone',
	'utilities/storageInterface',
	'models/game'
], function ( config, Backbone, storage, GameModel )
{
	return Backbone.Collection.extend( {

		model : GameModel,

		saveLocal : function ( storageKey )
		{
			storage.setItem( storageKey, this.toJSON() );
		},

		fetchLocal : function ( storageKey )
		{
			var localCollection = storage.getItem( storageKey ) || [];

			this.reset( localCollection );
		}
	} );
} );
