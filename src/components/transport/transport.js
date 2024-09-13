// ID CONSTANTS
import { TRANSPORT_CONSTANTS } from "../global/global_functions";
const { AIRPORTS, NATIONAL_AND_INTERNATIONAL_TRANSPORT, PUBLIC_TRANSPORT, DISCOUNTS } = TRANSPORT_CONSTANTS

export const transport = {
  "Austria": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Vienna International Airport (VIE)" },
          { name: "M. R. Štefánik Airport Bratislava (BTS)" },
          { name: "Munich International Airport (MUC)" },
          { name: "Beside that we have in every bigger city (especially all our LCs city) an airport - some European airlines do offer flights to these locations" }
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "OEBB", link: "https://www.oebb.at" },
          { name: "WEST BAHN", link: "https://www.westbahn.at" },
          { name: "Regiojet", link: "https://www.regiojet.de/" },
          { name: "DB - International trains and connections to Germany", link: "https://int.bahn.de/en" },
          { name: "SBB - International trains to/from Switzerland", link: "https://www.sbb.ch/en" },
          { name: "Flixbus", link: "https://www.flixbus.at/" },
          { name: "Postbus", link: "https://www.postbus.at/" },
        ],
      },
      {
        id: PUBLIC_TRANSPORT,
        features: [
          { name: "Wiener Linien", link: "https://www.wienerlinien.at/" },
          { name: "Graz Holding", link: "https://www.holding-graz.at/de/mobilitaet/" },
          { name: "Linz AG", link: "https://www.linzag.at/portal/de/privatkunden/unterwegs" },
          { name: "Salzburg Verkehr", link: "https://salzburg-verkehr.at/en/" },
          { name: "IVB", link: "https://www.ivb.at/en/" },
          { name: " Klimaticket - recommend for longer stays in Austria", link: "https://www.klimaticket.at/en/home/" },
        ]
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "OEBB Vorteilscard", link: "https://www.oebb.at/de/tickets-kundenkarten/kundenkarten/vorteilscard" },
          { name: "Grupenreisen Ticket - group tickets", link: "https://www.oebb.at/de/tickets-kundenkarten/schueler-gruppen/gruppenreisen" },
        ],
      },
    ],
  },
  "Belgium": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Charleroi (Brussels-South Airport)" },
          { name: "Zaventem (Brussels National Airport)" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "De Lijn", link: "https://www.delijn.be/en/?vertaling=true" },
          { name: "Belgian train", link: "https://www.belgiantrain.be/en" },
          { name: "STIB-MIVB", link: "https://www.stib-mivb.be/GO_easy.html?l=en" },
        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "Go Pass", link: "https://www.belgiantrain.be/en/tickets-and-railcards/gopass1" },
          { name: "Weekendbiljet", link: "https://belgianrail.be/nl/Mobility/Web/biljetten-abonnementen/leeftijd/adults-seniors/een-reis/weekendbiljet.aspx" },
        ],
      },
    ]
  },
  "Bosnia-and-Herzegovina": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Sarajevo Airport" },
          { name: "Tuzla Airport" },
          { name: "Banja Luka Airport" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "Autoprevoz", link: "http://www.autoprevoz.ba/" },
          { name: "Centrotrans", link: "https://centrotrans.com/" },
          { name: "Globtour", link: "https://www.globtour.com/" },
        ],
      },
    ]
  },
  "Croatia": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Zagreb" },
          { name: "Split" },
          { name: "Pula" },
          { name: "Dubrovnik" },
          { name: "Zadar" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "HZPP", link: "https://www.hzpp.hr/" },
          { name: "AKZ", link: "https://www.akz.hr/en" },
        ],
      },
    ]
  },
  "Czech-Republic": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Prague-Vaclav Havel Airport" },
          { name: "Ostrava" },
          { name: "Pardubice" },
          { name: "Brno" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "IDOS", link: "https://idos.idnes.cz/vlakyautobusymhdvse/spojeni/" },
          { name: "České dráhy", link: "https://www.cd.cz/en" },
          { name: "Regiojet", link: "https://www.regiojet.cz/" },
          { name: "Flixbus", link: "https://www.flixbus.cz/" },
          { name: "Leo express", link: "https://www.leoexpress.com/en" },
          { name: "Arriva", link: "https://www.arriva.cz/" },

        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "ISIC", link: "https://www.isic.cz/" },
        ]
      },
    ]
  },
  "France": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Bâle-Mulhouse (BSL)" },
          { name: "Bordeaux (BOD)" },
          { name: "Lyon (LYS)" },
          { name: "Marseille (MRS)" },
          { name: "Nantes (NTE)" },
          { name: "Nice (NCE)" },
          { name: "Paris (CDG & ORY)" },
          { name: "Toulouse (TLS)" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "SNCF", link: "https://en.oui.sncf/en/" },
          { name: "Flixbus", link: "https://www.flixbus.fr/" },
          { name: "BlaBlaCar", link: "https://www.blablacar.fr/" },
          { name: "BlaBlaBus", link: "https://www.blablacar.fr/bus" },
        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "Carte Jeune", link: "https://www.sncf-connect.com/app/catalogue/description/carte-avantage-jeune" },
        ],
      },
    ]
  },
  "Germany": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Berlin Schönefeld Airport" },
          { name: "Berlin Tegel Airport" },
          { name: "Bremen Airport" },
          { name: "Cologne Bonn Airport" },
          { name: "Dortmund Airport" },
          { name: "Düsseldorf Airport" },
          { name: "Weeze Airport (Düsseldorf)" },
          { name: "Frankfurt Airport" },
          { name: "Frankfurt–Hahn Airport" },
          { name: "Friedrichshafen Airport" },
          { name: "Hamburg Airport" },
          { name: "Lübeck Airport" },
          { name: "Hannover Airport" },
          { name: "Karlsruhe/Baden-Baden Airport" },
          { name: "Leipzig/Halle Airport" },
          { name: "Memmingen Airport" },
          { name: "Munich Airport" },
          { name: "Münster Osnabrück International Airport" },
          { name: "Nuremberg Airport" },
          { name: "Paderborn Airport" },
          { name: "Stuttgart Airport" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          {
            name: "Deutsche Bahn",
            link: "https://www.bahn.de/p/view/index.shtml"
          },
          {
            name: "BlaBlaCar",
            link: "https://www.blablacar.de/"
          },
          {
            name: "Flixtrain",
            link: "https://www.flixtrain.com"
          },
          {
            name: "Flixbus",
            link: "https://www.flixbus.de/"
          },
        ],
      },
    ]
  },
  "Hungary": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Liszt Ferenc International Airport, Budapest (BUD)" },
          { name: "Debrecen International Airport (DEB)" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          {
            name: "Mav-start",
            link: "https://elvira.mav-start.hu/"
          },
          {
            name: "Volanbusz",
            link: "https://www.volanbusz.hu/en"
          },
          {
            name: "BKK",
            link: "https://bkk.hu/en/news/"
          },
        ],
      },
    ]
  },
  "Macedonia": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Skopje International Airport (SKP)" },
          { name: "Ohrid St. Paul The Apostle Airport (OHD)" },
          { name: "Nearby cities with airports: Nish, Prishtina, Tirana, Sofia and Thesalloniki" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          {
            name: "JSP",
            link: "http://www.jsp.com.mk/Default.aspx"
          },
          {
            name: "SAS",
            link: "http://www.sas.com.mk"
          },
        ],
      },
    ]
  },
  "Malta": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Malta International Airport" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          {
            name: "Transport Malta",
            link: "https://www.transport.gov.mt/"
          },
          {
            name: "Malta public transport",
            link: "https://www.publictransport.com.mt/"
          },
          {
            name: "Goto",
            link: "https://www.goto.com.mt/"
          },
        ],
      },
    ]
  },
  "Norway": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Oslo Gardermoen" },
          { name: "Oslo Sandefjord/Torp" },
          { name: "Bergen Flesland" },
          { name: "Trondheim Værnes" },
          { name: "Tromsø Langnes" },
          { name: "Stavanger Sola" },
          { name: "Kristiansand Kjevik" },
          { name: "Longyearbyen (Svalbard)" },
          { name: "Harstad/Narvik" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "Ruter", link: "https://ruter.no/" },
          { name: "VY", link: "https://www.vy.no/" },
          { name: "Hurtigruten", link: "https://www.hurtigruten.no/" },
          { name: "Flybuss", link: "http://www.flybuss.no/" },
          { name: "Skyss", link: "https://www.skyss.no/" },
          { name: "Kolumbus", link: "https://www.kolumbus.no/" },
        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "Use code UNDER26 for Norwegian airlines when buying fly tickets" },
          { name: "The city transport usually offers a discount for students. This discount varies from city to city, so make sure to ask for it when buying a ticket." }
        ],
      },
    ]
  },
  "Poland": {
    tiers: [
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "PKP", link: "https://rozklad-pkp.pl/en" },
          { name: "E-podroznik", link: "https://en.e-podroznik.pl/" },
        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "50% discount for transportation for students under 26, also discounts in museums and other venues. Discount for transport mostly applies only for students with Polish ID cards, museums and other venues usually accept ISIC (International Student Identity Card)." }
        ],
      },
    ]
  },
  "Slovakia": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "M. R. Štefánik Airport Bratislava" },
          { name: "Košice Airport" },
          { name: "Poprad Airport" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "Cestovne poriadky", link: "https://cp.hnonline.sk/en/vlakbusmhdsk/spojenie/" },
          { name: "ZSSK", link: "https://www.zssk.sk/en/" },
        ],
      },
    ]
  },
  "Slovenia": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Ljubljana Jože Pučnik Airport" },
          { name: "Maribor Airport" },
          { name: "Portorož Airport" },
          { name: "Cities with nearby airports: Friuli Venezia Giulia Airport in Trieste; Treviso Airport in Venice" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "Slovenske zeleznice", link: "https://potniski.sz.si/" },
          { name: "AP-Ljubljana", link: "https://www.ap-ljubljana.si/" },
          { name: "LPP", link: "https://www.lpp.si/javni-prevoz/vozni-redi" },
          { name: "Prevoz", link: "https://prevoz.org/" },
        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "Slovenske zeleznice", link: "https://potniski.sz.si/en/young-people-under-26/" },
        ],
      },
    ]
  },
  "Spain": {
    tiers: [
      {
        id: AIRPORTS,
        features: [
          { name: "Madrid Barajas International Airport (MAD)" },
          { name: "Josep Tarradellas Barcelona-El Prat Airport" },
          { name: "Seville Airport" },
          { name: "Santiago-Rosalía de Castro Airport" },
          { name: "Valencia Airport" },
          { name: "Palma de Mallorca Airport" },
          { name: "Bilbao Airport" },
          { name: "Málaga-Costa del Sol Airport" },
          { name: "Alicante-Elche Miguel Hernández Airport" },
          { name: "Murcia International Airport" },
        ],
      },
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "Red transporte", link: "https://www.redtransporte.com/" }
        ],
      },
      {
        id: DISCOUNTS,
        features: [
          { name: "Expatica", link: "https://www.expatica.com/es/living/transportation/public-transport-spain-101423/" }
        ],
      },
    ]
  },
  "Turkey": {
    tiers: [
      {
        id: NATIONAL_AND_INTERNATIONAL_TRANSPORT,
        features: [
          { name: "“Trafi” app is generally rated enough for the transportation" }
        ],
      },
    ]
  },
};