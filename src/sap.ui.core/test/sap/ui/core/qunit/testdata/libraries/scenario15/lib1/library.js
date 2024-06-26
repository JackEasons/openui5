sap.ui.define([
	"sap/ui/core/Lib",
	"sap/ui/core/library",
	"testlibs/scenario15/lib3/library",
	"testlibs/scenario15/lib4/library"
], function(Library) {
	"use strict";
	return Library.init({
		name: "testlibs.scenario15.lib1",
		apiVersion: 2,
		dependencies: [
			"testlibs.scenario15.lib3",
			"testlibs.scenario15.lib4"
		],
		noLibraryCSS: true
	});
});