# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based portfolio website for Михаил Колесников (Mikhail Kolesnikov), a Russian-speaking MC/host and presenter. The site showcases his services including weddings, corporate events, private events, and standup comedy.

## Development Commands

The project uses Bun as the package manager. Key commands:

- `bun dev` - Start development server at localhost:4321
- `bun build` - Build production site to ./dist/
- `bun preview` - Preview production build locally
- `bun install` - Install dependencies
- `bun astro ...` - Run Astro CLI commands (e.g., `bun astro check`)

## Architecture

### Tech Stack
- **Framework**: Astro 5.10.1 with React integration
- **Styling**: SCSS with component-scoped styles
- **TypeScript**: Strict configuration
- **Runtime**: Uses `client:load` directive for component hydration

### Component Structure
The site follows a section-based layout pattern:

- **HeroSection**: Landing area with services showcase and main image
- **AboutSection**: Biography with experience metrics and overlapping image layout
- **GallerySection**: Portfolio showcase

Each component has its own directory with:
- `ComponentName.astro` - Component logic
- `ComponentName.scss` - Scoped styles

### File Organization
```
src/
├── components/           # Section-based components
│   ├── HeroSection/
│   ├── AboutSection/
│   └── GallerySection/
├── pages/
│   └── index.astro      # Main page combining all sections
└── global.css           # CSS reset and design system
```

### Styling Architecture
- Global CSS reset and base styles in `src/global.css`
- Component-specific SCSS files for each section
- Uses CSS custom properties for design consistency
- Manrope font family from Google Fonts

### Content & Localization
- All content is in Russian
- Service categories defined as TypeScript interfaces
- Experience data structured as arrays of objects
- Static images stored in `public/` directory

## Key Patterns

### Data Structures
Components use TypeScript interfaces for type safety:
```typescript
interface ServiceCategory {
    id: number;
    name: string;
    slug: string;
}
```

### Image Handling
Static assets in `public/` directory are referenced with root-relative paths (e.g., `/person.png`)

### Component Hydration
Uses `client:load` for components requiring interactivity, allowing server-side rendering with selective hydration.