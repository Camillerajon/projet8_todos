/*global NodeList */
(function (window) {
	'use strict';

	/**
	 * @file
	 * @see {@link Helper}
	 */

	/**
	 * @namespace Helper
	*/
	
	/**
	 * @description Select the items by the CSS selector. qs = querySelector Use in {@link View}.
	 * @function $qs
	 * @memberof Helper
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};

	/**
	 * @description Select the items by the CSS selector. qsa = querySelectorAll Use in {@link View}.
	 * @function $qsa
	 * @memberof Helper
	 */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * @description Includes the addEventListener. Use in {@link View}. Use in {@link App}.
	 * @function $on
	 * @memberof Helper
	 * @param {object} target The target.
	 * @param {bolean} type Focus or Bluer.
	 * @param {function} callback Callback function
 	 * @param {object} useCapture The element
	 */
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
	 * @description Delegate an eventListener to a parent. Use in {@link View}.
	 * @function $delegate
	 * @memberof Helper
	 * @param {object} target The target.
	 * @param {function} selector Check that there is a match between children and parents.
	 * @param {bolean} type The type of event.
 	 * @param {function} handler A callback executed if there is a certain condition.
	 */
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	/**
	 * @description Find the element's parent with the given tag name:$parent(qs('a'), 'div');
	 * @function $parent
	 * @memberof Helper
	 * @param {object} element The active element.
	 * @param {string} tagName The element tagName.
	 */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
