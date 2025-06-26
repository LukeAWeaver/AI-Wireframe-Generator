from django.core.management.base import BaseCommand
from features.models import PortfolioTechnology

TECH_DATA = [
    # Frontend
    ("Frontend", "React", "Component-based JavaScript library for building user interfaces"),
    ("Frontend", "Vite", "Next-generation frontend build tool for fast development"),
    ("Frontend", "Next.js", "React framework for server-side rendering and static site generation"),
    # Styling
    ("Styling", "MUI", "React UI framework implementing Material Design components"),
    ("Styling", "Emotion", "CSS-in-JS styling library for React"),
    ("Styling", "Sass", "CSS preprocessor with nested rules, variables, and functions"),
    ("Styling", "Styled-components", "CSS-in-JS tool for styling React components"),
    # State and Data
    ("StateAndData", "Redux Toolkit", "Standardized Redux state management toolset"),
    ("StateAndData", "SWR", "React Hooks library for data fetching with caching and revalidation"),
    ("StateAndData", "Axios", "Promise-based HTTP client for browser and Node.js"),
    # Authentication
    ("Authentication", "Google OAuth", "OAuth 2.0 authentication using Google credentials"),
    ("Authentication", "Firebase Authentication", "Firebase service for managing user authentication and identity"),
    # Routing
    ("Routing", "React Router", "Declarative routing library for React applications"),
    # UX Interactions
    ("UXInteractions", "dnd-kit", "Lightweight drag-and-drop toolkit for React"),
    ("UXInteractions", "@use-gesture/react", "Hooks for handling gestures like drag, pinch, and wheel in React"),
    # UI Components
    ("UIComponents", "React Toastify", "Notification library for React with toast messages"),
    ("UIComponents", "MUI Components", "Component library from MUI for React UI development"),
    # Tooling
    ("Tooling", "TypeScript", "Statically typed superset of JavaScript"),
    ("Tooling", "ESLint", "Linter to enforce code quality and standards"),
    ("Tooling", "Prettier", "Code formatter ensuring consistent style"),
    ("Tooling", "Vite", "Fast frontend build tool with instant server start"),
    ("Tooling", "Jest", "Testing framework for JavaScript and TypeScript"),
    ("Tooling", "env-cmd", "Environment variable management for Node.js applications"),
    # Testing
    ("Testing", "React Testing Library", "Testing utilities for React components focusing on user interactions"),
    ("Testing", "Jest", "Delightful JavaScript testing framework"),
    # Database
    ("Database", "Firebase Realtime Database", "NoSQL cloud-hosted database for syncing data in real time"),
    ("Database", "MongoDB", "Document-based NoSQL database"),
    # Hosting
    ("Hosting", "Vercel", "Cloud platform for frontend frameworks and static sites"),
    ("Hosting", "AWS S3", "Amazon S3 object storage for static site hosting"),
    ("Hosting", "CloudFront", "AWS CDN for content delivery with low latency"),
    # CICD
    ("CICD", "GitHub Actions", "CI/CD automation platform integrated with GitHub repositories"),
    ("CICD", "Git Workflows", "Branching strategies and workflows for source control"),
    # APIs
    ("APIs", "Google Finance API", "API for accessing stock and financial market data from Google"),
    ("APIs", "Yahoo Finance API", "API for accessing stock quotes, financial data, and market information"),
    ("APIs", "AWS AppSync", "Managed GraphQL service from AWS for building APIs with real-time and offline capabilities"),
    # Compute
    ("Compute", "AWS Lambda", "Serverless compute service to run code without managing servers"),
    ("Compute", "AWS EventBridge", "Event bus for event-driven architectures and scheduling tasks"),
    # Monitoring
    ("Monitoring", "AWS CloudWatch", "Monitoring and observability service for AWS applications"),
]

class Command(BaseCommand):
    help = "Populate the PortfolioTechnology table with predefined technologies."

    def handle(self, *args, **options):
        created = 0
        for category, name, description in TECH_DATA:
            obj, was_created = PortfolioTechnology.objects.get_or_create(
                category=category,
                name=name,
                defaults={"description": description}
            )
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"Inserted {created} new portfolio technologies.")) 