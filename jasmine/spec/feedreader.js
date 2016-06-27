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

	/* ===========================================================
	 * Test Suite: RSS Feeds
	 * ===========================================================
	 * This is our first test suite - a test suite just contains
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


	/* ===========================================================
	 * Test Suite: The Menu.
	 * ===========================================================
	 */
	describe('The Menu', function() {
		// Select all elements with class slide-menu
		var menuElement = $('.slide-menu');
		var menuIconElement = $('.menu-icon-link');


		/* Test to check there is one and only one menu.
		 */
		it('has one slide-menu only', function() {
			expect(menuElement.length).toEqual(1);
		});


		/* Test that ensures the menu element is hidden by default.
		 */
		it('menu hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});


		/* Test that ensures the menu changes visibility when the
		 *  menu icon is clicked. This test has two expectations:
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


		/* Check the menu is actually visible to the user.
		 */
		describe('visibility', function() {

			/* Test the menu is not shown in the document when hidden.
			 */
			it('positions menu content completely to left of document when hidden', function() {

				//Prepare for Test
				expect($('body').hasClass('menu-hidden')).toBe(true);
				var elementOffset = menuElement.offset();

				expect(elementOffset.left + menuElement.outerWidth()).toBeLessThan(0);
			});

			/* Test the menu is shown on left margin folowing transition.
			 */
			describe('after transition', function() {

				//Prepare for Test
				beforeEach(function(done) {
					//Inspiration reference: https://davidwalsh.name/css-animation-callback
					menuElement[0].addEventListener("transitionend", done, false);
					menuIconElement.trigger('click');
				});

				/* Test position of menu when visible.
				 */
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


		/* Test to ensure when a link in our feedList menu is clicked on,
		 * the menu is hidden indicating successful trigger of feed selection
		 */
		describe('Menu hidden after item selection', function() {

			// Get all the link items out of the menu and count
			var menuFeedItems = $('.feed-list').find('a');
			var testID = 1;

			beforeEach(function() {
				// Click on the Menu Icon to display the menu.
				var menuIconElement = $('.menu-icon-link');
				menuIconElement.trigger('click');

				// Click on one of the feeds in menu
				menuFeedItems[testID].click();
			});

			afterEach(function() {
				// Tidy up and return to default feed
				menuFeedItems[0].click();
			});


			/* Test the menu element is now hidden.
			 */
			it('menu hidden by default', function() {
				expect($('body').hasClass('menu-hidden')).toBe(true);
			});
		});
	});


	/* ===========================================================
	 * Test Suite: Initial Entries.
	 * ===========================================================
	 */
	describe('Initial Entries', function() {

		var container = $('.feed');

		beforeEach(function(done) {
			loadFeed(0, done);
		});


		/* Test loadFeed function can be called and complete its work
		 * there is at least a single .entry element within the .feed
		 * container.
		 */
		it('displays at least one item in feed', function() {
			var items = container.find('.entry');
			expect(items.length).toBeGreaterThan(0);
		});


		/* Test loadFeed updates the header title to display the feed name.
		 */
		it('displays the feed heading', function() {
			var feedName = allFeeds[0].name;
			var headerTitle = $('.header-title');
			expect(headerTitle.html().trim()).toMatch(feedName.trim());
		});
	});


	/* ===========================================================
	 * Test Suite: New Feed Selection.
	 * ===========================================================
	 * test that ensures when a new feed is loaded
	 * by the loadFeed function that the content actually changes.
	 */
	describe('New Feed Selection', function() {

		/* TEST_FEED_ID specifies the array index (starts at 0) to use
		 * for the new feed selection.
		 */
		var TEST_FEED_ID = 1;


		/* Test there is more than one feed to enable a different feed
		 * to be selected.
		 */
		it('has more than one feed to select', function() {
			var feeds = $('.feed-list').children();

			//check there is at least two feeds to select from
			expect(feeds.length).toBeGreaterThan(1);

			// Check the number of feeds exceeds our selected array TEST_FEED_ID
			expect(feeds.length).toBeGreaterThan(TEST_FEED_ID);
		});


		/* Test loadFeed updates displayed feed entries and heading
		 */
		describe('Update of Feed', function() {

			var TEST_TEXT = '**TEST*UdacityFENDP9FeedReader*TEST**';

			/* Before test, set up a known value in feed entry headings to check
			 * it is overwritten. Assumes its possible two different feeds
			 * could have the same most recent feed entry and therefore cannot
			 * reliably be used to detect change.
			 */
			beforeEach(function(done) {
				// select array of all feed headings
				var feedEntryHeadings = $('.entry h2');

				// Update all headings with testing text for detection purposes
				feedEntryHeadings.html(TEST_TEXT);

				//Load the second feed with async done callback
				loadFeed(1, done);
			});

			afterEach(function() {
				//After test, return back to default
				loadFeed(0);
			});


			/* test that ensures when a new feed is loaded
			 * by the loadFeed function that the content actually changes.
			 */
			it('changes entries in feed', function() {

				var items = $('.entry');

				/* check there are feed entries */
				expect(items.length).toBeGreaterThan(0);

				/* Check for inserted TEST_TEXT to see if it exists in headings.
				 */
				var feedEntryHeadingsMatched = $(".entry h2:contains('" + TEST_TEXT + "')");
				expect(feedEntryHeadingsMatched.length).toEqual(0);
			});


			/* test that ensures when a new feed is loaded
			 * by the loadFeed function that the header title is updated
			 * to display the feed name.
			 */
			it('updates the heading to feed name', function() {
				var feedName = allFeeds[TEST_FEED_ID].name;
				var headerTitle = $('.header-title');
				expect(headerTitle.html().trim()).toMatch(feedName.trim());
			});
		});
	});

}());
