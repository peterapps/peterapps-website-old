// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add views
var view2 = myApp.addView('#view-2');
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');
var view1 = myApp.addView('#view-1', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

if (location.hash == "#home") myApp.showTab("#view-1");
if (location.hash == "#faq") myApp.showTab("#view-2");
if (location.hash == "#tools") myApp.showTab("#view-3");
if (location.hash == "#games") myApp.showTab("#view-4");