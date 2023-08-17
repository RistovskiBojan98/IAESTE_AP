export const transport = {
    tiers: [
      {
        title: "Public transport",
        description: "Public transport in Vienna, Graz and Linz:",
        features: [
          <a className="" href="https://www.wienerlinien.at/" 
          target="_blank" 
            rel="noopener noreferrer"
          >Vienna
          </a>,
          <a
            className=""
            href="https://www.holding-graz.at/graz-linien/graz-linien.html"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {" "}
            Graz
          </a>,
          <a
            className=""
            href="https://www.linzag.at/portal/de/privatkunden/unterwegs"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Linz{" "}
          </a>,
        ],
        mostPopular: false,
      },
      {
        title: "",
        description: "For the national railway system a discount cards:",
        features: [
          <a
            className=""
            href="https://www.oebb.at/de/tickets-kundenkarten/kundenkarten/vorteilscard "
            target="_blank" 
            rel="noopener noreferrer"
          >
            {" "}
            OEBB Vorteilscard{" "}
          </a>,
          <a
            className=""
            href="https://www.oebb.at/de/tickets-kundenkarten/schueler-gruppen/gruppenreisen  "
            target="_blank" 
            rel="noopener noreferrer"
          >
            {" "}
            Grupenreisen Ticket -group tickets{" "}
          </a>,
        ],
        cta: "Monthly billing",
        mostPopular: true,
      },
      {
        title: "Transportation in general",
        description: "National and international transportation:",
        features: [
          <a className="" href="https://www.oebb.at" target={"_blank"} rel="noopener noreferrer">
            {" "}
            OEBB{" "}
          </a>,
          <a className="" href="https://www.westbahn.at" target={"_blank"} rel="noopener noreferrer">
            WEST BAHN
          </a>,
          <a className="" href="https://www.regiojet.de/" 
          target="_blank" 
            rel="noopener noreferrer"
          >
            Regiojet
          </a>,
          <a className="" href="https://www.flixbus.at/" 
          target="_blank" 
            rel="noopener noreferrer"
          >
            Flixbus
          </a>,
          <a className="" href="https://www.postbus.at/" 
          target="_blank" 
            rel="noopener noreferrer"
          >
            Postbus
          </a>,
        ],
        cta: "Monthly billing",
        mostPopular: false,
      },
    ],
  };