
const webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var client = require('webdriverio').remote({ desiredCapabilities: { browserName: 'chrome' } }),
    browserevent = require('browserevent');

// by passing the client object as argument the module enhances it with
// the `addEventListener` and `removeEventListener` command
browserevent.init(client);

client
    .url('http://google.com')
    .addEventListener('click','body', function(e) {
        console.log(e.target); // -> 'id("hplogo")'
        console.log(e.type); // -> 'dblclick'
        console.log(e.clientX, e.clientY); // -> 239 524
    })
    .end();

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

function worldBankDemo(){
	var complete = false;
	var driver = new webdriver.Builder()
	    .withCapabilities(webdriver.Capabilities.chrome())
	    .build();
	try {
	

	driver.sleep(2000);

	driver.get('https://www.worldbank.org/');
	const actions2 = driver.actions({bridge: true}); 
	for(var i=1; i<6; i++){
		//driver.sleep(2000);
        var elementPath = '(//a[@class="dropdown-toggle"])['+i+']';
        
		var textPromise = driver.findElement(webdriver.By.xpath(elementPath));
		textPromise.then((elem)=>{ 
		var hoverPromise = actions2.move({duration:2000,origin:elem,x:0,y:0}).perform().pause(1000);

		hoverPromise.then(function(){
			//driver.sleep(2000);
			console.log("test successful");
			complete = true; 
			//driver.quit();
			}).catch(function(){
				console.log("27 element not found...")
				console.log("*************test failed*************")
				});
		}).catch(function(ex){
            debugger
			console.log("31 element not found...")
			console.log("*************test failed*************")
		});	

	}
	
	}// end of try
	catch(error){
		console.log("---------------------------------------------------------------------------------\n"+error);
		complete = false;
		driver.quit();
	}

}//end of function

worldBankDemo();