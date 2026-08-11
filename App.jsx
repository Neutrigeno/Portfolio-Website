import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Plus, Send, ChevronRight, ChevronLeft } from "lucide-react";

/*
  FONT NOTE:
  Avenir is a licensed commercial font, so it can't be pulled from a free CDN.
  "Jost" (used below) is a free, geometric sans that reads very close to Avenir.
  If you own an Avenir license (e.g. Adobe Fonts / purchased files), replace the
  @import below with an @font-face block pointing to your .woff2 files and swap
  every "Jost" reference to your Avenir family name.

  LETTER-SPACING:
  Search this file for "letterSpacing" — each text role (nav, labels, titles)
  has its own value so you can nudge tracking independently.

  ADDING REAL ARTWORK:
  Edit the ARTWORKS array below. Give each piece an "image" URL and it will
  replace the placeholder box automatically. On the Works grid, each image keeps
  its natural aspect ratio; the masonry card height is measured automatically.
*/

const translations = {
  en: {
    works: "WORKS",
    projects: "PROJECTS",
    studies: "STUDIES",
    about: "ABOUT",
    language: "LANGUAGE",
    content: "CONTENT",
    context: "CONTEXT",
    medium: "MEDIUM",
    media: "MEDIA",
    layout: "LAYOUT",
    order: "ORDER",
    mediumOpts: ["PAINTING", "SCULPTURE", "SKETCH"],
    mediaOpts: ["IMAGES", "WORDS", "SELECTIVE"],
    layoutOpts: ["SLIDES", "MULTIPLE", "TWO"],
    orderOpts: ["CHRONO", "ALPHABET", "THEMATIC"],
    description: "DESCRIPTION",
    bio: "BIO",
    contact: "CONTACT",
    leaveMail: "LEAVE A MAIL FOR INQUIRIES",
    emailAddress: "EMAIL ADDRESS",
    subject: "SUBJECT",
    descriptionLimit: "DESCRIPTION (<100 words*)",
    furtherInquiries: "FURTHER INQUIRIES:",
    comingSoon: "This page is still being designed.",
    selectSection: "Select Description or Bio to view content.",
    purposeLabel: "PURPOSE",
    roleLabel: "ROLE",
    teamLabel: "TEAM",
    projectsFieldLabel: "PROJECTS",
    goalLabel: "GOAL",
    procedureLabel: "PROCEDURE",
    skillsLabel: "SKILLS",
    impactLabel: "IMPACT",
    experienceLabel: "EXPERIENCE",
    takeawayLabel: "TAKEAWAY",
    institutionLabel: "INSTITUTION",
    selectProject: "Select a project above to view its details.",
    researchQuestionLabel: "RESEARCH QUESTION",
    terminologyLabel: "TERMINOLOGY",
    scopeOfAreaLabel: "SCOPE OF AREA",
    methodologyLabel: "METHODOLOGY",
    researchSignificanceLabel: "RESEARCH SIGNIFICANCE",
    keyWordsLabel: "KEY WORDS",
    referencesLabel: "REFERENCES",
    selectStudy: "Select a study above to view its details.",
  },
  ko: {
    works: "작품",
    projects: "프로젝트",
    studies: "연구",
    about: "소개",
    language: "언어",
    content: "내용",
    context: "맥락",
    medium: "매체",
    media: "미디어",
    layout: "레이아웃",
    order: "순서",
    mediumOpts: ["회화", "조각", "스케치"],
    mediaOpts: ["이미지", "텍스트", "선택"],
    layoutOpts: ["슬라이드", "다중", "둘"],
    orderOpts: ["연대순", "가나다순", "주제별"],
    description: "설명",
    bio: "약력",
    contact: "연락처",
    leaveMail: "문의 메일 보내기",
    emailAddress: "이메일 주소",
    subject: "제목",
    descriptionLimit: "설명 (100단어 미만*)",
    furtherInquiries: "추가 문의:",
    comingSoon: "이 페이지는 아직 준비 중입니다.",
    selectSection: "설명 또는 약력을 선택해 내용을 확인하세요.",
    purposeLabel: "목적",
    roleLabel: "역할",
    teamLabel: "팀",
    projectsFieldLabel: "프로젝트",
    goalLabel: "목표",
    procedureLabel: "절차",
    skillsLabel: "역량",
    impactLabel: "영향",
    experienceLabel: "경험",
    takeawayLabel: "배운 점",
    institutionLabel: "기관",
    selectProject: "위에서 프로젝트를 선택해 자세히 보세요.",
    researchQuestionLabel: "연구 질문",
    terminologyLabel: "용어",
    scopeOfAreaLabel: "연구 범위",
    methodologyLabel: "연구 방법",
    researchSignificanceLabel: "연구 의의",
    keyWordsLabel: "키워드",
    referencesLabel: "참고 문헌",
    selectStudy: "위에서 연구를 선택해 자세히 보세요.",
  },
};

// About-page copy. Only English is provided for the long-form text — add a "ko" array
// per field if you want a translated version; UI labels above are already bilingual.
const ABOUT_CONTENT = {
  description: [
    'My works are engendered by the process of navigation through the idea of "modern" and nationalism in Korean 20th century art. Modern art, insisting its timeframe as the present period of the readers, conscious of its time frame, and while being conscious of its time frame, going against a specific past in a specific place of Europe, itself is worthy of its own investigation. However, I narrowed the lens to the category of nation in constructing intellectual framework about Modernism, specifically to my home country. Absent the concept of art in the early 20th century, Korean artists found difficulty applying the consciousness of Modernism, which was to go against traditional art. To consider an object of precise intention as a work of art itself was enough to go against tradition.',
    '20th century artists and art critics\'s repetitive use of the word "balance", which signal the amount, mass of dual qualities being equal, in an attempt to navigate what they considered the opposite form of art—traditional and modernism—spurred my interest in finding logic behind alogical art. I have initiated to use distribution and categorization in understanding art in the form of a mass that is countable numerically. Categorizations are also found by my art practices, which are done by recognizing patterns. From recognizing patterns of behaviors of audiences, I utilize its formed context as a medium. Through extraction of patterns in interior architecture, my work is neither the representation and presentation of reality. The colors are distilled to bring focus on the layers of colors on the surface of canvas and the geometrical lines extracted by the edges of modern concrete looking interiors. The space has patterns and different layers itself. The idea of artificiality is explored by such layers revealing the canvas and layers that reveal the architecture. The playful ambiguity from the space hidden from the viewers are mere layers of paint, while the intrigue it creates to the viewers is real. I study the ambiguity and imaginary space and the element of interior architecture by glancing back to the Korean vernacular architecture in its emphasis on lines and repetition of space.',
  ],
  bio: [
    "Growth to the center of Chicago and the suburbs of South Korea affected the development of her work. During her school year, she worked in the art museum, which had great influence on the future of her work and her practice.",
  ],
};

// Projects-page data. Each entry is one row in the top list.
// TO ADD A NEW PROJECT: copy an object below (even a mostly-empty one) and add it to
// the array — it appears in the list immediately. Leave any accordion field ("purpose",
// "role", etc.) as "" or [] if you don't have that content yet; empty fields are
// automatically hidden and shown as plain (non-highlighted) titles instead of pills.
// "images" populates the inline gallery that opens when the row's arrow is clicked.
let projectAutoId = 0;
const PROJECTS = [
  {
    id: ++projectAutoId,
    year: 2026, season: "SUMMER", type: "CURATORIAL",
    org: "HERITAGE MUSEUM OF ASIAN ART", location: "CHICAGO, IL US",
    title: "CONTEMPORARY REFLECTION: KOREAN SCHOLAR",
    images: [],
    purpose: "• Learn about contemporary Korean artists and how modern-contemporary art-historical frameworks, narrowed by traditional Korean art beliefs, impact their art practices.\n• Develop an outward-looking lens through which to view Korean art.\n• Learn how subcategories within an exhibition, such as catalog writing, contribute to delivering exhibition narratives to audiences.",
    role: ["Catalog Writer", "Sub-Writer"],
    team: "Heritage Museum of Asian Art executive team",
    projectsField: "• Grant writing\n• Catalog writing\n• Studio visit: interview",
    goal: "• Earn grants to support the exhibition.\n• Make the exhibition possible and make the catalog essential to understanding the exhibition.",
    procedure: "• Artist studio visit\n• Writing them down\n• Research on the historical time period\n• Connecting the historical narrative with artists' understanding of their work\n• Building up new questions\n• Grant writing on the side, cooperating with Director Ji",
    skills: "Logical and persuasive writing skills; question-sorting skills",
    impact: "",
    experience: [],
    takeaway: "",
    institutionDesc: "Founded in 2014, the Heritage Museum of Asian Art showcases a wide range of art forms spanning many cultures and time periods of Asia. The museum's collection includes archaic and modern jades, Neolithic pottery, imperial porcelains, Chinese snuff bottles, scholar's objects, textiles, bronzes, and more. Classical Chinese furniture also adorns the galleries. The museum provides an interconnection between the arts and cultures of Asia for the residents of Chicago and visitors from all around the world.",
    institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2025, season: "WINTER", type: "CURATORIAL",
    org: "MINNEKIRKEN", location: "CHICAGO, IL US",
    title: "PROFESSIONAL PRACTICE",
    images: [],
    purpose: "• To present student artworks in a public, nontraditional exhibition space and create an opportunity for collective curatorial practice.\n• Develop a space that is already established and has its own context into an exhibition space by overcoming constraints and utilizing the existing equipment in the facility.",
    role: ["Curator", "Artist"],
    team: "10 students",
    projectsField: "• Artwork preparation\n• Exhibition location setup",
    goal: "To organize and install a cohesive group exhibition within Minnekirken while responding to the church's architectural conditions, safely handling artworks, and completing installation within a limited timeframe.",
    procedure: "Selected placement → planned layout → prepared works → installed → promoted → documented → deinstalled",
    skills: "Exhibition installation and deinstallation; artwork handling; spatial planning; collaborative decision-making; exhibition promotion; DSLR photography; digital archival organization",
    impact: "",
    experience: [],
    takeaway: "Developed an understanding of how exhibition design changes when artworks are presented in a site with an existing architectural, cultural, and community identity. Learned to balance curatorial intentions with practical constraints—including space, installation time, artwork safety, and collaborative decision-making—while maintaining a coherent exhibition presentation. Utilized nontraditional gallery architectural elements to enhance the experience of the artwork.",
    institutionDesc: "The neighborhood surrounding the church is typical of Chicago's North Side neighborhoods and reflects a diversity of languages and cultures. Minnekirken serves as a reminder of a neighborhood heritage long past, in which Scandinavians played a significant part. During the first half of this century, there were several Norwegian-language churches in the Logan Square area and over 20 Norwegian churches in the metropolitan area.\n\nMinnekirken, which means \"Memorial Church\" in Norwegian, was first built by Norwegian immigrants as Christ Church in 1912. In 1934, the name was changed to its present name, in part because of the war memorial that was dedicated that year in the center of the circular thoroughfare located across from the church.",
    institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2025, season: "WINTER", type: "CURATORIAL",
    org: "UKRAINIAN INSTITUTE OF MODERN ART", location: "CHICAGO, IL US",
    title: "AFTER LINE, BEFORE FORM",
    images: [
      {
        image: "/images/After Line, Before Form Poster.jpg",
        caption: "After Line, Before Form Poster",
        aspectRatio: "1179 / 1526",
      },
      {
        image: "/images/After Line, Before Form Brochure Front.png",
        caption: "After Line, Before Form Brochure Front",
        aspectRatio: "2448 / 1584",
      },
    ],
    purpose: "• To present artworks by artists from Ukrainian and international backgrounds cohesively and deliver an understanding of connections within the exhibition to audiences.\n• Learn about the impact that the notion of nationality attached to an artist has on the contemporary art world and what premises it brings to curatorial research and the decision-making process.\n• To learn about the collaborative process, unexpected things that happen, and how to reconcile opinions while creating the best outcome.\n• To learn about museum work through a museum setting.",
    role: ["Student Curator", "Interpretive Designer"],
    team: "Consisted of 7 graduate students from SAIC taking an Art History course",
    projectsField: "• Putting up an exhibition\n• Translation\n• Brochure design",
    goal: "Develop an exhibition layout, object relationships, and interpretive materials for a two-month public exhibition.",
    procedure: "• Conducted curatorial research on 15 works by artists from Ukraine and the Ukrainian diaspora.\n• Collaborated with 6 other students on artwork selection, conceptual framing, and exhibition narrative.",
    skills: "Collaborative skills; reflexive responses to unpredictable situations; group and individual schedule coordination and management; writing; artwork research; exhibition design; promotion",
    impact: "",
    experience: [
      {
        left: "Experienced the full exhibition workflow from preparation and spatial planning through installation, public promotion, documentation, and deinstallation.",
        right: "Worked within the constraints of a historic, functioning church rather than a purpose-built gallery, requiring the team to adapt exhibition decisions to an existing architectural and cultural environment.",
      },
    ],
    takeaway: "Developed a time-management system, splitting individual and group schedules to keep track of individuals' schedules at a glance and understand group responsibilities and what to do in the next group meeting.\n\nGroup projects are all about preventing things that shouldn't happen from happening and making things that should happen happen by going beyond expectations to find the best person to do the work and always looking for alternatives.",
    institutionDesc: "Founded in 1971, the museum preserves and promotes contemporary art as a shared expression of the Ukrainian and American experience. UIMA develops, utilizes, and encourages artistic talent through exhibitions, concerts, readings, lectures, and films to serve the cultural needs of the community and city, thereby strengthening cultural understanding and diversity.",
    institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2024, season: "SUMMER", type: "INTERPRETATION",
    org: "KOREA MINISTRY OF UNIFICATION", location: "GOSEONG, GANGWON KR",
    title: "KOREA NORTH & SOUTH UNION PROGRAM",
    images: [
      {
        image: "/images/Location of Goseong County in Korea.png",
        caption: "Location of Goseong County in Korea",
        aspectRatio: "1132 / 1452",
      },
      {
        image: "/images/Museums and historical sites visited in Goseong.png",
        caption: "Museums and historical sites visited in Goseong",
        aspectRatio: "1116 / 1428",
      },
    ],
    purpose: "To learn about the perspectives of foreigners and scholars on the history and ongoing interactions between South and North Korea.",
    role: ["Simultaneous Interpreter", "Group Assistant"],
    team: "",
    projectsField: "",
    goal: "",
    procedure: "",
    skills: "",
    impact: "Assisted in organizing visits to seven historical museums focused on North and South Korean history in Goseong, Gangwon Province (KR).",
    experience: [
      {
        left: "Language",
        right: "Interpreted fast-paced museum docent tours on North and South Korean history for non-Korean participants, translating specialized historical and political terminology in real time.",
      },
      {
        left: "Historical context",
        right: "Supplemented simultaneous interpretation with written explanations when additional historical context or terminological precision was necessary.",
      },
      {
        left: "Different audience perspectives",
        right: "Prepared for interpretation by comparing Korean and international reporting and research—including Maeil Business Newspaper, The Dong-A Ilbo, the Council on Foreign Relations, and BBC—to understand how terminology and political events were framed for different audiences.",
      },
    ],
    takeaway: "Developed an understanding that interpreting politically sensitive historical material requires more than direct linguistic translation: terminology must be researched, contextualized, and checked for unintended political implications. Learned to distinguish between translating a speaker's position accurately and introducing the interpreter's own interpretation, particularly when communicating contested historical and political subjects to international audiences.",
    institutionDesc: "The Ministry of Unification oversees the formulation of policies related to unification, inter-Korean dialogue, exchange and cooperation, and humanitarian assistance; the analysis of North Korean affairs; unification education and public education; and other matters concerning unification.",
    institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2022, season: "FALL", type: "CURATORIAL",
    org: "INTERNATIONAL YOUTH EXCHANGE FOUNDATION", location: "SEONGNAM, GYEONGGI KR",
    title: "GLOBAL YOUTH IN ACTION",
    images: [],
    purpose: "• Help people who are unrecognized as people in need of help.\n• Build strong bonds between generations.\n• To raise awareness of overlooked social needs, particularly those of runaway youth, and encourage young people to support their peers through accessible everyday actions while promoting environmental sustainability.",
    role: ["Exhibition Designer", "Idea Presenter"],
    team: "Team of 4 high schoolers",
    projectsField: "• Teen as Team by Team Home\n• Presenting the project to 100+ people through a role-played newscast\n• Designing a booth\n• Making progress\n• Making new project suggestions",
    goal: "Raise awareness about UN Sustainable Development Goals, primarily among K–12 students, and initiate actions within these groups through achievable, daily goals.",
    procedure: "Discussion → Proposal → Practice → Small presentation → Big presentation → Exhibition booth",
    skills: "Collaborative skills",
    impact: "Led the design of a sustainable system that upcycled donated clothing and books into funds, providing daily essentials for runaway youth while benefiting the planet. Established the presentation for an IYCEF Speech Contest and the exhibition design for the conference.\n\nPresented exhibition activities and donation methods targeting students and children and led over 100 participants a day.\n\nConstructed a 100% meaningful donation process by collecting 300+ pieces of clothing and 150+ books, reducing 1,850 lb of carbon.",
    experience: [
      {
        left: "Idea",
        right: "Worked in a four-person student team to develop a social-impact project from initial discussion and proposal through public presentation and exhibition.",
      },
      {
        left: "System",
        right: "Translated an abstract issue—support for runaway youth—into an accessible participation model in which students could contribute through ordinary actions such as donating used clothing and books.",
      },
      {
        left: "Audience experience",
        right: "Gained experience adapting the same project for multiple forms of communication, including proposals, small-group presentations, a role-played newscast for an audience of 100+, and an interactive exhibition booth for younger participants.",
      },
    ],
    takeaway: "Learned that effective social-impact projects can reduce barriers to participation by connecting difficult or sensitive social issues to familiar, achievable actions. Developed an understanding of how a project can create multiple forms of value simultaneously: donated objects could be diverted from waste, converted into monetary value, used to support runaway youth, and serve as an entry point for educating other students about social and environmental issues.\n\nLearned to use exhibition design not only to present information but also to make an abstract social issue understandable and give visitors a concrete method of participation.",
    institutionDesc: "The International Youth Cultural Exchange Federation (IYCEF) is an organization affiliated with the Ministry of Gender Equality and Family of the Republic of Korea. Through international NGO volunteer work, cultural activities, international education, and experiential programs for youth with and without disabilities worldwide, the organization aims to promote cultural exchange among young people and help them develop the international perspectives and insights necessary to become members of the global community. It also seeks to foster individuals who can contribute to international cooperation.",
    institutionLogo: null,
  },
];

// Accordion field order + which sidebar-style group (works/studies/about) each belongs to.
// "labelKey" looks up the bilingual label from translations; special renderers below
// handle "role" (list), "experience" (paired columns), and "institution" (logo + text).
const FIELD_DEFS = [
  { key: "purpose", labelKey: "purposeLabel", group: "studies" },
  { key: "role", labelKey: "roleLabel", group: "studies", kind: "list" },
  { key: "team", labelKey: "teamLabel", group: "about" },
  { key: "projectsField", labelKey: "projectsFieldLabel", group: "about" },
  { key: "goal", labelKey: "goalLabel", group: "about" },
  { key: "procedure", labelKey: "procedureLabel", group: "about" },
  { key: "skills", labelKey: "skillsLabel", group: "about" },
  { key: "impact", labelKey: "impactLabel", group: "works" },
  { key: "experience", labelKey: "experienceLabel", group: "works", kind: "experience" },
  { key: "takeaway", labelKey: "takeawayLabel", group: "works" },
  { key: "institution", labelKey: "institutionLabel", group: "works", kind: "institution" },
];

function fieldHasContent(project, def) {
  if (def.kind === "list") return project[def.key] && project[def.key].length > 0;
  if (def.kind === "experience") return project.experience && project.experience.length > 0;
  if (def.kind === "institution") return !!project.institutionDesc;
  return !!project[def.key];
}

// Studies-page data — same shape/pattern as PROJECTS above.
// TO ADD A NEW STUDY: copy an object below and add it to the array.
// "academic" is an array so a row can list more than one field (see the last entry).
// The wireframe for this page only specified field *titles*, not example body text,
// so every accordion field starts empty — fill in "researchQuestion", "terminology",
// etc. with your real writing whenever you're ready; empty ones stay hidden/unpilled.
let studyAutoId = 0;
const STUDIES = [
  {
    id: ++studyAutoId,
    academic: ["Mathematics"], area: "Category Theories", images: [],
    researchQuestion: "How can numerical values, similar to musical notation, be developed to measure the process of making an artwork from its production to its finished state?",
    terminology: "",
    scopeOfArea: "Category Theory, Mathematical Logic, Data Visualization, Ontology",
    methodology: "Cross-reference the system and structure of musical notation.",
    researchSignificance: "",
    keyWords: "Pitch, rhythm, symmetry—reflection and translation, harmony, rotation, functions and transformations, cross-rhythm",
    references: "",
  },
  {
    id: ++studyAutoId,
    academic: ["East Asian Art History & Culture"], area: "20th Century Korean Art",
    images: [
      { image: "https://picsum.photos/seed/study1/700/500", caption: "Field research, Seoul, 2024." },
      { image: "https://picsum.photos/seed/study2/700/500", caption: "Archive materials reviewed for this study." },
    ],
    researchQuestion: "", terminology: "", scopeOfArea: "", methodology: "",
    researchSignificance: "", keyWords: "", references: "",
  },
  {
    id: ++studyAutoId,
    academic: ["East Asian Art History & Culture"], area: "Korean Architectures from Joseon Period to Contemporary", images: [
      {
        image: "/images/Figure 1, Figure 2.png",
        caption: "Figure 1, Figure 2",
        aspectRatio: "1094 / 418",
      },
      {
        image: "/images/Figure 3, Figure 4.png",
        caption: "Figure 3, Figure 4",
        aspectRatio: "1080 / 436",
      },
      {
        image: "/images/Figure 6, Figure 7.png",
        caption: "Figure 6, Figure 7",
        aspectRatio: "1082 / 740",
      },
      {
        image: "/images/Figure 8, Figure 9.png",
        caption: "Figure 8, Figure 9",
        aspectRatio: "1294 / 1110",
      },
      {
        image: "/images/Figure 10, Figure 11.png",
        caption: "Figure 10, Figure 11",
        aspectRatio: "1128 / 862",
      },
      {
        image: "/images/Figure 12.png",
        caption: "Figure 12",
        aspectRatio: "1106 / 510",
      },
      {
        image: "/images/Figure 13.png",
        caption: "Figure 13",
        aspectRatio: "972 / 538",
      },
      {
        image: "/images/Study on Combination of Hanok Wall.png",
        caption: "Study on Combination of Hanok Wall",
        aspectRatio: "2048 / 1331",
      },
      {
        image: "/images/Study on Tone of Hanok Architecture, 15x16, MDF, 2025.JPG",
        caption: "Study on Tone of Hanok Architecture, 15x16, MDF, 2025",
        aspectRatio: "2048 / 1674",
      },
      {
        image: "/images/Study on Variations of Hanok Wall.png",
        caption: "Study on Variations of Hanok Wall",
        aspectRatio: "2048 / 1315",
      }
    ],
    researchQuestion: "How can architectural tradition be understood as a continuously produced historical process rather than a fixed repertoire of inherited forms, and what does contemporary Korean architecture reveal about this distinction?\n\nDefinition — How have scholars and architects defined what counts as \"traditional Korean architecture\"?\nTranslation — How have those definitions been materialized in contemporary architecture?\nTemporality — Must architectural tradition refer backward to fixed historical forms, or can tradition itself continue to accumulate and change?",
    terminology: "Yangok (洋屋), hanok (韓屋), youngjo (營造), geonchug (建築), buildings (chae) and courtyards (madang), International Style, Koreanness",
    scopeOfArea: "• Korean temples and palaces from the Joseon period that currently exist or are documented in descriptive historical records.\n• East Asian architecture built during a similar time period to the Joseon era.\n• Western architecture built during a similar time period to the Joseon era.\n• The periods in which Western architectural terminology originated.",
    methodology: "• Use visual data from existing architecture and historical documentary records to examine what traditional Korean architecture looks like and identify the frameworks shared across these architectural examples.\n• Conduct comparative analysis with other East Asian traditional architecture to identify the distinctive frameworks of Korean architecture.\n• Define differences among Korean architectural terms and previously associated architectural terms with similar definitions to identify how seemingly similar architectural environments were used and perceived differently.",
    researchSignificance: "Applications of scholarly conversations to actual architectural buildings include the use of traditional materials in interior settings, the construction of houses as exact replicas of traditional architecture, and the presentation of palaces and temples built before the modern era through tourist sites. The essay argues for avoiding the replication of the past and instead developing a theorization of Korean architecture that can continue to accumulate and develop throughout contemporary and future settings.\n\n• The scenery of Korea and the rise of tourism\n• Nationalism and the advancement of social psychology\n• Toward what new significant research?",
    keyWords: "Joseon period, 20th-century Saemaeul Undong (New Village Movement), hanok, giwa",
    references: "",
  },
  {
    id: ++studyAutoId,
    academic: ["Museum Administration", "Behavior Science"], area: "Artwork, Institution, and People", images: [
      {
        image: "/images/Exhibition Space Model for Ceres by Storrs-Floorplan.png",
        caption: "Exhibition Space Model for Ceres by Storrs-Floorplan",
        aspectRatio: "794 / 1120",
      },
      {
        image: "/images/Exhibition Space Model for Ceres by Storrs-Take.1.png",
        caption: "Exhibition Space Model for Ceres by Storrs-Take.1",
        aspectRatio: "678 / 780",
      },
      {
        image: "/images/Exhibition Space Model for Ceres by Storrs-Take.2.png",
        caption: "Exhibition Space Model for Ceres by Storrs-Take.2",
        aspectRatio: "608 / 778",
      },
      {
        image: "/images/Exhibition Space Model for Ceres by Storrs-Take.3.png",
        caption: "Exhibition Space Model for Ceres by Storrs-Take.3",
        aspectRatio: "648 / 778",
      },
      {
        image: "/images/Exhibition Space Model for Ceres by Storrs-Take.4.png",
        caption: "Exhibition Space Model for Ceres by Storrs-Take.4",
        aspectRatio: "532 / 712",
      },
      {
        image: "/images/The Ceres Mood Board - Page 1.png",
        caption: "The Ceres Mood Board - Page 1",
        aspectRatio: "1440 / 810",
      },
      {
        image: "/images/The Ceres Mood Board - Page 2.png",
        caption: "The Ceres Mood Board - Page 2",
        aspectRatio: "1440 / 810",
      }
    ],
    researchQuestion: "How can a comprehensive understanding of museums be developed by bringing together all forms of museum data, including information about visitors, institutions, and artworks?",
    terminology: "",
    scopeOfArea: "Museums and galleries in Chicago, IL, U.S.; Manhattan, NY, U.S.; Seoul, South Korea; and, to a lesser extent, other provinces in South Korea, from 2024–2033.",
    methodology: "• On-site visitor number tracking\n• Measuring different forms of data in museums",
    researchSignificance: "",
    keyWords: "",
    references: "",
  },
];

// Grouped the same way as Projects: "about"/"projects"/"works" labels reuse the nav words,
// positioned by group per the wireframe (Research Question + Terminology under About;
// Scope of Area, Methodology, Research Significance, Key Words under Projects; References under Works).
const STUDY_FIELD_DEFS = [
  { key: "researchQuestion", labelKey: "researchQuestionLabel", group: "about" },
  { key: "terminology", labelKey: "terminologyLabel", group: "about" },
  { key: "scopeOfArea", labelKey: "scopeOfAreaLabel", group: "projects" },
  { key: "methodology", labelKey: "methodologyLabel", group: "projects" },
  { key: "researchSignificance", labelKey: "researchSignificanceLabel", group: "projects" },
  { key: "keyWords", labelKey: "keyWordsLabel", group: "projects" },
  { key: "references", labelKey: "referencesLabel", group: "works" },
];
// "span" is now only a temporary fallback before an image/card is measured; real card height is automatic.
// "mediumIndex" maps to mediumOpts: 0 = Painting, 1 = Sculpture, 2 = Sketch.
// "curated" flags pieces to show when the SELECTIVE media mode is active.
// "medium"/"dimension"/"description" and "detailImages" populate the works-detail page
// that opens when a piece is clicked. Each detailImages entry can take an "image" URL
// and a "caption" — leave image null to keep the placeholder box.
const ARTWORKS = [
  {
    id: 1, title: "The Woman in the Bathtub", date: "2023", span: 30, image: "/images/1026-001-001.jpg",
    mediumIndex: 0, curated: true, medium: "Oil on Canvas", dimension: "18 × 20 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-001.jpg", caption: "" }], // 1026-001-001
  },
  {
    id: 2, title: "Vacant Space", date: "2025", span: 34, image: "/images/1026-001-002.jpg",
    mediumIndex: 0, curated: false, medium: "Oil on Canvas", dimension: "30 × 40 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-002.jpg", caption: "" }], // 1026-001-002
  },
  {
    id: 3, title: "Hallway", date: "2024", span: 30, image: "/images/1026-001-003a.jpg",
    mediumIndex: 0, curated: false, medium: "Acrylic on Canvas", dimension: "40 × 30 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-003a.jpg", caption: "" }], // 1026-001-003a
  },
  {
    id: 4, title: "Hallway (Variation on the Lighting)", date: "2024", span: 30, image: "/images/1026-001-003b.jpg",
    mediumIndex: 0, curated: false, medium: "Acrylic on Canvas", dimension: "40 × 30 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-003b.jpg", caption: "" }], // 1026-001-003b
  },
  {
    id: 5, title: "Measurements for the 'Hallway'", date: "2024", span: 24, image: "/images/1026-001-003c.jpg",
    mediumIndex: 2, curated: false, medium: "Graphite on Paper", dimension: "15 × 10 in",
    description: "",
    detailImages: [
      { image: "/images/1026-001-003c.jpg", caption: "Page 2" }, // 1026-001-003c
      { image: "/images/1026-001-003d.jpg", caption: "Page 3" }, // 1026-001-003d (not in original catalog, added from upload)
    ],
  },
  {
    id: 6, title: "The Gallery", date: "2024", span: 30, image: "/images/1026-001-004a.jpg",
    mediumIndex: 0, curated: false, medium: "Acrylic on Canvas", dimension: "30 × 40 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-004a.jpg", caption: "" }], // 1026-001-004a
  },
  {
    id: 7, title: "The Gallery (Variation on the Lighting)", date: "2024", span: 30, image: "/images/1026-001-004b.jpg",
    mediumIndex: 0, curated: false, medium: "Acrylic on Canvas", dimension: "40 × 30 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-004b.jpg", caption: "" }], // 1026-001-004b
  },
  {
    id: 8, title: "Living Room I", date: "2024", span: 30, image: "/images/1026-001-005a.jpg",
    mediumIndex: 0, curated: false, medium: "Acrylic on Canvas", dimension: "40 × 30 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-005a.jpg", caption: "" }], // 1026-001-005a
  },
  {
    // Merged 005b + 005c — both are lighting variations of the same piece ("Ver 2" / "Ver 3").
    id: 9, title: "Living Room I (Variation on the Lighting)", date: "2024", span: 30, image: "/images/1026-001-005b.jpg",
    mediumIndex: 0, curated: false, medium: "Acrylic on Canvas", dimension: "40 × 30 in",
    description: "",
    detailImages: [
      { image: "/images/1026-001-005b.jpg", caption: "Version 2" }, // 1026-001-005b
      { image: "/images/1026-001-005c.jpg", caption: "Version 3" }, // 1026-001-005c (not in original catalog, added from upload)
    ],
  },
  {
    // Merged from 006a + 015a/b/c — same title, dimensions, and year (see note to confirm).
    // Only 006a is still missing.
    id: 10, title: "Living Room II", date: "2025", span: 30, image: "/images/1026-001-015b.jpg",
    mediumIndex: 0, curated: true, medium: "Acrylic and threads on Canvas", dimension: "40 × 30 in",
    description: "",
    detailImages: [
      { image: null, caption: "" }, // 1026-001-006a
      { image: "/images/1026-001-015a.jpg", caption: "" }, // 1026-001-015a
      { image: "/images/1026-001-015b.jpg", caption: "" }, // 1026-001-015b
      { image: "/images/1026-001-015c.jpg", caption: "" }, // 1026-001-015c
    ],
  },
  {
    id: 11, title: "Perspective of Living Room on Canvas", date: "2025", span: 40, image: "/images/1026-001-006.jpg",
    mediumIndex: 0, curated: false, medium: "Threads and canvas", dimension: "96 × 40 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-006.jpg", caption: "" }], // 1026-001-006
  },
  {
    id: 12, title: "Perspective of Living Room", date: "2025", span: 28, image: null,
    mediumIndex: 2, curated: false, medium: "Digital Image", dimension: "24 × 44 in",
    description: "",
    detailImages: [{ image: null, caption: "" }], // 1026-001-007 — not yet uploaded
  },
  {
    id: 13, title: "Perspective of Living Room (Final Extension)", date: "2025", span: 28, image: "/images/1026-001-008.jpg",
    mediumIndex: 2, curated: false, medium: "Digital Image", dimension: "24 × 44 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-008.jpg", caption: "" }], // 1026-001-008
  },
  {
    id: 14, title: "Woman Posing Upright", date: "2025", span: 36, image: "/images/1026-001-009a.jpg",
    mediumIndex: 2, curated: false, medium: "Charcoal", dimension: "30 × 50 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-009a.jpg", caption: "" }], // 1026-001-009a
  },
  {
    id: 15, title: "Woman Posing Upright (With Digital Rendition)", date: "2025", span: 36, image: "/images/1026-001-009b.jpg",
    mediumIndex: 2, curated: false, medium: "Digital Image", dimension: "",
    description: "",
    detailImages: [{ image: "/images/1026-001-009b.jpg", caption: "" }], // 1026-001-009b
  },
  {
    id: 16, title: "Woman in Reclined Pose", date: "2025", span: 26, image: "/images/1026-001-010.jpg",
    mediumIndex: 2, curated: false, medium: "Charcoal", dimension: "30 × 50 in",
    description: "",
    detailImages: [{ image: "/images/1026-001-010.jpg", caption: "" }], // 1026-001-010
  },
  {
    // Merged from 011a–011g — same title/medium/date across all seven Object IDs.
    id: 17, title: "Agony", date: "2023", span: 34, image: "/images/1026-001-011a.jpg",
    mediumIndex: 1, curated: true,
    medium: "Mixed Media; cardboard, acrylics, plastic vinyl, acrylic liquid, polyester cotton, acrylic paints",
    dimension: "",
    description: "",
    detailImages: [
      { image: "/images/1026-001-011a.jpg", caption: "" }, // 1026-001-011a
      { image: "/images/1026-001-011b.jpg", caption: "" }, // 1026-001-011b
      { image: "/images/1026-001-011c.jpg", caption: "" }, // 1026-001-011c
      { image: "/images/1026-001-011d.jpg", caption: "" }, // 1026-001-011d
      { image: "/images/1026-001-011e.jpg", caption: "" }, // 1026-001-011e
      { image: "/images/1026-001-011f.jpg", caption: "" }, // 1026-001-011f
      { image: "/images/1026-001-011g.jpg", caption: "" }, // 1026-001-011g
    ],
  },
  {
    // Merged from 012a–012c — description was cut off in the PDF, needs the full text.
    id: 18, title: "The Pedestal", date: "2024", span: 34, image: "/images/1026-001-012a.jpg",
    mediumIndex: 1, curated: true,
    medium: "Mixed Media; wooden frames, rhinestones, nylon fabric",
    dimension: "",
    description: "", // TODO: PDF text cut off after "Furthermore, in her work Pedes..."
    detailImages: [
      { image: "/images/1026-001-012a.jpg", caption: "" }, // 1026-001-012a
      { image: "/images/1026-001-012b.jpg", caption: "" }, // 1026-001-012b
      { image: "/images/1026-001-012c.jpg", caption: "" }, // 1026-001-012c
    ],
  },
  {
    id: 19, title: "Balance", date: "2024", span: 32, image: "/images/1026-001-013a.jpg",
    mediumIndex: 1, curated: false, medium: "Metal", dimension: "20 × 15 × 17 in",
    description: "",
    detailImages: [
      { image: "/images/1026-001-013a.jpg", caption: "" }, // 1026-001-013a
      { image: "/images/1026-001-013b.jpg", caption: "" }, // 1026-001-013b, dated 5/10/2024
    ],
  },
  {
    // Merged from 014a–014c — same title/medium/dimension/date across all three.
    id: 20, title: "Cave Painting", date: "2023", span: 32, image: "/images/1026-001-014a.jpg",
    mediumIndex: 1, curated: false,
    medium: "Mixed Media; tape, markers on acrylic panel, cardboard, grind beef",
    dimension: "20 × 15 × 17 in",
    description: "",
    detailImages: [
      { image: "/images/1026-001-014a.jpg", caption: "" }, // 1026-001-014a
      { image: "/images/1026-001-014b.jpg", caption: "" }, // 1026-001-014b
      { image: "/images/1026-001-014c.jpg", caption: "" }, // 1026-001-014c
    ],
  },
];

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function ImageFrame({ src, alt, aspectRatio, containerRef }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        aspectRatio: aspectRatio || undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${hover ? "#1A1B4B" : "#D5D5E4"}`,
        background: "#FAFAF8",
        transition: "border-color 0.3s ease",
        overflow: "hidden",
      }}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <Plus
          size={20}
          strokeWidth={1}
          style={{
            color: hover ? "#1A1B4B" : "#C7C7C2",
            transition: "color 0.3s ease, transform 0.3s ease",
            transform: hover ? "scale(1.15)" : "scale(1)",
          }}
        />
      )}
    </div>
  );
}

function ArtworkCard({ artwork, showCaption, onOpen, frameRef, spanScale = 1, columnWidth }) {
  const [ref, visible] = useFadeIn();
  const [hover, setHover] = useState(false);
  const [naturalRatio, setNaturalRatio] = useState(null); // width / height of the real image
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) setNaturalRatio(naturalWidth / naturalHeight);
  };

  // Measure the card's NATURAL content height (image at its real aspect ratio +
  // optional caption + bottom spacing), then convert that height to 8px masonry rows.
  // The gallery itself uses rowGap: 0; the 28px visual gap lives inside each card.
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setContentHeight(el.getBoundingClientRect().height);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [showCaption, naturalRatio, columnWidth]);

  const span = contentHeight
    ? Math.max(1, Math.ceil(contentHeight / 8))
    : Math.max(1, Math.round(artwork.span * spanScale));

  return (
    <div
      ref={ref}
      onClick={() => onOpen(artwork)}
      style={{
        gridRowEnd: `span ${span}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        cursor: "pointer",
        boxSizing: "border-box",
        alignSelf: "start",
      }}
    >
      <div ref={contentRef} style={{ paddingBottom: 28, boxSizing: "border-box" }}>
        <div
          ref={frameRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            aspectRatio: naturalRatio ? `${naturalRatio}` : "4 / 3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${hover ? "#1A1B4B" : "#D5D5E4"}`,
            background: "#FAFAF8",
            transition: "border-color 0.3s ease",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {artwork.image ? (
            <img
              src={artwork.image}
              alt={artwork.title}
              onLoad={handleLoad}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : (
            <Plus
              size={20}
              strokeWidth={1}
              style={{
                color: hover ? "#1A1B4B" : "#C7C7C2",
                transition: "color 0.3s ease, transform 0.3s ease",
                transform: hover ? "scale(1.15)" : "scale(1)",
              }}
            />
          )}
        </div>
        {showCaption && (
          <div style={{ paddingTop: 10, fontFamily: "'Work Sans', sans-serif" }}>
            <div style={{ fontSize: 13, letterSpacing: "0.01em", color: "#1A1B4B" }}>
              {artwork.title}
            </div>
            <div style={{ fontSize: 12, color: "#9A9A94" }}>{artwork.date}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function WorksSlideshow({ artworks, showCaption, onOpen, registerFrame }) {
  const [index, setIndex] = useState(0);
  const [ratio, setRatio] = useState(16 / 10); // matches current image once loaded; sensible default before that
  const safeIndex = artworks.length ? index % artworks.length : 0;
  const current = artworks[safeIndex];

  useEffect(() => {
    if (index >= artworks.length) setIndex(0);
  }, [artworks.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRatio(16 / 10); // reset to default until the new slide's image reports its real ratio
  }, [safeIndex]);

  if (!current) return null;

  const prev = () => setIndex((i) => (i - 1 + artworks.length) % artworks.length);
  const next = () => setIndex((i) => (i + 1) % artworks.length);

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) setRatio(naturalWidth / naturalHeight);
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid #A9AAD1",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border-color 0.25s ease",
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${ratio}`,
          border: "1px solid #D5D5E4",
          background: "#FAFAF8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          cursor: "pointer",
        }}
        ref={registerFrame(current.id)}
        onClick={() => onOpen(current)}
      >
        {current.image ? (
          <img
            src={current.image}
            alt={current.title}
            onLoad={handleLoad}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <Plus size={28} strokeWidth={1} style={{ color: "#C7C7C2" }} />
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          style={{ ...arrowStyle, left: 16 }}
          aria-label="Previous"
        >
          <ChevronLeft size={16} strokeWidth={1.5} style={{ color: "#1A1B4B" }} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          style={{ ...arrowStyle, right: 16 }}
          aria-label="Next"
        >
          <ChevronRight size={16} strokeWidth={1.5} style={{ color: "#1A1B4B" }} />
        </button>
      </div>

      {showCaption(current) && (
        <div style={{ paddingTop: 12, fontFamily: "'Work Sans', sans-serif" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.01em", color: "#1A1B4B" }}>{current.title}</div>
          <div style={{ fontSize: 12, color: "#9A9A94" }}>{current.date}</div>
        </div>
      )}

      <div style={{ marginTop: 10, fontSize: 11, color: "#9A9A94", fontFamily: "'Jost', sans-serif", letterSpacing: "0.05em" }}>
        {safeIndex + 1} / {artworks.length}
      </div>
    </div>
  );
}

function WorkDetail({ artwork, lang, firstImageRef }) {
  const [imageSide, setImageSide] = useState("left"); // toggle to preview images on the right instead
  const images = artwork.detailImages && artwork.detailImages.length ? artwork.detailImages : [{ image: artwork.image, caption: "" }];
  const fields = [
    { label: lang === "ko" ? "제목" : "Title", value: artwork.title },
    { label: lang === "ko" ? "날짜" : "Date", value: artwork.date },
    { label: lang === "ko" ? "매체" : "Medium", value: artwork.medium },
    { label: lang === "ko" ? "크기" : "Dimension", value: artwork.dimension },
  ].filter((f) => f.value);

  return (
    <div>
      {/* Example toggle — lets you compare images-left vs images-right live.
          Remove this button once you've decided which layout to keep. */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["left", "right"].map((side) => (
          <button
            key={side}
            onClick={() => setImageSide(side)}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: 10,
              letterSpacing: "0.1em",
              padding: "5px 12px",
              borderRadius: 999,
              background: imageSide === side ? "#EDEDEA" : "transparent",
              color: "#1A1B4B",
              border: "1px solid #E2E2ED",
              cursor: "pointer",
              transition: "background 0.25s ease",
            }}
          >
            {lang === "ko" ? (side === "left" ? "이미지: 왼쪽" : "이미지: 오른쪽") : `IMAGES: ${side.toUpperCase()}`}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div
          style={{
            flex: "1 1 520px",
            display: "flex",
            flexDirection: "column",
            gap: 44,
            order: imageSide === "right" ? 2 : 1,
          }}
        >
          {images.map((img, i) => (
            <div key={i}>
              <ImageFrame src={img.image} alt={artwork.title} containerRef={i === 0 ? firstImageRef : undefined} />
              {img.caption && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 12,
                    fontStyle: "italic",
                    color: "#9A9A94",
                    fontFamily: "'Work Sans', sans-serif",
                  }}
                >
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: "1 1 280px", position: "sticky", top: 0, order: imageSide === "right" ? 1 : 2 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
            {fields.map((f) => (
              <div key={f.label}>
                <div
                  style={{
                    fontSize: 10,
                    color: "#9A9A94",
                    letterSpacing: "0.12em",
                    fontFamily: "'Jost', sans-serif",
                    marginBottom: 2,
                  }}
                >
                  {f.label}
                </div>
                <div style={{ fontSize: 14, color: "#1A1B4B", fontFamily: "'Work Sans', sans-serif" }}>{f.value}</div>
              </div>
            ))}
          </div>
          {artwork.description && (
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.75,
                color: "#333333",
                whiteSpace: "pre-line",
                fontFamily: "'Work Sans', sans-serif",
              }}
            >
              {artwork.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ReturnButton({ onClick, initials = "CA" }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Return"
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: `1px solid ${hover ? "#1A1B4B" : "#A9AAD1"}`,
        background: hover ? "#EDEDEA" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontFamily: "'Jost', sans-serif",
        fontSize: 12,
        letterSpacing: "0.03em",
        color: "#1A1B4B",
        fontWeight: hover ? 700 : 400, // intentionally no transition — bolds instantly on hover
      }}
    >
      {initials}
    </button>
  );
}

function AboutBody({ lang, t, sections }) {
  const [email, setEmail] = useState("");
  const [subjectIdx, setSubjectIdx] = useState(null);
  const [message, setMessage] = useState("");
  const subjectKeys = ["projects", "studies", "works", "about"];
  const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;

  const handleMessageChange = (e) => {
    const val = e.target.value;
    const words = val.trim() ? val.trim().split(/\s+/) : [];
    if (words.length <= 100) {
      setMessage(val);
    } else {
      setMessage(words.slice(0, 100).join(" "));
    }
  };

  const handleSend = () => {
    const subjectLabel = subjectIdx !== null ? t[subjectKeys[subjectIdx]] : "";
    const mailSubject = `Portfolio inquiry${subjectLabel ? " — " + subjectLabel : ""}`;
    const body = `${email ? "Reply to: " + email + "\n\n" : ""}${message}`;
    window.location.href = `mailto:jshim10@artic.edu?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  };

  const showText = sections.description || sections.bio;

  return (
    <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
      {/* Description / Bio */}
      <div
        style={{
          flex: sections.contact ? "1 1 480px" : "1 1 620px",
          maxWidth: sections.contact ? 560 : 760,
          transition: "max-width 0.4s ease, flex-basis 0.4s ease",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          fontFamily: "'Work Sans', sans-serif",
        }}
      >
        {showText ? (
          <>
            {sections.description &&
              ABOUT_CONTENT.description.map((p, i) => (
                <p key={"d" + i} style={{ fontSize: 13.5, lineHeight: 1.85, color: "#333333", margin: 0 }}>
                  {p}
                </p>
              ))}
            {sections.bio &&
              ABOUT_CONTENT.bio.map((p, i) => (
                <p key={"b" + i} style={{ fontSize: 13.5, lineHeight: 1.85, color: "#333333", margin: 0 }}>
                  {p}
                </p>
              ))}
          </>
        ) : (
          <p style={{ fontSize: 13, color: "#9A9A94", fontStyle: "italic", margin: 0 }}>{t.selectSection}</p>
        )}
      </div>

      {/* Contact */}
      {sections.contact && (
        <div style={{ flex: "0 0 300px", marginLeft: "auto", fontFamily: "'Work Sans', sans-serif" }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              fontFamily: "'Jost', sans-serif",
              color: "#1A1B4B",
              marginBottom: 28,
            }}
          >
            {t.leaveMail}
          </div>

          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#9A9A94", fontFamily: "'Jost', sans-serif", marginBottom: 6 }}>
              {t.emailAddress}
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #D5D5E4",
                padding: "4px 0",
                fontSize: 13,
                fontFamily: "'Work Sans', sans-serif",
                outline: "none",
                background: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#9A9A94", fontFamily: "'Jost', sans-serif", marginBottom: 8 }}>
              {t.subject}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {subjectKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setSubjectIdx((cur) => (cur === i ? null : i))}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    padding: "5px 12px",
                    borderRadius: 999,
                    background: subjectIdx === i ? "#EDEDEA" : "transparent",
                    color: "#1A1B4B",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.25s ease",
                  }}
                >
                  {t[key]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#9A9A94", fontFamily: "'Jost', sans-serif", marginBottom: 6 }}>
              {t.descriptionLimit}
            </div>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows={5}
              style={{
                width: "100%",
                border: "1px solid #D5D5E4",
                padding: 10,
                fontSize: 13,
                fontFamily: "'Work Sans', sans-serif",
                outline: "none",
                resize: "vertical",
              }}
            />
            <div style={{ fontSize: 10, color: "#C7C7C2", marginTop: 4, textAlign: "right" }}>{wordCount}/100</div>
          </div>

          {message.trim().length > 0 && (
            <button
              onClick={handleSend}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "1px solid #1A1B4B",
                borderRadius: 999,
                padding: "7px 16px",
                cursor: "pointer",
                fontFamily: "'Jost', sans-serif",
                fontSize: 11,
                letterSpacing: "0.08em",
                color: "#1A1B4B",
                marginTop: 4,
              }}
            >
              <Send size={12} strokeWidth={1.5} />
              {lang === "ko" ? "보내기" : "SEND"}
            </button>
          )}

          <div
            style={{
              marginTop: 40,
              fontSize: 11,
              color: "#9A9A94",
              letterSpacing: "0.04em",
              fontFamily: "'Jost', sans-serif",
            }}
          >
            {t.furtherInquiries}
            <br />
            jshim10@artic.edu
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectRowGallery({ images }) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        padding: "18px 0 22px 0",
        animation: "rowExpand 0.35s ease",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 360 }}>
        {images.map((img, i) => (
          <div key={i}>
            <ImageFrame src={img.image} alt={img.caption} aspectRatio={img.aspectRatio || "4 / 3"} />
            {img.caption && (
              <div style={{ marginTop: 8, fontSize: 11, fontStyle: "italic", color: "#9A9A94", fontFamily: "'Work Sans', sans-serif" }}>
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsList({ projects, selectedId, onSelect, colTemplate }) {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (id, e) => {
    e.stopPropagation();
    setExpandedRows((r) => ({ ...r, [id]: !r[id] }));
  };

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {projects.map((p) => {
        const isSelected = p.id === selectedId;
        const isOpen = !!expandedRows[p.id];
        return (
          <div
            key={p.id}
            style={{
              display: "grid",
              gridTemplateColumns: colTemplate,
              alignItems: "center",
              background: isSelected ? "#EDEDEA" : "transparent",
              borderRadius: 14,
              cursor: "pointer",
              transition: "background 0.25s ease",
              padding: "9px 10px",
            }}
            onClick={() => onSelect(p.id)}
          >
            <span style={{ fontSize: 11.5 }}>{p.year}</span>
            <span style={{ fontSize: 11.5, color: "#9A9A94" }}>{p.season}</span>
            <span style={{ fontSize: 11.5, color: "#9A9A94" }}>{p.type}</span>
            <span style={{ fontSize: 11.5 }}>{p.org}</span>
            <span style={{ fontSize: 11.5, color: "#9A9A94" }}>{p.location}</span>
            <span style={{ fontSize: 11.5, letterSpacing: "0.02em" }}>{p.title}</span>
            <button
              onClick={(e) => toggleRow(p.id, e)}
              aria-label="Toggle project images"
              style={{
                justifySelf: "end",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight
                size={15}
                strokeWidth={1.5}
                style={{
                  color: "#9A9A94",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>
            {isOpen && p.images && p.images.length > 0 && <ProjectRowGallery images={p.images} />}
          </div>
        );
      })}
    </div>
  );
}

function ProjectField({ def, project, t }) {
  const hasContent = fieldHasContent(project, def);
  const [open, setOpen] = useState(hasContent);

  return (
    <div style={{ borderBottom: "1px solid #EDEDEA", padding: "10px 0" }}>
      <button
        onClick={() => hasContent && setOpen((o) => !o)}
        disabled={!hasContent}
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 11.5,
          letterSpacing: "0.08em",
          padding: "4px 12px",
          borderRadius: 999,
          background: open ? "#EDEDEA" : "transparent",
          color: hasContent ? "#1A1B4B" : "#C7C7C2",
          border: "none",
          cursor: hasContent ? "pointer" : "default",
          transition: "background 0.25s ease",
        }}
      >
        {t[def.labelKey]}
      </button>

      {hasContent && open && (
        <div style={{ marginTop: 12, paddingLeft: 4, fontFamily: "'Work Sans', sans-serif" }}>
          {def.kind === "list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {project[def.key].map((line, i) => (
                <div key={i} style={{ fontSize: 13, color: "#333333" }}>
                  {line}
                </div>
              ))}
            </div>
          )}

          {def.kind === "experience" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {project.experience.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 40,
                    flexWrap: "wrap",
                    paddingTop: i === 0 ? 0 : 14,
                    borderTop: i === 0 ? "none" : "1px solid #EDEDEA",
                  }}
                >
                  <div style={{ flex: "1 1 260px", fontSize: 13, color: "#333333", lineHeight: 1.6 }}>{row.left}</div>
                  <div style={{ flex: "1 1 320px", fontSize: 13, color: "#333333", lineHeight: 1.6 }}>{row.right}</div>
                </div>
              ))}
            </div>
          )}

          {def.kind === "institution" && (
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <p style={{ flex: "1 1 380px", fontSize: 13, color: "#333333", lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                {project.institutionDesc}
              </p>
              <div style={{ width: 64, height: 64, flexShrink: 0 }}>
                <ImageFrame src={project.institutionLogo} alt="Institution logo" aspectRatio="1 / 1" />
              </div>
            </div>
          )}

          {!def.kind && (
            <p style={{ fontSize: 13, color: "#333333", lineHeight: 1.7, margin: 0, maxWidth: 640, whiteSpace: "pre-line" }}>{project[def.key]}</p>
          )}
        </div>
      )}
    </div>
  );
}

function FieldAccordion({ item, fieldDefs, t, emptyMessage }) {
  let lastGroup = null;
  if (!item) return <p style={{ fontSize: 13, color: "#9A9A94" }}>{emptyMessage}</p>;
  return (
    <div>
      {fieldDefs.map((def) => {
        const showGroupLabel = def.group !== lastGroup;
        lastGroup = def.group;
        return (
          <div key={item.id + "-" + def.key} style={{ display: "flex", gap: 24 }}>
            <div style={{ width: 80, flexShrink: 0, paddingTop: 14 }}>
              {showGroupLabel && (
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: "#9A9A94",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  {t[def.group]}
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ProjectField def={def} project={item} t={t} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProjectsBody({ lang, t }) {
  const [selectedId, setSelectedId] = useState(PROJECTS[2].id); // default to the fully-populated example row
  const project = PROJECTS.find((p) => p.id === selectedId);
  const colTemplate = "56px 74px 110px 1.4fr 160px 1.6fr 28px";

  return (
    <div>
      <ProjectsList projects={PROJECTS} selectedId={selectedId} onSelect={setSelectedId} colTemplate={colTemplate} />
      <div style={{ marginTop: 40, borderTop: "1px solid #E2E2ED", paddingTop: 24 }}>
        <FieldAccordion item={project} fieldDefs={FIELD_DEFS} t={t} emptyMessage={t.selectProject} />
      </div>
    </div>
  );
}

function StudiesList({ studies, selectedId, onSelect }) {
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (id, e) => {
    e.stopPropagation();
    setExpandedRows((r) => ({ ...r, [id]: !r[id] }));
  };

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif" }}>
      {studies.map((s) => {
        const isSelected = s.id === selectedId;
        const isOpen = !!expandedRows[s.id];
        return (
          <div
            key={s.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.6fr 28px",
              alignItems: "center",
              background: isSelected ? "#EDEDEA" : "transparent",
              borderRadius: 14,
              cursor: "pointer",
              transition: "background 0.25s ease",
              padding: "10px 10px",
            }}
            onClick={() => onSelect(s.id)}
          >
            <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {s.academic.map((a, i) => (
                <span key={i} style={{ fontSize: 11.5 }}>
                  {a}
                </span>
              ))}
            </span>
            <span style={{ fontSize: 11.5, color: "#9A9A94" }}>{s.area}</span>
            <button
              onClick={(e) => toggleRow(s.id, e)}
              aria-label="Toggle study images"
              style={{
                justifySelf: "end",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronRight
                size={15}
                strokeWidth={1.5}
                style={{
                  color: "#9A9A94",
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </button>
            {isOpen && s.images && s.images.length > 0 && <ProjectRowGallery images={s.images} />}
          </div>
        );
      })}
    </div>
  );
}

function StudiesBody({ lang, t }) {
  const [selectedId, setSelectedId] = useState(STUDIES[1].id); // default to the row highlighted in the wireframe
  const study = STUDIES.find((s) => s.id === selectedId);

  return (
    <div>
      <StudiesList studies={STUDIES} selectedId={selectedId} onSelect={setSelectedId} />
      <div style={{ marginTop: 40, borderTop: "1px solid #E2E2ED", paddingTop: 24 }}>
        <FieldAccordion item={study} fieldDefs={STUDY_FIELD_DEFS} t={t} emptyMessage={t.selectStudy} />
      </div>
    </div>
  );
}

function FilterLabel({ label }) {
  return (
    <span
      style={{
        fontSize: 10,
        color: "#9A9A94",
        letterSpacing: "0.12em",
        fontFamily: "'Jost', sans-serif",
        textAlign: "center",
      }}
    >
      {label}
    </span>
  );
}

function FilterPills({ options, selected, onSelect, multi }) {
  const isActive = (i) => (multi ? selected.includes(i) : selected === i);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      {options.map((opt, i) => (
        <button
          key={opt}
          onClick={() => onSelect(i)}
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 11,
            letterSpacing: "0.08em",
            padding: "5px 12px",
            borderRadius: 999,
            background: isActive(i) ? "#EDEDEA" : "transparent",
            color: "#1A1B4B",
            border: "none",
            cursor: "pointer",
            transition: "background 0.25s ease",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedNav, setSelectedNav] = useState(0); // index into navKeys
  const [selectedMediums, setSelectedMediums] = useState([0]); // multi-select, at least 1 required
  const [filters, setFilters] = useState({ media: 2, layout: 1, order: 1 });
  const [selectedWork, setSelectedWork] = useState(null); // artwork object when a works-detail page is open
  const [aboutSections, setAboutSections] = useState({ description: true, bio: false, contact: false });
  const toggleAboutSection = (key) => setAboutSections((s) => ({ ...s, [key]: !s[key] }));

  // Shared-element transition: the clicked thumbnail grows into the detail page's first image.
  const cardFrameRefs = useRef({});
  const detailFirstImageRef = useRef(null);
  const openTransitionRect = useRef(null);

  const openWork = (artwork) => {
    const el = cardFrameRefs.current[artwork.id];
    if (el) openTransitionRect.current = el.getBoundingClientRect();
    setSelectedWork(artwork);
  };

  useLayoutEffect(() => {
    if (!selectedWork) return;
    const old = openTransitionRect.current;
    const el = detailFirstImageRef.current;
    if (!old || !el) return;
    const now = el.getBoundingClientRect();
    const dx = old.left - now.left;
    const dy = old.top - now.top;
    const sx = old.width / now.width;
    const sy = old.height / now.height;
    el.style.transformOrigin = "top left";
    el.style.transition = "none";
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    void el.offsetWidth; // force reflow
    requestAnimationFrame(() => {
      el.style.transition = "transform 0.55s cubic-bezier(0.65,0,0.35,1)";
      el.style.transform = "translate(0px, 0px) scale(1, 1)";
    });
    openTransitionRect.current = null;
  }, [selectedWork]);

  const t = translations[lang];
  const navKeys = ["works", "projects", "studies", "about"];
  const currentSection = navKeys[selectedNav];
  const HEADER_H = 104; // shared height for the corner box + filter bar row, so their divider lines align

  // FLIP animation: the clicked label physically travels from its list position into the box.
  const navRefs = useRef({});
  const pendingRects = useRef(null);

  const handleNavClick = (idx) => {
    if (selectedWork) {
      // Coming back from a detail page — the box currently shows the return button,
      // not a nav label, so there's nothing to FLIP from. Just switch views directly.
      setSelectedWork(null);
      setSelectedNav(idx);
      return;
    }
    if (idx === selectedNav) return;
    const rects = {};
    navKeys.forEach((k) => {
      const el = navRefs.current[k];
      if (el) rects[k] = el.getBoundingClientRect();
    });
    pendingRects.current = rects;
    setSelectedNav(idx);
  };

  useLayoutEffect(() => {
    const prev = pendingRects.current;
    if (!prev) return;
    navKeys.forEach((k) => {
      const el = navRefs.current[k];
      const old = prev[k];
      if (!el || !old) return;
      const now = el.getBoundingClientRect();
      const dx = old.left - now.left;
      const dy = old.top - now.top;
      const sx = old.width / now.width;
      const sy = old.height / now.height;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
      el.style.transformOrigin = "top left";
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      void el.offsetWidth; // force reflow
      requestAnimationFrame(() => {
        el.style.transition = "transform 0.5s cubic-bezier(0.65,0,0.35,1)";
        el.style.transform = "translate(0px, 0px) scale(1, 1)";
      });
    });
    pendingRects.current = null;
  }, [selectedNav]);

  const toggleFilter = (key, i) => {
    setFilters((f) => ({ ...f, [key]: f[key] === i ? null : i }));
  };

  const toggleMedium = (i) => {
    setSelectedMediums((prev) => {
      if (prev.includes(i)) {
        if (prev.length === 1) return prev; // must keep at least one selected
        return prev.filter((x) => x !== i);
      }
      return [...prev, i];
    });
  };

  // Medium always filters which pieces appear. Media controls captions only:
  // IMAGES (0): hide captions on everything. WORDS (1) / null: show captions on everything.
  // SELECTIVE (2): show captions only on pieces marked "curated" — every piece still appears.
  const visibleArtworks = ARTWORKS.filter((a) => selectedMediums.includes(a.mediumIndex));
  const shouldShowCaption = (artwork) => {
    if (filters.media === 0) return false;
    if (filters.media === 2) return artwork.curated;
    return true;
  };

  // ORDER: CHRONO (0) sorts by date ascending, ALPHABET (1) sorts by title A–Z,
  // THEMATIC (2) / unset leaves pieces in the order you wrote them in the ARTWORKS
  // array — that's your manual curation, so reorder the array itself to change it.
  const sortedArtworks = [...visibleArtworks];
  if (filters.order === 0) {
    sortedArtworks.sort((a, b) => parseInt(a.date, 10) - parseInt(b.date, 10));
  } else if (filters.order === 1) {
    sortedArtworks.sort((a, b) => a.title.localeCompare(b.title));
  }

  const registerFrame = (id) => (el) => {
    cardFrameRefs.current[id] = el;
  };

  // Measure the gallery's available width so ArtworkCard can size each box to match
  // its image's real aspect ratio (no cropping), instead of a fixed guess.
  const galleryRef = useRef(null);
  const [galleryWidth, setGalleryWidth] = useState(0);
  useLayoutEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const update = () => setGalleryWidth(el.getBoundingClientRect().width);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, [currentSection, filters.layout]);

  const galleryColumns = filters.layout === 2 ? 2 : 4;
  const galleryGap = 28;
  const columnWidth = galleryWidth ? (galleryWidth - galleryGap * (galleryColumns - 1)) / galleryColumns : 0;

  return (
    <div
      style={{
        background: "#FFFFFF",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Work Sans', sans-serif",
        color: "#1A1B4B",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600&family=Work+Sans:wght@400;500&display=swap');
        @keyframes rowExpand {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* Upper Works-filter divider — spans the entire viewport, including the sidebar. */}
      {currentSection === "works" && !selectedWork && (
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            height: 1,
            background: "#E2E2ED",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      )}

      {/* Single continuous horizontal divider — drawn once, spanning full width, so it's
          guaranteed pixel-straight where it crosses the sidebar's vertical line, instead of
          relying on two separate borders lining up exactly. */}
      <div
        style={{
          position: "absolute",
          top: HEADER_H,
          left: 0,
          right: 0,
          height: 1,
          background: "#E2E2ED",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ display: "flex", height: "100%" }}>
        {/* Sidebar — fixed, always visible, never scrolls */}
        <div
          style={{
            width: 168,
            flexShrink: 0,
            borderRight: "1px solid #E2E2ED",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          {/* Corner box — text sits near the bottom-right, where the sidebar's vertical line
              actually meets the header row's horizontal line */}
          <div
            style={{
              height: HEADER_H,
              flexShrink: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              paddingRight: 24,
              paddingBottom: 14,
              boxSizing: "border-box",
            }}
          >
            {selectedWork ? (
              <ReturnButton onClick={() => setSelectedWork(null)} />
            ) : (
              <span
                ref={(el) => (navRefs.current[navKeys[selectedNav]] = el)}
                style={{
                  display: "inline-block",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  letterSpacing: "0.34em",
                  color: "#1A1B4B",
                }}
              >
                {t[navKeys[selectedNav]]}
              </span>
            )}
          </div>

          {/* Remaining nav items — equal-height row bands guarantee identical spacing
              between each one, independent of the language block below. */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "28px 24px 0 16px",
              minHeight: 0,
            }}
          >
            <div style={{ flex: 1, display: "grid", gridTemplateRows: "repeat(3, 1fr)", minHeight: 0 }}>
              {navKeys.map((key, idx) =>
                idx === selectedNav ? null : (
                  <button
                    key={key}
                    ref={(el) => (navRefs.current[key] = el)}
                    onClick={() => handleNavClick(idx)}
                    style={{
                      display: "block",
                      width: "100%",
                      alignSelf: "start",
                      textAlign: "right",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 12.5,
                      letterSpacing: "0.3em",
                      fontWeight: 400,
                      color: "#9A9A94",
                      padding: 0,
                      transition: "color 0.25s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1B4B")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9A9A94")}
                  >
                    {t[key]}
                  </button>
                )
              )}
            </div>

            <div style={{ paddingBottom: 28 }}>
              <div
                style={{
                  fontSize: 10,
                  marginBottom: 8,
                  color: "#9A9A94",
                  letterSpacing: "0.3em",
                  fontFamily: "'Jost', sans-serif",
                  textAlign: "right",
                }}
              >
                {t.language}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button
                  onClick={() => setLang("en")}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "right",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    color: lang === "en" ? "#1A1B4B" : "#C7C7C2",
                    transition: "color 0.25s ease",
                    padding: 0,
                  }}
                >
                  ENG
                </button>
                <button
                  onClick={() => setLang("ko")}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "right",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: lang === "ko" ? "#1A1B4B" : "#C7C7C2",
                    transition: "color 0.25s ease",
                    padding: 0,
                  }}
                >
                  한국어
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", minWidth: 0 }}>
          {/* Header row — fixed, aligns with the corner box height. Content depends on the active section. */}
          <div
            style={{
              height: HEADER_H,
              flexShrink: 0,
              padding: "0 44px",
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            {currentSection === "works" && (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    gridTemplateRows: "26px 30px 48px",
                    columnGap: 40,
                    rowGap: 0,
                    alignItems: "center",
                    overflowX: "auto",
                  }}
                >
                <div
                  style={{
                    gridColumn: "1 / 3",
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    fontFamily: "'Jost', sans-serif",
                    color: "#1A1B4B",
                    transform: "translateY(6px)",
                  }}
                >
                  {t.content}
                </div>
                <div
                  style={{
                    gridColumn: "3 / 5",
                    textAlign: "center",
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    fontFamily: "'Jost', sans-serif",
                    color: "#1A1B4B",
                    transform: "translateY(6px)",
                  }}
                >
                  {t.context}
                </div>

                <FilterLabel label={t.medium} />
                <FilterLabel label={t.media} />
                <FilterLabel label={t.layout} />
                <FilterLabel label={t.order} />

                <FilterPills options={t.mediumOpts} selected={selectedMediums} onSelect={toggleMedium} multi />
                <FilterPills options={t.mediaOpts} selected={filters.media} onSelect={(i) => toggleFilter("media", i)} />
                <FilterPills options={t.layoutOpts} selected={filters.layout} onSelect={(i) => toggleFilter("layout", i)} />
                <FilterPills options={t.orderOpts} selected={filters.order} onSelect={(i) => toggleFilter("order", i)} />
                </div>
              </>
            )}

            {currentSection === "about" && (
              <div style={{ display: "flex", gap: 8 }}>
                {["description", "bio", "contact"].map((key) => (
                  <button
                    key={key}
                    onClick={() => toggleAboutSection(key)}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      padding: "6px 14px",
                      borderRadius: 999,
                      background: aboutSections[key] ? "#EDEDEA" : "transparent",
                      color: "#1A1B4B",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.25s ease",
                    }}
                  >
                    {t[key]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Body — the only region that scrolls. Content depends on the active section. */}
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 44px 60px" }}>
            {currentSection === "works" &&
              (selectedWork ? (
                <WorkDetail artwork={selectedWork} lang={lang} firstImageRef={detailFirstImageRef} />
              ) : filters.layout === 0 ? (
                <WorksSlideshow
                  artworks={sortedArtworks}
                  showCaption={shouldShowCaption}
                  onOpen={openWork}
                  registerFrame={registerFrame}
                />
              ) : (
                <div
                  ref={galleryRef}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${galleryColumns}, 1fr)`,
                    gridAutoRows: "8px",
                    columnGap: 28,
                    rowGap: 0,
                  }}
                >
                  {sortedArtworks.map((a) => (
                    <ArtworkCard
                      key={a.id}
                      artwork={a}
                      showCaption={shouldShowCaption(a)}
                      onOpen={openWork}
                      frameRef={registerFrame(a.id)}
                      spanScale={filters.layout === 2 ? 2 : 1}
                      columnWidth={columnWidth}
                    />
                  ))}
                </div>
              ))}

            {currentSection === "about" && <AboutBody lang={lang} t={t} sections={aboutSections} />}

            {currentSection === "projects" && <ProjectsBody lang={lang} t={t} />}

            {currentSection === "studies" && <StudiesBody lang={lang} t={t} />}
          </div>
        </div>
      </div>
    </div>
  );
}
