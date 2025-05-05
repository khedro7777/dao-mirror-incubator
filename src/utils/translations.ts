
export type Language = "en" | "ar";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    funding: "Funding",
    freelance: "Freelance",
    pending: "Pending",
    active: "Active",
    closed: "Closed",
    groupBuying: "Group Buying",
    appName: "Mirror DAO",
    welcomeTo: "Welcome to",
    appDescription: "A decentralized autonomous organization for transparent and efficient contract management.",
    joinAsSupplier: "Join as a Supplier",
    joinAsInvestor: "Join as an Investor",
    joinAsFreelancer: "Join as a Freelancer",
    supplierDesc: "Offer your products and services on our platform.",
    investorDesc: "Invest in promising projects and earn rewards.",
    freelancerDesc: "Find freelance opportunities and get paid securely.",
    getStarted: "Get Started",
    learnMore: "Learn More",
    contracts: "Contracts",
    arbitration: "Arbitration",
    proposals: "Proposals",
    createContract: "Create Contract",
    exploreMarketplace: "Explore Marketplace",
    viewProposals: "View Proposals",
    featuredContracts: "Featured Contracts",
    recentProposals: "Recent Proposals",
    upcomingVotes: "Upcoming Votes",
    totalContracts: "Total Contracts",
    activeUsers: "Active Users",
    contractsVolume: "Contracts Volume",
    viewDetails: "View Details",
    statusOpen: "Open",
    statusClosed: "Closed",
    statusActive: "Active",
    contractDetails: "Contract Details",
    contractTerms: "Contract Terms",
    participants: "Participants",
    timeline: "Timeline",
    files: "Files",
    discussion: "Discussion",
    kycVerification: "KYC Verification",
    kycStatus: "KYC Status",
    votingEnds: "Voting Ends",
    days: "days",
    day: "day",
    hours: "hours",
    hour: "hour",
    minutes: "minutes",
    minute: "minute",
    ago: "ago",
    justNow: "just now",
    proposalsDescription: "Browse and vote on proposals to shape the future of our DAO.",
    searchProposals: "Search Proposals",
    filterByStatus: "Filter by Status",
    allStatus: "All Status",
    filterByCategory: "Filter by Category",
    allCategories: "All Categories",
    newProposal: "New Proposal",
    createdBy: "Created By",
    details: "Details",
    vote: "Vote",
    noProposalsFound: "No proposals found.",
    clearFilters: "Clear Filters",
    voting: "Voting",
    votingDescription: "Participate in DAO governance by voting on active proposals",
    accessRestricted: "Access Restricted",
    votingDays: "days",
    votingDay: "day",
    votingHours: "hours",
    votingHour: "hour",
    votingMinutes: "minutes",
    votingMinute: "minute",
    votingAgo: "ago",
    votingJustNow: "just now",
    returnToHome: "Return to Home"
  },
  ar: {
    funding: "تمويل",
    freelance: "عمل حر",
    pending: "قيد الانتظار",
    active: "نشط",
    closed: "مغلق",
    groupBuying: "شراء جماعي",
    appName: "مرآة DAO",
    welcomeTo: "مرحبا بك في",
    appDescription: "منظمة مستقلة لامركزية لإدارة العقود بشفافية وكفاءة.",
    joinAsSupplier: "انضم كمورد",
    joinAsInvestor: "انضم كمستثمر",
    joinAsFreelancer: "انضم كعامل حر",
    supplierDesc: "اعرض منتجاتك وخدماتك على منصتنا.",
    investorDesc: "استثمر في مشاريع واعدة واكسب المكافآت.",
    freelancerDesc: "ابحث عن فرص عمل حرة واحصل على أموالك بأمان.",
    getStarted: "ابدأ",
    learnMore: "اعرف المزيد",
    contracts: "العقود",
    arbitration: "تحكيم",
    proposals: "مقترحات",
    createContract: "إنشاء عقد",
    exploreMarketplace: "اكتشف السوق",
    viewProposals: "عرض المقترحات",
    featuredContracts: "العقود المميزة",
    recentProposals: "المقترحات الأخيرة",
    upcomingVotes: "الأصوات القادمة",
    totalContracts: "إجمالي العقود",
    activeUsers: "المستخدمون النشطون",
    contractsVolume: "حجم العقود",
    viewDetails: "عرض التفاصيل",
    statusOpen: "مفتوح",
    statusClosed: "مغلق",
    statusActive: "نشط",
    contractDetails: "تفاصيل العقد",
    contractTerms: "شروط العقد",
    participants: "المشاركون",
    timeline: "الجدول الزمني",
    files: "الملفات",
    discussion: "مناقشة",
    kycVerification: "التحقق من KYC",
    kycStatus: "حالة KYC",
    votingEnds: "انتهاء التصويت",
    days: "أيام",
    day: "يوم",
    hours: "ساعات",
    hour: "ساعة",
    minutes: "دقائق",
    minute: "دقيقة",
    ago: "منذ",
    justNow: "الآن",
    proposalsDescription: "تصفح وصوت على المقترحات لتشكيل مستقبل DAO الخاص بنا.",
    searchProposals: "البحث عن المقترحات",
    filterByStatus: "تصفية حسب الحالة",
    allStatus: "كل الحالات",
    filterByCategory: "تصفية حسب الفئة",
    allCategories: "جميع الفئات",
    newProposal: "اقتراح جديد",
    createdBy: "انشأ من قبل",
    details: "تفاصيل",
    vote: "تصويت",
    noProposalsFound: "لم يتم العثور على مقترحات.",
    clearFilters: "إزالة الفلاتر",
    voting: "تصويت",
    votingDescription: "شارك في إدارة DAO عن طريق التصويت على المقترحات النشطة",
    accessRestricted: "وصول مقيد",
    votingDays: "أيام",
    votingDay: "يوم",
    votingHours: "ساعات",
    votingHour: "ساعة",
    votingMinutes: "دقائق",
    votingMinute: "دقيقة",
    votingAgo: "منذ",
    votingJustNow: "الآن",
    returnToHome: "العودة إلى الصفحة الرئيسية"
  },
};

export const getTranslation = (
  language: Language,
  key: LanguageKey
): string => {
  return translations[language][key] || `Missing translation for ${key} in ${language}`;
};

export type LanguageKey = 
  | "funding"
  | "freelance"
  | "pending"
  | "active"
  | "closed"
  | "groupBuying"
  | "appName"
  | "welcomeTo"
  | "appDescription"
  | "joinAsSupplier"
  | "joinAsInvestor"
  | "joinAsFreelancer"
  | "supplierDesc"
  | "investorDesc"
  | "freelancerDesc"
  | "getStarted"
  | "learnMore"
  | "contracts"
  | "arbitration"
  | "proposals"
  | "createContract"
  | "exploreMarketplace"
  | "viewProposals"
  | "featuredContracts"
  | "recentProposals"
  | "upcomingVotes"
  | "totalContracts"
  | "activeUsers"
  | "contractsVolume"
  | "viewDetails"
  | "statusOpen"
  | "statusClosed"
  | "statusActive"
  | "contractDetails"
  | "contractTerms"
  | "participants"
  | "timeline"
  | "files"
  | "discussion"
  | "kycVerification"
  | "kycStatus"
  | "votingEnds"
  | "days"
  | "day"
  | "hours"
  | "hour"
  | "minutes"
  | "minute"
  | "ago"
  | "justNow"
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
  | "voting"
  | "votingDescription"
  | "accessRestricted"
  | "votingDays"
  | "votingDay"
  | "votingHours"
  | "votingHour"
  | "votingMinutes"
  | "votingMinute"
  | "votingAgo"
  | "votingJustNow"
  | "returnToHome";
