/*global app, $on */
(function () {
	/**
	 * @file
	 * @see {@link App} 
	 */
	'use strict';

	/**
	 * @namespace App
	*/

	/**@function Todo
	 * @description Define a new todo, it is the entry point of the application
	 * @memberof App
	 * @param {string} (name) The name of the new todo list
	 */
	function Todo(name) {
		this.storage = new app.Store(name);
		this.model = new app.Model(this.storage);
		this.template = new app.Template();
		this.view = new app.View(this.template);
		this.controller = new app.Controller(this.model, this.view);
	}

	var todo = new Todo('todos-vanillajs');

	/**@function setView
	 * @memberof App
	 * @description Add the route of the page in the url ''|| active || completed
	 */
	function setView() {
		todo.controller.setView(document.location.hash);
	}
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();
