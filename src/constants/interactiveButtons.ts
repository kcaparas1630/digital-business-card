export interface ButtonConfig {
  id: string;
  label: string;
  url?: string;
  downloadPath?: string;
  color: {
    primary: string;
    secondary: string;
    border: string;
    borderDark: string;
  };
  position: [number, number, number];
}

export const INTERACTIVE_BUTTONS: ButtonConfig[] = [
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    url: 'https://kcaparas-portfolio.web.app/',
    color: {
      primary: '#fbbf24',      // Yellow/Orange
      secondary: '#f59e0b',    // Darker orange
      border: '#8b5cf6',       // Purple
      borderDark: '#6d28d9',   // Dark purple
    },
    position: [-6, 0.3, 0],
  },
  {
    id: 'github',
    label: 'GITHUB',
    url: 'https://github.com/kcaparas1630',
    color: {
      primary: '#6b7280',      // Gray
      secondary: '#4b5563',    // Darker gray
      border: '#1f2937',       // Dark gray
      borderDark: '#111827',   // Very dark gray
    },
    position: [-2, 0.3, 0],
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    url: 'https://www.linkedin.com/in/kcaparas-1630/',
    color: {
      primary: '#3b82f6',      // Blue
      secondary: '#2563eb',    // Darker blue
      border: '#1e40af',       // Dark blue
      borderDark: '#1e3a8a',   // Very dark blue
    },
    position: [2, 0.3, 0],
  },
  {
    id: 'resume',
    label: 'RESUME',
    downloadPath: '/docs/KentCaparas_Resume.pdf',
    color: {
      primary: '#10b981',      // Green
      secondary: '#059669',    // Darker green
      border: '#047857',       // Dark green
      borderDark: '#065f46',   // Very dark green
    },
    position: [6, 0.3, 0],
  },
];
