window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
};

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


//error handler
function successCb()
{
	console.log("application launched successfully");
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

//end error handler

$$('.ac-5').on('click', function () {
    var buttons = [
        {
            text: 'Camera',
            onClick: function () {
            	var appControl = new tizen.ApplicationControl(
            			 "http://tizen.org/appcontrol/operation/create_content",
            			 null,
            			 "image/jpg");
            	tizen.application.launchAppControl(appControl, null, successCb, errCb, replyCB);
            }
        },
        {
            text: 'Galery',
            onClick: function () {
            	
            	var appControl = new tizen.ApplicationControl(
            			"http://tizen.org/appcontrol/operation/pick",
            			null,
            	"IMAGE");
            	var appControlReplyCallback = {
            			onsuccess: function(data) {
            				for(var i=0; i < data.length; i++) {
            					console.log("#"+i+" key:"+data[i].key);
            					for(var j=0; j < data[i].value.length; j++) {
            						console.log("   value#"+j+":"+data[i].value[j]);
            					}
            				}
            			},
            			onfailure: function() {
            				console.log('The launch application control failed');
            			}
            	}

            	tizen.application.launchAppControl(appControl, null, successCb, errCb, appControlReplyCallback );
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


