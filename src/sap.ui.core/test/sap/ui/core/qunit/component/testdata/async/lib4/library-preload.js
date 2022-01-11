sap.ui.predefine("sap/test/lib4/library", ['jquery.sap.global'],
	function(jQuery) {
	"use strict";

	sap.ui.getCore().initLibrary({
		name:"sap.test.lib4",
		noLibraryCSS:true
	});

});
sap.ui.require.preload({
	"version":"2.0",
	"name":"sap.test.lib4",
	"modules":{
		"sap/test/lib4/manifest.json":"{\n\t\"sap.ui5\": {\n\t\t\"dependencies\": {\n\t\t\t\"libs\": {}\n\t\t}\n\t}\n}"
	}
});