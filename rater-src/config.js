// <nowiki>
const packagejson = require("../package.json");
var version = packagejson.version;

// A global object that stores all the page and user configuration and settings
var config = {
	// Script info
	script: {
		// Advert to append to edit summaries
		advert:  ` ([[وپ:درجه‌بند#${version}|درجه‌بند]])`,
		version: version
	},
	// Default preferences, if user subpage raterPrefs.json does not exist
	defaultPrefs: {
		"autostart": false,
		"autostartRedirects": false,
		"autostartNamespaces": [0],
		"minForShell": 3,
		"bypassRedirects": true,
		"autofillClassFromOthers": true,
		"autofillClassFromOres": true,
		"autofillImportance": true,
		"collapseParamsLowerLimit": 6,
		"watchlist": "preferences"
	},
	// MediaWiki configuration values
	mw: mw.config.get( [
		"skin",
		"wgPageName",
		"wgNamespaceNumber",
		"wgUserName",
		"wgFormattedNamespaces",
		"wgMonthNames",
		"wgRevisionId",
		"wgScriptPath",
		"wgServer",
		"wgCategories",
		"wgIsMainPage"
	] ),
	bannerDefaults: {
		classes: [
			"برگزیده",
			"فهرست برگزیده",
			"عالی",
			"خوب",
			"متوسط",
			"ضعیف",
			"ابتدایی",
			"خرد",
			"فهرست"
		],
		importances: [
			"بسیار بالا‏",
			"بالا",
			"متوسط",
			"کم"
		],
		extendedClasses: [
			"رده",
			"پیش‌نویس",
			"پرونده",
			"FM",
			"درگاه",
			"ویکی‌پروژه",
			"الگو",
			"Bplus",
			"Future",
			"Current",
			"ابهام‌زدایی",
			"درجه‌بندی‌نشده",
			"تغییرمسیر",
			"Book"
		],
		extendedImportances: [
			"بسیار بالا",
			"بالا",
			"متوسط",
			"کم",
			"بی‌نیاز از درجه‏",
			"اهمیت‌بندی‌نشده"
		]
	},
	customBanners: {
		"WikiProject Military history": {
			classes: [
				"مقاله برگزیده",
				"FL",
				"A",
				"GA",
				"B",
				"C",
				"Start",
				"Stub",
				"List",
				"AL",
				"BL",
				"CL",
				"Category",
				"Draft",
				"File",
				"Portal",
				"Project",
				"Template",
				"Disambig",
				"Redirect",
				"Book"			
			],
			importances: []
		},
		"WikiProject Portals": {
			classes: [
				"FPo",
				"Complete",
				"Substantial",
				"Basic",
				"Incomplete",
				"Meta",
				"List",
				"Category",
				"Draft",
				"File",
				"Project",
				"Template",
				"Disambig",
				"NA",
				"Redirect"
			],
			importances: [
				"Top",
				"High",
				"Mid",
				"Low",
				"Bottom",
				"NA"
			]
		}
	},
	shellTemplates: [
		"WikiProject banner shell",
		"WikiProjectBanners",
		"WikiProject Banners",
		"WPB",
		"WPBS",
		"Wikiprojectbannershell",
		"WikiProject Banner Shell",
		"Wpb",
		"WPBannerShell",
		"Wpbs",
		"Wikiprojectbanners",
		"WP Banner Shell",
		"WP banner shell",
		"Bannershell",
		"Wikiproject banner shell",
		"WikiProject Banners Shell",
		"WikiProjectBanner Shell",
		"WikiProjectBannerShell",
		"WikiProject BannerShell",
		"WikiprojectBannerShell",
		"WikiProject banner shell/redirect",
		"WikiProject Shell",
		"Banner shell",
		"پتوپ",
		"Project shell",
		"WikiProject banner"
	],
	defaultParameterData: {
		"auto": {
			"label": {
				"en": "Auto-rated"
			},
			"description": {
				"en": "Automatically rated by a bot. Allowed values: ['yes']."
			},
			"autovalue": "yes"
		},
		"listas": {
			"label": {
				"en": "ترتیب‌پیش‌فرض"
			},
			"description": {
				"en": "Sortkey for talk page"
			}
		},
		"small": {
			"label": {
				"en": "کوچک?",
			},
			"description": {
				"en": "Display a small version. Allowed values: ['yes']."
			},
			"autovalue": "yes"
		},
		"attention": {
			"label": {
				"en": "نیازمند توجه",
			},
			"description": {
				"en": "Immediate attention required. Allowed values: ['yes']."
			},
			"autovalue": "بله"
		},
		"needs-image": {
			"label": {
				"en": "نیازمند تصویر",
			},
			"description": {
				"en": "Request that an image or photograph of the subject be added to the article. Allowed values: ['yes']."
			},
			"aliases": [
				"نیازمند تصویر"
			],
			"autovalue": "بله",
			"suggested": true
		},
		"needs-infobox": {
			"label": {
				"en": "نیازمند جعبه اطلاعات",
			},
			"description": {
				"en": "Request that an infobox be added to the article. Allowed values: ['yes']."
			},
			"aliases": [
				"نیازمند جعبه اطلاعات"
			],
			"autovalue": "بله",
			"suggested": true
		}
	}
};

export default config;
// </nowiki>