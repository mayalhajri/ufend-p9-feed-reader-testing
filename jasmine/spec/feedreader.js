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
		it('each feed has a url defined and the url is not empty', function() {
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
			menuIconElement.click();

			// Check that the menu-hidden class has been removed from body
			expect($('body').hasClass('menu-hidden')).toBe(false);

			// Trigger the click on the menu Button
			menuIconElement.click();

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

				//Check the Menu has been moved sufficiently to the left to make it hidden
				expect(elementOffset.left + menuElement.outerWidth()).not.toBeGreaterThan(0);
			});

			/* Test the menu is shown on left margin folowing transition.
			 */
			describe('after transition', function() {

				//Prepare for Test
				beforeEach(function(done) {
					//Inspiration reference: https://davidwalsh.name/css-animation-callback
					menuElement[0].addEventListener("transitionend", done, false);
					menuIconElement.click();
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
					menuIconElement.click();

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
				menuIconElement.click();

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
			 * it is overwritten. This addresses the possibilty two different feeds
			 * could have the same feed entries and therefore cannot
			 * reliably be used to detect change. e.g. A feed for a blog
			 * single-category and a seperate feed for blog all-posts could have
			 * the same content if no other category posts have been made.
			 */
			beforeEach(function(done) {
				// select array of all feed headings
				var feedEntryHeadings = $('.entry h2');

				// Update all headings with testing text for detection purposes
				feedEntryHeadings.html(TEST_TEXT);

				//Load the second feed with async done callback
				loadFeed(1, done);
			});

			afterEach(function(done) {
				//After test, return back to default
				loadFeed(0, done);
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


		/* Test sequential loading of feeds
		 * Reference: Based on code structure outline recommended in Udacity project reviewer
		 */
		describe('Sequential Loading of Feeds', function() {
			var feedFirst = {};
			var feedSecond = {};

			beforeEach(function(done) {
				//Load the first feed with async done callback
				loadFeed(0, function() {
					// Store values in feedFirst structure
					feedFirst.title = $('.header-title').text();
					feedFirst.items = $('.feed').children('.entry-link');
					feedFirst.count = feedFirst.items.length;
					feedFirst.itemURLs = feedFirst.items.map(function() {
						return this.href.trim();
					});
					feedFirst.itemHeadings = feedFirst.items.find('h2').map(function() {
						return this.innerText.trim();
					});

					// Now, load the second feed
					loadFeed(1, function() {
						// Store values in feedSecond structure
						feedSecond.title = $('.header-title').text();
						feedSecond.items = $('.feed').children('.entry-link');
						feedSecond.count = feedSecond.items.length;
						feedSecond.itemURLs = feedSecond.items.map(function() {
							return this.href.trim();
						});
						feedSecond.itemHeadings = feedSecond.items.find('h2').map(function() {
							return this.innerText.trim();
						});
						done();
					});
				});
			});

			afterEach(function(done) {
				//After test, return back to default
				loadFeed(0, done);
			});

			/* test that ensures when a new feed is loaded
			 * by the loadFeed function that the content actually changes.
			 *
			 * Note:
			 * A valid case is to have two different feeds including the same set of articles,
			 * URLs, and Titles. To reduce the possibilty of false test indication from this case,
			 * all articles in the feed with the lowest article count are compared 1:1 with the
			 * other feed. If no difference it detected in that set, an error is raised to indicate
			 * possibility of an issue.
			 */
			it('changes entries in feed', function() {
				// check there are feed entries
				expect(feedFirst.items.length).toBeGreaterThan(0);
				expect(feedSecond.items.length).toBeGreaterThan(0);

				// Check for correct number of Headings and URLs for the number of items
				expect(feedFirst.itemURLs.length).toEqual(feedFirst.count);
				expect(feedSecond.itemURLs.length).toEqual(feedSecond.count);

				expect(feedFirst.itemHeadings.length).toEqual(feedFirst.count);
				expect(feedSecond.itemHeadings.length).toEqual(feedSecond.count);

				// Check Title has changed
				expect(feedSecond.title).not.toMatch(feedFirst.title);

				//Check feed items have changed
				var changeDetected = false;
				for (var i = 0;
					(i < feedSecond.count) && (i < feedFirst.count) && (changeDetected === false); i++) {
					if ((feedSecond.itemHeadings[i] != feedFirst.itemHeadings[i]) ||
						(feedSecond.itemURLs[i] != feedFirst.itemURLs[i])) {
						changeDetected = true;
					}
				}
				expect(changeDetected).toBe(true);
			});
		});
	});

}());
