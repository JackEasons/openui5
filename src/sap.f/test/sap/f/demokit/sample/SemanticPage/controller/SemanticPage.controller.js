sap.ui.define([
	"sap/ui/core/Messaging",
	'sap/ui/core/message/ControlMessageProcessor',
	'sap/ui/core/message/Message',
	'sap/ui/core/message/MessageType',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessagePopover',
	'sap/m/MessageItem',
	'sap/m/MessageBox'
], function(Messaging, ControlMessageProcessor, Message, MessageType, Controller, JSONModel, MessagePopover, MessageItem, MessageBox) {
	"use strict";

	return Controller.extend("sap.f.sample.SemanticPage.controller.SemanticPage", {
		onInit: function () {
			var oMessageProcessor = new ControlMessageProcessor();

			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("sap/f/sample/SemanticPage/model/model.json"));
			this.oSemanticPage = this.byId("mySemanticPage");
			this.oEditAction = this.byId("editAction");
			this.oSemanticPage.setModel(this.oModel);

			Messaging.registerMessageProcessor(oMessageProcessor);
			Messaging.addMessages(
				new Message({
					message: "Something wrong happened",
					type: MessageType.Error,
					processor: oMessageProcessor
				})
			);
		},

		onMessagesButtonPress: function(oEvent) {
			var oMessagesButton = oEvent.getSource();

			if (!this._messagePopover) {
				this._messagePopover = new MessagePopover({
					items: {
						path: "message>/",
						template: new MessageItem({
							description: "{message>description}",
							type: "{message>type}",
							title: "{message>message}"
						})
					}
				});
				oMessagesButton.addDependent(this._messagePopover);
			}
			this._messagePopover.toggle(oMessagesButton);
		},

		onEdit : function() {
			this.showFooter(true);
			this.oEditAction.setVisible(false);
		},

		onSave: function() {
			this.showFooter(false);
			this.oEditAction.setVisible(true);
			MessageBox.alert("Successfully saved!");
		},

		onCancel: function() {
			this.showFooter(false);
			this.oEditAction.setVisible(true);
		},

		showFooter: function(bShow) {
			this.oSemanticPage.setShowFooter(bShow);
		}
	});
});