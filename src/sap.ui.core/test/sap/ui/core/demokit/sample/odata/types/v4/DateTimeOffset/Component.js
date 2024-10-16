/*!
 * ${copyright}
 */
sap.ui.define(["sap/ui/core/UIComponent"],
	function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.core.sample.odata.types.v4.DateTimeOffset.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		exit: function () {
			this.getModel().restoreSandbox();
		}
	});
});
