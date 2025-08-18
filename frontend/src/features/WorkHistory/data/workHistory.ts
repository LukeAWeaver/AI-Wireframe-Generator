export interface IWorkCard {
  company: string
  role: string
  duration: string
  keyAreas: string[]
  featuresOwned: string[]
  tech: string[]
  impact: string[]
  featureDetails?: string[]
}

export const workHistory: IWorkCard[] = [
  {
    company: 'Multi Media, LLC',
    role: 'Software Engineer',
    duration: 'May 2023 – June 2025',
    keyAreas: [
      'React Native mobile development',
      'React + MUI web platform contributions',
      'API + UI collaboration with Django backend'
    ],
    featuresOwned: [
      'Applied layered UI architecture (primitives → components → compound → app) in feature development to improve scalability and maintainability in the React Native app',
      'Developed a scroll-driven layout handling safe area insets, keyboard avoidance, scroll behavior, and animated header slots with a scroll-driven drop shadow using Reanimated',
      'Designed flexible navigation patterns with nested routes, full-screen transitions, drawers, and modal stacking',
      'Built a reusable form system with primitives for layout, local state, validation, and backend error handling applied consistently across the app'
    ],
    tech: [
      'TypeScript',
      'React',
      'React Native',
      'Next.js',
      'MUI',
      'Tamagui',
      'Redux',
      'TanStack Query',
      'React Context',
      'Reanimated',
      'Expo Router',
      'Lighthouse',
      'Storybook',
      'Django REST Framework',
      'Django',
      'PostgreSQL',
      'Redis',
      'Docker'
    ],
    impact: [
      'Launched web features in React + MUI with Django REST, then transitioned to React Native to deliver core mobile functionality',
      'Drove a layered design system with reusable primitives, compound components, and standardized screen patterns to scale the app',
      'Delivered pixel-accurate UI and upheld WCAG 2.1 AA using Lighthouse checks, tab navigation, and zoom testing',
      'Shipped scroll-safe, keyboard-aware experiences with animated headers and robust navigation patterns across full-screen flows'
    ],
    featureDetails: [
      'Events: Scrollable carousels, RSVP logic, animated states',
      'Profile: 10+ screens, custom form components, nav suppression',
      'Settings: Animated toggles, persistence, Reanimated fixes',
      'Animated Header Layout: Scroll-based elevation, transform logic',
      'Accessibility: repeatable checks and guardrails with Lighthouse'
    ]
  },
  {
    company: 'AGI Digital',
    role: 'Full Stack Software Engineer',
    duration: 'Sep 2021 – Mar 2023',
    keyAreas: [
      'React + Django full-stack enhancements with Node.js services',
      'Farmobile team: Mapbox views sourced from Kafka topics',
      'AWS Lambda features with SQS, S3, and CloudWatch',
      'Production support lead and mentorship'
    ],
    featuresOwned: [
      'Partner integration to standardize field data from linked accounts',
      'Performance tuning for dashboard components and API endpoints',
      'Operational pipelines using Lambda, SQS, S3 with diagnostics in CloudWatch'
    ],
    tech: [
      'TypeScript',
      'React',
      'Redux',
      'Next.js',
      'Apollo GraphQL',
      'GraphQL',
      'Django',
      'Laravel',
      'Node.js',
      'Mapbox',
      'Kafka',
      'Kubernetes',
      'Docker',
      'AWS Lambda',
      'SQS',
      'S3',
      'CloudWatch',
      'MySQL'
    ],
    impact: [
      'Delivered full-stack UI and API enhancements for an enterprise dashboard, reducing load times and streamlining key workflows',
      'Built interactive geospatial features that rendered Kafka-sourced data in Mapbox for location-based insights',
      'Designed and deployed Lambdas with SQS and S3, using CloudWatch for diagnostics and issue resolution',
      'Served as the primary production support point of contact, mentoring engineers via pair programming and real-time troubleshooting'
    ],
    featureDetails: [
      'Mapbox layers and interactions for field visualizations sourced from Kafka',
      'Data standardization across partner accounts',
      'Alerting and diagnostics with CloudWatch for faster incident triage'
    ]
  },
  {
    company: 'GS Teletech',
    role: 'Full Stack Software Engineer',
    duration: 'May 2018 – Sep 2021',
    keyAreas: [
      'Built commercial real-time Telecom Equipment Management System',
      'Developed LibWebSockets-based backend services in C',
      'Designed LibUV event-driven architecture for real-time updates',
      'Managed HAProxy load balancers and Linux servers in Azure',
      'Refactored vanilla JS portal into a React SPA'
    ],
    featuresOwned: [
      'ETL pipelines for alarm data ingestion and transformation',
      'WebSockets-based live dashboards and device state views',
      'React SPA rewrite of the device management portal'
    ],
    tech: [
      'React',
      'TypeScript',
      'JavaScript',
      'WebSockets',
      'C',
      'LibWebSockets',
      'LibUV',
      'SNMP',
      'PostgreSQL',
      'Linux',
      'HAProxy',
      'Azure'
    ],
    impact: [
      'Delivered commercial-grade monitoring, alerting, and device management software',
      'Built backend services in C and live WebSocket dashboards for low-latency telemetry',
      'Modernized the management portal to a React SPA to improve feature velocity',
      'Maintained load balancing and uptime with HAProxy on Azure'
    ],
    featureDetails: [
      'Event-driven backend architecture with LibUV and WebSockets',
      'Operational dashboards for real-time device telemetry and alarms'
    ]
  }
]
