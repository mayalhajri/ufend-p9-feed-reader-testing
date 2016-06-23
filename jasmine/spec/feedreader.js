/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

"use strict";

/* jshint jasmine: true */
/* global $, allFeeds */

/*
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
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
		//TODO	- check "by default"
		/* Test that ensures the menu element is hidden by default.
		 */
		it('hides the menu element by default.', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* test that ensures the menu changes visibility when the
		 *  menu icon is clicked.
		 *  This test has two expectations:
		 *  the menu displays when clicked and hides when clicked again.
		 */
		it('menu changes visibility when menu icon clicked.', function() {

			var menuElement = $('.menu-icon-link');

			// Ensure Menu is hidden before starting other tests
			expect($('body').hasClass('menu-hidden')).toBe(true);

			// Trigger the click on the menu Button
			menuElement.trigger('click');

			// Check that the menu-hidden class has been removed from body
			expect($('body').hasClass('menu-hidden')).toBe(false);

			// Check the menu is actually visible to the user
			describe('menu visible', function() {
				// Select all elements with class slide-menu
				var menuElements = $('.slide-menu');

				it('menu top-left at document top-left', function() {
					// Check each element marked as slide-menu
					menuElements.forEach(function(element) {
						var elementOffset = element.offset();
						expect(elementOffset.left).toEqual(0);
						expect(elementOffset.top).toEqual(0);
					});
				});
			});

			// Trigger the click on the menu Button
			menuElement.trigger('click');

			// Check that the menu-hidden class has been added to body
			expect($('body').hasClass('menu-hidden')).toBe(true);

			// Check the menu is off viewport
			describe('menu not visible', function() {
				// Select all elements with class slide-menu
				var menuElements = $('.slide-menu');

				it('menu right edge to left of document left', function() {
					// Check each element marked as slide-menu
					menuElements.forEach(function(element) {
						var elementOffset = element.offset();
						expect(elementOffset.left + element.width()).toBeLessThan(0);
					});
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
