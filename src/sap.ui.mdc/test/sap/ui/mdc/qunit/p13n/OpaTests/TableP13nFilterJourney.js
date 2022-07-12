sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/opaQunit',
	'test-resources/sap/ui/mdc/qunit/p13n/OpaTests/utility/Arrangement',
	'test-resources/sap/ui/mdc/qunit/p13n/OpaTests/utility/Util',
	'test-resources/sap/ui/mdc/qunit/p13n/OpaTests/utility/Action',
	'test-resources/sap/ui/mdc/qunit/p13n/OpaTests/utility/Assertion',
	'sap/ui/Device',
	'test-resources/sap/ui/mdc/testutils/opa/TestLibrary'
], function (Opa5, opaTest, Arrangement, TestUtil, Action, Assertion, Device, TestLibrary) {
	'use strict';

	Opa5.extendConfig({
		arrangements: new Arrangement(),
		actions: new Action(),
		assertions: new Assertion(),
		viewNamespace: "view.",
		autoWait: true
	});

	var aAvailableFilters = ["artistUUID", "Breakout Year", "Changed By", "Changed On", "City of Origin", "Country", "Created By", "Created On", "Founding Year", "Name", "regionOfOrigin_code"];
	var sTableID = "IDTableOfInternalSampleApp_01";

	opaTest("Open TableOpaApp", function (Given, When, Then) {
		//insert application
		Given.iStartMyAppInAFrame({
			source: 'test-resources/sap/ui/mdc/qunit/p13n/OpaTests/appUnderTestTable/TableOpaApp.html',
			autoWait: true
		});
		Given.enableAndDeleteLrepLocalStorage();
		When.iLookAtTheScreen();

		//check icons
		Then.iShouldSeeButtonWithIcon(Arrangement.P13nDialog.Settings.Icon);

		//check initially visible columns
		Then.iShouldSeeVisibleColumnsInOrder("sap.ui.mdc.table.Column", [
			"name", "foundingYear", "modifiedBy", "createdAt"
		]);

		Then.theVariantManagementIsDirty(false);
	});

	opaTest("Open the filter personalization dialog", function (Given, When, Then) {
		//Intially, all filters are available and no filters are set in Standard variant
		Then.onTheMDCTable.iCheckAvailableFilters(sTableID, aAvailableFilters);
		Then.onTheMDCTable.iCheckFilterPersonalization(sTableID, []);
	});

	opaTest("Open the filter personalization dialog and enter a value", function (Given, When, Then) {

		//add two filters
		When.onTheMDCTable.iPersonalizeFilter(sTableID, [
			{key : "Founding Year", values: ["1989"], inputControl: "IDTableOfInternalSampleApp_01--filter--foundingYear"},
			{key : "Country", values: ["DE"], inputControl: "IDTableOfInternalSampleApp_01--filter--countryOfOrigin_code"}
		]);

		//reopen the dialog and assert filters
		Then.onTheMDCTable.iCheckFilterPersonalization(sTableID, [
			{key : "Founding Year", values: ["1989"], inputControl: "IDTableOfInternalSampleApp_01--filter--foundingYear"},
			{key : "Country", values: ["DE"], inputControl: "IDTableOfInternalSampleApp_01--filter--countryOfOrigin_code"}
		]);

		//the combobox in the panel should NOT contain Country & Founding Year anymore
		Then.onTheMDCTable.iCheckAvailableFilters(sTableID, ["artistUUID", "Breakout Year", "Changed By", "Changed On", "City of Origin", "Created By", "Created On", "Name", "regionOfOrigin_code"]);

		//Clear all filters
		When.onTheMDCTable.iPersonalizeFilter(sTableID, []);
	});

	opaTest("Cancel and open the filter dialog to check if the values have been discarded", function (Given, When, Then) {
		When.onTheMDCTable.iPersonalizeFilter(sTableID, [
			{key : "Founding Year", values: ["1989"], inputControl: "IDTableOfInternalSampleApp_01--filter--foundingYear"},
			{key : "Country", values: ["DE"], inputControl: "IDTableOfInternalSampleApp_01--filter--countryOfOrigin_code"}
		], undefined, true/** This flag will cancel the dialog instead of confirming it*/);

		//Dialog cancelled --> no filters added
		Then.onTheMDCTable.iCheckFilterPersonalization(sTableID, []);
		Then.onTheMDCTable.iCheckAvailableFilters(sTableID, aAvailableFilters);

		//shut down app frame for next test
		Given.enableAndDeleteLrepLocalStorage();
		Then.iTeardownMyAppFrame();
	});

});
