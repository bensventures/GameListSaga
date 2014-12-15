define( [
	'config'
],
	function ( config )
	{
		'use strict';

		return {

			interface : config.storageInterface,

			getItem : function ( key )
			{
				return JSON.parse( window[this.interface].getItem( key ) );
			},

			setItem : function ( key, value )
			{
				return window[this.interface].setItem( key, JSON.stringify( value ) );
			},

			removeItem : function ( key )
			{
				return window[this.interface].removeItem( key );
			}
		};
	} );
