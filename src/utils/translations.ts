export type Language = "en" | "ar";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    home: "Home",
    explore: "Explore",
    funding: "Funding",
    freelance: "Freelance",
    pending: "Pending",
    active: "Active",
    closed: "Closed",
    groupBuying: "Group Buying",
    groupMarketing: "Group Marketing",
    appName: "Mirror DAO",
    welcomeTo: "Welcome to",
    appDescription: "A decentralized autonomous organization for transparent and efficient contract management.",
    getStarted: "Get Started",
    exploreGateways: "Explore Gateways",
    hotContracts: "Hot Contracts Now",
    viewAll: "View All",
    arbitrationCenter: "Arbitration Center",
    viewAllCases: "View All Cases",
    disputes: "Disputes",
    joinAsSupplier: "Join as Supplier",
    joinAsInvestor: "Join as Investor",
    joinAsFreelancer: "Join as Freelancer",
    joinAsMarketer: "Join as Marketer",
    seeOpenB2BDeals: "See Open B2B Deals",
    seeFundingOpportunities: "See Funding Opportunities",
    seeOpenJobs: "See Open Jobs",
    seeMarketingOpportunities: "See Marketing Opportunities",
  },
  ar: {
    home: "الرئيسية",
    explore: "استكشاف",
    funding: "تمويل",
    freelance: "عمل حر",
    pending: "قيد الانتظار",
    active: "نشط",
    closed: "مغلق",
    groupBuying: "شراء جماعي",
    groupMarketing: "تسويق جماعي",
    appName: "مرآة DAO",
    welcomeTo: "مرحبا بك في",
    appDescription: "منظمة مستقلة لامركزية لإدارة العقود بشفافية وكفاءة.",
    getStarted: "البدء",
    exploreGateways: "استكشاف البوابات",
    hotContracts: "العقود الرائجة الآن",
    viewAll: "عرض الكل",
    arbitrationCenter: "مركز التحكيم",
    viewAllCases: "عرض جميع الحالات",
    disputes: "النزاعات",
    joinAsSupplier: "انضم كمورد",
    joinAsInvestor: "انضم كمستثمر",
    joinAsFreelancer: "انضم كمستقل",
    joinAsMarketer: "انضم كمسوق",
    seeOpenB2BDeals: "رؤية صفقات B2B المفتوحة",
    seeFundingOpportunities: "رؤية فرص التمويل",
    seeOpenJobs: "رؤية الوظائف المفتوحة",
    seeMarketingOpportunities: "رؤية فرص التسويق",
  },
};

export const getTranslation = (
  language: Language,
  key: string
): string => {
  return translations[language][key] || "";
};

export const getLanguageDirection = (language: Language): "ltr" | "rtl" => {
  return language === "ar" ? "rtl" : "ltr";
};

export type LanguageKey =
  | "home"
  | "explore"
  | "funding"
  | "freelance"
  | "pending"
  | "active"
  | "closed"
  | "groupBuying"
  | "groupMarketing"
  | "appName"
  | "welcomeTo"
  | "appDescription"
  | "getStarted"
  | "exploreGateways"
  | "hotContracts"
  | "viewAll"
  | "arbitrationCenter"
  | "viewAllCases"
  | "disputes"
  | "joinAsSupplier"
  | "joinAsInvestor"
  | "joinAsFreelancer"
  | "joinAsMarketer"
  | "seeOpenB2BDeals"
  | "seeFundingOpportunities"
  | "seeOpenJobs"
  | "seeMarketingOpportunities"
