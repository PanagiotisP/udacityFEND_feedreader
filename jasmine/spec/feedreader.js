/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* Test if each feed in allFeeds has valid URL */
        it('have URL', function () {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            }
        });

        /* Test if each feed in allFeeds has valid name */
        it('have name', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            }
        });
    });


    /* Test suite to check menu functionality */
    describe('The menu', function () {
        /* Test that the menu is hidden by default by checking
        * if menu-hidden is its starting class
        */
        it('is hidden by default', function () {
            let body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
        /* Test that the menu changes visibility each time it is clicked
        * by checking the menu-hidden class
        */
        it('changes visibility', function () {
            let body = document.querySelector('body');
            let menuIcon = document.querySelector('.menu-icon-link');
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });
    /* Test suite that checks the loadFeed function */
    describe('Initial Entries', function () {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        it('should have at least one entry', function () {
            let feedContainer = document.querySelector('.feed');
            expect(feedContainer.children.length).toBeGreaterThan(0);
            expect(feedContainer.firstElementChild.firstElementChild.classList.contains('entry')).toBe(true);
        });
    });
    /* Test suite that checks the feed functionality */
    describe('New Feed Selection', function () {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feedA,
            feedB;
        beforeEach(function (done) {
            loadFeed(0, function () {
                feedA = document.querySelector('.feed').innerHTML;
                loadFeed(1, function () {
                    feedB = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });

        it('loads new feeds', function () {
            expect(feedA).not.toBe(feedB);
        });
    })
}());