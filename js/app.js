/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

"use strict";
// set jshint to ignore console, alert, etc
/* jshint devel: true */
// set jshint to ignore external globals
/* global $, Handlebars, google : false */

// USE_UDACITY_RSSTOJSON boolean to switch between
// default behaviour (true) or alternative provider (false)
var USE_UDACITY_RSSTOJSON = true;
// DEBUG boolean to enable console output and alert on error
var DEBUG = true;

// The names and URLs to all of the feeds we'd like available.
var allFeeds = [{
	name: 'Udacity Blog',
	url: 'http://blog.udacity.com/feed'
}, {
	name: 'CSS Tricks',
	url: 'http://css-tricks.com/feed'
}, {
	name: 'HTML5 Rocks',
	url: 'http://feeds.feedburner.com/html5rocks'
}, {
	name: 'Linear Digressions',
	url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
function init() {
	// Load the first feed we've defined (index of 0).
	loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
function loadFeed(id, cb) {
	var feedUrl = allFeeds[id].url,
		feedName = allFeeds[id].name;

	var apiURL, apiData, apiType, apiContentType;

	if (USE_UDACITY_RSSTOJSON) {
		apiURL = 'https://rsstojson.udacity.com/parseFeed';
		apiData = JSON.stringify({ url: feedUrl });
		apiType = "POST";
		apiContentType = "application/json";
	} else {
		apiURL = 'http://rss2json.com/api.json?rss_url=' + encodeURIComponent(feedUrl);
		apiData = "";
		apiType = "POST";
		apiContentType = 'application/x-www-form-urlencoded; charset=UTF-8';
	}

	$.ajax({
		type: apiType,
		url: apiURL,
		data: apiData,
		contentType: apiContentType,
		success: function(result, status) {
			if (DEBUG) {
				console.log(result);
			}
			var container = $('.feed'),
				title = $('.header-title');
			var entries, entriesLen;

			if (USE_UDACITY_RSSTOJSON) {
				entries = result.feed.entries;
				entriesLen = entries.length;
			} else {
				entries = result.items;
				entriesLen = entries.length;
			}

			var entryTemplate = Handlebars.compile($('.tpl-entry').html());

			title.html(feedName); // Set the header text
			container.empty(); // Empty out all previous entries

			/* Loop through the entries we just loaded via the Google
			 * Feed Reader API. We'll then parse that entry against the
			 * entryTemplate (created above using Handlebars) and append
			 * the resulting HTML to the list of entries on the page.
			 */
			entries.forEach(function(entry) {
				container.append(entryTemplate(entry));
			});

			if (cb) {
				cb();
			}
		},
		error: function(result, status, err) {
			//run only the callback without attempting to parse result due to error
			var errorTxt = "Error in Ajax Request: " + status + " - " + err;
			console.log(errorTxt);
			alert(errorTxt);
			if (cb) {
				cb();
			}
		},
		dataType: "json"
	});
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.load('feeds', '1');
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function() {
	var container = $('.feed'),
		feedList = $('.feed-list'),
		feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
		feedId = 0,
		menuIcon = $('.menu-icon-link');

	/* Loop through all of our feeds, assigning an id property to
	 * each of the feeds based upon its index within the array.
	 * Then parse that feed against the feedItemTemplate (created
	 * above using Handlebars) and append it to the list of all
	 * available feeds within the menu.
	 */
	allFeeds.forEach(function(feed) {
		feed.id = feedId;
		feedList.append(feedItemTemplate(feed));

		feedId++;
	});

	/* When a link in our feedList is clicked on, we want to hide
	 * the menu, load the feed, and prevent the default action
	 * (following the link) from occurring.
	 */
	feedList.on('click', 'a', function() {
		var item = $(this);

		$('body').addClass('menu-hidden');
		loadFeed(item.data('id'));
		return false;
	});

	/* When the menu icon is clicked on, we need to toggle a class
	 * on the body to perform the hiding/showing of our menu.
	 */
	menuIcon.on('click', function() {
		$('body').toggleClass('menu-hidden');
	});
}());
