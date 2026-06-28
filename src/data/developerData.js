/* ── Owner profile ───────────────────────────────────────────── */
export const ownerProfile = {
  name:      'Gayani Polireddy',
  roleBadge: 'Full stack developer · Content creator',
  bio:       'Software engineer by discipline, storyteller by heart. On one side, I build scalable digital experiences; on the other, I create stories that capture ideas, emotions, and everyday inspiration.',
  location:  'Hyderabad, India',
  email:     'gayanis.work@gmail.com',
  phone:     '+91 7337447599',
  portrait:         '/assets/images/portrait.jpeg',
  creatorPortrait:  '/assets/images/gayani_creator.jpg',
  links: {
    github:          'https://github.com/Gayanireddy',
    linkedin:        'https://linkedin.com/in/gayani-reddy-profile',
    instagram:       'https://www.instagram.com/just.gayani_/',
    instagramHandle: '@just.gayani_',
  },
}

/* ── Skills ──────────────────────────────────────────────────────── */
/* To add a new skill: add an entry here with the logo SVG in
   public/assets/images/logos/ and it will appear automatically. */
export const skills = [
  /* Languages */
  { id: 'java',      name: 'Java',            tag: 'Language', category: 'lang',     logo: '/assets/images/logos/java.svg' },
  { id: 'js',        name: 'JavaScript',      tag: 'Language', category: 'lang',     logo: '/assets/images/logos/javascript.svg' },
  { id: 'ts',        name: 'TypeScript',      tag: 'Language', category: 'lang',     logo: '/assets/images/logos/typescript.svg' },

  /* Backend */
  { id: 'spring',    name: 'Spring Boot',     tag: 'Backend',  category: 'backend',  logo: '/assets/images/logos/spring-boot.svg' },
  { id: 'springsec', name: 'Spring Security', tag: 'Auth',     category: 'backend',  logo: '/assets/images/logos/spring-security.svg' },
  { id: 'node',      name: 'Node.js',         tag: 'Backend',  category: 'backend',  logo: '/assets/images/logos/nodejs.svg' },
  { id: 'rest',      name: 'REST APIs',       tag: 'API',      category: 'backend',  logo: '/assets/images/logos/rest-apis.svg' },

  /* Frontend */
  { id: 'angular',   name: 'Angular',         tag: 'Frontend', category: 'frontend', logo: '/assets/images/logos/angular.svg' },
  { id: 'html5',     name: 'HTML5',           tag: 'Frontend', category: 'frontend', logo: '/assets/images/logos/html5.svg' },
  { id: 'css3',      name: 'CSS3',            tag: 'Frontend', category: 'frontend', logo: '/assets/images/logos/css3.svg' },

  /* Data & DevOps */
  { id: 'mysql',     name: 'MySQL',           tag: 'Database', category: 'data',     logo: '/assets/images/logos/mysql.svg' },
  { id: 'postgres',  name: 'PostgreSQL',      tag: 'Database', category: 'data',     logo: '/assets/images/logos/postgresql.svg' },
  { id: 'docker',    name: 'Docker',          tag: 'DevOps',   category: 'data',     logo: '/assets/images/logos/docker.svg' },
  { id: 'nginx',     name: 'Nginx',           tag: 'DevOps',   category: 'data',     logo: '/assets/images/logos/nginx.svg' },
  { id: 'git',       name: 'Git',             tag: 'Tooling',  category: 'data',     logo: '/assets/images/logos/git.svg' },

  /* Cloud — AWS */
  { id: 's3',        name: 'AWS S3',          tag: 'Cloud',    category: 'cloud',    logo: '/assets/images/logos/aws-s3.svg' },
  { id: 'lambda',    name: 'AWS Lambda',      tag: 'Cloud',    category: 'cloud',    logo: '/assets/images/logos/aws-lambda.svg' },
  { id: 'sqs',       name: 'AWS SQS',         tag: 'Cloud',    category: 'cloud',    logo: '/assets/images/logos/aws-sqs.svg' },
  { id: 'mediaconv', name: 'MediaConvert',    tag: 'Cloud',    category: 'cloud',    logo: '/assets/images/logos/aws-mediaconvert.svg' },
  { id: 'eventbr',   name: 'EventBridge',     tag: 'Cloud',    category: 'cloud',    logo: '/assets/images/logos/aws-eventbridge.svg' },

  /* Auth & Tools */
  { id: 'keycloak',  name: 'Keycloak',        tag: 'Auth',     category: 'auth',     logo: '/assets/images/logos/keycloak.svg' },
  { id: 'oauth2',    name: 'OAuth2',          tag: 'Auth',     category: 'auth',     logo: '/assets/images/logos/oauth2.svg' },
  { id: 'jwt',       name: 'JWT',             tag: 'Auth',     category: 'auth',     logo: '/assets/images/logos/jwt.svg' },
  { id: 'postman',   name: 'Postman',         tag: 'Tools',    category: 'auth',     logo: '/assets/images/logos/postman.svg' },
  { id: 'jira',      name: 'Jira',            tag: 'Tools',    category: 'auth',     logo: '/assets/images/logos/jira.svg' },
  { id: 'copilot',   name: 'GitHub Copilot',  tag: 'AI',       category: 'auth',     logo: '/assets/images/logos/github-copilot.svg' },
]

/* ── Career Timeline — work entries only ─────────────────────── */
export const careerTimeline = [
  {
    id:           1,
    role:         'Software Engineer I',
    organisation: 'Zessta Software Services',
    location:     'Hyderabad, India',
    period:       'Sep 2024 — Present',
    duration:     '1 yr 10 mo',
    logo:         '/assets/images/logos/zessta-logo.svg',
    logoBg:       'rgba(20,20,30,0.85)',
    achievements: [
      'Contributed to a large-scale commercial real estate platform — building scalable full-stack applications, backend systems, property research tools, and centralized authentication solutions.',
      'Built a fault-tolerant large-file upload system for 4K drone videos using multipart S3, Web Workers, and IndexedDB — with pause/resume and network recovery, processing 3+ TB of media monthly.',
      'Developed an event-driven video processing pipeline on AWS (Lambda, MediaConvert, EventBridge, SQS) to generate adaptive-bitrate HLS streams with HD and SD renditions.',
      'Migrated legacy authentication to centralized Keycloak with MFA, session management, and single-device login enforcement, eliminating unauthorized account sharing and strengthening platform security.',
      'Migrated legacy Node.js and MySQL stored procedure-based services into modular Spring Boot microservices following the Strangler Fig pattern for gradual system modernization.',
      'Designed an AI-assisted multi-agent orchestration workflow using Claude Opus to automate migration and refactoring of MySQL stored procedures during legacy-to-Spring Boot modernization.',
      'Built an AI-driven automation system to analyze schema change scripts and auto-update dependent stored procedures across 7 database schemas and 1400+ live stored procedures.',
      'Participated in large-scale bug bash activities leveraging GitHub Copilot, Claude Console, and AI-powered VS Code tools — reducing bug resolution time by nearly 50%.',
    ],
  },
  {
    id:           2,
    role:         'Software Engineer Intern',
    organisation: 'OpenText Technologies',
    location:     'Bangalore, India',
    period:       'Aug 2023 — Feb 2024',
    duration:     '7 mos',
    logo:         '/assets/images/logos/opentext-logo.svg',
    logoBg:       'rgba(255,255,255,0.92)',
    achievements: [
      'Contributed to feature development, bug fixes, and client-specific enhancements for the OpenText AppWorks platform, improving application stability and overall user experience.',
      'Investigated and resolved frontend and backend issues; developed and executed automated test cases to ensure platform reliability across multiple workflows and platform versions.',
    ],
  },
]

/* ── Education ───────────────────────────────────────────────── */
export const educationEntry = {
  degree:      'B.Tech — Computer Science (Data Science)',
  institution: 'Jain (Deemed-to-be University)',
  location:    'Bangalore, India',
  period:      'July 2019 — June 2023',
  gpa:         '8.8',
}
