;
define( [
	'backbone',
	'underscore',
	'bus',
	'velocity',
	'unveil',
	'collections/search-results',
	'text!templates/search-list.html'
], function ( Backbone, _, bus, velocity, unveil, GamesCollection, SearchListTpl )
{
	// The main view for the app
	return Backbone.View.extend( {

		title : 'Add new games to your Kingdom.',

		template : _.template( SearchListTpl ),

		events : {
			'keyup #search-term' : 'search',
			'click .action-add' : 'onAddGame'
		},

		initialize : function ()
		{
			var self = this;

			self.results = $( '#results' );
			self.searchTerm = '';

			self.collection = new GamesCollection;

			self.listenTo( self.collection, 'reset', self.render );

			bus.on( 'game:added', function () {
				self.search();
			} );

			bus.on( 'game:removed', function () {
				self.search();
			} );

			this.collection.fetch( { reset : true } );
		},

		display : function ()
		{
			this.$el.velocity( {
				bottom: '0%'
			}, 'easeInSine' );
		},

		hide : function ()
		{
			this.$el.velocity( {
				bottom: this.originalPosition
			}, 'easeInSine' );
		},

		render : function ()
		{
			this.renderList( this.searchTerm );
			this.originalPosition = this.$el.css( 'bottom' );
			return this;
		},

		search : function ( event )
		{
			if ( event )
			{
				this.searchTerm = event.currentTarget.value;
			}

			this.renderList( this.searchTerm );
		},

		/**
		 * Renders a list of models directly in the template
		 * Faster than creating a sub-view for each model and rendering it
		 * @param {String} search
		 */
		renderList : function ( search )
		{
			this.results.html( this.template( {
				results : this.filterByName( search ),
				myGames : this.myGamesCollection
			} ) );

			// Lazy load images of the search results to not lock-up the browser
			this.results.find( '.thumb' ).unveil( this.results.height() * 2, this.results );
		},

		/**
		 * Searches through a collection for partial match model's name
		 * @param {String} filterString
		 * @returns {Array} An array of all the models that partially match the passed string
		 */
		filterByName : function ( filterString )
		{
			return _.filter( this.collection.toJSON(), function ( model )
			{
				return ~model.name.toLowerCase().indexOf( filterString.toLowerCase() );
			} );
		},

		/**
		 * Send event to the bus to notify listeners that a game should be added.
		 * Also animates some buttons etc
		 * @param {Event} event
		 */
		onAddGame : function ( event )
		{
			var $button = $( event.currentTarget ),
				gameId = $button.attr( 'data-game-id' );

			$button.fadeOut( function (){
				$button.blur();
				$button.addClass( 'added' ).fadeIn();
			});

			bus.trigger( 'game:added', this.collection.get( gameId ) );
		}
	} );
} );

