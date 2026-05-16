import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'on-tertiary-fixed': '#091f21',
        'tertiary-fixed-dim': '#b4cbce',
        'inverse-on-surface': '#eff1f3',
        background: '#f7f9fb',
        surface: '#f7f9fb',
        primary: '#005dac',
        'surface-bright': '#f7f9fb',
        'on-primary-container': '#fffdff',
        tertiary: '#4b6063',
        'surface-container-low': '#f2f4f6',
        'surface-container-lowest': '#ffffff',
        'inverse-surface': '#2d3133',
        'surface-container-highest': '#e0e3e5',
        'secondary-fixed': '#d6e5ef',
        'error-container': '#ffdad6',
        secondary: '#526069',
        'tertiary-container': '#64797c',
        'secondary-fixed-dim': '#bac9d3',
        'outline-variant': '#c1c6d4',
        'on-surface': '#191c1e',
        'surface-container': '#eceef0',
        error: '#ba1a1a',
        'surface-dim': '#d8dadc',
        'on-primary-fixed': '#001c3a',
        'on-secondary-fixed': '#0f1d25',
        'on-background': '#191c1e',
        'on-surface-variant': '#414752',
        'inverse-primary': '#a5c8ff',
        'on-primary': '#ffffff',
        'on-error': '#ffffff',
        'surface-tint': '#005faf',
        'surface-variant': '#e0e3e5',
        'on-error-container': '#93000a',
        'on-primary-fixed-variant': '#004786',
        'tertiary-fixed': '#d0e7ea',
        'on-tertiary': '#ffffff',
        'primary-fixed': '#d4e3ff',
        'tertiary-fixed-dim': '#b4cbce',
        'secondary-container': '#d3e2ed',
        'on-secondary-container': '#56656e',
        'primary-container': '#1976d2',
        'primary-fixed-dim': '#a5c8ff',
        'on-tertiary-container': '#faffff',
        'on-tertiary-fixed-variant': '#364a4d'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      spacing: {
        gutter: '24px',
        lg: '48px',
        xl: '64px',
        'margin-desktop': '40px',
        sm: '12px',
        md: '24px',
        xs: '4px',
        'margin-mobile': '16px',
        base: '8px'
      },
      fontFamily: {
        'body-md': ['Inter', 'sans-serif'],
        'headline-lg': ['Manrope', 'sans-serif'],
        'headline-sm': ['Manrope', 'sans-serif'],
        'headline-lg-mobile': ['Manrope', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif'],
        'headline-md': ['Manrope', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif']
      },
      fontSize: {
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-sm': ['11px', { lineHeight: '14px', fontWeight: '500' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }]
      }
    }
  },
  plugins: [forms, containerQueries]
};
