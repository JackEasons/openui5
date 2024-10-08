sap.ui.define([
	"sap/m/App",
	"sap/ui/model/json/JSONModel",
	"sap/m/Button",
	"sap/m/Page",
	"sap/m/library",
	"sap/m/Avatar",
	"sap/m/QuickViewCard",
	"sap/m/QuickViewPage",
	"sap/m/QuickViewGroupElement",
	"sap/m/QuickViewGroup",
	"sap/m/Panel"


], function(
	App,
	JSONModel,
	Button,
	Page,
	mLibrary,
	Avatar,
	QuickViewCard,
	QuickViewPage,
	QuickViewGroupElement,
	QuickViewGroup,
	Panel
) {
	"use strict";

	//shortcut
	const QuickViewGroupElementType = mLibrary.QuickViewGroupElementType;
	//create JSON model instance
	var oModel = new JSONModel();

	// JSON sample data
	var mData = {
		"pages": [
			{
				pageId	: "customPageId",
				title	: "John Doe",
				avatarSrc : "",
				description: "Department Manager1",
				groups: [
					{
						visible : false,
						heading: "Job",
						elements: [
							{
								label: "Company address",
								value: "Sofia, Boris III, 136A Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id."
							},
							{
								label: "Company",
								value: "SAP AG",
								url: "http://sap.com",
								elementType: QuickViewGroupElementType.pageLink,
								pageLinkId: "customPageId4"
							}
						]
					},
					{
						heading: "Other",
						elements: [
							{
								label: "Best Friend",
								value: "Michael Muller",
								elementType: QuickViewGroupElementType.pageLink,
								pageLinkId: "customPageId2"
							},
							{
								label: "Favorite Player",
								value: "Ivaylo Ivanov",
								elementType: QuickViewGroupElementType.pageLink,
								pageLinkId: "customPageId3"
							},
							{
								label: "Favorite Food",
								value: "",
								elementType: QuickViewGroupElementType.text
							}
						]
					}

				]
			},
			{
				pageId	: "customPageId2",
				header	: "Page 2",
				avatarSrc : "sap-icon://person-placeholder",
				title	: "Michael Muller",
				description: "Account Manager",
				groups: [
					{
						heading: "Job",
						elements: [
							{
								label: "Company",
								value: "SAP AG",
								url: "http://sap.com",
								elementType: QuickViewGroupElementType.pageLink,
								pageLinkId: "customPageId4"
							},
							{
								label: "Company address",
								value: "Sofia, Boris III, 136A"
							}
						]
					},
					{
						heading: "Hobby",
						elements: [
							{
								label: "Name",
								value: "Jaga",
								elementType: "text"
							},
							{
								label: "Level",
								value: "Beginner"
							}

						]
					}

				]
			},
			{
				pageId	: "customPageId3",
				header	: "Page 3",
				avatarSrc : "sap-icon://person-placeholder",
				title	: "Ivaylo Ivanov",
				description: "Developer",
				groups: [
					{
						heading: "Job",
						elements: [
							{
								label: "Company",
								value: "SAP AG",
								url: "http://sap.com",
								elementType: QuickViewGroupElementType.pageLink,
								pageLinkId: "customPageId4"
							},
							{
								label: "Company address",
								value: "Sofia, Boris III, 136A"
							}
						]
					},
					{
						heading: "Hobby",
						elements: [
							{
								label: "Name",
								value: "Table Tennis",
								elementType: "text"
							},
							{
								label: "Level",
								value: "Beginner"
							}

						]
					}

				]
			},
			{
				pageId	: "customPageId4",
				header	: "Company View",
				avatarSrc : "sap-icon://building",
				title	: "SAP AG",
				description: "Run it simple",
				groups: [
					{
						heading: "Contact Information",
						elements: [
							{
								label: "Address",
								value: "Waldorf, Germany",
								url: "http://sap.com",
								elementType: "link"
							},
							{
								label: "Email",
								value: "office@sap.com",
								elementType: "email"
							}
						]
					},
					{
						heading: "Main Contact",
						elements: [
							{
								label: "Name",
								value: "Michael Muller",
								elementType: QuickViewGroupElementType.pageLink,
								pageLinkId: "customPageId2"
							},
							{
								label: "Mobile",
								value: "+359 888 999 999",
								elementType: "phone"
							}
						]
					}

				]
			}
		]

	};

	// set the data for the model
	oModel.setData(mData);

	// create and add app
	var app = new App("myApp", {initialPage:"quickViewPage"});
	app.placeAt("body");

	app.setModel(oModel);

	var oQuickViewCard = new QuickViewCard("QVC", {
		afterNavigate : function (oEvent) {
			if (oButton) {
				oButton.setEnabled(!oEvent.getParameter('isTopPage'));
			}
		},
		pages : {
			path : '/pages',
			template : new QuickViewPage({
				pageId : "{pageId}",
				title: "{title}",
				description: "{description}",
				avatar: new Avatar({
					src: "{avatarSrc}"
				}),
				groups : {
					templateShareable: false,
					path : 'groups',
					template : new QuickViewGroup({
						heading : '{heading}',
						elements : {
							templateShareable: false,
							path : 'elements',
							template : new QuickViewGroupElement({
								label: "{label}",
								value: "{value}",
								url: "{url}",
								type: "{elementType}",
								pageLinkId: "{pageLinkId}"
							})
						}
					})
				}
			})
		}
	});

	var oQuickViewCard2 = new QuickViewCard("QVC2", {
		afterNavigate : function (oEvent) {
			if (oButton) {
				oButton.setEnabled(!oEvent.getParameter('isTopPage'));
			}
		},
		pages : {
			path : '/pages',
			template : new QuickViewPage({
				pageId : "{pageId}",
				title: "Title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				avatar: new Avatar({
					src: "http://www.iconshock.com/img_jpg/SUNNYDAY/general/jpg/128/toy_icon.jpg"
				}),
				groups : {
					templateShareable: false,
					path : 'groups',
					template : new QuickViewGroup({
						heading : 'Heading - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.',
						elements : {
							templateShareable: false,
							path : 'elements',
							template : new QuickViewGroupElement({
								label: "{label}",
								value: "{value}",
								url: "{url}",
								type: "{elementType}",
								pageLinkId: "{pageLinkId}"
							})
						}
					})
				}
			})
		}
	});


	var oQuickViewCard3 = new QuickViewCard("QVC3", {
		afterNavigate : function (oEvent) {
			if (oButton) {
				oButton.setEnabled(!oEvent.getParameter('isTopPage'));
			}
		},
		pages : {
			path : '/pages',
			template : new QuickViewPage({
				pageId : "{pageId}",
				title: "Title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				groups : {
					templateShareable: false,
					path : 'groups',
					template : new QuickViewGroup({
						heading : 'Heading - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.',
						elements : {
							templateShareable: false,
							path : 'elements',
							template : new QuickViewGroupElement({
								label: "{label}",
								value: "{value}",
								url: "{url}",
								type: "{elementType}",
								pageLinkId: "{pageLinkId}"
							})
						}
					})
				}
			})
		}
	});

	var oQuickViewCard4 = new QuickViewCard("QVC4", {
		afterNavigate : function (oEvent) {
			if (oButton) {
				oButton.setEnabled(!oEvent.getParameter('isTopPage'));
			}
		},
		pages : {
			path : '/pages',
			template : new QuickViewPage({
				pageId : "{pageId}",
				title: "Not so long title",
				titleUrl: "https://www.sap.com",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				groups : {
					templateShareable: false,
					path : 'groups',
					template : new QuickViewGroup({
						heading : 'Heading - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.',
						elements : {
							templateShareable: false,
							path : 'elements',
							template : new QuickViewGroupElement({
								label: "{label}",
								value: "{value}",
								url: "{url}",
								type: "{elementType}",
								pageLinkId: "{pageLinkId}"
							})
						}
					})
				}
			})
		}
	});

	var oQuickViewCard5 = new QuickViewCard("QVC5", {
		afterNavigate : function (oEvent) {
			if (oButton) {
				oButton.setEnabled(!oEvent.getParameter('isTopPage'));
			}
		},
		pages : {
			path : '/pages',
			template : new QuickViewPage({
				pageId : "{pageId}",
				title: "Title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				titleUrl: "https://www.sap.com",
				description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.",
				groups : {
					templateShareable: false,
					path : 'groups',
					template : new QuickViewGroup({
						heading : 'Heading - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis aliquam nibh, et vulputate risus efficitur id.',
						elements : {
							templateShareable: false,
							path : 'elements',
							template : new QuickViewGroupElement({
								label: "{label}",
								value: "{value}",
								url: "{url}",
								type: "{elementType}",
								pageLinkId: "{pageLinkId}"
							})
						}
					})
				}
			})
		}
	});

	var oButton = new Button("BackBtn", {
		text : 'Back',
		enabled : false,
		press : function () {
			oQuickViewCard.navigateBack();
		}
	});

	var oHideScrollButton = new Button("HideBtn", {
		text : 'Hide ScrollBar',
		press : function () {
			if (oQuickViewCard.getShowVerticalScrollBar() === true) {
				oQuickViewCard.setShowVerticalScrollBar(false);
				oButton.setEnabled(false); // QuickViewCards gets rerendered (first page is opened) - there is no need of "Back" button (BCP: 1870329300)
			}
		}
	});

	var oShowScrollButton = new Button("ShowBtn", {
		text : 'Show ScrollBar',
		press : function () {
			if (oQuickViewCard.getShowVerticalScrollBar() === false) {
				oQuickViewCard.setShowVerticalScrollBar(true);
				oButton.setEnabled(false); // QuickViewCards gets rerendered (first page is opened) - there is no need of "Back" button (BCP: 1870329300)
			}
		}
	});

	var oShowFullHeightButton = new Button("FullHeightBtn", {
		text : 'Show full height',
		press : function () {
			oPanel.setHeight("600px");
		}
	});

	var oPanel = new Panel('quickViewCardPanel', {
		width : '320px',
		height : '292px',
		headerText : 'Store',
		content : [
			oQuickViewCard
		]
	});

	var oPanel2 = new Panel('quickViewCardPanel2', {
		width : '320px',
		height : '292px',
		headerText : 'Store 2 - Test long texts and Icon',
		content : [
			oQuickViewCard2
		]
	});

	var oPanel3 = new Panel('quickViewCardPanel3', {
		width : '320px',
		height : '292px',
		headerText : 'Store 3 - Test long texts',
		content : [
			oQuickViewCard3
		]
	});

	var oPanel4 = new Panel('quickViewCardPanel4', {
		width : '320px',
		height : '292px',
		headerText : 'Store 4 - Test link as title on ONE line',
		content : [
			oQuickViewCard4
		]
	});

	var oPanel5 = new Panel('quickViewCardPanel5', {
		width : '320px',
		height : '292px',
		headerText : 'Store 5 - Test link as title on TWO lines (Belize) / THREE lines (Fiori3/Horizon)',
		content : [
			oQuickViewCard5
		]
	});

	// create and add a page
	var page = new Page("quickViewPage", {
		title : "Quick View Card",
		content : [
			oButton,
			oHideScrollButton,
			oShowScrollButton,
			oShowFullHeightButton,
			oPanel,
			oPanel2,
			oPanel3,
			new Button("vizTestsHelperButton1", {text: "helper 1"}),
			oPanel4,
			new Button("vizTestsHelperButton2", {text: "helper 2"}),
			oPanel5
		]
	});
	app.addPage(page);
});