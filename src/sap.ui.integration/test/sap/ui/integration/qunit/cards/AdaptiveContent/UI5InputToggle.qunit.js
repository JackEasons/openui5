/*global QUnit*/
sap.ui.define([
	"sap/ui/integration/cards/AdaptiveContent",
	"sap/ui/integration/cards/adaptivecards/elements/UI5InputToggle",
	"sap/ui/qunit/utils/nextUIUpdate"
],
function (
	AdaptiveContent,
	UI5InputToggle,
	nextUIUpdate
) {
	"use strict";
	var DOM_RENDER_LOCATION = "qunit-fixture";

	var oManifest = {
		"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
		"type": "AdaptiveCard",
		"version": "1.0",
		"body": [
			{
				"type": "Input.Toggle",
				"title": "Unchecked toggle input with value 'Truethy value' when checked and 'Falsy value' when not",
				"id": "ValueOffValueOn",
				"value": "true",
				"valueOff": "Falsy value",
				"valueOn": "Truthy value"
			},
			{
				"type": "Input.Toggle",
				"id": "Checked",
				"wrap": true,
				"value": "true",
				"valueOn": "true",
				"label": "Choice",
				"isRequired": true
			}
		]
	};


	QUnit.module("UI5InputToggle", {
		beforeEach: function () {
			this.oAdaptiveContent = new AdaptiveContent({
				configuration: oManifest
			});
		},
		afterEach: function () {
			this.oAdaptiveContent.destroy();
			this.oAdaptiveContent = null;
		}
	});

	QUnit.test("Properties mapping", function (assert) {
		var done = assert.async(),
			oCardManifestStub = {
				get: function () { return false; }
			};

		this.oAdaptiveContent.loadDependencies(oCardManifestStub).then(async function () {
			//Arrange
			this.oAdaptiveContent.placeAt(DOM_RENDER_LOCATION);
			await nextUIUpdate();
			var oUncheckedToggleInput = document.querySelector("#ValueOffValueOn ui5-checkbox"),
				oCheckedToggleInput = document.querySelector("#Checked ui5-checkbox"),
				oLabel = document.querySelector("#Checked ui5-label");

			//Assert
			assert.strictEqual(oUncheckedToggleInput.tagName.toLowerCase(), "ui5-checkbox", "ui5-checkbox webcomponent is rendered");
			assert.ok(oUncheckedToggleInput, "The toggle input is created");
			assert.strictEqual(oUncheckedToggleInput.text, "Unchecked toggle input with value 'Truethy value' when checked and 'Falsy value' when not", "The title is mapped correctly");
			assert.strictEqual(oUncheckedToggleInput.checked, false, "The checkbox is not checked, since value is different from valueOn.");
			assert.strictEqual(oUncheckedToggleInput.wrappingType, "None", "Wrapping is not set initally, so the text should truncate at some point.");
			assert.notOk(oUncheckedToggleInput.required, "required attribute should not be set");
			assert.strictEqual(oCheckedToggleInput.wrappingType, "Normal", "The checkbox label should wrap at some point.");
			assert.strictEqual(oCheckedToggleInput.checked, true, "The checkbox is not checked, since value is the same as valueOn.");
			assert.strictEqual(oCheckedToggleInput.text, "", "There is no text set initially.");
			assert.strictEqual(oLabel.tagName.toLowerCase(), "ui5-label", "ui5-label webcomponent is rendered");
			assert.strictEqual(oLabel.textContent, "Choice", "Label text is correctly mapped");
			assert.ok(oCheckedToggleInput.required, "required attribute is set");
			assert.strictEqual(oCheckedToggleInput.getAttribute("aria-labelledby"), oLabel.id, "aria-labelledby refers to the id of the label");

			done();
		}.bind(this));
	});

	QUnit.test("internalRender", function (assert) {
		//Arrange
		var oToggleInput = new UI5InputToggle(),
			oDomRef = oToggleInput.internalRender();

		//Assert
		assert.strictEqual(oDomRef.tagName.toLowerCase(), "ui5-checkbox", "ui5-checkbox webcomponent is rendered");
	});
});