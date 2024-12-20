sap.ui.define(["sap/ui/core/UIComponent"],
	function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("testdata.v1inline.Component", {

		metadata : {

			"name": "testdata.v1inline.Component",

			"version": "1.0.0",

			"includes" : [
				"style.css",
				"script.js"
			],

			"dependencies" : {
				"libs" : [
					"sap.ui.layout"
				],
				"components" : [
					"testdata.other"
				],
				"ui5version" : "1.22.5"
			},

			"config": {
				"any1": {
					"entry": "configuration"
				},
				"any2": {
					"anyobject": {
						"key1": "value1"
					}
				},
				"any3": {
					"anyarray": [1, 2, 3]
				},
				"zero": 0
			},

			"models": {
				"i18n": {
					"type": "sap.ui.model.resource.ResourceModel",
					"uri": "i18n/i18n.properties"
				},
				"sfapi": {
					"type": "sap.ui.model.odata.v2.ODataModel",
					"uri": "./some/odata/service/"
				}
			},

			"rootView": {
				"viewName": "testdata.view.Main",
				"type": "XML",
				"async": true
			},

			"customizing": {
				"sap.ui.viewReplacements": {
					"testdata.view.Main": {
						"viewName": "testdata.view.Main",
						"type": "XML"
					}
				},
				"sap.ui.controllerReplacements": {
					"testdata.view.Main": "testdata.view.Main"
				},
				"sap.ui.viewExtensions": {
					"testdata.view.Main": {
						"extension": {
							"name": "sap.xx.new.Fragment",
							"type": "sap.ui.core.XMLFragment"
						}
					}
				},
				"sap.ui.viewModification": {
					"testdata.view.Main": {
						"myControlId": {
							"text": "{{mytext}}"
						}
					}
				}
			},

			"routing": {
				"config": {
					"type": "View",
					"viewType" : "XML",
					"path": "NavigationWithoutMasterDetailPattern.view",
					"targetParent": "myViewId",
					"targetControl": "app",
					"targetAggregation": "pages",
					"clearTarget": false
				},
				"routes": [
					{
						"name" : "myRouteName1",
						"pattern" : "FirstView/{from}",
						"view" : "myViewId"
					}
				]
			},

			"sap.fiori": {
				"key1": "value1",
				"key2": "value2",
				"key3": {
					"subkey1": "subvalue1",
					"subkey2": "subvalue2"
				},
				"key4": ["value1", "value2"]
			},

			"custom.entry": {
				"key1": "value1",
				"key2": "value2",
				"key3": {
					"subkey1": "subvalue1",
					"subkey2": "subvalue2"
				},
				"key4": ["value1", "value2"]
			}

		}

	});

	return Component;
});
