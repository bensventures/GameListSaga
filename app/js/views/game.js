;
define( [
	'backbone',
	'underscore',
	'bus',
	'config',
	'velocity',
	'models/game',
	'text!templates/game.html'
], function ( Backbone, _, bus, config, velocity, GameModel, GameTpl )
{
	// The main view for the app
	return Backbone.View.extend( {

		template : _.template( GameTpl ),

		events : {
			'click .action-delete' : 'onDeleteGame'
		},

		initialize : function ()
		{
			this.gameView = this.$el.find( '.container' );
		},

		render : function ()
		{
			this.title = this.model.get( 'name' );
			this.gameView.html( this.template( {
				game : this.model.toJSON(),
				preview : this.preview
			} ) );
		},

		display : function ( model, preview )
		{
			this.model = model;
			this.preview = preview || false;

			this.render();

			this.originalPosition = this.$el.css( 'bottom' );

			this.$el.velocity( {
				bottom: '0%'
			}, 'easeInSine' );
		},

		onDeleteGame : function ()
		{
			this.model.trigger( 'destroy', this.model );
		},

		hide : function ()
		{
			this.$el.velocity( {
				bottom: this.originalPosition
			}, 'easeInSine' );
		}
	} );
} );
