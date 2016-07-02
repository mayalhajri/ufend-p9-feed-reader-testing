
## ufend-p9-feed-reader-testing

### Introduction

This repository contains a copy of the Feed Reader Testing Project from the Udacity Front End Web Developer Nanodegree.

#### About this application:

* includes a JSON object to configure a set of feeds - each having a name and url.
* provides a menu for users to change the selected feed to display.
* displays the headings of the articles from the selected feed in a list format with each providing a link through to original article on the source website.
* includes a Jasmine suite of tests for test-driven application development.

Modifications have been made by Roger Woodroofe to complete the Feed Reader Testing project for the Udacity Front End Web Developer Nanodegree.

More information on the project requirements are available at: [Udacity Front End Web Developer Nanodegree overview](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001#).


#### Project Overview

This project provided a web-based application that reads RSS feeds. The original developer of the application clearly saw the value in testing as they included [Jasmine](http://jasmine.github.io/) and wrote their first test suite. The project task was to take over the project following the departure of original developer, and complete a set of tests using Jasmine.


##### Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!

The Project provided an opportunity to learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.

* Writing effective tests requires analyzing multiple aspects of an application including the HTML, CSS and JavaScript - an extremely important skill when changing teams or joining a new company.
* Good tests give you the ability to quickly analyze whether new code breaks an existing feature within your codebase, without having to manually test all of the functionality.

### Project Information

#### Third Party Requirements:

* [Jasmine 2.4.1](http://jasmine.github.io/2.4/introduction.html)

The index.html requires internet access to download the following third party resources:
* [Google Font API - Roboto family font](https://fonts.google.com/specimen/Roboto?query=Roboto)
* [JQuery](http://jquery.com/) 3.0.0
* [Handlebars.js](http://handlebarsjs.com/) 4.0.5
* [Google API loader](https://developers.google.com/loader/)

Note: Copyright and license text of third party modules are included in their source code.

#### How to Use This Project
##### Repository Structure

Repository root folder `/` contains the source files and this `README.md`

Jasmine spec file containing modifications carried out for this project and used for the purposes of testing is located in `/jasmine/spec/feedreader.js`

##### A. Obtaining a copy of this Repository

1. (optional) Fork or clone the [repository](https://github.com/rogyw/ufend-P9-feed-reader-testing.git) on GitHub.
1. Use git to clone the repository to your local system. `git clone https://github.com/rogyw/ufend-P9-feed-reader-testing.git`
1. View the file `\index.html` in your browser.


##### B. Running a Local Http Web Server

(Optional) A web server is not required to view the application, however if you wish to test with a local devlopment http web server:

###### HTTP/1 using Python simple http server

Python provides  the ability to easily serve a folder via an http web service on your local computer.
1. Download and install Python from [https://www.python.org/downloads/](https://www.python.org/downloads/).
2. At the console command line prompt, change to the folder containing the set of files to be used.
```cd /my/path/to/files/```
3. At the console command line prompt, type `python -m SimpleHTTPServer 8080` to serve the current directories files to `http://localhost:8080/`
Note: On some systems including Windows 10, the command required the simple http server has changed to: `python -m http.server 8080`
4. Open a web browser and view `http://localhost:8080/`

## To Do
 - Add improved AJAX API Error handling.

## Changelog


1.1 initial project submission for Front End Web Developer Nanodegree
* Updates README.md (this file).
* Add jasmine test suites for existing application functionailty.

1.0 original repository forked for project


## Contacts

###Udacity
[Udacity website](https://www.udacity.com/)

###Roger Woodroofe
Contact Roger Woodroofe through [Rogyw on GitHub](https://github.com/rogyw) or email [rogyw@yahoo.co.nz](mailto:rogyw@yahoo.co.nz)
