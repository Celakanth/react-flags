"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlagButtons = function (_React$Component) {
  _inherits(FlagButtons, _React$Component);

  function FlagButtons() {
    _classCallCheck(this, FlagButtons);

    return _possibleConstructorReturn(this, (FlagButtons.__proto__ || Object.getPrototypeOf(FlagButtons)).apply(this, arguments));
  }

  _createClass(FlagButtons, [{
    key: "setFlagLanguages",
    value: function setFlagLanguages(languages) {
      var _this2 = this;

      var options = [];
      languages.forEach(function (language, index) {
        options.push(React.createElement(
          "a",
          { key: language.country, className: "dropdown-item", onClick: function onClick() {
              return _this2.setLanguag(language.country);
            } },
          React.createElement("span", { className: "flag flag-" + language.country.toLowerCase() }),
          " ",
          _this2.listType == 'countryName' ? language.countryName : language.language
        ));
      });
      return options;
    }
  }, {
    key: "defaultSelection",
    value: function defaultSelection() {
      var selectedLanguage = this.languages.filter(function (language) {
        if (language.selected == true) {
          return language;
        }
      });
      return selectedLanguage;
    }
  }, {
    key: "setLanguag",
    value: function setLanguag(countryCode) {
      var currentLanguages = this.languages.filter(function (lang) {
        if (lang.selected == true) {
          return lang;
        }
      });
      currentLanguages.length > 0 ? currentLanguages[0].selected = false : false;

      var theLanguage = this.languages.filter(function (lang) {
        if (lang.country == countryCode) {
          return lang;
        };
      });
      theLanguage[0].selected = true;

      this.props ? this.props(theLanguage[0].key) : false;

      this.controllRefresh();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { className: "nav-link dropdown-toggle", id: "dropdownDiv", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false" },
          React.createElement(
            "span",
            { className: "flagName flag flag-" + this.defaultSelection()[0].country },
            " "
          ),
          this.listType == 'countryName' ? this.defaultSelection(this.languages)[0].countryName : this.defaultSelection(this.languages)[0].language
        ),
        React.createElement(
          "div",
          { className: "dropdown-menu", "aria-labelledby": "dropdownDiv" },
          this.setFlagLanguages(this.languages)
        )
      );
    }
  }, {
    key: "renderCountryFlags",
    value: function renderCountryFlags(element, languages, props) {
      this.element = this.element ? this.element : element;
      this.props = this.props ? this.props : props;
      this.listType = "countryName";
      this.setCountryList(languages);
      this.validateSelector();

      this.controllRefresh();
    }
  }, {
    key: "renderLanguageFlags",
    value: function renderLanguageFlags(element, languages, props) {
      this.element = this.element ? this.element : element;
      this.props = this.props ? this.props : props;
      this.listType = "language";
      this.setLanguageList(languages);
      this.validateSelector();

      this.controllRefresh();
    }
  }, {
    key: "controllRefresh",
    value: function controllRefresh() {
      var container = document.getElementById(this.element);
      ReactDOM.render(this.render(), container);
    }
  }, {
    key: "setCountryList",
    value: function setCountryList(defaultLanguages) {
      var _this3 = this;

      if (defaultLanguages && defaultLanguages.length > 0) {

        this.languageSet = [];
        this.languages = [];

        this.setSelectionList();
        defaultLanguages.forEach(function (lang) {

          _this3.selectionList.filter(function (filtered) {

            if (filtered.country.toLowerCase() == lang.country.toLowerCase()) {
              if (lang.selected) {
                filtered.selected = true;
              }
              _this3.languages.push(filtered);
            }
          });
        });
      } else {
        this.setLanguageList();
        this.languages = this.selectionList;
      }
    }
  }, {
    key: "setLanguageList",
    value: function setLanguageList(defaultList) {
      var _this4 = this;

      this.languageSet = [];
      this.languages = [];
      this.tempList = [];

      this.setSelectionList();

      this.selectionList.filter(function (countryLanguages) {
        if (countryLanguages.default) {
          _this4.tempList.push(countryLanguages);
        }
      });
      if (defaultList && defaultList.length > 0) {
        defaultList.forEach(function (lang) {

          _this4.tempList.filter(function (filtered) {

            if (filtered.key.toLowerCase() == lang.key.toLowerCase()) {
              if (lang.selected) {
                filtered.selected = true;
              } else if (filtered.country.toLowerCase() == 'us') {
                countryLanguages.selected = true;
              }
              _this4.languages.push(filtered);
            }
          });
        });
      } else {
        this.languages = this.tempList;
      }
      console.log('the languages are', this.languages);
    }
  }, {
    key: "validateSelector",
    value: function validateSelector(defaultLanguages, listType) {

      if (!this.element) {
        throw new Error('no element');
      };

      if (typeof this.props != 'function') {
        throw new Error('Callback must be a function');
      }
    }
  }, {
    key: "setSelectionList",
    value: function setSelectionList() {
      this.selectionList = [{
        "country": "ZA",
        "countryName": "South Africa",
        "language": "Afrikaans",
        "key": "af",
        "default": true
      }, {
        "country": "ET",
        "countryName": "Ethiopia",
        "language": "ኢትዮጵያ , Itoophiyaa",
        "key": "am",
        "default": true
      }, {
        "country": "AE",
        "countryName": "United Arab Emirates",
        "language": "دولة الإمارات العربيّة المتّحدة",
        "key": "ar",
        "default": true
      }, {
        "country": "BH",
        "countryName": "Bahrein",
        "language": "البحرين",
        "key": "ar",
        "default": ""
      }, {
        "country": "DJ",
        "countryName": "Djibouti",
        "language": "Djibouti , جيبوتي , Jabuuti , Gabuutih",
        "key": "ar",
        "default": ""
      }, {
        "country": "DZ",
        "countryName": "Algeria",
        "language": "الجزائر",
        "key": "ar",
        "default": ""
      }, {
        "country": "EG",
        "countryName": "Egypt",
        "language": "مصر",
        "key": "ar",
        "default": ""
      }, {
        "country": "EH",
        "countryName": "Western Sahara",
        "language": "Sahara Occidental",
        "key": "ar",
        "default": ""
      }, {
        "country": "IQ",
        "countryName": "Iraq",
        "language": "العراق , Iraq",
        "key": "ar",
        "default": ""
      }, {
        "country": "JO",
        "countryName": "Jordan",
        "language": "الأُرْدُن",
        "key": "ar",
        "default": ""
      }, {
        "country": "KM",
        "countryName": "Comores",
        "language": "ﺍﻟﻘﻤﺮي , Comores , Komori",
        "key": "ar",
        "default": ""
      }, {
        "country": "KW",
        "countryName": "Kuweit",
        "language": "الكويت",
        "key": "ar",
        "default": ""
      }, {
        "country": "LB",
        "countryName": "Lebanon",
        "language": "لبنان , Liban",
        "key": "ar",
        "default": ""
      }, {
        "country": "LY",
        "countryName": "Libya",
        "language": "ليبيا",
        "key": "ar",
        "default": ""
      }, {
        "country": "MR",
        "countryName": "Mauritania",
        "language": "موريتانيا , Mauritanie",
        "key": "ar",
        "default": ""
      }, {
        "country": "OM",
        "countryName": "Oman",
        "language": "سلطنة عُمان",
        "key": "ar",
        "default": ""
      }, {
        "country": "PS",
        "countryName": "Palestinian Territory",
        "language": "Palestinian Territory",
        "key": "ar",
        "default": ""
      }, {
        "country": "QA",
        "countryName": "Qatar",
        "language": "قطر",
        "key": "ar",
        "default": ""
      }, {
        "country": "SA",
        "countryName": "Saudi Arabia",
        "language": "السعودية",
        "key": "ar",
        "default": ""
      }, {
        "country": "SD",
        "countryName": "Sudan",
        "language": "السودان",
        "key": "ar",
        "default": ""
      }, {
        "country": "SY",
        "countryName": "Syria",
        "language": "سوريا , Sūriyya",
        "key": "ar",
        "default": ""
      }, {
        "country": "TD",
        "countryName": "Chad",
        "language": "Tchad , تشاد",
        "key": "ar",
        "default": ""
      }, {
        "country": "TN",
        "countryName": "Tunisia",
        "language": "تونس , Tunisie",
        "key": "ar",
        "default": ""
      }, {
        "country": "YE",
        "countryName": "Yemen",
        "language": "اليَمَن",
        "key": "ar",
        "default": ""
      }, {
        "country": "AZ",
        "countryName": "Azerbaijan",
        "language": "Azərbaycan",
        "key": "az",
        "default": true
      }, {
        "country": "BY",
        "countryName": "Belarus",
        "language": "Беларусь",
        "key": "be",
        "default": true
      }, {
        "country": "BG",
        "countryName": "Bulgaria",
        "language": "България",
        "key": "bg",
        "default": true
      }, {
        "country": "VU",
        "countryName": "Vanuatu",
        "language": "Vanuatu",
        "key": "bi",
        "default": true
      }, {
        "country": "BD",
        "countryName": "Bangladesh",
        "language": "গণপ্রজাতন্ত্রী বাংলাদেশ",
        "key": "bn",
        "default": true
      }, {
        "country": "BA",
        "countryName": "Bosnia and Herzegovina",
        "language": "Bosna i Hercegovina",
        "key": "bs",
        "default": true
      }, {
        "country": "AD",
        "countryName": "Andorra",
        "language": "Andorra",
        "key": "ca",
        "default": true
      }, {
        "country": "GU",
        "countryName": "Guam",
        "language": "Guam , Guåhån",
        "key": "ch",
        "default": ""
      }, {
        "country": "MP",
        "countryName": "Northern Mariana Islands",
        "language": "Northern Mariana Islands",
        "key": "ch",
        "default": true
      }, {
        "country": "CZ",
        "countryName": "Czech Republic",
        "language": "Česká republika",
        "key": "cs",
        "default": true
      }, {
        "country": "DK",
        "countryName": "Denmark",
        "language": "Danmark",
        "key": "da",
        "default": true
      }, {
        "country": "AT",
        "countryName": "Austria",
        "language": "Österreich",
        "key": "de",
        "default": ""
      }, {
        "country": "CH",
        "countryName": "Switzerland",
        "language": "Schweiz , Suisse , Svizzera , Svizra",
        "key": "de",
        "default": ""
      }, {
        "country": "DE",
        "countryName": "Germany",
        "language": "Deutch",
        "key": "de",
        "default": true
      }, {
        "country": "LI",
        "countryName": "Liechtenstein",
        "language": "Liechtenstein",
        "key": "de",
        "default": ""
      }, {
        "country": "NA",
        "countryName": "Namibia",
        "language": "Namibia",
        "key": "de",
        "default": ""
      }, {
        "country": "MV",
        "countryName": "Maldives",
        "language": "",
        "key": "dv",
        "default": true
      }, {
        "country": "BT",
        "countryName": "Bhutan",
        "language": "འབྲུག་ཡུལ",
        "key": "dz",
        "default": true
      }, {
        "country": "CY",
        "countryName": "Cyprus",
        "language": "Κύπρος , Kibris",
        "key": "el",
        "default": ""
      }, {
        "country": "GR",
        "countryName": "Greece",
        "language": "Ελλάδα",
        "key": "el",
        "default": true
      }, {
        "country": "AG",
        "countryName": "Antigua and Barbuda",
        "language": "English",
        "key": "en",
        "default": ""
      }, {
        "country": "AI",
        "countryName": "Anguilla",
        "language": "English",
        "key": "en",
        "default": ""
      }, {
        "country": "AQ",
        "countryName": "Antarctica",
        "language": "English",
        "key": "en",
        "default": ""
      }, {
        "country": "AU",
        "countryName": "Australia",
        "language": "Australia",
        "key": "en",
        "default": ""
      }, {
        "country": "BB",
        "countryName": "Barbados",
        "language": "Barbados",
        "key": "en",
        "default": ""
      }, {
        "country": "BM",
        "countryName": "Bermuda",
        "language": "Bermuda",
        "key": "en",
        "default": ""
      }, {
        "country": "BS",
        "countryName": "Bahamas",
        "language": "Bahamas",
        "key": "en",
        "default": ""
      }, {
        "country": "BW",
        "countryName": "Botswana",
        "language": "Botswana",
        "key": "en",
        "default": ""
      }, {
        "country": "BZ",
        "countryName": "Belize",
        "language": "Belize",
        "key": "en",
        "default": ""
      }, {
        "country": "CA",
        "countryName": "Canada",
        "language": "Canada",
        "key": "en",
        "default": ""
      }, {
        "country": "CC",
        "countryName": "Cocos (Keeling) Islands",
        "language": "Cocos (Keeling) Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "CK",
        "countryName": "Cook Islands",
        "language": "Cook Islands , Kūki ʻĀirani",
        "key": "en",
        "default": ""
      }, {
        "country": "CX",
        "countryName": "Christmas Island",
        "language": "Christmas Island",
        "key": "en",
        "default": ""
      }, {
        "country": "DM",
        "countryName": "Dominica",
        "language": "Dominica",
        "key": "en",
        "default": ""
      }, {
        "country": "FJ",
        "countryName": "Fiji",
        "language": "Fiji",
        "key": "en",
        "default": ""
      }, {
        "country": "FK",
        "countryName": "Falkland Islands",
        "language": "Falkland Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "FM",
        "countryName": "Micronesia (Federated States of)",
        "language": "Micronesia",
        "key": "en",
        "default": ""
      }, {
        "country": "GB",
        "countryName": "United Kingdom",
        "language": "English(UK)",
        "key": "en",
        "default": ""
      }, {
        "country": "GD",
        "countryName": "Grenada",
        "language": "Grenada",
        "key": "en",
        "default": ""
      }, {
        "country": "GG",
        "countryName": "Guernsey",
        "language": "Guernsey",
        "key": "en",
        "default": ""
      }, {
        "country": "GH",
        "countryName": "Ghana",
        "language": "Ghana",
        "key": "en",
        "default": ""
      }, {
        "country": "GI",
        "countryName": "Gibraltar",
        "language": "Gibraltar",
        "key": "en",
        "default": ""
      }, {
        "country": "GM",
        "countryName": "The Gambia",
        "language": "The Gambia",
        "key": "en",
        "default": ""
      }, {
        "country": "GS",
        "countryName": "South Georgia and the South Sandwich Islands",
        "language": "South Georgia and the South Sandwich Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "GY",
        "countryName": "Guyana",
        "language": "Guyana",
        "key": "en",
        "default": ""
      }, {
        "country": "HM",
        "countryName": "Heard Island and McDonald Islands",
        "language": "Heard Island and McDonald Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "IE",
        "countryName": "Ireland",
        "language": "Ireland , Éire",
        "key": "en",
        "default": ""
      }, {
        "country": "IM",
        "countryName": "Isle of Man",
        "language": "Isle of Man",
        "key": "en",
        "default": ""
      }, {
        "country": "IO",
        "countryName": "British Indian Ocean Territory",
        "language": "British Indian Ocean Territory",
        "key": "en",
        "default": ""
      }, {
        "country": "JE",
        "countryName": "Jersey",
        "language": "Jersey",
        "key": "en",
        "default": ""
      }, {
        "country": "JM",
        "countryName": "Jamaica",
        "language": "Jamaica",
        "key": "en",
        "default": ""
      }, {
        "country": "KI",
        "countryName": "Kiribati",
        "language": "Kiribati",
        "key": "en",
        "default": ""
      }, {
        "country": "KN",
        "countryName": "Saint Kitts and Nevis",
        "language": "Saint Kitts and Nevis",
        "key": "en",
        "default": ""
      }, {
        "country": "KY",
        "countryName": "Cayman Islands",
        "language": "Cayman Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "LC",
        "countryName": "Saint Lucia",
        "language": "Saint Lucia",
        "key": "en",
        "default": ""
      }, {
        "country": "LR",
        "countryName": "Liberia",
        "language": "Liberia",
        "key": "en",
        "default": ""
      }, {
        "country": "MS",
        "countryName": "Montserrat",
        "language": "Montserrat",
        "key": "en",
        "default": ""
      }, {
        "country": "MW",
        "countryName": "Malawi",
        "language": "Malawi",
        "key": "en",
        "default": ""
      }, {
        "country": "NF",
        "countryName": "Norfolk Island",
        "language": "Norfolk Island",
        "key": "en",
        "default": ""
      }, {
        "country": "NG",
        "countryName": "Nigeria",
        "language": "Nigeria",
        "key": "en",
        "default": ""
      }, {
        "country": "NU",
        "countryName": "Niue",
        "language": "Niue",
        "key": "en",
        "default": ""
      }, {
        "country": "PN",
        "countryName": "Pitcairn",
        "language": "Pitcairn",
        "key": "en",
        "default": ""
      }, {
        "country": "SB",
        "countryName": "Solomon Islands",
        "language": "Solomon Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "SH",
        "countryName": "Saint Helena",
        "language": "Saint Helena",
        "key": "en",
        "default": ""
      }, {
        "country": "SL",
        "countryName": "Sierra Leone",
        "language": "Sierra Leone",
        "key": "en",
        "default": ""
      }, {
        "country": "SS",
        "countryName": "South Sudan",
        "language": "South Sudan",
        "key": "en",
        "default": ""
      }, {
        "country": "TC",
        "countryName": "Turks and Caicos Islands",
        "language": "Turks and Caicos Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "TO",
        "countryName": "Tonga",
        "language": "Tonga",
        "key": "en",
        "default": ""
      }, {
        "country": "TT",
        "countryName": "Trinidad and Tobago",
        "language": "Trinidad and Tobago",
        "key": "en",
        "default": ""
      }, {
        "country": "TV",
        "countryName": "Tuvalu",
        "language": "Tuvalu",
        "key": "en",
        "default": ""
      }, {
        "country": "UM",
        "countryName": "United States Minor Outlying Islands",
        "language": "United States Minor Outlying Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "US",
        "countryName": "United States of America",
        "language": "English(US)",
        "key": "en",
        "default": true
      }, {
        "country": "VC",
        "countryName": "Saint Vincent and the Grenadines",
        "language": "Saint Vincent and the Grenadines",
        "key": "en",
        "default": ""
      }, {
        "country": "VG",
        "countryName": "British Virgin Islands",
        "language": "British Virgin Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "VI",
        "countryName": "United States Virgin Islands",
        "language": "United States Virgin Islands",
        "key": "en",
        "default": ""
      }, {
        "country": "ZM",
        "countryName": "Zambia",
        "language": "Zambia",
        "key": "en",
        "default": ""
      }, {
        "country": "ZW",
        "countryName": "Zimbabwe",
        "language": "Zimbabwe",
        "key": "en",
        "default": ""
      }, {
        "country": "AR",
        "countryName": "Argentina",
        "language": "Argentina",
        "key": "es",
        "default": ""
      }, {
        "country": "BO",
        "countryName": "Bolivia",
        "language": "Bolivia , Bulibiya , Volívia , Wuliwya",
        "key": "es",
        "default": ""
      }, {
        "country": "CL",
        "countryName": "Chile",
        "language": "Chile",
        "key": "es",
        "default": ""
      }, {
        "country": "CO",
        "countryName": "Colombia",
        "language": "Colombia",
        "key": "es",
        "default": ""
      }, {
        "country": "CR",
        "countryName": "Costa Rica",
        "language": "Costa Rica",
        "key": "es",
        "default": ""
      }, {
        "country": "CU",
        "countryName": "Cuba",
        "language": "Cuba",
        "key": "es",
        "default": ""
      }, {
        "country": "DO",
        "countryName": "Dominican Republic",
        "language": "República Dominicana",
        "key": "es",
        "default": ""
      }, {
        "country": "EC",
        "countryName": "Ecuador",
        "language": "Ecuador",
        "key": "es",
        "default": ""
      }, {
        "country": "ES",
        "countryName": "Spain",
        "language": "España",
        "key": "es",
        "default": true
      }, {
        "country": "GQ",
        "countryName": "Equatorial Guinea",
        "language": "Guiena ecuatorial , Guinée équatoriale , Guiné Equatorial",
        "key": "es",
        "default": ""
      }, {
        "country": "GT",
        "countryName": "Guatemala",
        "language": "Guatemala",
        "key": "es",
        "default": ""
      }, {
        "country": "HN",
        "countryName": "Honduras",
        "language": "Honduras",
        "key": "es",
        "default": ""
      }, {
        "country": "MX",
        "countryName": "Mexico",
        "language": "México",
        "key": "es",
        "default": ""
      }, {
        "country": "NI",
        "countryName": "Nicaragua",
        "language": "Nicaragua",
        "key": "es",
        "default": ""
      }, {
        "country": "PA",
        "countryName": "Panama",
        "language": "Panama",
        "key": "es",
        "default": ""
      }, {
        "country": "PE",
        "countryName": "Peru",
        "language": "Perú",
        "key": "es",
        "default": ""
      }, {
        "country": "PR",
        "countryName": "Puerto Rico",
        "language": "Puerto Rico",
        "key": "es",
        "default": ""
      }, {
        "country": "SV",
        "countryName": "El Salvador",
        "language": "El Salvador",
        "key": "es",
        "default": ""
      }, {
        "country": "UY",
        "countryName": "Uruguay",
        "language": "Uruguay",
        "key": "es",
        "default": ""
      }, {
        "country": "VE",
        "countryName": "Venezuela",
        "language": "Venezuela",
        "key": "es",
        "default": ""
      }, {
        "country": "EE",
        "countryName": "Estonia",
        "language": "Eesti",
        "key": "et",
        "default": true
      }, {
        "country": "AF",
        "countryName": "Afghanistan",
        "language": "د افغانستان اسلامي دولتدولت اسلامی افغانستان , جمهوری اسلامی افغانستان",
        "key": "fa",
        "default": true
      }, {
        "country": "IR",
        "countryName": "Iran",
        "language": "ایران",
        "key": "fa",
        "default": ""
      }, {
        "country": "FI",
        "countryName": "Finland",
        "language": "Suomi",
        "key": "fi",
        "default": true
      }, {
        "country": "FO",
        "countryName": "Faroe Islands",
        "language": "Føroyar , Færøerne",
        "key": "fo",
        "default": true
      }, {
        "country": "BF",
        "countryName": "Burkina Faso",
        "language": "Burkina Faso",
        "key": "fr",
        "default": ""
      }, {
        "country": "BI",
        "countryName": "Burundi",
        "language": "Burundi",
        "key": "fr",
        "default": ""
      }, {
        "country": "BJ",
        "countryName": "Benin",
        "language": "Bénin",
        "key": "fr",
        "default": ""
      }, {
        "country": "BL",
        "countryName": "Saint-Barthélemy",
        "language": "Saint-Barthélemy",
        "key": "fr",
        "default": ""
      }, {
        "country": "CD",
        "countryName": "Democratic Republic of the Congo (Congo-Kinshasa, former Zaire)",
        "language": "République Démocratique du Congo",
        "key": "fr",
        "default": ""
      }, {
        "country": "CF",
        "countryName": "Centrafrican Republic",
        "language": "République centrafricaine , Ködörösêse tî Bêafrîka",
        "key": "fr",
        "default": ""
      }, {
        "country": "CG",
        "countryName": "Republic of the Congo (Congo-Brazzaville)",
        "language": "République du Congo",
        "key": "fr",
        "default": ""
      }, {
        "country": "CI",
        "countryName": "Côte d'Ivoire",
        "language": "Côte d'Ivoire",
        "key": "fr",
        "default": ""
      }, {
        "country": "CM",
        "countryName": "Cameroon",
        "language": "Cameroun , Cameroon",
        "key": "fr",
        "default": ""
      }, {
        "country": "FR",
        "countryName": "France",
        "language": "French",
        "key": "fr",
        "default": true
      }, {
        "country": "GA",
        "countryName": "Gabon",
        "language": "Gabon",
        "key": "fr",
        "default": ""
      }, {
        "country": "GF",
        "countryName": "French Guiana",
        "language": "Guyane française",
        "key": "fr",
        "default": ""
      }, {
        "country": "GN",
        "countryName": "Guinea",
        "language": "Guinée",
        "key": "fr",
        "default": ""
      }, {
        "country": "GP",
        "countryName": "Guadeloupe",
        "language": "Guadeloupe",
        "key": "fr",
        "default": ""
      }, {
        "country": "MA",
        "countryName": "Morocco",
        "language": "Maroc , ⵍⵎⵖⵔⵉⴱ , المغرب",
        "key": "fr",
        "default": ""
      }, {
        "country": "MC",
        "countryName": "Monaco",
        "language": "Monaco",
        "key": "fr",
        "default": ""
      }, {
        "country": "MF",
        "countryName": "Saint Martin (French part)",
        "language": "Saint-Martin",
        "key": "fr",
        "default": ""
      }, {
        "country": "ML",
        "countryName": "Mali",
        "language": "Mali",
        "key": "fr",
        "default": ""
      }, {
        "country": "MQ",
        "countryName": "Martinique",
        "language": "Martinique",
        "key": "fr",
        "default": ""
      }, {
        "country": "MU",
        "countryName": "Mauritius",
        "language": "Maurice , Mauritius",
        "key": "fr",
        "default": ""
      }, {
        "country": "NC",
        "countryName": "New Caledonia",
        "language": "Nouvelle-Calédonie",
        "key": "fr",
        "default": ""
      }, {
        "country": "NE",
        "countryName": "Niger",
        "language": "Niger",
        "key": "fr",
        "default": ""
      }, {
        "country": "PF",
        "countryName": "French Polynesia",
        "language": "Polynésie française",
        "key": "fr",
        "default": ""
      }, {
        "country": "PM",
        "countryName": "Saint Pierre and Miquelon",
        "language": "Saint-Pierre-et-Miquelon",
        "key": "fr",
        "default": ""
      }, {
        "country": "RE",
        "countryName": "Reunion",
        "language": "La Réunion",
        "key": "fr",
        "default": ""
      }, {
        "country": "SC",
        "countryName": "Seychelles",
        "language": "Seychelles",
        "key": "fr",
        "default": ""
      }, {
        "country": "SN",
        "countryName": "Sénégal",
        "language": "Sénégal",
        "key": "fr",
        "default": ""
      }, {
        "country": "TF",
        "countryName": "French Southern and Antarctic Lands",
        "language": "Terres australes et antarctiques françaises",
        "key": "fr",
        "default": ""
      }, {
        "country": "TG",
        "countryName": "Togo",
        "language": "Togo",
        "key": "fr",
        "default": ""
      }, {
        "country": "WF",
        "countryName": "Wallis and Futuna",
        "language": "Wallis-et-Futuna",
        "key": "fr",
        "default": ""
      }, {
        "country": "YT",
        "countryName": "Mayotte",
        "language": "Mayotte",
        "key": "fr",
        "default": ""
      }, {
        "country": "PY",
        "countryName": "Paraguay",
        "language": "Paraguay",
        "key": "gn",
        "default": true
      }, {
        "country": "IL",
        "countryName": "Israel",
        "language": "ישראל",
        "key": "he",
        "default": true
      }, {
        "country": "IN",
        "countryName": "India",
        "language": "भारत , India",
        "key": "hi",
        "default": true
      }, {
        "country": "PG",
        "countryName": "Papua New Guinea",
        "language": "Papua New Guinea",
        "key": "ho",
        "default": true
      }, {
        "country": "HR",
        "countryName": "Croatia",
        "language": "Hrvatska",
        "key": "hr",
        "default": true
      }, {
        "country": "HT",
        "countryName": "Haiti",
        "language": "Haïti , Ayiti",
        "key": "ht",
        "default": true
      }, {
        "country": "HU",
        "countryName": "Hungary",
        "language": "Magyarország",
        "key": "hu",
        "default": true
      }, {
        "country": "AM",
        "countryName": "Armenia",
        "language": "Հայաստան",
        "key": "hy",
        "default": true
      }, {
        "country": "ID",
        "countryName": "Indonesia",
        "language": "Indonesia",
        "key": "id",
        "default": true
      }, {
        "country": "IS",
        "countryName": "Iceland",
        "language": "Ísland",
        "key": "is",
        "default": true
      }, {
        "country": "IT",
        "countryName": "Italy",
        "language": "Italia",
        "key": "it",
        "default": true
      }, {
        "country": "SM",
        "countryName": "San Marino",
        "language": "San Marino",
        "key": "it",
        "default": ""
      }, {
        "country": "VA",
        "countryName": "City of the Vatican",
        "language": "Città del Vaticano",
        "key": "it",
        "default": ""
      }, {
        "country": "JP",
        "countryName": "Japan",
        "language": "日本人",
        "key": "ja",
        "default": true
      }, {
        "country": "PW",
        "countryName": "Palau",
        "language": "Palau",
        "key": "ja",
        "default": ""
      }, {
        "country": "GE",
        "countryName": "Georgia",
        "language": "საქართველო",
        "key": "ka",
        "default": true
      }, {
        "country": "KZ",
        "countryName": "Kazakhstan",
        "language": "Қазақстан , Казахстан",
        "key": "kk",
        "default": true
      }, {
        "country": "GL",
        "countryName": "Greenland",
        "language": "Kalaallit Nunaat , Grønland",
        "key": "kl",
        "default": true
      }, {
        "country": "KH",
        "countryName": "Cambodia",
        "language": "កម្ពុជា",
        "key": "km",
        "default": true
      }, {
        "country": "KP",
        "countryName": "North Korea",
        "language": "북조선",
        "key": "ko",
        "default": true
      }, {
        "country": "KR",
        "countryName": "South Korea",
        "language": "대한민국",
        "key": "ko",
        "default": ""
      }, {
        "country": "KG",
        "countryName": "Kyrgyzstan",
        "language": "Кыргызстан , Киргизия",
        "key": "ky",
        "default": true
      }, {
        "country": "LU",
        "countryName": "Luxembourg",
        "language": "Lëtzebuerg , Luxembourg , Luxemburg",
        "key": "lb",
        "default": true
      }, {
        "country": "LA",
        "countryName": "Laos",
        "language": "ປະຊາຊົນລາວ",
        "key": "lo",
        "default": true
      }, {
        "country": "LT",
        "countryName": "Lithuania",
        "language": "Lietuva",
        "key": "lt",
        "default": true
      }, {
        "country": "LV",
        "countryName": "Latvia",
        "language": "Latvija",
        "key": "lv",
        "default": true
      }, {
        "country": "MG",
        "countryName": "Madagascar",
        "language": "Madagasikara , Madagascar",
        "key": "mg",
        "default": true
      }, {
        "country": "MH",
        "countryName": "Marshall Islands",
        "language": "Marshall Islands",
        "key": "mh",
        "default": true
      }, {
        "country": "NZ",
        "countryName": "New Zealand",
        "language": "New Zealand",
        "key": "mi",
        "default": true
      }, {
        "country": "MK",
        "countryName": "Macedonia (Former Yugoslav Republic of)",
        "language": "Македонија",
        "key": "mk",
        "default": true
      }, {
        "country": "MN",
        "countryName": "Mongolia",
        "language": "Монгол Улс",
        "key": "mn",
        "default": true
      }, {
        "country": "BN",
        "countryName": "Brunei Darussalam",
        "language": "Brunei Darussalam",
        "key": "ms",
        "default": ""
      }, {
        "country": "MY",
        "countryName": "Malaysia",
        "language": "",
        "key": "ms",
        "default": true
      }, {
        "country": "SG",
        "countryName": "Singapore",
        "language": "Singapore",
        "key": "ms",
        "default": ""
      }, {
        "country": "MT",
        "countryName": "Malta",
        "language": "Malta",
        "key": "mt",
        "default": true
      }, {
        "country": "MM",
        "countryName": "Myanmar",
        "language": "မြန်မာ",
        "key": "my",
        "default": true
      }, {
        "country": "NR",
        "countryName": "Nauru",
        "language": "Nauru",
        "key": "na",
        "default": true
      }, {
        "country": "NP",
        "countryName": "Nepal",
        "language": "",
        "key": "ne",
        "default": true
      }, {
        "country": "AW",
        "countryName": "Aruba",
        "language": "Aruba",
        "key": "nl",
        "default": ""
      }, {
        "country": "BE",
        "countryName": "Belgium",
        "language": "België , Belgique , Belgien",
        "key": "nl",
        "default": ""
      }, {
        "country": "BQ",
        "countryName": "Caribbean Netherlands",
        "language": "Caribisch Nederland",
        "key": "nl",
        "default": ""
      }, {
        "country": "CW",
        "countryName": "Curaçao",
        "language": "Curaçao",
        "key": "nl",
        "default": ""
      }, {
        "country": "NL",
        "countryName": "The Netherlands",
        "language": "Nederland",
        "key": "nl",
        "default": true
      }, {
        "country": "SR",
        "countryName": "Suriname",
        "language": "Suriname",
        "key": "nl",
        "default": ""
      }, {
        "country": "SX",
        "countryName": "Saint Martin (Dutch part)",
        "language": "Sint Maarten",
        "key": "nl",
        "default": ""
      }, {
        "country": "BV",
        "countryName": "Bouvet Island",
        "language": "Bouvetøya",
        "key": "no",
        "default": ""
      }, {
        "country": "NO",
        "countryName": "Norway",
        "language": "Norge , Noreg",
        "key": "no",
        "default": true
      }, {
        "country": "SJ",
        "countryName": "Svalbard and Jan Mayen",
        "language": "Svalbard and Jan Mayen",
        "key": "no",
        "default": ""
      }, {
        "country": "PL",
        "countryName": "Poland",
        "language": "Polska",
        "key": "pl",
        "default": true
      }, {
        "country": "AO",
        "countryName": "Angola",
        "language": "Angola",
        "key": "pt",
        "default": ""
      }, {
        "country": "BR",
        "countryName": "Brazil",
        "language": "Brasil",
        "key": "pt",
        "default": ""
      }, {
        "country": "CV",
        "countryName": "Cabo Verde",
        "language": "Cabo Verde",
        "key": "pt",
        "default": ""
      }, {
        "country": "GW",
        "countryName": "Guinea Bissau",
        "language": "Guiné-Bissau",
        "key": "pt",
        "default": ""
      }, {
        "country": "MO",
        "countryName": "Macao (SAR of China)",
        "language": "澳門 , Macau",
        "key": "pt",
        "default": ""
      }, {
        "country": "MZ",
        "countryName": "Mozambique",
        "language": "Mozambique",
        "key": "pt",
        "default": ""
      }, {
        "country": "PT",
        "countryName": "Portugal",
        "language": "Portugal",
        "key": "pt",
        "default": true
      }, {
        "country": "ST",
        "countryName": "São Tomé and Príncipe",
        "language": "São Tomé e Príncipe",
        "key": "pt",
        "default": ""
      }, {
        "country": "TL",
        "countryName": "Timor-Leste",
        "language": "Timor-Leste , Timor Lorosa'e",
        "key": "pt",
        "default": ""
      }, {
        "country": "MD",
        "countryName": "Moldova",
        "language": "Moldova , Молдавия",
        "key": "ro",
        "default": ""
      }, {
        "country": "RO",
        "countryName": "Romania",
        "language": "România",
        "key": "ro",
        "default": true
      }, {
        "country": "RU",
        "countryName": "Russia",
        "language": "Россия",
        "key": "ru",
        "default": true
      }, {
        "country": "RW",
        "countryName": "Rwanda",
        "language": "Rwanda",
        "key": "rw",
        "default": true
      }, {
        "country": "LK",
        "countryName": "Sri Lanka",
        "language": "ශ්‍රී ලංකා , இலங்கை",
        "key": "si",
        "default": true
      }, {
        "country": "SK",
        "countryName": "Slovakia",
        "language": "Slovensko",
        "key": "sk",
        "default": true
      }, {
        "country": "SI",
        "countryName": "Slovenia",
        "language": "Slovenija",
        "key": "sl",
        "default": true
      }, {
        "country": "AS",
        "countryName": "American Samoa",
        "language": "American Samoa",
        "key": "sm",
        "default": ""
      }, {
        "country": "TK",
        "countryName": "Tokelau",
        "language": "Tokelau",
        "key": "sm",
        "default": ""
      }, {
        "country": "WS",
        "countryName": "Samoa",
        "language": "Samoa",
        "key": "sm",
        "default": true
      }, {
        "country": "SO",
        "countryName": "Somalia",
        "language": "Somalia , الصومال",
        "key": "so",
        "default": true
      }, {
        "country": "AL",
        "countryName": "Albania",
        "language": "Shqipëria",
        "key": "sq",
        "default": true
      }, {
        "country": "ME",
        "countryName": "Montenegro",
        "language": "Crna Gora , Црна Гора",
        "key": "sq",
        "default": ""
      }, {
        "country": "RS",
        "countryName": "Serbia",
        "language": "Србија",
        "key": "sr",
        "default": true
      }, {
        "country": "SZ",
        "countryName": "Swaziland",
        "language": "Swaziland",
        "key": "ss",
        "default": true
      }, {
        "country": "LS",
        "countryName": "Lesotho",
        "language": "Lesotho",
        "key": "st",
        "default": true
      }, {
        "country": "AX",
        "countryName": "Aland Islands",
        "language": "Åland",
        "key": "sv",
        "default": true
      }, {
        "country": "SE",
        "countryName": "Sweden",
        "language": "Sverige",
        "key": "sv",
        "default": true
      }, {
        "country": "KE",
        "countryName": "Kenya",
        "language": "Kenya",
        "key": "sw",
        "default": true
      }, {
        "country": "TZ",
        "countryName": "Tanzania",
        "language": "Tanzania",
        "key": "sw",
        "default": ""
      }, {
        "country": "UG",
        "countryName": "Uganda",
        "language": "Uganda",
        "key": "sw",
        "default": ""
      }, {
        "country": "TJ",
        "countryName": "Tajikistan",
        "language": ",",
        "key": "tg",
        "default": true
      }, {
        "country": "TH",
        "countryName": "Thailand",
        "language": "ประเทศไทย",
        "key": "th",
        "default": true
      }, {
        "country": "ER",
        "countryName": "Eritrea",
        "language": "ኤርትራ , إرتريا , Eritrea",
        "key": "ti",
        "default": true
      }, {
        "country": "TM",
        "countryName": "Turkmenistan",
        "language": "Türkmenistan",
        "key": "tk",
        "default": true
      }, {
        "country": "PH",
        "countryName": "Philippines",
        "language": "Philippines",
        "key": "tl",
        "default": true
      }, {
        "country": "TR",
        "countryName": "Turkey",
        "language": "Türkiye",
        "key": "tr",
        "default": true
      }, {
        "country": "UA",
        "countryName": "Ukraine",
        "language": "Україна",
        "key": "uk",
        "default": true
      }, {
        "country": "PK",
        "countryName": "Pakistan",
        "language": "پاکستان",
        "key": "ur",
        "default": true
      }, {
        "country": "UZ",
        "countryName": "Uzbekistan",
        "language": "",
        "key": "uz",
        "default": true
      }, {
        "country": "VN",
        "countryName": "Vietnam",
        "language": "Việt Nam",
        "key": "vi",
        "default": true
      }, {
        "country": "CN",
        "countryName": "China",
        "language": "中国",
        "key": "zh-hans",
        "default": true
      }, {
        "country": "HK",
        "countryName": "Hong Kong (SAR of China)",
        "language": "香港 , Hong Kong",
        "key": "zh-hant",
        "default": ""
      }, {
        "country": "TW",
        "countryName": "Taiwan",
        "language": "Taiwan",
        "key": "zh-hant",
        "default": ""
      }];
    }
  }]);

  return FlagButtons;
}(React.Component);
