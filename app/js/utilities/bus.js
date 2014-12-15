/**
 * Shamelessly copied from https://gist.github.com/asciidisco/3986542
 */
define( [
	'underscore',
	'backbone'
], function ( _, Backbone )
{
	'use strict';
	var events = {};
	_.extend( events, Backbone.Events );
	return events;
} );