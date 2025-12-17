import type { Fact, Category } from '../types';

// Sample facts data - In production, this would come from an API
export const FACTS: Fact[] = [
  // Geschiedenis
  {
    id: 'hist-001',
    category: 'geschiedenis',
    title: 'De Gouden Eeuw',
    content: 'De Nederlandse Gouden Eeuw (1588-1672) was een periode van ongekende welvaart. De VOC werd opgericht in 1602 en was het eerste beursgenoteerde bedrijf ter wereld. Nederland was toen de rijkste natie op aarde.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'hist-002',
    category: 'geschiedenis',
    title: 'De Watersnoodramp',
    content: 'In de nacht van 31 januari op 1 februari 1953 trof de Watersnoodramp Nederland. 1.836 mensen kwamen om het leven en 100.000 mensen verloren hun huis. Dit leidde tot de Deltawerken.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'hist-003',
    category: 'geschiedenis',
    title: 'Willem van Oranje',
    content: 'Willem van Oranje, de "Vader des Vaderlands", leidde de Nederlandse Opstand tegen Spanje. Hij werd vermoord in 1584 in Delft door Balthasar Gerards.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'hist-004',
    category: 'geschiedenis',
    title: 'De Eerste Wereldoorlog',
    content: 'Nederland bleef neutraal tijdens de Eerste Wereldoorlog (1914-1918), maar de economie leed zwaar. Voedselschaarste leidde tot het "Aardappeloproer" in Amsterdam in 1917.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'hist-005',
    category: 'geschiedenis',
    title: 'Het Rampjaar 1672',
    content: 'In 1672, het "Rampjaar", werd Nederland aangevallen door Engeland, Frankrijk, Münster en Keulen tegelijk. Johan de Witt werd gelyncht en Willem III kwam aan de macht.',
    difficulty: 'hard',
    createdAt: '2024-01-01',
  },

  // Wetenschap
  {
    id: 'sci-001',
    category: 'wetenschap',
    title: 'Antonie van Leeuwenhoek',
    content: 'De Delftse wetenschapper Antonie van Leeuwenhoek (1632-1723) ontdekte bacteriën met zijn zelfgemaakte microscopen. Hij wordt beschouwd als de vader van de microbiologie.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'sci-002',
    category: 'wetenschap',
    title: 'Christiaan Huygens',
    content: 'Christiaan Huygens ontdekte de maan Titan van Saturnus in 1655 en vond het slingeruurwerk uit. Hij formuleerde ook de golftheorie van het licht.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'sci-003',
    category: 'wetenschap',
    title: 'De Snelheid van Licht',
    content: 'Licht reist met een snelheid van 299.792.458 meter per seconde. Het licht van de zon doet er ongeveer 8 minuten over om de aarde te bereiken.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'sci-004',
    category: 'wetenschap',
    title: 'DNA Structuur',
    content: 'De dubbele helix structuur van DNA werd in 1953 ontdekt door Watson en Crick. Het menselijk DNA bevat ongeveer 3 miljard basenparen.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'sci-005',
    category: 'wetenschap',
    title: 'Zwarte Gaten',
    content: 'Een zwart gat is zo dicht dat zelfs licht niet kan ontsnappen. Het zwarte gat in het centrum van de Melkweg heeft een massa van 4 miljoen zonnen.',
    difficulty: 'hard',
    createdAt: '2024-01-01',
  },

  // Sport
  {
    id: 'sport-001',
    category: 'sport',
    title: 'Johan Cruijff',
    content: 'Johan Cruijff won de Ballon d\'Or drie keer (1971, 1973, 1974). Hij stond bekend om zijn "Cruijff Turn" en revolutionaire voetbalvisie genaamd "Totaalvoetbal".',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'sport-002',
    category: 'sport',
    title: 'Elfstedentocht',
    content: 'De Elfstedentocht is een 200 km lange schaatstocht langs elf Friese steden. De snelste tijd ooit werd gereden door Evert van Benthem in 1985: 6 uur en 47 minuten.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'sport-003',
    category: 'sport',
    title: 'WK Finale 2010',
    content: 'Nederland verloor de WK finale van 2010 tegen Spanje met 0-1 door een goal van Andrés Iniesta in de verlenging. Het was de derde verloren WK finale voor Oranje.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'sport-004',
    category: 'sport',
    title: 'Max Verstappen',
    content: 'Max Verstappen werd in 2021 de eerste Nederlandse Formule 1 wereldkampioen. Hij won de titel na een controversiële laatste ronde in Abu Dhabi.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'sport-005',
    category: 'sport',
    title: 'Marco van Basten',
    content: 'Marco van Basten\'s volley tegen de Sovjet-Unie in de EK finale van 1988 wordt beschouwd als een van de mooiste doelpunten ooit. Nederland won het EK met 2-0.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },

  // Entertainment
  {
    id: 'ent-001',
    category: 'entertainment',
    title: 'Vincent van Gogh Films',
    content: 'De film "Loving Vincent" uit 2017 is volledig geschilderd in Van Gogh\'s stijl. 125 kunstenaars creëerden 65.000 olieverfschilderijen voor de film.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'ent-002',
    category: 'entertainment',
    title: 'The Beatles',
    content: 'The Beatles hebben wereldwijd meer dan 600 miljoen albums verkocht. Hun album "Sgt. Pepper\'s Lonely Hearts Club Band" wordt vaak gezien als het beste album aller tijden.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'ent-003',
    category: 'entertainment',
    title: 'Star Wars',
    content: 'George Lucas creëerde Star Wars in 1977. De originele film kostte $11 miljoen om te maken en bracht $775 miljoen op wereldwijd.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'ent-004',
    category: 'entertainment',
    title: 'Nederlandse Films',
    content: 'De Nederlandse film "Soldaat van Oranje" uit 1977 is een van de succesvolste Nederlandse films ooit. De film werd geregisseerd door Paul Verhoeven.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'ent-005',
    category: 'entertainment',
    title: 'Eurovision',
    content: 'Nederland heeft het Eurovisie Songfestival vijf keer gewonnen. De eerste keer was in 1957 met "Net als toen" van Corry Brokken.',
    difficulty: 'hard',
    createdAt: '2024-01-01',
  },

  // Kunst & Cultuur
  {
    id: 'art-001',
    category: 'kunst-cultuur',
    title: 'De Nachtwacht',
    content: 'Rembrandt\'s "De Nachtwacht" (1642) is het grootste schilderij in het Rijksmuseum. Het doek meet 363 x 437 cm en toont de schutterij van Frans Banninck Cocq.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'art-002',
    category: 'kunst-cultuur',
    title: 'Van Gogh\'s Zonnebloemen',
    content: 'Vincent van Gogh schilderde zeven versies van zijn beroemde Zonnebloemen. Een ervan werd in 1987 verkocht voor $39,9 miljoen.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'art-003',
    category: 'kunst-cultuur',
    title: 'Het Meisje met de Parel',
    content: 'Johannes Vermeer schilderde "Het Meisje met de Parel" rond 1665. Het schilderij wordt ook wel de "Mona Lisa van het Noorden" genoemd.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'art-004',
    category: 'kunst-cultuur',
    title: 'De Stijl',
    content: 'De Stijl was een Nederlandse kunstbeweging opgericht in 1917. Piet Mondriaan en Theo van Doesburg waren de belangrijkste vertegenwoordigers.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'art-005',
    category: 'kunst-cultuur',
    title: 'Anne Frank Huis',
    content: 'Het dagboek van Anne Frank is vertaald in meer dan 70 talen. Het Anne Frank Huis in Amsterdam trekt jaarlijks meer dan 1 miljoen bezoekers.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },

  // Spelling
  {
    id: 'spell-001',
    category: 'spelling',
    title: 'Lange IJ',
    content: 'De "ij" is een unieke letter in het Nederlandse alfabet. In tegenstelling tot de "ei" wordt de "ij" aan het begin van een zin met twee hoofdletters geschreven: "IJsberg".',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'spell-002',
    category: 'spelling',
    title: 'Trema',
    content: 'Een trema (¨) geeft aan dat twee klinkers apart uitgesproken worden. Voorbeelden: coördinatie, zoölogie, ruïne.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'spell-003',
    category: 'spelling',
    title: 'Tussen-n',
    content: 'De tussen-n wordt gebruikt wanneer het eerste deel meervoudig is. Voorbeelden: pannenkoeK, paddenSToel, maar: appelmoes (niet meervoudig).',
    difficulty: 'hard',
    createdAt: '2024-01-01',
  },
  {
    id: 'spell-004',
    category: 'spelling',
    title: 'D of T',
    content: 'Bij werkwoorden in de verleden tijd: stam + te/de. Na t, k, f, s, ch, p krijg je -te. Eselsbrückje: \'t kofschip. Anders -de.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'spell-005',
    category: 'spelling',
    title: 'Langste Nederlandse Woord',
    content: 'Het langste Nederlandse woord in het Groene Boekje is "kindercarnavalsoptochtvoorbereidingswerkzaamhedenplan" met 49 letters.',
    difficulty: 'hard',
    createdAt: '2024-01-01',
  },

  // Biologie
  {
    id: 'bio-001',
    category: 'biologie',
    title: 'Het Menselijk Hart',
    content: 'Een menselijk hart klopt gemiddeld 100.000 keer per dag en pompt ongeveer 7.500 liter bloed rond. In een gemiddeld leven klopt het hart 2,5 miljard keer.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'bio-002',
    category: 'biologie',
    title: 'Fotosynthese',
    content: 'Bij fotosynthese zetten planten CO2 en water om in glucose en zuurstof met behulp van zonlicht. Eén grote boom produceert genoeg zuurstof voor 4 mensen.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'bio-003',
    category: 'biologie',
    title: 'Menselijke Cellen',
    content: 'Het menselijk lichaam bestaat uit ongeveer 37 biljoen cellen. Elke seconde sterven er 3,8 miljoen cellen en worden er evenveel nieuwe gemaakt.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'bio-004',
    category: 'biologie',
    title: 'De Menselijke Hersenen',
    content: 'De menselijke hersenen bevatten ongeveer 86 miljard neuronen. Ze verbruiken 20% van de energie van het lichaam, ondanks slechts 2% van het lichaamsgewicht.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'bio-005',
    category: 'biologie',
    title: 'DNA',
    content: 'Als je al het DNA uit één menselijke cel zou uitrekken, zou het ongeveer 2 meter lang zijn. Het totale DNA in je lichaam zou tot de zon en terug reiken.',
    difficulty: 'hard',
    createdAt: '2024-01-01',
  },

  // Geografie
  {
    id: 'geo-001',
    category: 'geografie',
    title: 'Nederland Onder Zeeniveau',
    content: 'Ongeveer 26% van Nederland ligt onder zeeniveau. Het laagste punt is Zuidplaspolder bij Nieuwerkerk aan den IJssel: 6,76 meter onder NAP.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'geo-002',
    category: 'geografie',
    title: 'De Waddenzee',
    content: 'De Waddenzee is het grootste getijdengebied ter wereld en UNESCO Werelderfgoed sinds 2009. Het gebied strekt zich uit over Nederland, Duitsland en Denemarken.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
  {
    id: 'geo-003',
    category: 'geografie',
    title: 'Nederlandse Eilanden',
    content: 'Nederland heeft vijf bewoonde Waddeneilanden: Texel, Vlieland, Terschelling, Ameland en Schiermonnikoog. Texel is het grootste met 170 km².',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'geo-004',
    category: 'geografie',
    title: 'De Grote Rivieren',
    content: 'De drie grote rivieren van Nederland zijn de Rijn, Maas en Schelde. De Rijn stroomt door zes landen en is 1.233 km lang.',
    difficulty: 'easy',
    createdAt: '2024-01-01',
  },
  {
    id: 'geo-005',
    category: 'geografie',
    title: 'Flevoland',
    content: 'Flevoland is de jongste provincie van Nederland, gesticht in 1986. Het is grotendeels land dat is teruggewonnen van de voormalige Zuiderzee.',
    difficulty: 'medium',
    createdAt: '2024-01-01',
  },
];

// Helper functions
export const getFactsByCategory = (category: Category): Fact[] => {
  return FACTS.filter(fact => fact.category === category);
};

export const getRandomFact = (categories?: Category[]): Fact | null => {
  let availableFacts = FACTS;

  if (categories && categories.length > 0) {
    availableFacts = FACTS.filter(fact => categories.includes(fact.category));
  }

  if (availableFacts.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * availableFacts.length);
  return availableFacts[randomIndex];
};

export const getFactById = (id: string): Fact | undefined => {
  return FACTS.find(fact => fact.id === id);
};

export const getFactCount = (): number => FACTS.length;

export const getFactCountByCategory = (): Record<Category, number> => {
  return FACTS.reduce((acc, fact) => {
    acc[fact.category] = (acc[fact.category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);
};
