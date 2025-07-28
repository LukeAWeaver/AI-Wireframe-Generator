export interface IWorkCard {
  company: string;
  role: string;
  duration: string;
  keyAreas: string[];
  featuresOwned: string[];
  tech: string[];
  impact: string[];
  featureDetails?: string[];
}

export const workHistory: IWorkCard[] = [
  {
    company: 'Multi Media, LLC',
    role: 'Software Engineer',
    duration: 'May 2023 – June 2025',
    keyAreas: [
      'React Native mobile development',
      'React + MUI web platform contributions',
      'API + UI collaboration with Django backend',
    ],
    featuresOwned: [
      'Applied layered UI architecture (primitives → components → compound → app) in feature development to improve scalability and maintainability in the React Native app ',
      'Developed a scroll-driven layout handling safe area insets, keyboard avoidance, scroll behavior, and animated header slots — with a scroll-driven drop shadow using Reanimated.',
      'Designed flexible navigation patterns with nested routes, full-screen transitions, drawers, and modal stacking.',
      'Built a reusable form system with primitives for layout, local state, validation, and backend error handling — applied consistently across the app.',
    ],
    tech: ['React', 'React Native', 'Tamagui', 'Redux', 'Lighthouse', 'Expo Router', 'Django', 'PostgreSQL'],
    impact: [
      'Delivered production features for web and mobile',
      'Owned mobile features with scroll, keyboard avoidance, animated headers',
      'Built reusable primitives and compound components to scale UI architecture',
      'Collaborated across UX, PM, and backend on Figma-to-code execution',
      'Presented features in demos, explained architecture + design tradeoffs',
    ],
    featureDetails: [
      'Events: Scrollable carousels, RSVP logic, animated states',
      'Profile: 10+ screens, custom form components, nav suppression',
      'Settings: Animated toggles, persistence, Reanimated fixes',
      'Animated Header Layout: Scroll-based elevation, transform logic',
    ],
  },
  {
    company: 'AGI Digital',
    role: 'Full Stack Software Engineer',
    duration: 'Sep 2021 – Mar 2023',
    keyAreas: [
      'React + Django full-stack enhancements',
      'GraphQL schema design',
      'Production support → Feature team transition',
    ],
    featuresOwned: [],
    tech: ['React', 'GraphQL', 'Django', 'Laravel', 'Mapbox', 'Kubernetes', 'AWS'],
    impact: [
      'Provided production support and mentored incoming engineers',
      'Championed Field Management Information System (FMIS) integration',
      'Shipped UI/API enhancements for a dashboard platform',
      'Authored AWS-integrated features using Lambda, SQS, S3',
      'Transitioned to feature team and led partner integration to standardize field data from linked accounts',
      'Used Mapbox for geospatial UIs and Docker/Kubernetes for deployment',
      'Coordinated with Product on data architecture and UX feedback',
    ],
    featureDetails: [],
  },
  {
    company: 'GS Teletech',
    role: 'Full Stack Software Engineer',
    duration: 'May 2018 – Sep 2021',
    keyAreas: [
      'Built commercial real-time Telecom Equipment Management System',
      'Developed LibWebSockets-based backend services in C',
      'Designed LibUV event-driven architecture for real-time updates',
      'Managed HAPROXY load balancers and Linux servers in Azure',
    ],
    featuresOwned: [],
    tech: ['C', 'JavaScript', 'WebSockets', 'React', 'TypeScript', 'LibWebSockets', 'LibUV', 'Linux'],
    impact: [
      'Designed and built low-latency dashboards using raw JavaScript and WebSockets',
      'Implemented device protocols and alerting logic in C',
      'Created ETL pipelines that ingested and transformed alarm data',
      'Engineered backend services to maintain device state and trigger alerts',
      'Responsible for entire production software lifecycle across embedded and web-facing components',
      'Delivered $500k+ commercial-grade monitoring software',
    ],
    featureDetails: [],
  },
]; 