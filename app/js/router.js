;
define( [
	'backbone'
], function ( Backbone )
{
	return Backbone.Router.extend( {

		initialize : function ( views ) {
			this.homeView = views.homeView,
			this.searchView = views.searchView;
			this.gameView = views.gameView;
		},

		routes : {
			'game/:id' : 'game',
			'preview/:id' : 'preview',
			'add' : 'add',
			'' : 'reset'
		},

		reset : function ()
		{
			if ( this.currentPanel ) {
				this.currentPanel.hide();
			}

			document.title = this.homeView.title;
			this.currentPanel = null;
		},

		add : function () {

			if ( this.currentPanel ) {
				this.currentPanel.hide();
			}

			this.showView( this.searchView );
		},

		game : function ( gameId ) {
			this.showView( this.gameView, [
				this.homeView.collection.get( gameId )
			] );
		},

		preview : function ( gameId )
		{
			this.showView( this.gameView, [
				this.searchView.collection.get( gameId ),
				true
			] );
		},

		showView : function ( view, params )
		{
			view.display.apply( view, params );

			this.currentPanel = view;
			document.title = view.title;
		}
	} );
} );