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
      'Events',
      'Edit Profile',
      'Settings',
      'Notification History',
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
      'Edit Profile: 10+ screens, custom form components, nav suppression',
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
      'Led production support triage and mentored incoming engineers',
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
      'Built commercial real-time monitoring software',
      'Developed in C + JavaScript',
      'Sole engineer for frontend + backend',
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