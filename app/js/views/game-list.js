;
define( [
	'backbone',
	'underscore',
	'config',
	'text!templates/game-list.html'
], function ( Backbone, _, config, GameListTemplate )
{
	return Backbone.View.extend( {

		template : _.template( GameListTemplate ),

		events : {
			'click .action-delete' : 'onGameDeleted'
		},

		initialize : function ()
		{
			this.listenTo( this.model, 'destroy', this.close );
			this.preloadBanner();
		},

		render : function ()
		{
			this.setElement( this.template( this.model.toJSON() ) );

			return this;
		},

		/**
		 * Preloads the banner image of the game for quick display in game single page
		 */
		preloadBanner : function ()
		{
			var banner = new Image;

			banner.src = config.baseUrlBanner.split( '[short]' ).join( this.model.get( 'short' ) );
		},

		/**
		 * Make sure the model and the view are both deleted. We wouldn't want zombies would we?
		 */
		onGameDeleted : function ()
		{
			this.model.trigger( 'destroy', this.model );
		},

		close : function ()
		{
			this.remove();
			this.unbind();
		}
	} );
} );
