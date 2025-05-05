
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
    // Added new keys for time-related content
    days: "days",
    day: "day",
    ago: "ago",
    hours: "hours",
    hour: "hour",
    minutes: "minutes",
    minute: "minute",
    justNow: "just now",
    // Added new keys for proposals page
    proposals: "Proposals",
    proposalsDescription: "View and manage all proposal submissions for open contracts",
    searchProposals: "Search proposals...",
    filterByStatus: "Filter by Status",
    allStatus: "All Status",
    filterByCategory: "Filter by Category",
    allCategories: "All Categories",
    newProposal: "New Proposal",
    createdBy: "Created by",
    details: "Details",
    vote: "Vote",
    noProposalsFound: "No proposals found matching your criteria",
    clearFilters: "Clear Filters",
    // Added new keys for voting page
    votingDay: "day",
    votingDays: "days",
    votingHour: "hour",
    votingHours: "hours",
    votingMinute: "minute",
    votingMinutes: "minutes",
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
    // Added new keys for time-related content in Arabic
    days: "أيام",
    day: "يوم",
    ago: "مضت",
    hours: "ساعات",
    hour: "ساعة",
    minutes: "دقائق",
    minute: "دقيقة",
    justNow: "الآن",
    // Added new keys for proposals page in Arabic
    proposals: "المقترحات",
    proposalsDescription: "عرض وإدارة جميع المقترحات المقدمة للعقود المفتوحة",
    searchProposals: "البحث عن المقترحات...",
    filterByStatus: "تصفية حسب الحالة",
    allStatus: "جميع الحالات",
    filterByCategory: "تصفية حسب الفئة",
    allCategories: "جميع الفئات",
    newProposal: "مقترح جديد",
    createdBy: "أنشأه",
    details: "التفاصيل",
    vote: "تصويت",
    noProposalsFound: "لم يتم العثور على مقترحات تطابق معاييرك",
    clearFilters: "مسح عوامل التصفية",
    // Added new keys for voting page in Arabic
    votingDay: "يوم",
    votingDays: "أيام",
    votingHour: "ساعة",
    votingHours: "ساعات",
    votingMinute: "دقيقة",
    votingMinutes: "دقائق",
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
  // Added new language keys for time-related content
  | "days"
  | "day"
  | "ago"
  | "hours"
  | "hour"
  | "minutes"
  | "minute"
  | "justNow"
  // Added new language keys for proposals page
  | "proposals"
  | "proposalsDescription"
  | "searchProposals"
  | "filterByStatus"
  | "allStatus"
  | "filterByCategory"
  | "allCategories"
  | "newProposal"
  | "createdBy"
  | "details"
  | "vote"
  | "noProposalsFound"
  | "clearFilters"
  // Added new language keys for voting page
  | "votingDay"
  | "votingDays"
  | "votingHour"
  | "votingHours"
  | "votingMinute"
  | "votingMinutes";
