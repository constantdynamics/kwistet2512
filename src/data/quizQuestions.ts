import { v4 as uuidv4 } from 'uuid';
import type { QuizQuestion, QuizOption, Category, QuizFormat } from '../types';

// Helper to create quiz options
const createOptions = (texts: string[]): QuizOption[] => {
  return texts.map(text => ({ id: uuidv4(), text }));
};

// Sample quiz questions - In production, this would be generated from facts
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Geschiedenis - Multiple Choice
  {
    id: 'q-hist-001',
    factId: 'hist-001',
    category: 'geschiedenis',
    format: 'multiple-choice',
    question: 'In welk jaar werd de VOC opgericht?',
    options: createOptions(['1588', '1602', '1648', '1672']),
    correctAnswer: 1,
    explanation: 'De VOC werd opgericht in 1602 en was het eerste beursgenoteerde bedrijf ter wereld.',
    difficulty: 'easy',
  },
  {
    id: 'q-hist-002',
    factId: 'hist-002',
    category: 'geschiedenis',
    format: 'multiple-choice',
    question: 'Hoeveel mensen kwamen om bij de Watersnoodramp van 1953?',
    options: createOptions(['836', '1.836', '2.836', '3.836']),
    correctAnswer: 1,
    explanation: '1.836 mensen verloren hun leven tijdens de Watersnoodramp.',
    difficulty: 'medium',
  },
  {
    id: 'q-hist-003',
    factId: 'hist-003',
    category: 'geschiedenis',
    format: 'multiple-choice',
    question: 'In welke stad werd Willem van Oranje vermoord?',
    options: createOptions(['Amsterdam', 'Den Haag', 'Delft', 'Utrecht']),
    correctAnswer: 2,
    explanation: 'Willem van Oranje werd in 1584 vermoord in Delft door Balthasar Gerards.',
    difficulty: 'easy',
  },
  {
    id: 'q-hist-004',
    factId: 'hist-005',
    category: 'geschiedenis',
    format: 'multiple-choice',
    question: 'Welk jaar staat bekend als het "Rampjaar"?',
    options: createOptions(['1648', '1672', '1702', '1795']),
    correctAnswer: 1,
    explanation: 'In 1672 werd Nederland aangevallen door vier landen tegelijk.',
    difficulty: 'medium',
  },

  // Wetenschap - Multiple Choice
  {
    id: 'q-sci-001',
    factId: 'sci-001',
    category: 'wetenschap',
    format: 'multiple-choice',
    question: 'Wie wordt beschouwd als de vader van de microbiologie?',
    options: createOptions(['Christiaan Huygens', 'Antonie van Leeuwenhoek', 'Isaac Newton', 'Robert Hooke']),
    correctAnswer: 1,
    explanation: 'Antonie van Leeuwenhoek ontdekte bacteriën met zijn zelfgemaakte microscopen.',
    difficulty: 'easy',
  },
  {
    id: 'q-sci-002',
    factId: 'sci-002',
    category: 'wetenschap',
    format: 'multiple-choice',
    question: 'Welke maan ontdekte Christiaan Huygens in 1655?',
    options: createOptions(['Europa', 'Ganymedes', 'Titan', 'Io']),
    correctAnswer: 2,
    explanation: 'Christiaan Huygens ontdekte de maan Titan van Saturnus.',
    difficulty: 'medium',
  },
  {
    id: 'q-sci-003',
    factId: 'sci-003',
    category: 'wetenschap',
    format: 'closest-estimate',
    question: 'Hoelang doet het licht van de zon erover om de aarde te bereiken?',
    options: createOptions(['2 minuten', '8 minuten', '15 minuten', '30 minuten']),
    correctAnswer: 1,
    explanation: 'Licht van de zon doet er ongeveer 8 minuten over om de aarde te bereiken.',
    difficulty: 'easy',
  },
  {
    id: 'q-sci-004',
    factId: 'sci-004',
    category: 'wetenschap',
    format: 'multiple-choice',
    question: 'In welk jaar werd de dubbele helix structuur van DNA ontdekt?',
    options: createOptions(['1943', '1953', '1963', '1973']),
    correctAnswer: 1,
    explanation: 'Watson en Crick ontdekten de structuur van DNA in 1953.',
    difficulty: 'medium',
  },

  // Sport - Multiple Choice
  {
    id: 'q-sport-001',
    factId: 'sport-001',
    category: 'sport',
    format: 'multiple-choice',
    question: 'Hoeveel keer won Johan Cruijff de Ballon d\'Or?',
    options: createOptions(['1 keer', '2 keer', '3 keer', '4 keer']),
    correctAnswer: 2,
    explanation: 'Johan Cruijff won de Ballon d\'Or drie keer: 1971, 1973 en 1974.',
    difficulty: 'easy',
  },
  {
    id: 'q-sport-002',
    factId: 'sport-002',
    category: 'sport',
    format: 'multiple-choice',
    question: 'Hoe lang is de Elfstedentocht?',
    options: createOptions(['150 km', '175 km', '200 km', '225 km']),
    correctAnswer: 2,
    explanation: 'De Elfstedentocht is 200 km lang.',
    difficulty: 'easy',
  },
  {
    id: 'q-sport-003',
    factId: 'sport-003',
    category: 'sport',
    format: 'multiple-choice',
    question: 'Tegen welk land verloor Nederland de WK finale van 2010?',
    options: createOptions(['Duitsland', 'Brazilië', 'Spanje', 'Italië']),
    correctAnswer: 2,
    explanation: 'Nederland verloor de WK finale van 2010 met 0-1 tegen Spanje.',
    difficulty: 'easy',
  },
  {
    id: 'q-sport-004',
    factId: 'sport-004',
    category: 'sport',
    format: 'multiple-choice',
    question: 'In welk jaar werd Max Verstappen wereldkampioen F1?',
    options: createOptions(['2019', '2020', '2021', '2022']),
    correctAnswer: 2,
    explanation: 'Max Verstappen werd in 2021 de eerste Nederlandse F1 wereldkampioen.',
    difficulty: 'easy',
  },

  // Entertainment - Multiple Choice
  {
    id: 'q-ent-001',
    factId: 'ent-002',
    category: 'entertainment',
    format: 'multiple-choice',
    question: 'Hoeveel albums hebben The Beatles wereldwijd verkocht?',
    options: createOptions(['300 miljoen', '450 miljoen', '600 miljoen', '750 miljoen']),
    correctAnswer: 2,
    explanation: 'The Beatles hebben wereldwijd meer dan 600 miljoen albums verkocht.',
    difficulty: 'medium',
  },
  {
    id: 'q-ent-002',
    factId: 'ent-003',
    category: 'entertainment',
    format: 'multiple-choice',
    question: 'Hoeveel kostte de originele Star Wars film om te maken?',
    options: createOptions(['$5 miljoen', '$11 miljoen', '$25 miljoen', '$50 miljoen']),
    correctAnswer: 1,
    explanation: 'De originele Star Wars film kostte $11 miljoen om te maken.',
    difficulty: 'hard',
  },
  {
    id: 'q-ent-003',
    factId: 'ent-004',
    category: 'entertainment',
    format: 'multiple-choice',
    question: 'Wie regisseerde "Soldaat van Oranje"?',
    options: createOptions(['Fons Rademakers', 'Paul Verhoeven', 'George Sluizer', 'Alex van Warmerdam']),
    correctAnswer: 1,
    explanation: 'Paul Verhoeven regisseerde Soldaat van Oranje in 1977.',
    difficulty: 'medium',
  },

  // Kunst & Cultuur - Multiple Choice
  {
    id: 'q-art-001',
    factId: 'art-001',
    category: 'kunst-cultuur',
    format: 'multiple-choice',
    question: 'In welk jaar schilderde Rembrandt "De Nachtwacht"?',
    options: createOptions(['1622', '1632', '1642', '1652']),
    correctAnswer: 2,
    explanation: 'Rembrandt schilderde De Nachtwacht in 1642.',
    difficulty: 'medium',
  },
  {
    id: 'q-art-002',
    factId: 'art-002',
    category: 'kunst-cultuur',
    format: 'multiple-choice',
    question: 'Hoeveel versies van de Zonnebloemen schilderde Van Gogh?',
    options: createOptions(['3', '5', '7', '9']),
    correctAnswer: 2,
    explanation: 'Vincent van Gogh schilderde zeven versies van zijn beroemde Zonnebloemen.',
    difficulty: 'hard',
  },
  {
    id: 'q-art-003',
    factId: 'art-003',
    category: 'kunst-cultuur',
    format: 'multiple-choice',
    question: 'Hoe wordt "Het Meisje met de Parel" ook wel genoemd?',
    options: createOptions(['De Mona Lisa van het Noorden', 'Het Mysterie van Delft', 'De Nederlandse Schoonheid', 'Het Gouden Portret']),
    correctAnswer: 0,
    explanation: 'Het schilderij wordt ook wel de "Mona Lisa van het Noorden" genoemd.',
    difficulty: 'easy',
  },
  {
    id: 'q-art-004',
    factId: 'art-004',
    category: 'kunst-cultuur',
    format: 'multiple-choice',
    question: 'In welk jaar werd De Stijl opgericht?',
    options: createOptions(['1907', '1917', '1927', '1937']),
    correctAnswer: 1,
    explanation: 'De Stijl was een Nederlandse kunstbeweging opgericht in 1917.',
    difficulty: 'medium',
  },

  // Spelling
  {
    id: 'q-spell-001',
    factId: 'spell-001',
    category: 'spelling',
    format: 'multiple-choice',
    question: 'Hoe schrijf je het woord voor een groot stuk ijs in zee correct?',
    options: createOptions(['Ijsberg', 'IJsberg', 'ijsberg', 'IjsBerg']),
    correctAnswer: 1,
    explanation: 'De "ij" wordt aan het begin van een zin met twee hoofdletters geschreven: "IJsberg".',
    difficulty: 'easy',
  },
  {
    id: 'q-spell-002',
    factId: 'spell-002',
    category: 'spelling',
    format: 'multiple-choice',
    question: 'Welk woord is correct gespeld?',
    options: createOptions(['coordinatie', 'coördinatie', 'cooerdinatie', 'co-ordinatie']),
    correctAnswer: 1,
    explanation: 'Een trema geeft aan dat twee klinkers apart uitgesproken worden: coördinatie.',
    difficulty: 'medium',
  },
  {
    id: 'q-spell-003',
    factId: 'spell-003',
    category: 'spelling',
    format: 'multiple-choice',
    question: 'Welk woord is correct gespeld?',
    options: createOptions(['pannekoeK', 'pannekoek', 'pannenkoek', 'pannenkoeK']),
    correctAnswer: 2,
    explanation: 'De tussen-n wordt gebruikt wanneer het eerste deel meervoudig is: pannenkoek.',
    difficulty: 'medium',
  },

  // Biologie
  {
    id: 'q-bio-001',
    factId: 'bio-001',
    category: 'biologie',
    format: 'closest-estimate',
    question: 'Hoeveel keer klopt een menselijk hart gemiddeld per dag?',
    options: createOptions(['50.000', '100.000', '150.000', '200.000']),
    correctAnswer: 1,
    explanation: 'Een menselijk hart klopt gemiddeld 100.000 keer per dag.',
    difficulty: 'medium',
  },
  {
    id: 'q-bio-002',
    factId: 'bio-002',
    category: 'biologie',
    format: 'multiple-choice',
    question: 'Wat produceren planten bij fotosynthese naast glucose?',
    options: createOptions(['Stikstof', 'Zuurstof', 'Koolstofdioxide', 'Waterstof']),
    correctAnswer: 1,
    explanation: 'Bij fotosynthese produceren planten glucose en zuurstof.',
    difficulty: 'easy',
  },
  {
    id: 'q-bio-003',
    factId: 'bio-004',
    category: 'biologie',
    format: 'closest-estimate',
    question: 'Hoeveel neuronen bevatten de menselijke hersenen ongeveer?',
    options: createOptions(['8,6 miljard', '26 miljard', '86 miljard', '860 miljard']),
    correctAnswer: 2,
    explanation: 'De menselijke hersenen bevatten ongeveer 86 miljard neuronen.',
    difficulty: 'hard',
  },

  // Geografie
  {
    id: 'q-geo-001',
    factId: 'geo-001',
    category: 'geografie',
    format: 'closest-estimate',
    question: 'Welk percentage van Nederland ligt onder zeeniveau?',
    options: createOptions(['16%', '26%', '36%', '46%']),
    correctAnswer: 1,
    explanation: 'Ongeveer 26% van Nederland ligt onder zeeniveau.',
    difficulty: 'medium',
  },
  {
    id: 'q-geo-002',
    factId: 'geo-002',
    category: 'geografie',
    format: 'multiple-choice',
    question: 'Sinds welk jaar is de Waddenzee UNESCO Werelderfgoed?',
    options: createOptions(['1999', '2004', '2009', '2014']),
    correctAnswer: 2,
    explanation: 'De Waddenzee is UNESCO Werelderfgoed sinds 2009.',
    difficulty: 'hard',
  },
  {
    id: 'q-geo-003',
    factId: 'geo-003',
    category: 'geografie',
    format: 'multiple-choice',
    question: 'Welk Waddeneiland is het grootste?',
    options: createOptions(['Terschelling', 'Texel', 'Ameland', 'Vlieland']),
    correctAnswer: 1,
    explanation: 'Texel is het grootste Waddeneiland met 170 km².',
    difficulty: 'easy',
  },
  {
    id: 'q-geo-004',
    factId: 'geo-005',
    category: 'geografie',
    format: 'multiple-choice',
    question: 'In welk jaar werd Flevoland een provincie?',
    options: createOptions(['1966', '1976', '1986', '1996']),
    correctAnswer: 2,
    explanation: 'Flevoland werd in 1986 officieel een provincie.',
    difficulty: 'medium',
  },
];

// Helper functions
export const getQuestionsByCategory = (category: Category): QuizQuestion[] => {
  return QUIZ_QUESTIONS.filter(q => q.category === category);
};

export const getRandomQuestions = (
  count: number,
  categories?: Category[]
): QuizQuestion[] => {
  let available = QUIZ_QUESTIONS;

  if (categories && categories.length > 0) {
    available = QUIZ_QUESTIONS.filter(q => categories.includes(q.category));
  }

  // Shuffle and take count
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const getQuestionById = (id: string): QuizQuestion | undefined => {
  return QUIZ_QUESTIONS.find(q => q.id === id);
};

export const getQuestionCount = (): number => QUIZ_QUESTIONS.length;
