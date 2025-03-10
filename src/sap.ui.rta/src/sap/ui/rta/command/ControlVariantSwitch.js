/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/core/util/reflection/JsControlTreeModifier",
	"sap/ui/fl/apply/api/ControlVariantApplyAPI",
	"sap/ui/fl/variants/VariantManager",
	"sap/ui/fl/Utils",
	"sap/ui/rta/command/BaseCommand"
], function(
	JsControlTreeModifier,
	ControlVariantApplyAPI,
	VariantManager,
	flUtils,
	BaseCommand
) {
	"use strict";

	/**
	 * Switch control variants
	 *
	 * @class
	 * @extends sap.ui.rta.command.BaseCommand
	 * @author SAP SE
	 * @version ${version}
	 * @constructor
	 * @private
	 * @since 1.50
	 * @alias sap.ui.rta.command.ControlVariantSwitch
	 */
	var ControlVariantSwitch = BaseCommand.extend("sap.ui.rta.command.ControlVariantSwitch", {
		metadata: {
			library: "sap.ui.rta",
			properties: {
				targetVariantReference: {
					type: "string"
				},
				sourceVariantReference: {
					type: "string"
				},
				discardVariantContent: {
					type: "boolean"
				},
				/**
				 * Discarded changes when user switches from a dirty variant choosing "discard"
				 */
				discardedChanges: {
					type: "array"
				}
			},
			associations: {},
			events: {}
		},
		// eslint-disable-next-line object-shorthand
		constructor: function(...aArgs) {
			BaseCommand.apply(this, aArgs);
			this.setRelevantForSave(false);
		}
	});

	function discardVariantContent(sVReference) {
		return VariantManager.eraseDirtyChangesOnVariant(this.sVariantManagementReference, sVReference, this._getAppComponent())
		.then(function(aDirtyChanges) {
			this.setDiscardedChanges(aDirtyChanges);
		}.bind(this));
	}

	ControlVariantSwitch.prototype._getAppComponent = function() {
		var oElement = this.getElement();
		return oElement ? flUtils.getAppComponentForControl(oElement) : this.getSelector().appComponent;
	};

	/**
	 * Template Method to implement execute logic, with ensure precondition Element is available.
	 *
	 * @public
	 * @returns {Promise} Returns resolve after execution
	 */
	ControlVariantSwitch.prototype.execute = function() {
		var oElement = this.getElement();
		var oAppComponent = this._getAppComponent();
		var sNewVariantReference = this.getTargetVariantReference();

		this.oModel = oAppComponent.getModel(ControlVariantApplyAPI.getVariantModelName());
		this.sVariantManagementReference = JsControlTreeModifier.getSelector(oElement, oAppComponent).id;

		return Promise.resolve()
		.then(function() {
			if (this.getDiscardVariantContent()) {
				return discardVariantContent.call(this, this.getSourceVariantReference());
			}
			return undefined;
		}.bind(this))
		.then(this._updateModelVariant.bind(this, sNewVariantReference, oAppComponent));
	};

	/**
	 * Template Method to implement undo logic.
	 * @public
	 * @returns {Promise} Returns resolve after undo
	 */
	ControlVariantSwitch.prototype.undo = function() {
		var sSourceVariantReference = this.getSourceVariantReference();
		var oAppComponent = this._getAppComponent();

		return this._updateModelVariant(sSourceVariantReference, oAppComponent)
		.then(function() {
			// When discarding, dirty changes on source variant need to be applied AFTER the switch
			if (this.getDiscardVariantContent()) {
				return VariantManager.addAndApplyChangesOnVariant(this.getDiscardedChanges(), this._getAppComponent())
				.then(function() {
					this.setDiscardedChanges([]);
					this.oModel.checkUpdate(true);
				}.bind(this));
			}
			return undefined;
		}.bind(this));
	};

	ControlVariantSwitch.prototype._updateModelVariant = function(sVariantReference, oAppComponent) {
		if (this.getTargetVariantReference() !== this.getSourceVariantReference()) {
			return this.oModel.updateCurrentVariant({
				variantManagementReference: this.sVariantManagementReference,
				newVariantReference: sVariantReference,
				appComponent: oAppComponent
			});
		}
		return Promise.resolve();
	};

	return ControlVariantSwitch;
});
