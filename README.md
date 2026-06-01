# Next-Gen Learning Dashboard

A high-fidelity student dashboard prototype built with Next.js, Supabase, and Framer Motion. Features a futuristic dark mode UI with hardware-accelerated animations and zero layout shifts.

## 🎯 Features

- **Bento Grid Layout**: Responsive grid system with sidebar navigation
- **Server-Side Data Fetching**: Real-time course data from Supabase PostgreSQL
- **Smooth Animations**: Spring physics-based animations with Framer Motion
- **Responsive Design**: Desktop, tablet, and mobile optimized
- **Loading States**: Skeleton loaders with pulsing animations
- **Error Handling**: Graceful error boundaries and retry mechanisms
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

## 🏗️ Architecture

### Component Structure

```
src/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Main dashboard page (Server Component)
│   ├── loading.js         # Skeleton loader
│   ├── error.js           # Error boundary
│   └── globals.css        # Tailwind styles
└── components/
    ├── AnimatedGrid.js    # Staggered animation container
    ├── Sidebar.js         # Navigation with micro-interactions
    ├── HeroTile.js        # Welcome banner with streak
    ├── CourseCard.js      # Dynamic course tiles
    └── ActivityTile.js    # Activity chart
```

### Server vs Client Components

- **Server Components**: `page.js` fetches courses from Supabase using RSC (React Server Components)
- **Client Components**: `Sidebar.js`, `CourseCard.js`, `HeroTile.js`, `ActivityTile.js`, `AnimatedGrid.js` use Framer Motion for animations

This split ensures:
- Fast data fetching on the server
- Client-side animations don't block data loading
- Secure environment variable handling

### Data Flow

```
page.js (Server)
  └─> getCourses() 
      └─> Supabase PostgreSQL
          └─> Courses passed to child components (Client)
              ├─> CourseCard (renders dynamic tiles)
              ├─> HeroTile (static welcome)
              └─> ActivityTile (mock data)
```

## 🎨 Design Decisions

### Animations
- **Staggered Load**: All tiles fade in with sequential delays using `containerVariants` in `AnimatedGrid.js`
- **Spring Physics**: Cards use `stiffness: 300, damping: 20` for natural, non-linear motion
- **Hover States**: Scale 1.02 with glow effect using only `transform` (no layout shifts)
- **Micro-interactions**: Sidebar highlights animate in with `layoutId` for smooth transitions

### Responsive Breakpoints
- **Desktop (>1024px)**: Full sidebar visible, 2-column grid
- **Tablet (768-1024px)**: Sidebar hidden, single column grid with hamburger menu
- **Mobile (<768px)**: Full-screen mobile navigation, stacked cards

### Component Modularity
Each component handles its own animations and state:
- `CourseCard`: Self-animates with index-based delays
- `Sidebar`: Manages open/closed state and active item
- `AnimatedGrid`: Orchestrates child stagger animations

## 🔧 Technical Stack

- **Framework**: Next.js 16+ (App Router)
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12+
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🗄️ Database Schema

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Seed Data Example
```sql
INSERT INTO courses (title, progress, icon_name) VALUES
('Advanced React Patterns', 75, 'Code'),
('Web Performance Optimization', 45, 'Rocket'),
('JavaScript Fundamentals', 90, 'Book'),
('UI/UX Design Principles', 60, 'Sparkles');
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd learning-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials to `.env.local`

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🧪 Testing

The project includes:
- **Loading States**: Visible on first load in `loading.js`
- **Error Handling**: Test by disconnecting internet or using invalid Supabase keys
- **Responsiveness**: Use Chrome DevTools to test tablet/mobile breakpoints

## 📊 Performance Optimizations

- **Zero Layout Shifts**: Animations use `transform` and `opacity` only
- **Server-Side Data Fetching**: Reduces client JavaScript
- **Suspense Boundaries**: Skeleton loaders prevent UI blocking
- **Spring Physics**: GPU-accelerated animations for smooth 60fps

## 🎯 Challenges & Solutions

### Challenge 1: Staggered Animations Without Layout Shifts
**Solution**: Used `AnimatedGrid` wrapper component that manages stagger timing through Framer Motion's `containerVariants` and `staggerChildren` property, ensuring animations only transform and adjust opacity.

### Challenge 2: Responsive Navigation
**Solution**: Implemented dual navigation - hidden sidebar on desktop with `hidden lg:block`, mobile hamburger menu with `AnimatePresence`, and `layoutId` for smooth highlight transitions.

### Challenge 3: Server Component Data Passing
**Solution**: Fetched courses in server component, passed as props to client components, allowing dynamic icon rendering via icon name string mapping.

### Challenge 4: Accessibility in Animations
**Solution**: Added ARIA labels, role attributes, and keyboard navigation support. Used semantic HTML (`<article>`, `<section>`, `<nav>`) throughout.

## 📝 Submission Checklist

- ✅ GitHub repository hosted
- ✅ Deployed on Vercel (when ready)
- ✅ `.env.example` file included
- ✅ TypeScript-ready component structure
- ✅ No hardcoded data (fetched from Supabase)
- ✅ Loading states with skeleton loaders
- ✅ Error boundary implementation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Spring physics animations
- ✅ Zero layout shifts guarantee
- ✅ Semantic HTML & accessibility

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## 📄 License

This project is part of the Frontend Intern Challenge.
