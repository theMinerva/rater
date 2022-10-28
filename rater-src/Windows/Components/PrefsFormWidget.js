import config from "../../config";
// <nowiki>

function PrefsFormWidget( config ) {
	// Configuration initialization
	config = config || {};
	// Call parent constructor
	PrefsFormWidget.super.call( this, config );

	this.$element.addClass("rater-prefsFormWidget");

	this.layout =  new OO.ui.FieldsetLayout( {
		label: "ترجیحات درجه‌بند",
		$element: this.$element
	} );

	this.preferences = {
		"autostart": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "باز کردن خودکار ابراز"
		},
		"autostartRedirects": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "باز کردن خودکار ابراز در تغییر_مسیرها"
		},
		"autostartNamespaces": {
			input: new mw.widgets.NamespacesMultiselectWidget(),
			label: "باز کردن خودکار ابراز در فضاهای نام معین"
		},
		"minForShell": {
			input: new OO.ui.NumberInputWidget( { "min": 2 } ),
			label: "حداقل تعداد بنر پیش از استفاده از الگوی پتوپ"
		},
		"bypassRedirects": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "دور زدن تغییر_مسیرهای الگوهای ویکی‌پروژه"
		},
		"autofillClassFromOthers":  {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "پر کردن خودکار درجه از دیگر الگوهای موجود"
		},
		"autofillClassFromOres": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "پر کردن خودکار درجه بر اساس پیش‌بینی ساعن"
		},
		"autofillImportance": {
			input: new OO.ui.ToggleSwitchWidget(),
			label: "پر کردن خودکار اهمیت به‌صورت «پایین»"
		},
		"collapseParamsLowerLimit": {
			input: new OO.ui.NumberInputWidget( { "min": 1 } ),
			label: "حداقل تعداد پارامترها پیش از آنکه الگو به حالت بسته نشان داده شود."
		},
		"watchlist": {
			input: new OO.ui.ButtonSelectWidget( {
				items: [
					new OO.ui.ButtonOptionWidget( {
						data: "preferences",
						label: "پیش‌فرض",
						title: "بنا بر تنظیمات شما در ترجیحات ویکی‌پدیا"
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: "watch",
						label: "همیشه",
						title: "همهٔ صفحاتی که با این ابزار ویرایش شوند به فهرست پیگیری شما افزوده می‌شوند."
					} ),
					new OO.ui.ButtonOptionWidget( {
						data: "nochange",
						label: "هرگز",
						title: "پس از ویرایش با این ابزار صفحات به فهرست پیگیری شما اضافه نمی‌شوند."
					} ),
				]
			}).selectItemByData("preferences"),
			label: "افزودن صفحات ویرایش‌شده به فهرست پیگیری"
		},
		"resetCache": {
			input: new OO.ui.ButtonWidget( {
				label: "خالی‌کردن کاشه (میانگیر) مرورگر",
				title: "Remove cached data, including list of WikiProjects and template parameters",
				flags: ["destructive"]
			} )
		}
	};

	for (let prefName in this.preferences ) {
		this.layout.addItems([
			new OO.ui.FieldLayout( this.preferences[prefName].input, {
				label: this.preferences[prefName].label,
				align: "right"
			} )
		]);
	}

	this.preferences.resetCache.input.connect(this, {"click": "onResetCacheClick"});
}
OO.inheritClass( PrefsFormWidget, OO.ui.Widget );

PrefsFormWidget.prototype.setPrefValues = function(prefs) {
	for (let prefName in prefs ) {
		let value = prefs[prefName];
		let input = this.preferences[prefName] && this.preferences[prefName].input;
		switch (input && input.constructor.name) {
		case "OoUiButtonSelectWidget":
			input.selectItemByData(value);
			break;
		case "OoUiNumberInputWidget":
		case "OoUiToggleSwitchWidget":
			input.setValue(value);
			break;
		case "MwWidgetsNamespacesMultiselectWidget":
			input.clearItems();
			value.forEach(ns =>
				input.addTag(
					ns.toString(),
					ns === 0
						? "(مقاله)"
						: config.mw.wgFormattedNamespaces[ns]
				)
			);
			break;
		}
	}
};

PrefsFormWidget.prototype.getPrefs = function() {
	var prefs = {};
	for (let prefName in this.preferences ) {
		let input = this.preferences[prefName].input;
		let value;
		switch (input.constructor.name) {
		case "OoUiButtonSelectWidget":
			value = input.findSelectedItem().getData();
			break;
		case "OoUiToggleSwitchWidget":
			value = input.getValue();
			break;
		case "OoUiNumberInputWidget":
			value = Number(input.getValue()); // widget uses strings, not numbers!
			break;
		case "MwWidgetsNamespacesMultiselectWidget":
			value = input.getValue().map(Number); // widget uses strings, not numbers!
			break;
		}
		prefs[prefName] = value;
	}
	return prefs;
};

PrefsFormWidget.prototype.onResetCacheClick = function() {
	OO.ui.confirm("آیا مطمئنید؟ با اینکار ابزار یک بار باز و بسته می‌شود و تغییرات از دست می‌روند.")
		.then(confirmed => {
			if (confirmed) { 
				this.emit("resetCache");
			}
		});
};

export default PrefsFormWidget;
// </nowiki>