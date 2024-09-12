import flag_austria from "./images/Austria/austria_flag.png"
import flag_bosnia from "./images/Bosnia/bosna_and_herzcegovina_flag.png"
import flag_croatia from "./images/Croatia/croatia_flag.png"
import flag_czechia from "./images/Czechia/czechia_flag.png"
import flag_germany from "./images/Germany/germany_flag.png"
import flag_hungary from "./images/Hungary/hungary_flag.png"
import flag_macedonia from "./images/Macedonia/macedonia_flag.png"
import flag_poland from "./images/Poland/poland_flag.png"
import flag_slovakia from "./images/Slovakia/slovakia_flag.png"
import flag_slovenia from "./images/Slovenia/slovenia_flag.png"
import flag_turkey from "./images/Turkey/turkey_flag.png"
import flag_belgium from "./images/Belgium/belgium_flag.jpg"
import flag_norway from "./images/Norway/norway_flag.jpg"
import flag_sweden from "./images/Sweden/sweden_flag.jpg"
import flag_switzerland from "./images/Switzerland/switzerland_flag.jpg"
import flag_spain from "./images/Spain/spain_flag.jpg"
import flag_malta from "./images/Malta/malta_flag.png"
import flag_france from "./images/France/france_flag.jpg"

// global constants
export const langImgUrl = "https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
export const timeZoneImgUrl = "https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
export const currencyImgUrl = "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
export const climateImgUrl = "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
export const simImgUrl = "https://images.unsplash.com/photo-1562831915-6524120efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80"

export const information = [
  {
    country: "Austria",
    data: [
      {
        name: "Capital city",
        role: "Vienna",
        imageUrl: flag_austria
      },
      {
        name: "Language",
        role: "German",
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)",
      },
      {
        name: "Currency",
        role: "Euro (EUR)",
      },
      {
        name: "Voltage",
        role: "230V",
      },
      {
        name: "Climate",
        role: "Moderate continental climate (colder in the west (alps)). ",
        // "Spring: warm, low temperatures above 0°C, occasional typical strong warm winds (called Foehn)." +
        // "Summer: pleasant warm, sometimes hot beyond 35°C especially in the east, mostly sunny with some short heavy rains"+
        // "Autumn: moderate low temperatures above 0°C, sometimes windy"+
        // "Winter: low temperatures, can (rarely) get very cold down to -20°C, regular snowfalls, especially in the west.",
      },
      {
        name: "country dialing code",
        role: "+43",
      },
      {
        name: "SIM card providers",
        role: "HoT, Drei, A1, Lidl",
      },
      {
        name: "Population",
        role: "8.9 million",
      },
    ],
  },
  {
    country: "Bosnia-and-Herzegovina",
    data: [
      {
        name: "Capital city",
        role: "Sarajevo",
        imageUrl: flag_bosnia
      },
      {
        name: "Language",
        role: "Bosnian, Croatian, and Serbian"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Bosnia and Herzegovina convertible mark (BAM)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "Moderate continental climate (hot summers and snowy winters)"
      },
      {
        name: "country dialing code",
        role: "+387"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "3.8 million"
      },
    ],
  },
  {
    country: "Belgium",
    data: [
      {
        name: "Capital city",
        role: "Brussels",
        imageUrl: flag_belgium
      },
      {
        name: "Language",
        role: "Dutch, French, German",
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "220V"
      },
      {
        name: "Climate",
        role: "The weather is very variable in Belgium. The best thing you can do is to check the weather forecast before traveling to Belgium."
      },
      {
        name: "country dialing code",
        role: "+32"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "11 million"
      },
    ],
  },
  {
    country: "Croatia",
    data: [
      {
        name: "Capital city",
        role: "Zagreb",
        imageUrl: flag_croatia
      },
      {
        name: "Language",
        role: "Croatian"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "230V (type C and F sockets)"
      },
      {
        name: "Climate",
        role: "Hot summers and milder winters"
      },
      {
        name: "country dialing code",
        role: "+385"
      },
      {
        name: "SIM card providers",
        role: "Hrvatski Telekom (T-Mobile brand), A1, Telemach"
      },
      {
        name: "Population",
        role: "4 million"
      },
    ],
  },
  {
    country: "Czech-Republic",
    data: [
      {
        name: "Capital city",
        role: "Prague",
        imageUrl: flag_czechia
      },
      {
        name: "Language",
        role: "Czech"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Czech koruna (CZK)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "null"
      },
      {
        name: "country dialing code",
        role: "+420"
      },
      {
        name: "SIM card providers",
        role: "Vodafone, T-mobile, O2"
      },
      {
        name: "Population",
        role: "10.5 million"
      },
    ],
  },
  {
    country: "France",
    data: [
      {
        name: "Capital city",
        role: "Paris",
        imageUrl: flag_france
      },
      {
        name: "Language",
        role: "French"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "The weather is sunny, cloudy, a bit rainy, it depends on the days."
      },
      {
        name: "country dialing code",
        role: "+33"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "67 million"
      },
    ],
  },
  {
    country: "Germany",
    data: [
      {
        name: "Capital city",
        role: "Berlin",
        imageUrl: flag_germany
      },
      {
        name: "Language",
        role: "German"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "220-230V"
      },
      {
        name: "Climate",
        role: "In most of Germany: moderately continental, unstable weather, northernmost area: humid, rainy, windy, cloudy southcentral, Alps: mountainous climate, snowy in winter"
      },
      {
        name: "country dialing code",
        role: "+49"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "83 million"
      },
    ],
  },
  {
    country: "Hungary",
    data: [
      {
        name: "Capital city",
        role: "Budapest",
        imageUrl: flag_hungary
      },
      {
        name: "Language",
        role: "Hungarian"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Hungarian Forint (HUF)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "TBD"
      },
      {
        name: "country dialing code",
        role: "+36"
      },
      {
        name: "SIM card providers",
        role: "Telekom (30), Telenor (20), Vodafone (70)"
      },
      {
        name: "Population",
        role: "9.8 million"
      },
    ],
  },
  {
    country: "Macedonia",
    data: [
      {
        name: "Capital city",
        role: "Skopje",
        imageUrl: flag_macedonia
      },
      {
        name: "Language",
        role: "Macedonian"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Macedonian denar (MKD)"
      },
      {
        name: "Voltage",
        role: "220V"
      },
      {
        name: "Climate",
        role: "Really hot summers and really cold winters"
      },
      {
        name: "country dialing code",
        role: "+389"
      },
      {
        name: "SIM card providers",
        role: "Lyca mobile, T-mobile, A1"
      },
      {
        name: "Population",
        role: "2 million"
      },
    ],
  },
  {
    country: "Malta",
    data: [
      {
        name: "Capital city",
        role: "Valletta",
        imageUrl: flag_malta
      },
      {
        name: "Language",
        role: "Maltese, English"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "Mild wet winters & hot, dry Summers. The Temperature never drops down to 0 degrees Celsius."
      },
      {
        name: "country dialing code",
        role: "+356"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "460K"
      },
    ],
  },
  {
    country: "Norway",
    data: [
      {
        name: "Capital city",
        role: "Oslo",
        imageUrl: flag_norway
      },
      {
        name: "Language",
        role: "Norwegian and Sami"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Norwegian crown (NOK)"
      },
      {
        name: "Voltage",
        role: "240V (type F)"
      },
      {
        name: "Climate",
        role: "The weather and temperatures can change quickly, especially in the mountains. Make sure you are prepared with good footwear and warm and waterproof clothing"
      },
      {
        name: "country dialing code",
        role: "+47"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "5 million"
      },
    ],
  },
  {
    country: "Poland",
    data: [
      {
        name: "Capital city",
        role: "Warsaw",
        imageUrl: flag_poland
      },
      {
        name: "Language",
        role: "Polish"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Zloty (zl, PLN)"
      },
      {
        name: "Voltage",
        role: "220V"
      },
      {
        name: "Climate",
        role: "Hot and dry summers, really cold and wet winters"
      },
      {
        name: "country dialing code",
        role: "+48"
      },
      {
        name: "SIM card providers",
        role: "Orange, Play, T-Mobile, Plus"
      },
      {
        name: "Population",
        role: "38 million"
      },
    ],
  },
  {
    country: "Slovakia",
    data: [
      {
        name: "Capital city",
        role: "Bratislava",
        imageUrl: flag_slovakia
      },
      {
        name: "Language",
        role: "Slovak"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "Hot summers (up to 30°C), cold winters (temperatures down to -10°C, sometimes snowy)"
      },
      {
        name: "country dialing code",
        role: "+421"
      },
      {
        name: "SIM card providers",
        role: "Orange, Play, T-Mobile, Plus"
      },
      {
        name: "Population",
        role: "37,8 mln"
      },
    ],
  },
  {
    country: "Slovenia",
    data: [
      {
        name: "Capital city",
        role: "Ljubljana",
        imageUrl: flag_slovenia
      },
      {
        name: "Language",
        role: "Slovenian"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "Moderate continental climate. Cold winters. The climate changes with the landscape as well."
      },
      {
        name: "country dialing code",
        role: "+386"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "2 million"
      },
    ],
  },
  {
    country: "Spain",
    data: [
      {
        name: "Capital city",
        role: "Madrid",
        imageUrl: flag_spain
      },
      {
        name: "Language",
        role: "Spanish"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Euro (EUR)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "Usually hot throughout the whole year"
      },
      {
        name: "country dialing code",
        role: "+34"
      },
      {
        name: "SIM card providers",
        role: ""
      },
      {
        name: "Population",
        role: "47 million"
      },
    ],
  },
  {
    country: "Switzerland",
    data: [
      {
        name: "Capital city",
        role: "Bern",
        imageUrl: flag_switzerland
      },
      {
        name: "Language",
        role: "German, French, Italian and Romansch"
      },
      {
        name: "Time zone",
        role: "UTC+1 (summer time: UTC+2)"
      },
      {
        name: "Currency",
        role: "Swiss Franc (CHF)"
      },
      {
        name: "Voltage",
        role: null
      },
      {
        name: "Climate",
        role: "Typical central european climate, with cold winters and warm summers, and soft temperatures in Spring and Autumn (except the Alps)"
      },
      {
        name: "country dialing code",
        role: "+41"
      },
      {
        name: "SIM card providers",
        role: "Yallo"
      },
      {
        name: "Population",
        role: "8.5 million"
      },
    ],
  },
  {
    country: "Sweden",
    data: [
      {
        name: "Capital city",
        role: "Stockholm",
        imageUrl: flag_sweden
      },
      {
        name: "Language",
        role: "Swedish, Sámi, Finnish, Meänkieli, Romani, Yiddish"
      },
      {
        name: "Time zone",
        role: "UTC+1"
      },
      {
        name: "Currency",
        role: " Swedish Krona (SEK)"
      },
      {
        name: "Voltage",
        role: "230V"
      },
      {
        name: "Climate",
        role: "Dark and cold winters, warm summers with the sun not setting down at all."
      },
      {
        name: "country dialing code",
        role: "+216"
      },
      {
        name: "SIM card providers",
        role: "",
      },
      {
        name: "Population",
        role: "10 million",
      },
    ],
  },
  // {
  //   country: "Tunisia",
  //   data: [
  //     {
  //       name: "Capital city",
  //       role: "Tunis",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1663643633001-4fe66fc06377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&q=80",
  //     },
  //     {
  //       name: "Language",
  //       role: "Tunisian Arabic and French",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1451226428352-cf66bf8a0317?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
  //     },
  //     {
  //       name: "Time zone",
  //       role: "UTC+1",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  //     },
  //     {
  //       name: "Currency",
  //       role: "Tunisian Dinar (TND)",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  //     },
  //     {
  //       name: "Voltage",
  //       role: "230V",
  //       imageUrl:
  //         voltage,
  //     },
  //     {
  //       name: "Climate",
  //       role: "Mediterranean climate, with highs around 16/18 °C in winter and 32/33 °C in summer.",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  //     },
  //     {
  //       name: "country dialing code",
  //       role: "+216",
  //       imageUrl:
  //         country_code,
  //     },
  //     {
  //       name: "SIM card providers",
  //       role: "",
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1562831915-6524120efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80",
  //     },
  //     {
  //       name: "Population",
  //       role: "the cities",
  //       imageUrl:
  //         population,
  //     },
  //   ],
  // },
  {
    country: "Turkiye",
    data: [
      {
        name: "Capital city",
        role: "Ankara",
        imageUrl: flag_turkey
      },
      {
        name: "Language",
        role: "Turkish",
      },
      {
        name: "Time zone",
        role: "UTC+3",
      },
      {
        name: "Currency",
        role: "Turkish lira (TRY)",
      },
      {
        name: "Voltage",
        role: "220V",
      },
      {
        name: "Climate",
        role: "",
      },
      {
        name: "country dialing code",
        role: "+90",
      },
      {
        name: "SIM card providers",
        role: "",
      },
      {
        name: "Population",
        role: "86 million",
      },
    ],
  },
];
