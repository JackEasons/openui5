/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/mdc/ushell/LinkDelegate",
	"sap/m/Button",
	"sap/m/Dialog",
	"sap/m/Text",
	"sap/m/library"
], function(LinkDelegate, Button, Dialog, Text, mobileLibrary) {
	"use strict";

	const ButtonType = mobileLibrary.ButtonType;

	const SampleLinkDelegate = Object.assign({}, LinkDelegate);

	SampleLinkDelegate.beforeNavigationCallback = function(oPayload, oEvent) {
		return new Promise(function(resolve) {
			const oDialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure you want to Navigate?' }),
				beginButton: new Button({
					type: ButtonType.Emphasized,
					text: 'Navigate',
					press: function() {
						oDialog.close();
						resolve(true);
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						oDialog.close();
						resolve(false);
					}
				}),
				afterClose: function() {
					oDialog.destroy();
				}
			});
			oDialog.open();
		});
	};

	SampleLinkDelegate.getPanelId = function(oLink) {
		return LinkDelegate.getPanelId(oLink) + "--flpLink";
	};

	return SampleLinkDelegate;
});
