// Three full knowledge checklists: Riding Instructor, Horse Behavioralist, Hippotherapy Instructor.
// Structure: checklist > milestone > category > items. Each text field has {pl, en}.

let uid = 0;
const id = () => `i${uid++}`;

const item = (pl, en) => ({ id: id(), text: { pl, en }, done: false });

const category = (pl, en, items) => ({
  id: id(),
  title: { pl, en },
  items,
});

const milestone = (pl, en, categories) => ({
  id: id(),
  title: { pl, en },
  categories,
});

// ----------------------------------------------------------------------------------
// CHECKLIST 1 — INSTRUKTOR JAZDY KONNEJ / RIDING INSTRUCTOR
// ----------------------------------------------------------------------------------
const instructor = {
  id: "instructor",
  title: { pl: "Instruktor Jazdy Konnej", en: "Riding Instructor" },
  milestones: [
    milestone(
      "Anatomia i biomechanika konia",
      "Horse Anatomy & Biomechanics",
      [
        category("Budowa i typy konia", "Conformation & Types", [
          item(
            "Budowa zewnętrzna konia — maść, odmiany, oznaczenia",
            "External conformation — coat colors, markings, identification"
          ),
          item("Typy i rasy koni używanych w jeździectwie", "Breeds and types used in riding"),
        ]),
        category("Układ kostno-stawowy", "Skeletal & Joint System", [
          item("Anatomia układu kostno-stawowego konia", "Anatomy of the skeletal/joint system"),
          item("Problemy ortopedyczne wpływające na wierzchowość", "Orthopedic issues affecting rideability"),
        ]),
        category("Układ mięśniowy", "Muscular System", [
          item("Anatomia układu mięśniowego konia", "Anatomy of the muscular system"),
          item("Linia grzbietowa i impulsja — wpływ napięcia mięśni na ruch", "Topline and impulsion — how muscle tension affects movement"),
        ]),
        category("Biomechanika ruchu", "Movement Biomechanics", [
          item("Biomechanika chodów — stęp, kłus, galop, cwał", "Biomechanics of gaits — walk, trot, canter, gallop"),
        ]),
        category("Ból i dyskomfort", "Pain & Discomfort", [
          item(
            "Oznaki bólu i dyskomfortu u konia (face pain scale, ogon, uszy)",
            "Signs of pain/discomfort (facial pain scale, tail, ears)"
          ),
        ]),
      ]
    ),
    milestone(
      "Neurologia i psychologia konia",
      "Equine Neurology & Psychology",
      [
        category("Neurobiologia", "Neurobiology", [
          item(
            "Neurobiologia konia: układ limbiczny, reakcja strachu, stres",
            "Equine neurobiology: limbic system, fear response, stress"
          ),
        ]),
        category("Teoria uczenia się", "Learning Theory", [
          item("Habituacja, warunkowanie klasyczne i instrumentalne", "Habituation, classical and operant conditioning"),
          item("Teoria uczenia koni — podejście naukowe vs tradycyjne", "Equine learning theory — scientific vs traditional approach"),
        ]),
        category("Komunikacja i zachowanie", "Communication & Behavior", [
          item("Komunikacja człowiek-koń (pressure-release, czas reakcji)", "Human-horse communication (pressure-release, reaction time)"),
          item("Hierarchia stadna i zachowanie socjalne", "Herd hierarchy and social behavior"),
          item("Rozpoznawanie zachowań lękowych i agresywnych", "Recognizing fearful and aggressive behavior"),
        ]),
      ]
    ),
    milestone(
      "Anatomia i biomechanika jeźdźca",
      "Rider Anatomy & Biomechanics",
      [
        category("Budowa jeźdźca", "Rider Build", [
          item("Budowa miednicy i kręgosłupa — wpływ na dosiad", "Pelvis and spine structure — effect on seat"),
          item("Mięśnie kluczowe dla dosiadu: core, przywodziciele, pośladki", "Key muscles for the seat: core, adductors, glutes"),
        ]),
        category("Balans i symetria", "Balance & Symmetry", [
          item("Symetria jeźdźca — częste asymetrie i korekcja", "Rider symmetry — common asymmetries and correction"),
          item("Balans i środek ciężkości w siodle", "Balance and center of gravity in the saddle"),
          item("Wpływ napięcia mięśniowego jeźdźca na ruch konia", "Effect of rider muscle tension on the horse's movement"),
        ]),
        category("Korekta dosiadu", "Seat Correction", [
          item("Typowe błędy dosiadu i ćwiczenia korekcyjne", "Common seat errors and corrective exercises"),
        ]),
      ]
    ),
    milestone(
      "Podstawy jeździectwa i metodyka nauczania",
      "Riding Fundamentals & Teaching Methodology",
      [
        category("Skala treningowa", "Training Scale", [
          item(
            "Skala treningowa FEI (rytm, rozluźnienie, kontakt, impulsja, prostowanie, zebranie)",
            "FEI training scale (rhythm, relaxation, contact, impulsion, straightness, collection)"
          ),
          item("Pomoce jeździeckie — nogi, ręce, dosiad, głos, bat, ostrogi", "Riding aids — legs, hands, seat, voice, whip, spurs"),
        ]),
        category("Ćwiczenia ujeżdżeniowe", "Dressage Exercises", [
          item("Serpentyny, wolta, zmiana ręki, przejścia", "Serpentines, circles, changes of rein, transitions"),
          item("Praca na dwóch śladach, ustępowanie od nogi", "Lateral work, leg-yield"),
          item("Praca bez strzemion i bez wodzy — ćwiczenia balansowe", "Work without stirrups/reins — balance exercises"),
        ]),
        category("Skoki i teren", "Jumping & Trail", [
          item("Skoki — podstawy, kurs przeszkód, ocena skoczności", "Jumping — basics, course riding, scope assessment"),
          item("Jazda terenowa — bezpieczeństwo, technika, zarządzanie grupą", "Trail riding — safety, technique, group management"),
        ]),
        category("Dydaktyka", "Pedagogy", [
          item("Metodyka nauczania dzieci vs dorosłych", "Teaching methodology for children vs adults"),
          item("Struktura lekcji: rozgrzewka, praca właściwa, wyciszenie", "Lesson structure: warm-up, main work, cool-down"),
          item("Feedback i komunikacja z uczniem", "Feedback and communication with the student"),
        ]),
      ]
    ),
    milestone(
      "Sprzęt, siodlarstwo i pielęgnacja",
      "Tack, Equipment & Grooming",
      [
        category("Siodła i ogłowia", "Saddles & Bridles", [
          item("Rodzaje siodeł i dopasowanie do konia i jeźdźca", "Saddle types and fitting for horse and rider"),
          item("Ogłowie, kiełzna — rodzaje i zasady działania", "Bridles, bits — types and how they work"),
          item("Siodłanie i ogłowienie — procedury i bezpieczeństwo", "Tacking up — procedures and safety"),
        ]),
        category("Pielęgnacja i kontrola zdrowia", "Grooming & Health Checks", [
          item("Pielęgnacja konia przed i po jeździe: czyszczenie, kopyta", "Grooming before/after riding: brushing, hooves"),
          item("Kontrola zdrowia konia przed jazdą (lameness check, temperament)", "Pre-ride health check (lameness check, temperament)"),
          item("Dobór konia do poziomu i wagi ucznia", "Matching horse to student's level and weight"),
        ]),
      ]
    ),
    milestone(
      "Bezpieczeństwo i prawo",
      "Safety & Law",
      [
        category("Przepisy i ubezpieczenia", "Regulations & Insurance", [
          item("Przepisy jeździeckie PZJ — licencje, regulaminy zawodów", "National federation rules — licenses, competition regulations"),
          item("Ubezpieczenie instruktora i uczniów", "Instructor and student insurance"),
          item("Odpowiedzialność prawna instruktora", "Legal liability of the instructor"),
          item("Dokumentacja kursów i pracy z uczniem", "Course and student record documentation"),
        ]),
        category("Bezpieczeństwo i pierwsza pomoc", "Safety & First Aid", [
          item("Zasady bezpieczeństwa w stajni i na ujeżdżalni", "Safety rules in the stable and arena"),
          item("Pierwsza pomoc — urazy w jeździectwie (upadki, stłuczenia, złamania)", "First aid — riding injuries (falls, bruises, fractures)"),
        ]),
      ]
    ),
    milestone(
      "Zarządzanie grupą i pedagogika",
      "Group Management & Pedagogy",
      [
        category("Prowadzenie grupy", "Running a Group", [
          item("Prowadzenie grup na ujeżdżalni — kolejność, odstępy, komendy", "Running arena groups — order, spacing, commands"),
          item("Zarządzanie stresem i paniką ucznia", "Managing student stress and panic"),
        ]),
        category("Style uczenia się", "Learning Styles", [
          item("Różne style uczenia się — wzrokowy, słuchowy, kinestetyczny", "Learning styles — visual, auditory, kinesthetic"),
          item("Motywowanie uczniów i praca z blokadami psychicznymi", "Motivating students and working through mental blocks"),
          item("Prowadzenie lekcji próbnej i ocena poziomu ucznia", "Running a trial lesson and assessing student level"),
        ]),
      ]
    ),
    milestone(
      "Praktyka — umiejętności do potwierdzenia",
      "Practice — Skills to Confirm",
      [
        category("Lekcje praktyczne", "Practical Lessons", [
          item("Samodzielne przeprowadzenie lekcji z początkującym dorosłym", "Independently teach a beginner adult lesson"),
          item("Samodzielne przeprowadzenie lekcji z dzieckiem 6–10 lat", "Independently teach a child (6-10 yrs) lesson"),
          item("Korekta dosiadu ucznia w ruchu (kłus, galop)", "Correct a student's seat in motion (trot, canter)"),
          item("Prowadzenie jazdy terenowej z grupą 3–5 osób", "Lead a trail ride with a group of 3-5 riders"),
        ]),
        category("Obserwacja i refleksja", "Observation & Reflection", [
          item("Nagranie i analiza własnej lekcji (video feedback)", "Record and analyze your own lesson (video feedback)"),
          item("Obserwacja 5 lekcji doświadczonego instruktora + notatki", "Observe 5 lessons by an experienced instructor + notes"),
        ]),
      ]
    ),
  ],
};

// ----------------------------------------------------------------------------------
// CHECKLIST 2 — BEHAWIORYSTA KOŃSKI / HORSE BEHAVIORALIST  (Ryan Rose-inspired)
// ----------------------------------------------------------------------------------
const behavioralist = {
  id: "behavioralist",
  title: { pl: "Behawiorysta Koński", en: "Horse Behavioralist" },
  milestones: [
    milestone(
      "Etologia i nauka o zachowaniu",
      "Ethology & Behavioral Science",
      [
        category("Podstawy etologii", "Ethology Basics", [
          item("Naturalne zachowanie konia w stadzie dzikim", "Natural behavior of feral/wild herd horses"),
          item("Budżet czasowy konia — żerowanie, odpoczynek, ruch, socjalizacja", "Equine time budget — grazing, rest, locomotion, socializing"),
          item("Sygnały ciała — uszy, ogon, nozdrza, oczy, postawa", "Body language — ears, tail, nostrils, eyes, posture"),
          item("Drabina eskalacji (ladder of aggression / calming signals)", "Ladder of aggression / calming signals"),
        ]),
        category("Nauka o uczeniu się", "Learning Science", [
          item("Warunkowanie klasyczne i instrumentalne w praktyce", "Classical and operant conditioning in practice"),
          item("Wzmocnienie pozytywne i negatywne (R+/R-)", "Positive and negative reinforcement (R+/R-)"),
          item("Kształtowanie zachowania (shaping) i timing nagrody", "Behavior shaping and reward timing"),
          item("Wygaszanie, generalizacja i dyskryminacja bodźców", "Extinction, generalization, stimulus discrimination"),
          item("Pułapki tresury — wzmocnienie niepożądanych zachowań", "Training pitfalls — accidental reinforcement of unwanted behavior"),
        ]),
      ]
    ),
    milestone(
      "Neurobiologia stresu i emocji",
      "Stress & Emotion Neurobiology",
      [
        category("Układ nerwowy i stres", "Nervous System & Stress", [
          item("Reakcja walki/ucieczki/zamrożenia (fight/flight/freeze)", "Fight/flight/freeze response"),
          item("Allostaza i przewlekły stres u koni", "Allostasis and chronic stress in horses"),
          item("Próg pobudzenia (threshold) i praca pod progiem", "Threshold of arousal and working under threshold"),
          item("Habituacja vs uczulenie (sensitization) na bodźce", "Habituation vs sensitization to stimuli"),
        ]),
        category("Stan emocjonalny", "Emotional State", [
          item("Wskaźniki dobrostanu — Five Domains / Five Freedoms", "Welfare indicators — Five Domains / Five Freedoms"),
          item("Stereotypie i zachowania zastępcze (kribbing, weaving)", "Stereotypies / vices (cribbing, weaving)"),
          item("Wyuczona bezradność — rozpoznanie i unikanie", "Learned helplessness — recognition and avoidance"),
        ]),
      ]
    ),
    milestone(
      "Diagnostyka zachowań problemowych",
      "Problem Behavior Diagnostics",
      [
        category("Analiza przyczyn", "Root Cause Analysis", [
          item("Odróżnianie przyczyn medycznych od behawioralnych", "Distinguishing medical vs behavioral causes"),
          item("Wywiad behawioralny z właścicielem (historia konia)", "Behavioral history interview with the owner"),
          item("Funkcjonalna analiza zachowania (antecedent-behavior-consequence)", "Functional behavior analysis (ABC model)"),
        ]),
        category("Typowe problemy", "Common Problem Behaviors", [
          item("Zachowania lękowe — spanikowanie, ucieczka, zamrożenie", "Fear-based behavior — spooking, flight, freezing"),
          item("Agresja — w stajni, podczas jedzenia, pod siodłem", "Aggression — in the stall, at feeding, under saddle"),
          item("Problemy z ładowaniem do przyczepy", "Trailer loading issues"),
          item("Problemy z kuciem, weterynarzem i zabiegami", "Issues with farrier, vet, and procedures"),
          item("Separation anxiety i problemy z samotnością", "Separation anxiety and being alone issues"),
        ]),
      ]
    ),
    milestone(
      "Metody modyfikacji zachowania",
      "Behavior Modification Methods",
      [
        category("Desensytyzacja i counterconditioning", "Desensitization & Counterconditioning", [
          item("Systematyczna desensytyzacja na bodźce", "Systematic desensitization to stimuli"),
          item("Counterconditioning — zmiana emocjonalnej reakcji", "Counterconditioning — changing emotional response"),
          item("Praca z approach/retreat i pressure-release", "Approach/retreat and pressure-release work"),
        ]),
        category("Trening celowany", "Targeted Training", [
          item("Target training i clicker training", "Target training and clicker training"),
          item("Budowanie pewności siebie konia (confidence building)", "Building the horse's confidence"),
          item("Praca liberty i budowanie relacji bez przymusu", "Liberty work and relationship building without coercion"),
          item("Plan modyfikacji zachowania krok po kroku", "Step-by-step behavior modification plan"),
        ]),
      ]
    ),
    milestone(
      "Obserwacja praktyczna i studia przypadków",
      "Practical Observation & Case Studies",
      [
        category("Notatki i materiały", "Notes & Source Material", [
          item("Notatki z analizy materiałów wideo (np. Ryan Rose i inni behawioryści)", "Notes from analyzing video case studies (e.g. Ryan Rose and other behavioralists)"),
          item("Zbiór własnych obserwacji zachowań różnych koni", "Personal log of behavior observations across different horses"),
          item("Porównanie podejść różnych szkół behawioralnych", "Comparing approaches across different behavioral schools"),
        ]),
        category("Praktyka", "Hands-on Practice", [
          item("Przeprowadzenie pełnej oceny behawioralnej konia", "Conduct a full behavioral assessment of a horse"),
          item("Wdrożenie i udokumentowanie planu modyfikacji zachowania", "Implement and document a behavior modification plan"),
          item("Konsultacja z weterynarzem/fizjoterapeutą w trudnym przypadku", "Consult a vet/physio on a difficult case"),
        ]),
      ]
    ),
  ],
};

// ----------------------------------------------------------------------------------
// CHECKLIST 3 — HIPOTERAPIA / HIPPOTHERAPY INSTRUCTOR
// ----------------------------------------------------------------------------------
const hippotherapy = {
  id: "hippotherapy",
  title: { pl: "Instruktor Hipoterapii", en: "Hippotherapy Instructor" },
  milestones: [
    milestone(
      "Podstawy kliniczne i neurobiologia",
      "Clinical Basics & Neurobiology",
      [
        category("Neuroplastyczność i ruch konia", "Neuroplasticity & Horse Movement", [
          item(
            "Neuroplastyczność i jej znaczenie w rehabilitacji — wpływ ruchu konia na OUN",
            "Neuroplasticity and its role in rehab — effect of horse movement on the CNS"
          ),
          item("Wpływ impulsów ruchowych konia na miednicę pacjenta (ruch 3D)", "Effect of the horse's movement impulses on the patient's pelvis (3D movement)"),
          item("Mechanizm regulacji napięcia mięśniowego przez ruch konia", "Mechanism of muscle tone regulation via horse movement"),
        ]),
        category("Integracja sensoryczna i psychologia", "Sensory Integration & Psychology", [
          item("Integracja sensoryczna w kontekście hipoterapii", "Sensory integration in the context of hippotherapy"),
          item("Psychologiczne efekty kontaktu z koniem (Animal Assisted Therapy)", "Psychological effects of horse contact (Animal Assisted Therapy basics)"),
        ]),
      ]
    ),
    milestone(
      "Wskazania i przeciwwskazania",
      "Indications & Contraindications",
      [
        category("Wskazania", "Indications", [
          item("Mózgowe porażenie dziecięce (MPD), SM, udar, autyzm, ADHD, depresja", "Cerebral palsy, MS, stroke, autism, ADHD, depression"),
          item("Różnice wskazań dla dzieci vs dorosłych vs seniorów", "Differences in indications for children vs adults vs seniors"),
        ]),
        category("Przeciwwskazania i kwalifikacja", "Contraindications & Qualification", [
          item("Przeciwwskazania bezwzględne: alergia, osteoporoza, aktywne zapalenia stawów, niekontrolowana padaczka", "Absolute contraindications: allergy, osteoporosis, active arthritis, uncontrolled epilepsy"),
          item("Ocena pacjenta przed kwalifikacją do hipoterapii", "Patient assessment before hippotherapy qualification"),
          item("Współpraca z lekarzem prowadzącym — dokumentacja, zgody", "Collaboration with the treating physician — documentation, consents"),
        ]),
      ]
    ),
    milestone(
      "Dobór i przygotowanie konia hipoterapeutycznego",
      "Selecting & Preparing the Hippotherapy Horse",
      [
        category("Wybór konia", "Horse Selection", [
          item("Cechy konia odpowiedniego do hipoterapii: charakter, ruch, wielkość", "Traits of a suitable hippotherapy horse: temperament, gait, size"),
          item("Jak ocenić jakość stępa konia dla celów terapeutycznych", "Assessing walk quality for therapeutic purposes"),
        ]),
        category("Przygotowanie i sprzęt", "Preparation & Equipment", [
          item("Przygotowanie konia do pracy z pacjentem — hartowanie na bodźce", "Preparing the horse for patient work — desensitization to stimuli"),
          item("Wyposażenie — siodło hipoterapeutyczne, pad, uchwyt, strzemiona bezpieczne", "Equipment — hippotherapy saddle, pad, handle, safety stirrups"),
          item("Praca konia na lonży podczas sesji terapeutycznej", "Working the horse on a lunge line during sessions"),
        ]),
      ]
    ),
    milestone(
      "Pozycje, ćwiczenia i planowanie sesji",
      "Positions, Exercises & Session Planning",
      [
        category("Pozycje terapeutyczne", "Therapeutic Positions", [
          item("Pozycje terapeutyczne: siedzenie przodem, tyłem, bokiem, w poprzek", "Therapeutic positions: forward, backward, side, crosswise sitting"),
        ]),
        category("Ćwiczenia i planowanie", "Exercises & Planning", [
          item("Ćwiczenia aktywizujące: dotykowe, równoważne, koordynacyjne, oddechowe", "Activating exercises: tactile, balance, coordination, breathing"),
          item("Planowanie sesji dla konkretnej jednostki (np. MPD typ spastyczny)", "Planning a session for a specific condition (e.g. spastic cerebral palsy)"),
          item("Progresja terapeutyczna — planowanie długoterminowego programu", "Therapeutic progression — long-term program planning"),
          item("Dokumentacja postępów pacjenta — skale oceny, arkusze obserwacji", "Documenting patient progress — assessment scales, observation sheets"),
        ]),
      ]
    ),
    milestone(
      "Praca z konkretnymi grupami pacjentów",
      "Working with Specific Patient Groups",
      [
        category("Grupy pacjentów", "Patient Groups", [
          item("Dzieci z autyzmem — komunikacja niewerbalna, rutyna, bodźce sensoryczne", "Children with autism — nonverbal communication, routine, sensory input"),
          item("Mózgowe porażenie dziecięce — typy (spastyczny, atetotyczny, ataktyczny)", "Cerebral palsy — types (spastic, athetoid, ataxic)"),
          item("Pacjenci po udarze — asymetria, zaburzenia równowagi", "Stroke patients — asymmetry, balance disorders"),
          item("Zaburzenia psychiczne i emocjonalne — granice terapeutyczne", "Mental/emotional disorders — therapeutic boundaries"),
          item("Seniorzy — demencja, osteoporoza, mobilność ograniczona", "Seniors — dementia, osteoporosis, limited mobility"),
        ]),
      ]
    ),
    milestone(
      "Bezpieczeństwo i praca zespołowa",
      "Safety & Teamwork",
      [
        category("Role i protokoły", "Roles & Protocols", [
          item("Role w sesji: terapeuta, prowadzący konia, asystent boczny", "Session roles: therapist, horse leader, side-walker"),
          item("Protokół bezpieczeństwa: podchodzenie do konia z pacjentem, zsiadanie awaryjne", "Safety protocol: approaching the horse with a patient, emergency dismount"),
          item("Pierwsza pomoc specyficzna dla hipoterapii (drgawki, omdlenie na koniu)", "Hippotherapy-specific first aid (seizures, fainting on horseback)"),
        ]),
        category("Prawo i etyka", "Law & Ethics", [
          item("Certyfikacja i regulacje prawne hipoterapii w Polsce (NFZ, PZTIH)", "Certification and legal regulations for hippotherapy in Poland (NFZ, PZTIH)"),
          item("Etyka w pracy z osobami z niepełnosprawnościami", "Ethics in working with people with disabilities"),
        ]),
      ]
    ),
    milestone(
      "Praktyka kliniczna",
      "Clinical Practice",
      [
        category("Obserwacja i superwizja", "Observation & Supervision", [
          item("Obserwacja 5+ sesji hipoterapeutycznych z opisem pacjentów", "Observe 5+ hippotherapy sessions with patient descriptions"),
          item("Samodzielne przeprowadzenie sesji pod superwizją (MPD lub autyzm)", "Independently run a supervised session (CP or autism)"),
        ]),
        category("Dokumentacja i rozwój", "Documentation & Development", [
          item("Napisanie planu terapeutycznego dla konkretnego przypadku", "Write a therapy plan for a specific case"),
          item("Udział w warsztacie/szkoleniu certyfikowanego hipoterapeuty", "Attend a workshop/training by a certified hippotherapist"),
          item("Zapoznanie się z literaturą EBP (evidence-based practice) w hipoterapii", "Review evidence-based practice (EBP) literature in hippotherapy"),
        ]),
      ]
    ),
  ],
};

export const CHECKLISTS = [instructor, behavioralist, hippotherapy];
