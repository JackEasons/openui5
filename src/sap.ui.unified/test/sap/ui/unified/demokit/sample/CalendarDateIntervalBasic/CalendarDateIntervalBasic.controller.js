sap.ui.define([
		'sap/base/i18n/date/CalendarType',
		'sap/ui/core/mvc/Controller',
		'sap/ui/unified/DateRange',
		'sap/ui/core/format/DateFormat',
		'sap/ui/core/date/UI5Date'
	], function(CalendarType, Controller, DateRange, DateFormat, UI5Date) {
	"use strict";

	return Controller.extend("sap.ui.unified.sample.CalendarDateIntervalBasic.CalendarDateIntervalBasic", {
		oFormatYyyymmdd: null,

		onInit: function() {
			this.oFormatYyyymmdd = DateFormat.getInstance({pattern: "yyyy-MM-dd", calendarType: CalendarType.Gregorian});
		},

		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.getSource(),
				oSelectedDate = oCalendar.getSelectedDates()[0],
				oStartDate = oSelectedDate.getStartDate();
			if (this.oLastSelectedJSDate && oStartDate.getTime() === this.oLastSelectedJSDate.getTime()) {
				oCalendar.removeSelectedDate(oSelectedDate);
				this.oLastSelectedJSDate = null;
			} else {
				this.oLastSelectedJSDate = oStartDate;
			}
			this._updateText(oCalendar);
		},

		_updateText: function(oCalendar) {
			var oText = this.byId("selectedDate"),
				aSelectedDates = oCalendar.getSelectedDates(),
				oDate;
			if (aSelectedDates.length > 0 ) {
				oDate = aSelectedDates[0].getStartDate();
				oText.setText(this.oFormatYyyymmdd.format(oDate));
			} else {
				oText.setText("No Date Selected");
			}
		},

		handleSelectToday: function(oEvent) {
			var oCalendar = this.byId("calendar");
			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({startDate: UI5Date.getInstance()}));
			this._updateText(oCalendar);
		}
	});

});
