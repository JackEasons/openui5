sap.ui.define([], function() {

	"use strict";
	return {
		name: "TestSuite for Topic: Supportability",
		defaults: {
			module: "test-resources/sap/ui/core/qunit/{name}.qunit"
		},
		tests: {
			/**
			 * @deprecated since 1.58
			 */
			"util/jQuery.sap.measure": {
				loader: {
					map: {
						"*": {
							"sap/ui/thirdparty/sinon": "sap/ui/thirdparty/sinon-4",
							"sap/ui/thirdparty/sinon-qunit": "sap/ui/qunit/sinon-qunit-bridge"
						}
					}
				},
				qunit: {
					version: 2
				},
				sinon: {
					version: 4
				},
				title: "jQuery.sap.measure"
			},
			/**
			 * @deprecated since 1.58
			 */
			"util/jquery.sap.trace": {
				title: "jQuery.sap.trace",
				page: "test-resources/sap/ui/core/qunit/util/jquery.sap.trace.qunit.html"
			},
			AppCacheBuster: {
				/**
				 * Page kept because test assumes a specific baseURI
				 */
				page: "test-resources/sap/ui/core/qunit/AppCacheBuster.qunit.html",
				title: "sap.ui.core.AppCacheBuster"
			},
			"performance/BeaconRequest": {
				title: "sap.ui.performance.BeaconRequest",
				loader: {
					paths: {
						performance: "test-resources/sap/ui/core/qunit/performance"
					}
				}
			},
			"performance/Measurement": {
				title: "sap.ui.performance.Measurement"
			},
			"performance/trace/FESR": {
				title: "sap.ui.performance.FESR"
			},
			"performance/trace/FESRHelper": {
				title: "sap.ui.performance.FESRHelper"
			},
			"performance/trace/FESR_integrationEnv_available": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/FESR_integrationEnv.qunit.html?sap-ui-fesr=true&sap-ui-fesr-env=MST:N",
				title: "sap.ui.performance.trace.FESR: Integration environment provided"
			},
			"performance/trace/FESR_integrationEnv_available_exceeding": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/FESR_integrationEnv.qunit.html?sap-ui-fesr=true&sap-ui-fesr-env=myVeryLongNameForIntegrationEnvironment",
				title: "sap.ui.performance.trace.FESR: Integration environment provided"
			},
			"performance/trace/FESR_integrationEnv_notAvailable": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/FESR_integrationEnv.qunit.html?sap-ui-fesr=true",
				title: "sap.ui.performance.trace.FESR: Integration environment not provided"
			},
			"performance/trace/InitFESR_metatag": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/InitFESR_metatag.qunit.html",
				title: "sap.ui.performance.trace.FESR: Activation of FESR via meta-tag"
			},
			"performance/trace/InitFESR_metatag_beaconurl": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/InitFESR_metatag_beaconurl.qunit.html",
				title: "sap.ui.performance.trace.FESR: Activation of FESR via meta-tag with beacon URL"
			},
			"performance/trace/InitFESR_metatag_true": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/InitFESR_metatag_true.qunit.html",
				title: "sap.ui.performance.trace.FESR: Activation of FESR via meta-tag true"
			},
			"performance/trace/InitFESR_metatag_false": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/InitFESR_metatag_false.qunit.html",
				title: "sap.ui.performance.trace.FESR: Activation of FESR via meta-tag false"
			},
			"performance/trace/InitFESR_metatag_emptyString": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/InitFESR_metatag_emptyString.qunit.html",
				title: "sap.ui.performance.trace.FESR: Activation of FESR via meta-tag with empty string"
			},
			"performance/trace/InitFESR_notactive": {
				title: "sap.ui.performance.trace.FESR: Inactivity of FESR"
			},
			"performance/trace/InitFESR_urlparam": {
				page: "test-resources/sap/ui/core/qunit/performance/trace/InitFESR_urlparam.qunit.html?sap-ui-fesr=true",
				title: "sap.ui.performance.trace.FESR: Activation of FESR via url-param"
			},
			"performance/trace/Interaction": {
				loader: {
					map: {
						"*": {
							"sap/ui/thirdparty/sinon": "sap/ui/thirdparty/sinon-4",
							"sap/ui/thirdparty/sinon-qunit": "sap/ui/qunit/sinon-qunit-bridge"
						}
					}
				},
				qunit: {
					version: 2
				},
				sinon: {
					version: 4
				},
				title: "sap.ui.performance.Interaction"
			},
			"performance/trace/Passport": {
				title: "sap.ui.performance.Passport"
			},
			"performance/XHRInterceptor": {
				title: "sap.ui.performance.XHRInterceptor"
			}
		}
	};
});
