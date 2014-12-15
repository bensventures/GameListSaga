;
define( [
	'config',
	'backbone',
	'models/game'
], function ( config, Backbone, GameModel )
{
	return Backbone.Collection.extend( {

		// Reference to this collection's model.
		model : GameModel,

		parse : function ( response ){
			return response.games;
		},

		url : config.gamesUrl
	} );
} );
