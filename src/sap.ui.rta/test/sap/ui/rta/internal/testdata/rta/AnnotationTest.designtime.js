/*!
 * ${copyright}
 */

// Provides the Design Time Metadata for an sap.m.Button control instance with annotation actions.
sap.ui.define([
	"sap/ui/rta/plugin/annotations/AnnotationTypes"
], function(
	AnnotationTypes
) {
	"use strict";

	const oTextArrangementTypes = {
		TextOnly: {EnumMember: "com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly"},
		TextFirst: {EnumMember: "com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst"},
		IDOnly: {EnumMember: "com.sap.vocabularies.UI.v1.TextArrangementType/IDOnly"},
		IDFirst: {EnumMember: "com.sap.vocabularies.UI.v1.TextArrangementType/IDFirst"}
	};

	const oTextArrangementLabels = {
		TextOnly: "Text Only",
		TextFirst: "Text First",
		IDOnly: "ID Only",
		IDFirst: "ID First"
	};

	const oTestDelegate = {
		getAnnotationsChangeInfo: () => {
			return {
				serviceUrl: "testServiceUrl",
				properties: [
					{
						propertyName: "My Test Label",
						annotationPath: "path/to/test/label",
						currentValue: oTextArrangementTypes.TextOnly
					},
					{
						propertyName: "My Other Test Label",
						annotationPath: "path/to/second/test/label",
						currentValue: oTextArrangementTypes.IDFirst
					}
				],
				possibleValues: Object.keys(oTextArrangementTypes).map((sKey) => ({
					key: oTextArrangementTypes[sKey],
					text: oTextArrangementLabels[sKey]
				}))
			};
		}
	};

	return {
		actions: {
			annotation: {
				textArrangement: {
					changeType: "textArrangement_Test",
					title: () => "Change Text Arrangement",
					type: AnnotationTypes.ValueListType,
					delegate: oTestDelegate
				},
				label: {
					changeType: "label_Test",
					title: () => "Change Label",
					icon: "sap-icon://endoscopy",
					type: AnnotationTypes.StringType,
					delegate: oTestDelegate
				}
			}
		}
	};
});