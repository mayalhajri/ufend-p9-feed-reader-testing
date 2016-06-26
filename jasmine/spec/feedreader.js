/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

"use strict";

/* jshint jasmine: true */
/* global $, allFeeds, loadFeed */


/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function() {

	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* A test that loops through each feed in the allFeeds
		 * object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('Each Feed has a URL defined and the URL is not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(typeof feed.url).toMatch('string');
				expect(feed.url.trim().length).not.toBe(0);
			});
		});


		/* A test that loops through each feed in the allFeeds object
		 * and ensures it has a name defined and that the name is not
		 * empty.
		 */
		it('have a name defined and the name is not empty', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(typeof feed.name).toMatch('string');
				expect(feed.name.trim().length).not.toBe(0);
			});
		});
	});

	/* Test suite named "The menu" */
	describe('The Menu', function() {
		// Select all elements with class slide-menu
		var menuElement = $('.slide-menu');
		var menuIconElement = $('.menu-icon-link');

		/* Test to check there is one and only one menu
		 */
		it('has one slide-menu only', function() {
			expect(menuElement.length).toEqual(1);
		});

		/* Test that ensures the menu element is hidden by default.
		 */
		it('menu hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* test that ensures the menu changes visibility when the
		 *  menu icon is clicked.
		 *  This test has two expectations:
		 *  the menu displays when clicked and hides when clicked again.
		 */
		it('menu changes visibility when menu icon clicked.', function() {

			//Prepare for Test
			expect($('body').hasClass('menu-hidden')).toBe(true);

			// Trigger the click on the menu Button
			menuIconElement.trigger('click');

			// Check that the menu-hidden class has been removed from body
			expect($('body').hasClass('menu-hidden')).toBe(false);

			// Trigger the click on the menu Button
			menuIconElement.trigger('click');

			// Check that the menu-hidden class has been added to body
			expect($('body').hasClass('menu-hidden')).toBe(true);

		});

		// Check the menu is actually visible to the user
		describe('visibility', function() {

			it('positions menu content completely to left of document when hidden', function() {
				//Prepare for Test
				expect($('body').hasClass('menu-hidden')).toBe(true);

				var elementOffset = menuElement.offset();

				expect(elementOffset.left + menuElement.outerWidth()).toBeLessThan(0);
			});

			describe('after transition', function() {
				//Prepare for Test
				beforeEach(function(done) {
					//Inspiration reference: https://davidwalsh.name/css-animation-callback
					menuElement[0].addEventListener("transitionend", done, false);
					menuIconElement.trigger('click');
				});

				it('positions menu content at document left when visible', function(done) {
					expect($('body').hasClass('menu-hidden')).toBe(false);

					// Check Menu is in correct position
					var elementOffset = menuElement.offset();
					expect(elementOffset.left).toEqual(0);

					// Tidy Up after test
					menuElement[0].removeEventListener("transitionend", done, false);
					menuIconElement.trigger('click');

					// Complete Async Test
					done();
				});
			});
		});
	});

	/* TODO: Write a new test suite named "Initial Entries" */

	/* TODO: Write a test that ensures when the loadFeed
	 * function is called and completes its work, there is at least
	 * a single .entry element within the .feed container.
	 * Remember, loadFeed() is asynchronous so this test will require
	 * the use of Jasmine's beforeEach and asynchronous done() function.
	 */

	/* TODO: Write a new test suite named "New Feed Selection"

	/* TODO: Write a test that ensures when a new feed is loaded
	 * by the loadFeed function that the content actually changes.
	 * Remember, loadFeed() is asynchronous.
	 */

}());

/* TODO: Write a new test suite named "New Feed Selection" */
/*
 * TODO: Write a test that ensures when a new feed is loaded
 * by the loadFeed function that the content actually changes.
 * Remember, loadFeed() is asynchronous.
 */
