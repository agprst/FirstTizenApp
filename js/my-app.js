// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
function findSuccess(items)
{
console.log("Found " + items.length + " audio tracks:");
for(var i=0; i<items.length; i++)
{
 console.log(i.toFixed() + ". " + items[i].title + " (" +
 items[i].name + ")");
 }
}

function findError(err)
{
 console.log("Error: " + err.message);
}
function successCb()
{
	console.log("Camera application launched successfully");
}
function errCb(err)
{
	console.log("Error: " + err.message);
}
var replyCB =
{
 onsuccess: function(pairs)
 	{
	 for(var i=0; i<pairs.length; i++)
	 {
		 if(pairs[i].key ===
		 "http://tizen.org/appcontrol/data/selected");
		 {
			 console.log("picture taken: " + pairs[i].value[0]);
		 }
	 }
 	},
	onfailure: function()
	{
		console.log("FAILED");
	}
};
			 

$$('.ac-5').on('click', function () {
    var buttons = [
        {
            text: 'Camera',
            onClick: function () {
            	var appControl = new tizen.ApplicationControl(
            			 "http://tizen.org/appcontrol/operation/create_content",
            			 null,
            			 "image/jpg");
            	tizen.application.launchAppControl(appControl, null, successCb, errCb,
            			replyCB);

            }
        },
        {
            text: 'Galery',
            onClick: function () {
            	var imagesOnly = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
            	tizen.content.find(findSuccess, findError, null, imagesOnly);
            }
        },
        {
            text: 'Cancel',
            color: 'red',
            onClick: function () {
                myApp.alert('Cancel clicked');
            }
        },
    ];
    myApp.actions(buttons);
});   



