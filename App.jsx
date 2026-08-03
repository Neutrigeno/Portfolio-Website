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
  replace the placeholder box automatically, cropped (not stretched) to fit
  whatever size you set via "span".
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
    images: [], purpose: "", role: [], team: "", projectsField: "", goal: "", procedure: "", skills: "",
    impact: "", experience: [], takeaway: "", institutionDesc: "", institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2026, season: "WINTER", type: "CURATORIAL",
    org: "CHICAGO PUBLIC LIBRARY", location: "CHICAGO, IL US",
    title: "COLLECTION / CATEGORIZATION",
    images: [], purpose: "", role: [], team: "", projectsField: "", goal: "", procedure: "", skills: "",
    impact: "", experience: [], takeaway: "", institutionDesc: "", institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2025, season: "WINTER", type: "CURATORIAL",
    org: "MINNEKIRKEN", location: "CHICAGO, IL US",
    title: "PROFESSIONAL PRACTICE",
    images: [], purpose: "", role: [], team: "", projectsField: "", goal: "", procedure: "", skills: "",
    impact: "", experience: [], takeaway: "", institutionDesc: "", institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2025, season: "WINTER", type: "CURATORIAL",
    org: "UKRAINIAN INSTITUTE OF MODERN ART", location: "CHICAGO, IL US",
    title: "AFTER LINE, BEFORE FORM",
    images: [
      { image: "https://picsum.photos/seed/uima1/700/500", caption: "Installation view, Ukrainian Institute of Modern Art." },
      { image: "https://picsum.photos/seed/uima2/700/500", caption: "Detail, opening reception." },
    ],
    purpose: "To learn about the perspectives of foreigners and scholars on the history and the ongoing interaction between South and North Korea.",
    role: ["Simultaneous Interpretor", "Group Assistant"],
    team: "",
    projectsField: "",
    goal: "",
    procedure: "",
    skills: "",
    impact: "Assisted in organizing visits to seven historical Museums focused on North and South Korean history in Gosong, Gangwon province (KR).",
    experience: [
      {
        left: "Translating Korean historical & political jargons for non-Koreans",
        right: "Reading news about topic relating to North Korea from both the perspective of Korea and United States through 매일경제(Meil Economy News), 동아일보 The Donga-Ilbo, CFR (Council of Foreign Relation), and BBC helped a lot.",
      },
      {
        left: "Simultaneously translating fast-paced Museum docent tour",
        right: "Additionally giving more precise translated context through writing.",
      },
    ],
    takeaway: "",
    institutionDesc: "The Ministry of Unification oversees the formulation of policies related to unification, inter-Korean dialogue, exchange and cooperation, and humanitarian assistance; the analysis of North Korean affairs; unification education and public relations; and other matters concerning unification.",
    institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2024, season: "SUMMER", type: "INTERPRETATION",
    org: "KOREA MINISTRY OF UNIFICATION", location: "GOSEONG, GANGWON KR",
    title: "KOREA NORTH & SOUTH UNION PROGRAM",
    images: [], purpose: "", role: [], team: "", projectsField: "", goal: "", procedure: "", skills: "",
    impact: "", experience: [], takeaway: "", institutionDesc: "", institutionLogo: null,
  },
  {
    id: ++projectAutoId,
    year: 2022, season: "FALL", type: "CURATORIAL",
    org: "INTERNATIONAL YOUTH EXCHANGE FOUNDATION", location: "SEONGNAM, GYEONGGI KR",
    title: "GLOBAL YOUTH IN ACTION",
    images: [], purpose: "", role: [], team: "", projectsField: "", goal: "", procedure: "", skills: "",
    impact: "", experience: [], takeaway: "", institutionDesc: "", institutionLogo: null,
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
    researchQuestion: "", terminology: "", scopeOfArea: "", methodology: "",
    researchSignificance: "", keyWords: "", references: "",
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
    academic: ["East Asian Art History & Culture"], area: "Korean Architectures from Joseon Period to Contemporary", images: [],
    researchQuestion: "", terminology: "", scopeOfArea: "", methodology: "",
    researchSignificance: "", keyWords: "", references: "",
  },
  {
    id: ++studyAutoId,
    academic: ["Museum Administration", "Behavior Science"], area: "Artwork, Institution, and People", images: [],
    researchQuestion: "", terminology: "", scopeOfArea: "", methodology: "",
    researchSignificance: "", keyWords: "", references: "",
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
// "span" controls the box's relative height in the masonry grid (grid rows of 8px each).
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

function ArtworkCard({ artwork, showCaption, onOpen, frameRef, spanScale = 1 }) {
  const [ref, visible] = useFadeIn();
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => onOpen(artwork)}
      style={{
        gridRowEnd: `span ${Math.round(artwork.span * spanScale)}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        paddingBottom: 28,
        boxSizing: "border-box",
      }}
    >
      <div
        ref={frameRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${hover ? "#1A1B4B" : "#D5D5E4"}`,
          background: "#FAFAF8",
          transition: "border-color 0.3s ease",
          overflow: "hidden",
        }}
      >
        {artwork.image ? (
          <img
            src={artwork.image}
            alt={artwork.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
  );
}

function WorksSlideshow({ artworks, showCaption, onOpen, registerFrame }) {
  const [index, setIndex] = useState(0);
  const safeIndex = artworks.length ? index % artworks.length : 0;
  const current = artworks[safeIndex];

  useEffect(() => {
    if (index >= artworks.length) setIndex(0);
  }, [artworks.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!current) return null;

  const prev = () => setIndex((i) => (i - 1 + artworks.length) % artworks.length);
  const next = () => setIndex((i) => (i + 1) % artworks.length);

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
          aspectRatio: "16 / 10",
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
          <img src={current.image} alt={current.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            <ImageFrame src={img.image} alt={img.caption} aspectRatio="4 / 3" />
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
              <p style={{ flex: "1 1 380px", fontSize: 13, color: "#333333", lineHeight: 1.7, margin: 0 }}>
                {project.institutionDesc}
              </p>
              <div style={{ width: 64, height: 64, flexShrink: 0 }}>
                <ImageFrame src={project.institutionLogo} alt="Institution logo" aspectRatio="1 / 1" />
              </div>
            </div>
          )}

          {!def.kind && (
            <p style={{ fontSize: 13, color: "#333333", lineHeight: 1.7, margin: 0, maxWidth: 640 }}>{project[def.key]}</p>
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
  const [selectedId, setSelectedId] = useState(PROJECTS[3].id); // default to the fully-populated example row
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
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>
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

export default function PortfolioSite() {
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
            }}
          >
            {currentSection === "works" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, auto)",
                  columnGap: 40,
                  rowGap: 4,
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
                  }}
                >
                  {t.context}
                </div>

                <FilterLabel label={t.medium} />
                <FilterLabel label={t.media} />
                <FilterLabel label={t.layout} />
                <FilterLabel label={t.order} />

                <div style={{ gridColumn: "1 / -1", borderTop: "1px solid #E2E2ED", margin: 0 }} />

                <FilterPills options={t.mediumOpts} selected={selectedMediums} onSelect={toggleMedium} multi />
                <FilterPills options={t.mediaOpts} selected={filters.media} onSelect={(i) => toggleFilter("media", i)} />
                <FilterPills options={t.layoutOpts} selected={filters.layout} onSelect={(i) => toggleFilter("layout", i)} />
                <FilterPills options={t.orderOpts} selected={filters.order} onSelect={(i) => toggleFilter("order", i)} />
              </div>
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
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${filters.layout === 2 ? 2 : 4}, 1fr)`,
                    gridAutoRows: "8px",
                    columnGap: 28,
                    rowGap: 28,
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
