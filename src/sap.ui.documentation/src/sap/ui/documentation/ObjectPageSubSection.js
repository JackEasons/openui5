
/*!
 * ${copyright}
 */
sap.ui.define([
	'sap/ui/core/Control',
	'sap/uxap/ObjectPageSubSection',
	'sap/uxap/ObjectPageSubSectionRenderer'
], function(Control, ObjectPageSubSection, ObjectPageSubSectionRenderer) {
	"use strict";

	/**
	 * @class
	 * Custom ObjectPageSubSection control which internally does not uses Grid control.
	 * @extends sap.uxap.ObjectPageSubSection
	 * @private
	 * @ui5-restricted sdk
	 */
	var SDKObjectPageSubSection = ObjectPageSubSection.extend("sap.ui.documentation.ObjectPageSubSection", {
		metadata: {
			library: "sap.ui.documentation"
		},
		renderer: ObjectPageSubSectionRenderer
	});

	var Container = Control.extend("sap.ui.documentation.Container", {
		metadata: {
			library: "sap.ui.documentation",
			aggregations: {
				content: {type: "sap.ui.core.Control", multiple: true, singularName: "content"}
			}
		},

		renderer: {
			apiVersion: 2,

			render: function (oRm, oControl) {
			var aContent = oControl.getContent(),
				iLen,
				i;

			oRm.openStart("div", oControl).openEnd();

			for (i = 0, iLen = aContent.length; i < iLen; i++) {
				oRm.renderControl(aContent[i]);
			}

			oRm.close("div");
		}
	}});

	SDKObjectPageSubSection.prototype._getGrid = function () {
		if (!this.getAggregation("_grid")) {
			this.setAggregation("_grid", new Container({
				id: this.getId() + "-innerGrid"
			}), true); // this is always called onBeforeRendering so suppress invalidate
		}

		return this.getAggregation("_grid");
	};

	return SDKObjectPageSubSection;
});