/*global describe,it,element,by,takeScreenshot,browser,expect*/

describe("sap.m.SelectDialog", function () {
	"use strict";

	function closeDialog(sId) {
		browser.executeScript(function (sId) {
			var Element = sap.ui.require("sap/ui/core/Element");
			Element.getElementById(sId).close();
		}, sId);
	}
	it("Should load test page", function () {
		element(by.id("page-title")).click();
		expect(takeScreenshot()).toLookAs("initial");
	});

	it("Should open SelectDialog with Dialog Binding & List Binding & width set to 30rem", function () {
		element(by.id("Button2")).click();
		expect(takeScreenshot(element(by.id("SelectDialog2-dialog")))).toLookAs("select-dialog-1");
		closeDialog("SelectDialog2-dialog");
	});

	it("Should open SelectDialog with already initialized binding", function () {
		element(by.id("Button3")).click();
		element(by.id("SelectDialog3-dialog-title")).click();
		expect(takeScreenshot(element(by.id("SelectDialog3-dialog")))).toLookAs("select-dialog-2");
		closeDialog("SelectDialog3-dialog");
	});

	it("Should open SelectDialog with web service and binding before opening the dialog", function () {
		element(by.id("Button4")).click();
		expect(takeScreenshot(element(by.id("SelectDialog4-dialog")))).toLookAs("select-dialog-3");
		closeDialog("SelectDialog4-dialog");
	});

	it("Should open SelectDialog with web service pre-filtered by \"id\" and binding before opening the dialog", function () {
		element(by.id("Button4a")).click();
		expect(takeScreenshot(element(by.id("SelectDialog4a-dialog")))).toLookAs("select-dialog-4");
		closeDialog("SelectDialog4a-dialog");
	});

	it("Open SelectDialog with late binding in MultiSelect prefiltered by \"ad\" mode with 1000px width", function () {
		element(by.id("Button6")).click();
		expect(takeScreenshot(element(by.id("SelectDialog6-dialog")))).toLookAs("select-dialog-5");
		element(by.id("SelectDialog6-ok")).click();
	});

	it("Should open SelectDialog in MultiSelect mode prefiltered by \"id_1\" with web service binding and 400px width", function () {
		element(by.id("Button7")).click();
		expect(takeScreenshot(element(by.id("SelectDialog7-dialog")))).toLookAs("select-dialog-6");
		element(by.id("SelectDialog7-ok")).click();
	});

	it("Open SelectDialog in MultiSelect mode with JSON binding and selection model and rememberSelections=false", function () {
		element(by.id("Button8")).click();
		expect(takeScreenshot(element(by.id("SelectDialog8-dialog")))).toLookAs("select-dialog-7");
		element(by.id("SelectDialog8-ok")).click();
	});

	it("Open SelectDialog in MultiSelect mode prefiltered by \"Hulk\" with JSON binding and selection model and rememberSelections=true", function () {
		element(by.id("Button9")).click();
		expect(takeScreenshot(element(by.id("SelectDialog9-dialog")))).toLookAs("select-dialog-8");
		element(by.id("SelectDialog9-ok")).click();
	});

	it("Open SelectDialog with the view as parent and delayed binding", function () {
		element(by.id("Button10")).click();
		expect(takeScreenshot(element(by.id("SelectDialog10-dialog")))).toLookAs("select-dialog-9");
		element(by.id("SelectDialog10-ok")).click();
	});

	it("The toolbar must be sticky by default", function() {
		element(by.id("Button12")).click();
		//fake an image to have enough time to render the dialog items and make the actual one
		expect(takeScreenshot(element(by.id("SelectDialog12-dialog"))));

		browser.executeScript(function () {
			var Element = sap.ui.require("sap/ui/core/Element");
			Element.getElementById("SelectDialog12").getItems()[Element.getElementById('SelectDialog12').getItems().length - 1].getDomRef().scrollIntoView();
		});
		expect(takeScreenshot(element(by.id("SelectDialog12-dialog")))).toLookAs("sticky-info-toolbar");
		element(by.id("SelectDialog12-ok")).click();
	});

	it("Should open resizable SelectDialog", function () {
		element(by.id("Button13")).click();
		expect(takeScreenshot(element(by.id("SelectDialog13-dialog")))).toLookAs("select-dialog-12");
		element(by.id("SelectDialog13-cancel")).click();
	});

	it("Should support Responsive Paddings", function () {
		element(by.id("Button16")).click();
		expect(takeScreenshot(element(by.id("SelectDialog16-dialog")))).toLookAs("select-dialog-responsive-padding");
		element(by.id("SelectDialog16-cancel")).click();
	});
});