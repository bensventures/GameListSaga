;
define( [
	'backbone',
	'underscore',
	'bus',
	'config',
	'velocity',
	'collections/games',
	'views/game-list',
	'text!templates/games-counter.html'
], function ( Backbone, _, bus, config, velocity, GamesCollection, GameListView, GameCounterTpl )
{
	// The main view for the app
	return Backbone.View.extend( {

		title : 'Game List Saga, your Kingdom.',

		counterTemplate : _.template( GameCounterTpl ),

		events : {
			'click .action-edit' : 'onEditToggle'
		},

		initialize : function ()
		{
			var self = this;

			self.counter = $( '#games-counter' );
			self.gamesList = $( '#games-list' );

			self.collection = new GamesCollection();

			self.listenTo( self.collection, 'reset', self.render );

			self.listenTo( self.collection, 'add', self.addOne );
			self.listenTo( self.collection, 'add', self.renderCounter );

			self.listenTo( self.collection, 'destroy', self.onGameRemoved );

			bus.on( 'game:added', function ( game ){
				self.onGameAdded( game );
			} );

			self.collection.fetchLocal( config.myGamesStorageKey );
		},

		render : function ()
		{
			this.renderList();
			this.renderCounter();
		},

		renderList : function ()
		{
			var self = this;

			this.collection.each( function ( game )
			{
				self.addOne( game );
			} )
		},

		renderCounter : function ()
		{
			this.counter.html( this.counterTemplate( {
				count : this.collection.length
			} ) );
		},

		addOne : function ( game )
		{
			var gameView = new GameListView( { model : game } );

			this.gamesList.prepend( gameView.render().el );
		},

		/**
		 * Called when a user action adds a game.
		 * Actually adds the game to the collection and save the collection in local
		 * @param game
		 */
		onGameAdded : function ( game )
		{
			this.collection.add( game );
			this.collection.saveLocal( config.myGamesStorageKey );
		},

		/**
		 * Makes sure we update the local when a game is removed as well
		 */
		onGameRemoved : function ()
		{
			this.renderCounter();
			this.collection.saveLocal( config.myGamesStorageKey );

			bus.trigger( 'game:removed' );
		},

		/**
		 * Makes all the games in the list 'editable', meaning they can be deleted
		 */
		onEditToggle : function ()
		{
			this.$el.toggleClass( 'editable' );
		}
	} );
} );
