import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        geist: ['Geist', 'system-ui', 'sans-serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display sizes
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],  // 60px
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],        // 48px
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],  // 36px
        // Heading sizes
        'heading-xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 30px
        'heading-lg': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],   // 24px
        'heading': ['1.25rem', { lineHeight: '1.4' }],                                // 20px
        'heading-sm': ['1.125rem', { lineHeight: '1.4' }],                            // 18px
        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],   // 18px
        'body': ['1rem', { lineHeight: '1.6' }],          // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],   // 14px
        // Small sizes
        'label': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],  // 14px
        'caption': ['0.75rem', { lineHeight: '1.4' }],    // 12px
        'overline': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }], // 12px
      },
      colors: {
        /* Neutral Colors */
        border: "hsl(var(--border))",
        "border-subtle": "hsl(var(--border-subtle))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-elevated": "hsl(var(--background-elevated))",
        foreground: "hsl(var(--foreground))",
        
        /* Primary/Brand */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          muted: "hsl(var(--primary-muted))",
        },
        
        /* Secondary & Muted */
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        /* Semantic Colors */
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          muted: "hsl(var(--destructive-muted))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          muted: "hsl(var(--success-muted))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          muted: "hsl(var(--warning-muted))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
          muted: "hsl(var(--info-muted))",
        },
        
        /* Surfaces */
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        /* Sidebar */
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",    /* 24px - Cards, modals, large containers */
        md: "var(--radius-md)",    /* 16px - Medium elements */
        DEFAULT: "var(--radius)",  /* 12px - Default/buttons */
        sm: "var(--radius-sm)",    /* 8px - Small elements, tags */
        xl: "var(--radius-xl)",    /* 32px - Extra large */
        full: "var(--radius-full)", /* Pill shape */
      },
      spacing: {
        'sidebar': 'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-width-collapsed)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
