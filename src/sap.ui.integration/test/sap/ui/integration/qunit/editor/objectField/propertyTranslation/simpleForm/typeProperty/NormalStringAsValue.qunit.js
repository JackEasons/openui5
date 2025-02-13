/* global QUnit */
sap.ui.define([
	"sap-ui-integration-editor",
	"sap/base/i18n/Localization",
	"sap/ui/integration/editor/Editor",
	"sap/ui/integration/Host",
	"sap/ui/thirdparty/sinon-4",
	"./../../../../ContextHost",
	"sap/base/util/deepEqual",
	"sap/base/util/deepClone",
	"qunit/designtime/EditorQunitUtils"
], function (
	x,
	Localization,
	Editor,
	Host,
	sinon,
	ContextHost,
	deepEqual,
	deepClone,
	EditorQunitUtils
) {
	"use strict";
	var sandbox = sinon.createSandbox();
	QUnit.config.reorder = false;

	var sBaseUrl = "test-resources/sap/ui/integration/qunit/editor/jsons/withDesigntime/sap.card/";

	var oManifestForObjectFieldWithPropertiesDefinedWithTranslation = {
		"sap.app": {
			"id": "test.sample",
			"i18n": "../i18ntrans/i18n.properties"
		},
		"sap.card": {
			"designtime": "designtime/objectFieldWithPropertiesDefined",
			"type": "List",
			"configuration": {
				"parameters": {
					"objectWithPropertiesDefined": {}
				},
				"destinations": {
					"local": {
						"name": "local",
						"defaultUrl": "./"
					},
					"mock_request": {
						"name": "mock_request"
					}
				}
			}
		}
	};

	var _oOriginExpectedValues = {
		"string1": {
			"default": "String 1 English",
			"en": "String 1 English",
			"en-US": "String 1 US English",
			"es-MX": "String 1 Spanish MX",
			"fr": "String 1 French",
			"fr-FR": "String 1 French",
			"fr-CA": "String 1 French CA"
		},
		"string2": {
			"default": "String 2 English",
			"en": "String 2 English",
			"en-US": "String 2 US English",
			"es-MX": "String 2 Spanish MX",
			"fr": "String 2 French",
			"fr-FR": "String 2 French",
			"fr-CA": "String 2 French CA"
		},
		"string3": {
			"default": "String 3 English",
			"en": "String 3 English",
			"en-US": "String 3 US English",
			"es": "String 3 Spanish",
			"es-MX": "String 3 Spanish",
			"fr": "String 3 French",
			"fr-FR": "String 3 French",
			"fr-CA": "String 3 French CA"
		},
		"string4": {
			"default": "String 4 English",
			"en": "String 4 English",
			"en-US": "String 4 US English",
			"fr": "String 4 French",
			"fr-FR": "String 1 French",
			"fr-CA": "String 4 French CA"
		}
	};
	Localization.setLanguage("en");
	document.body.className = document.body.className + " sapUiSizeCompact ";

	function cleanUUID(oValue) {
		var oClonedValue = deepClone(oValue, 500);
		if (typeof oClonedValue === "string") {
			oClonedValue = JSON.parse(oClonedValue);
		}
		if (Array.isArray(oClonedValue)) {
			oClonedValue.forEach(function(oResult) {
				if (oResult._dt) {
					delete oResult._dt._uuid;
				}
				if (deepEqual(oResult._dt, {})) {
					delete oResult._dt;
				}
			});
		} else if (typeof oClonedValue === "object") {
			if (oClonedValue._dt) {
				delete oClonedValue._dt._uuid;
			}
			if (deepEqual(oClonedValue._dt, {})) {
				delete oClonedValue._dt;
			}
		}
		return oClonedValue;
	}

	QUnit.module("Basic", {
		beforeEach: function () {
			this.oEditor = EditorQunitUtils.beforeEachTest();
		},
		afterEach: function () {
			EditorQunitUtils.afterEachTest(this.oEditor, sandbox);
		}
	}, function () {
		QUnit.test("update translation values and delete", function (assert) {
			this.oEditor.setJson({
				baseUrl: sBaseUrl,
				host: "contexthost",
				manifest: oManifestForObjectFieldWithPropertiesDefinedWithTranslation
			});
			return new Promise(function (resolve, reject) {
				EditorQunitUtils.isFieldReady(this.oEditor).then(function () {
					assert.ok(this.oEditor.isFieldReady(), "Editor fields are ready");
					var oLabel1 = this.oEditor.getAggregation("_formContent")[1];
					var oField1 = this.oEditor.getAggregation("_formContent")[2];
					EditorQunitUtils.isReady(this.oEditor).then(function () {
						assert.ok(this.oEditor.isReady(), "Editor is ready");
						assert.ok(oLabel1.isA("sap.m.Label"), "Label 2: Form content contains a Label");
						assert.equal(oLabel1.getText(), "Object properties defined", "Label 2: Has label text");
						assert.ok(oField1.isA("sap.ui.integration.editor.fields.ObjectField"), "Field 2: Object Field");
						assert.ok(!oField1._getCurrentProperty("value"), "Field 2: Value");
						var oSimpleForm = oField1.getAggregation("_field");
						assert.ok(oSimpleForm.isA("sap.ui.layout.form.SimpleForm"), "Field 2: Control is SimpleForm");
						var oDeleteButton = oSimpleForm.getToolbar().getContent()[2];
						assert.ok(oDeleteButton.getVisible(), "SimpleForm: Delete button is visible");
						assert.ok(!oDeleteButton.getEnabled(), "SimpleForm: Delete button is not enabled");
						var oContents = oSimpleForm.getContent();
						assert.equal(oContents.length, 16, "SimpleForm: length");
						var oTextArea = oContents[15];
						assert.equal(oTextArea.getValue(), '', "SimpleForm field textArea: Has No value");
						var oFormLabel3 = oContents[4];
						var oFormField3 = oContents[5];
						assert.equal(oFormLabel3.getText(), "Text", "SimpleForm label 3: Has label text");
						assert.ok(oFormLabel3.getVisible(), "SimpleForm label 3: Visible");
						assert.ok(oFormField3.isA("sap.m.Input"), "SimpleForm Field 3: Input Field");
						assert.ok(oFormField3.getVisible(), "SimpleForm Field 3: Visible");
						assert.ok(oFormField3.getEditable(), "SimpleForm Field 3: Editable");
						assert.equal(oFormField3.getValue(), "", "SimpleForm field 3: Has No value");
						assert.ok(oFormField3.getShowValueHelp(), "SimpleForm field 3: ShowValueHelp true");
						oFormField3.setValue("text value 1");
						oFormField3.fireChange({ value: "text value 1"});
						assert.ok(oDeleteButton.getEnabled(), "SimpleForm: Delete button is enabled");
						assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "text value 1"}), "Field 1: DT Value updated");

						var oValueHelpIcon3 = oFormField3._oValueHelpIcon;
						assert.ok(oValueHelpIcon3, "SimpleForm field 3: Value help icon exist");
						assert.ok(oValueHelpIcon3.getVisible(), "SimpleForm field 3: Value help icon visible");
						assert.ok(oValueHelpIcon3.isA("sap.ui.core.Icon"), "SimpleForm field 3: Input value help icon");
						assert.equal(oValueHelpIcon3.getSrc(), "sap-icon://translate", "SimpleForm field 3: Input value help icon src");
						oField1.attachEventOnce("translationPopoverOpened", function () {
							var oTranslationPopover3 = oField1._oTranslationPopover;
							var oSaveButton3 = oTranslationPopover3.getFooter().getContent()[1];
							assert.ok(oSaveButton3.getVisible(), "oTranslationPopover3 footer: save button visible");
							assert.ok(!oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button disabled");
							var oResetButton3 = oTranslationPopover3.getFooter().getContent()[2];
							assert.ok(oResetButton3.getVisible(), "oTranslationPopover3 footer: reset button visible");
							assert.ok(!oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button disabled");
							var oCancelButton3 = oTranslationPopover3.getFooter().getContent()[3];
							assert.ok(oCancelButton3.getVisible(), "oTranslationPopover3 footer: cancel button visible");
							assert.ok(oCancelButton3.getEnabled(), "oTranslationPopover3 footer: cancel button enabled");
							var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
							assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
							for (var i = 0; i < oLanguageItems3.length; i++) {
								var oCustomData = oLanguageItems3[i].getCustomData();
								if (oCustomData && oCustomData.length > 0) {
									var sLanguage = oCustomData[0].getKey();
									var sExpectedValue = "text value 1";
									var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
									assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
									if (sLanguage === "en"){
										var oInput = oLanguageItems3[i].getContent()[0].getItems()[1];
										oInput.setValue("text value 1 en");
										oInput.fireChange({ value: "text value 1 en"});
										break;
									}
								}
							}
							EditorQunitUtils.wait().then(function () {
								assert.ok(oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button enabled");
								assert.ok(oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button enabled");
								oSaveButton3.firePress();
								EditorQunitUtils.wait().then(function () {
									var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
									assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
									for (var i = 0; i < oLanguageItems3.length; i++) {
										var oCustomData = oLanguageItems3[i].getCustomData();
										if (oCustomData && oCustomData.length > 0) {
											var sLanguage = oCustomData[0].getKey();
											var sExpectedValue = "text value 1";
											if (sLanguage === "en") {
												sExpectedValue = "text value 1 en";
											}
											var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
											assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
										}
									}
									assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "text value 1"}), "Field 1: DT Value");
									var sUUID = oField1._getCurrentProperty("value")._dt._uuid;
									var sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
									assert.equal(sTranslationTextOfEN, "text value 1 en", "Texts: Translation text of EN correct");

									oDeleteButton.firePress();
									EditorQunitUtils.wait().then(function () {
										assert.ok(!oDeleteButton.getEnabled(), "SimpleForm: Delete button is not enabled");
										assert.ok(!oField1._getCurrentProperty("value"), "Field 1: no Value");
										sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
										assert.ok(!sTranslationTextOfEN, "Texts: no value");
										resolve();
									});
								});
							});
						});
						oValueHelpIcon3.firePress();
					}.bind(this));
				}.bind(this));
			}.bind(this));
		});

		QUnit.test("change translation values but reset", function (assert) {
			this.oEditor.setJson({
				baseUrl: sBaseUrl,
				host: "contexthost",
				manifest: oManifestForObjectFieldWithPropertiesDefinedWithTranslation
			});
			return new Promise(function (resolve, reject) {
				EditorQunitUtils.isFieldReady(this.oEditor).then(function () {
					assert.ok(this.oEditor.isFieldReady(), "Editor fields are ready");
					var oLabel1 = this.oEditor.getAggregation("_formContent")[1];
					var oField1 = this.oEditor.getAggregation("_formContent")[2];
					EditorQunitUtils.isReady(this.oEditor).then(function () {
						assert.ok(this.oEditor.isReady(), "Editor is ready");
						assert.ok(oLabel1.isA("sap.m.Label"), "Label 2: Form content contains a Label");
						assert.equal(oLabel1.getText(), "Object properties defined", "Label 2: Has label text");
						assert.ok(oField1.isA("sap.ui.integration.editor.fields.ObjectField"), "Field 2: Object Field");
						assert.ok(!oField1._getCurrentProperty("value"), "Field 2: Value");
						var oSimpleForm = oField1.getAggregation("_field");
						assert.ok(oSimpleForm.isA("sap.ui.layout.form.SimpleForm"), "Field 2: Control is SimpleForm");
						var oDeleteButton = oSimpleForm.getToolbar().getContent()[2];
						assert.ok(oDeleteButton.getVisible(), "SimpleForm: Delete button is visible");
						assert.ok(!oDeleteButton.getEnabled(), "SimpleForm: Delete button is not enabled");
						var oContents = oSimpleForm.getContent();
						assert.equal(oContents.length, 16, "SimpleForm: length");
						var oTextArea = oContents[15];
						assert.equal(oTextArea.getValue(), '', "SimpleForm field textArea: Has No value");
						var oFormLabel3 = oContents[4];
						var oFormField3 = oContents[5];
						assert.equal(oFormLabel3.getText(), "Text", "SimpleForm label 3: Has label text");
						assert.ok(oFormLabel3.getVisible(), "SimpleForm label 3: Visible");
						assert.ok(oFormField3.isA("sap.m.Input"), "SimpleForm Field 3: Input Field");
						assert.ok(oFormField3.getVisible(), "SimpleForm Field 3: Visible");
						assert.ok(oFormField3.getEditable(), "SimpleForm Field 3: Editable");
						assert.equal(oFormField3.getValue(), "", "SimpleForm field 3: Has No value");
						assert.ok(oFormField3.getShowValueHelp(), "SimpleForm field 3: ShowValueHelp true");
						oFormField3.setValue("text value 1");
						oFormField3.fireChange({ value: "text value 1"});
						assert.ok(oDeleteButton.getEnabled(), "SimpleForm: Delete button is enabled");
						assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "text value 1"}), "Field 1: DT Value updated");

						var oValueHelpIcon3 = oFormField3._oValueHelpIcon;
						assert.ok(oValueHelpIcon3, "SimpleForm field 3: Value help icon exist");
						assert.ok(oValueHelpIcon3.getVisible(), "SimpleForm field 3: Value help icon visible");
						assert.ok(oValueHelpIcon3.isA("sap.ui.core.Icon"), "SimpleForm field 3: Input value help icon");
						assert.equal(oValueHelpIcon3.getSrc(), "sap-icon://translate", "SimpleForm field 3: Input value help icon src");
						oField1.attachEventOnce("translationPopoverOpened", function () {
							var oTranslationPopover3 = oField1._oTranslationPopover;
							var oSaveButton3 = oTranslationPopover3.getFooter().getContent()[1];
							assert.ok(oSaveButton3.getVisible(), "oTranslationPopover3 footer: save button visible");
							assert.ok(!oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button disabled");
							var oResetButton3 = oTranslationPopover3.getFooter().getContent()[2];
							assert.ok(oResetButton3.getVisible(), "oTranslationPopover3 footer: reset button visible");
							assert.ok(!oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button disabled");
							var oCancelButton3 = oTranslationPopover3.getFooter().getContent()[3];
							assert.ok(oCancelButton3.getVisible(), "oTranslationPopover3 footer: cancel button visible");
							assert.ok(oCancelButton3.getEnabled(), "oTranslationPopover3 footer: cancel button enabled");
							var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
							assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
							for (var i = 0; i < oLanguageItems3.length; i++) {
								var oCustomData = oLanguageItems3[i].getCustomData();
								if (oCustomData && oCustomData.length > 0) {
									var sLanguage = oCustomData[0].getKey();
									var sExpectedValue = "text value 1";
									var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
									assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
									if (sLanguage === "en"){
										var oInput = oLanguageItems3[i].getContent()[0].getItems()[1];
										oInput.setValue("text value 1 en");
										oInput.fireChange({ value: "text value 1 en"});
										break;
									}
								}
							}
							EditorQunitUtils.wait().then(function () {
								assert.ok(oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button enabled");
								assert.ok(oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button enabled");
								oResetButton3.firePress();
								EditorQunitUtils.wait().then(function () {
									assert.ok(!oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button disabled");
									assert.ok(!oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button disabled");
									var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
									assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
									for (var i = 0; i < oLanguageItems3.length; i++) {
										var oCustomData = oLanguageItems3[i].getCustomData();
										if (oCustomData && oCustomData.length > 0) {
											var sLanguage = oCustomData[0].getKey();
											var sExpectedValue = "text value 1";
											var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
											assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
										}
									}
									assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "text value 1"}), "Field 1: DT Value");
									var sUUID = oField1._getCurrentProperty("value")._dt._uuid;
									var sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
									assert.ok(!sTranslationTextOfEN, "Texts: no value");
									resolve();
								});
							});
						});
						oValueHelpIcon3.firePress();
					}.bind(this));
				}.bind(this));
			}.bind(this));
		});

		QUnit.test("update translation values and change property value to another normal value", function (assert) {
			this.oEditor.setJson({
				baseUrl: sBaseUrl,
				host: "contexthost",
				manifest: oManifestForObjectFieldWithPropertiesDefinedWithTranslation
			});
			return new Promise(function (resolve, reject) {
				EditorQunitUtils.isFieldReady(this.oEditor).then(function () {
					assert.ok(this.oEditor.isFieldReady(), "Editor fields are ready");
					var oLabel1 = this.oEditor.getAggregation("_formContent")[1];
					var oField1 = this.oEditor.getAggregation("_formContent")[2];
					EditorQunitUtils.isReady(this.oEditor).then(function () {
						assert.ok(this.oEditor.isReady(), "Editor is ready");
						assert.ok(oLabel1.isA("sap.m.Label"), "Label 2: Form content contains a Label");
						assert.equal(oLabel1.getText(), "Object properties defined", "Label 2: Has label text");
						assert.ok(oField1.isA("sap.ui.integration.editor.fields.ObjectField"), "Field 2: Object Field");
						assert.ok(!oField1._getCurrentProperty("value"), "Field 2: Value");
						var oSimpleForm = oField1.getAggregation("_field");
						assert.ok(oSimpleForm.isA("sap.ui.layout.form.SimpleForm"), "Field 2: Control is SimpleForm");
						var oDeleteButton = oSimpleForm.getToolbar().getContent()[2];
						assert.ok(oDeleteButton.getVisible(), "SimpleForm: Delete button is visible");
						assert.ok(!oDeleteButton.getEnabled(), "SimpleForm: Delete button is not enabled");
						var oContents = oSimpleForm.getContent();
						assert.equal(oContents.length, 16, "SimpleForm: length");
						var oTextArea = oContents[15];
						assert.equal(oTextArea.getValue(), '', "SimpleForm field textArea: Has No value");
						var oFormLabel3 = oContents[4];
						var oFormField3 = oContents[5];
						assert.equal(oFormLabel3.getText(), "Text", "SimpleForm label 3: Has label text");
						assert.ok(oFormLabel3.getVisible(), "SimpleForm label 3: Visible");
						assert.ok(oFormField3.isA("sap.m.Input"), "SimpleForm Field 3: Input Field");
						assert.ok(oFormField3.getVisible(), "SimpleForm Field 3: Visible");
						assert.ok(oFormField3.getEditable(), "SimpleForm Field 3: Editable");
						assert.equal(oFormField3.getValue(), "", "SimpleForm field 3: Has No value");
						assert.ok(oFormField3.getShowValueHelp(), "SimpleForm field 3: ShowValueHelp true");
						oFormField3.setValue("string value 1");
						oFormField3.fireChange({ value: "string value 1"});
						assert.ok(oDeleteButton.getEnabled(), "SimpleForm: Delete button is enabled");
						assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "string value 1"}), "Field 1: DT Value updated");

						var oValueHelpIcon3 = oFormField3._oValueHelpIcon;
						assert.ok(oValueHelpIcon3, "SimpleForm field 3: Value help icon exist");
						assert.ok(oValueHelpIcon3.getVisible(), "SimpleForm field 3: Value help icon visible");
						assert.ok(oValueHelpIcon3.isA("sap.ui.core.Icon"), "SimpleForm field 3: Input value help icon");
						assert.equal(oValueHelpIcon3.getSrc(), "sap-icon://translate", "SimpleForm field 3: Input value help icon src");
						oField1.attachEventOnce("translationPopoverOpened", function () {
							var oTranslationPopover3 = oField1._oTranslationPopover;
							var oSaveButton3 = oTranslationPopover3.getFooter().getContent()[1];
							assert.ok(oSaveButton3.getVisible(), "oTranslationPopover3 footer: save button visible");
							assert.ok(!oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button disabled");
							var oResetButton3 = oTranslationPopover3.getFooter().getContent()[2];
							assert.ok(oResetButton3.getVisible(), "oTranslationPopover3 footer: reset button visible");
							assert.ok(!oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button disabled");
							var oCancelButton3 = oTranslationPopover3.getFooter().getContent()[3];
							assert.ok(oCancelButton3.getVisible(), "oTranslationPopover3 footer: cancel button visible");
							assert.ok(oCancelButton3.getEnabled(), "oTranslationPopover3 footer: cancel button enabled");
							var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
							assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
							for (var i = 0; i < oLanguageItems3.length; i++) {
								var oCustomData = oLanguageItems3[i].getCustomData();
								if (oCustomData && oCustomData.length > 0) {
									var sLanguage = oCustomData[0].getKey();
									var sExpectedValue = "string value 1";
									var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
									assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
									if (sLanguage === "en"){
										var oInput = oLanguageItems3[i].getContent()[0].getItems()[1];
										oInput.setValue("string1 en");
										oInput.fireChange({ value: "string1 en"});
										break;
									}
								}
							}
							EditorQunitUtils.wait().then(function () {
								assert.ok(oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button enabled");
								assert.ok(oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button enabled");
								oSaveButton3.firePress();
								EditorQunitUtils.wait().then(function () {
									var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
									assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
									for (var i = 0; i < oLanguageItems3.length; i++) {
										var oCustomData = oLanguageItems3[i].getCustomData();
										if (oCustomData && oCustomData.length > 0) {
											var sLanguage = oCustomData[0].getKey();
											var sExpectedValue = "string value 1";
											if (sLanguage === "en") {
												sExpectedValue = "string1 en";
											}
											var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
											assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
										}
									}
									assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "string value 1"}), "Field 1: DT Value");
									var sUUID = oField1._getCurrentProperty("value")._dt._uuid;
									var sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
									assert.equal(sTranslationTextOfEN, "string1 en", "Texts: Translation text of EN correct");

									oFormField3.setValue("string value 2");
									oFormField3.fireChange({ value: "string value 2"});
									EditorQunitUtils.wait().then(function () {
										assert.equal(oFormField3.getValue(), "string value 2", "SimpleForm field 3: Has new value");
										assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "string value 2"}), "Field 1: DT Value updated");
										assert.ok(oFormField3.getShowValueHelp(), "SimpleForm field 3: ShowValueHelp true");
										oValueHelpIcon3 = oFormField3._oValueHelpIcon;
										assert.ok(oValueHelpIcon3, "SimpleForm field 3: Value help icon exist");
										assert.ok(oValueHelpIcon3.getVisible(), "SimpleForm field 3: Value help icon visible");
										sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
										assert.equal(sTranslationTextOfEN, "string1 en", "Texts: Translation text of EN correct");
										oField1.attachEventOnce("translationPopoverOpened", function () {
											oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
											assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
											for (var i = 0; i < oLanguageItems3.length; i++) {
												var oCustomData = oLanguageItems3[i].getCustomData();
												if (oCustomData && oCustomData.length > 0) {
													var sLanguage = oCustomData[0].getKey();
													var sExpectedValue = "string value 2";
													if (sLanguage === "en"){
														sExpectedValue = "string1 en";
													}
													var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
													assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
												}
											}
											resolve();
										});
										oValueHelpIcon3.firePress();
									});
								});
							});
						});
						oValueHelpIcon3.firePress();
					}.bind(this));
				}.bind(this));
			}.bind(this));
		});

		QUnit.test("update translation values and change property value to {i18n>KEY} format", function (assert) {
			this.oEditor.setJson({
				baseUrl: sBaseUrl,
				host: "contexthost",
				manifest: oManifestForObjectFieldWithPropertiesDefinedWithTranslation
			});
			return new Promise(function (resolve, reject) {
				EditorQunitUtils.isFieldReady(this.oEditor).then(function () {
					assert.ok(this.oEditor.isFieldReady(), "Editor fields are ready");
					var oLabel1 = this.oEditor.getAggregation("_formContent")[1];
					var oField1 = this.oEditor.getAggregation("_formContent")[2];
					EditorQunitUtils.isReady(this.oEditor).then(function () {
						assert.ok(this.oEditor.isReady(), "Editor is ready");
						assert.ok(oLabel1.isA("sap.m.Label"), "Label 2: Form content contains a Label");
						assert.equal(oLabel1.getText(), "Object properties defined", "Label 2: Has label text");
						assert.ok(oField1.isA("sap.ui.integration.editor.fields.ObjectField"), "Field 2: Object Field");
						assert.ok(!oField1._getCurrentProperty("value"), "Field 2: Value");
						var oSimpleForm = oField1.getAggregation("_field");
						assert.ok(oSimpleForm.isA("sap.ui.layout.form.SimpleForm"), "Field 2: Control is SimpleForm");
						var oDeleteButton = oSimpleForm.getToolbar().getContent()[2];
						assert.ok(oDeleteButton.getVisible(), "SimpleForm: Delete button is visible");
						assert.ok(!oDeleteButton.getEnabled(), "SimpleForm: Delete button is not enabled");
						var oContents = oSimpleForm.getContent();
						assert.equal(oContents.length, 16, "SimpleForm: length");
						var oTextArea = oContents[15];
						assert.equal(oTextArea.getValue(), '', "SimpleForm field textArea: Has No value");
						var oFormLabel3 = oContents[4];
						var oFormField3 = oContents[5];
						assert.equal(oFormLabel3.getText(), "Text", "SimpleForm label 3: Has label text");
						assert.ok(oFormLabel3.getVisible(), "SimpleForm label 3: Visible");
						assert.ok(oFormField3.isA("sap.m.Input"), "SimpleForm Field 3: Input Field");
						assert.ok(oFormField3.getVisible(), "SimpleForm Field 3: Visible");
						assert.ok(oFormField3.getEditable(), "SimpleForm Field 3: Editable");
						assert.equal(oFormField3.getValue(), "", "SimpleForm field 3: Has No value");
						assert.ok(oFormField3.getShowValueHelp(), "SimpleForm field 3: ShowValueHelp true");
						oFormField3.setValue("string value 1");
						oFormField3.fireChange({ value: "string value 1"});
						assert.ok(oDeleteButton.getEnabled(), "SimpleForm: Delete button is enabled");
						assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "string value 1"}), "Field 1: DT Value updated");

						var oValueHelpIcon3 = oFormField3._oValueHelpIcon;
						assert.ok(oValueHelpIcon3, "SimpleForm field 3: Value help icon exist");
						assert.ok(oValueHelpIcon3.getVisible(), "SimpleForm field 3: Value help icon visible");
						assert.ok(oValueHelpIcon3.isA("sap.ui.core.Icon"), "SimpleForm field 3: Input value help icon");
						assert.equal(oValueHelpIcon3.getSrc(), "sap-icon://translate", "SimpleForm field 3: Input value help icon src");
						oField1.attachEventOnce("translationPopoverOpened", function () {
							var oTranslationPopover3 = oField1._oTranslationPopover;
							var oSaveButton3 = oTranslationPopover3.getFooter().getContent()[1];
							assert.ok(oSaveButton3.getVisible(), "oTranslationPopover3 footer: save button visible");
							assert.ok(!oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button disabled");
							var oResetButton3 = oTranslationPopover3.getFooter().getContent()[2];
							assert.ok(oResetButton3.getVisible(), "oTranslationPopover3 footer: reset button visible");
							assert.ok(!oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button disabled");
							var oCancelButton3 = oTranslationPopover3.getFooter().getContent()[3];
							assert.ok(oCancelButton3.getVisible(), "oTranslationPopover3 footer: cancel button visible");
							assert.ok(oCancelButton3.getEnabled(), "oTranslationPopover3 footer: cancel button enabled");
							var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
							assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
							for (var i = 0; i < oLanguageItems3.length; i++) {
								var oCustomData = oLanguageItems3[i].getCustomData();
								if (oCustomData && oCustomData.length > 0) {
									var sLanguage = oCustomData[0].getKey();
									var sExpectedValue = "string value 1";
									var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
									assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
									if (sLanguage === "en"){
										var oInput = oLanguageItems3[i].getContent()[0].getItems()[1];
										oInput.setValue("string1 en");
										oInput.fireChange({ value: "string1 en"});
										break;
									}
								}
							}
							EditorQunitUtils.wait().then(function () {
								assert.ok(oSaveButton3.getEnabled(), "oTranslationPopover3 footer: save button enabled");
								assert.ok(oResetButton3.getEnabled(), "oTranslationPopover3 footer: reset button enabled");
								oSaveButton3.firePress();
								EditorQunitUtils.wait().then(function () {
									var oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
									assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
									for (var i = 0; i < oLanguageItems3.length; i++) {
										var oCustomData = oLanguageItems3[i].getCustomData();
										if (oCustomData && oCustomData.length > 0) {
											var sLanguage = oCustomData[0].getKey();
											var sExpectedValue = "string value 1";
											if (sLanguage === "en") {
												sExpectedValue = "string1 en";
											}
											var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
											assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
										}
									}
									assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "string value 1"}), "Field 1: DT Value");
									var sUUID = oField1._getCurrentProperty("value")._dt._uuid;
									var sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
									assert.equal(sTranslationTextOfEN, "string1 en", "Texts: Translation text of EN correct");

									oFormField3.setValue("{i18n>string1}");
									oFormField3.fireChange({ value: "{i18n>string1}"});
									EditorQunitUtils.wait().then(function () {
										assert.equal(oFormField3.getValue(), "{i18n>string1}", "SimpleForm field 3: Has new value");
										assert.ok(deepEqual(cleanUUID(oField1._getCurrentProperty("value")), {"text": "{i18n>string1}"}), "Field 1: DT Value updated");
										assert.ok(oFormField3.getShowValueHelp(), "SimpleForm field 3: ShowValueHelp true");
										oValueHelpIcon3 = oFormField3._oValueHelpIcon;
										assert.ok(oValueHelpIcon3, "SimpleForm field 3: Value help icon exist");
										assert.ok(oValueHelpIcon3.getVisible(), "SimpleForm field 3: Value help icon visible");
										sTranslationTextOfEN = oField1.getTranslationValueInTexts("en", sUUID, "text");
										assert.equal(sTranslationTextOfEN, "string1 en", "Texts: Translation text of EN correct");
										oField1.attachEventOnce("translationPopoverOpened", function () {
											oLanguageItems3 = oTranslationPopover3.getContent()[0].getItems();
											assert.equal(oLanguageItems3.length, 49, "oTranslationPopover3 Content: length");
											for (var i = 0; i < oLanguageItems3.length; i++) {
												var oCustomData = oLanguageItems3[i].getCustomData();
												if (oCustomData && oCustomData.length > 0) {
													var sLanguage = oCustomData[0].getKey();
													var sExpectedValue = _oOriginExpectedValues["string1"][sLanguage] || _oOriginExpectedValues["string1"]["default"];
													if (sLanguage === "en"){
														sExpectedValue = "string1 en";
													}
													var sCurrentValue = oLanguageItems3[i].getContent()[0].getItems()[1].getValue();
													assert.equal(sCurrentValue, sExpectedValue, "oTranslationPopover3 Content: item " + i + " " + sLanguage + ", current: " + sCurrentValue + ", expected: " + sExpectedValue);
												}
											}
											resolve();
										});
										oValueHelpIcon3.firePress();
									});
								});
							});
						});
						oValueHelpIcon3.firePress();
					}.bind(this));
				}.bind(this));
			}.bind(this));
		});
	});

	QUnit.done(function () {
		document.getElementById("qunit-fixture").style.display = "none";
	});
});
