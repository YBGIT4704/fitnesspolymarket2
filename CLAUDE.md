# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitLock is a fitness accountability platform combining fitness pledges with a Polymarket-style betting system. Users create fitness goals (pledges), stake mock GBP on them, and others bet on whether they'll succeed. The platform includes social verification through community voting.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Supabase (PostgreSQL + Auth + Storage)

## File Structure

**IMPORTANT:** The working directory is `/Users/yousafbilal/Coding/Fitness Polymarket 2 - Web/fitlock-app/`.

- The parent directory is `/Users/yousafbilal/Coding/Fitness Polymarket 2 - Web/` which contains:
  - `fitlock-app/` - The actual React application (THIS IS THE WORKING DIRECTORY)
  - `README.md` - Project documentation
  - `CLAUDE.md` - This file (one level up from fitlock-app/)

**All commands must be run from the `fitlock-app/` directory, which is already the current working directory.**

## Development Commands

```bash
# Install dependencies (from fitlock-app/ directory)
npm install

# Start development server (runs on http://localhost:5173 or 5174 if 5173 is busy)
npm run dev

# Build for production (runs TypeScript check + Vite build)
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Environment Setup

Required `.env` file in project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Access via `import.meta.env.VITE_SUPABASE_URL` in code.

## Architecture Patterns

### Authentication Flow
- Uses Supabase OTP authentication (email-based, no passwords)
- Custom `useAuth()` hook (`src/hooks/useAuth.ts`) manages auth state globally
- Hook subscribes to `supabase.auth.onAuthStateChange()` for real-time session updates
- Components access auth via `const { user, signInWithEmail, verifyOtp, signOut } = useAuth()`
- User object includes metadata: `user.user_metadata.{ name, profile_picture, gbp_balance }`

### State Management
- **No Redux/Context** - uses React hooks + Supabase as single source of truth
- Local component state (useState) for UI and form inputs
- Server state via direct Supabase queries (no React Query)
- Auth state shared via `useAuth()` hook pattern
- Parent components pass `onUpdate()` callbacks to children for triggering data refreshes after mutations

### Navigation
- **No React Router** - tab-based navigation managed in `MainApp.tsx`
- State: `[activeTab, setActiveTab] = useState<'feed' | 'my-pledges' | 'my-bets' | 'profile'>()`
- Bottom fixed navigation bar with central "+" button for pledge creation
- CreatePledge component renders as modal overlay (not inline)

### Supabase Integration Patterns

**Nested Query Pattern:**
```typescript
// Fetch pledges with creator profiles and all bets with bettor profiles
supabase.from('pledges')
  .select('*, creator:users!pledges_creator_id_fkey(*), bets(*, user:users!bets_user_id_fkey(*))')
```

**File Upload Pattern:**
```typescript
const { data, error } = await supabase.storage
  .from('pledge-images')
  .upload(`${user.id}-${Date.now()}.${ext}`, imageFile)
// Returns data.path used in pledge.image_url
```

**Balance Updates:**
```typescript
// Direct table update (no transactions yet)
await supabase.from('users')
  .update({ gbp_balance: newBalance })
  .eq('id', user.id)
```

### Component Structure

```
src/
├── main.tsx                      # React root initialization
├── App.tsx                       # Landing/demo UI (not main app entry)
├── pages/
│   ├── LoginPage.tsx             # Email OTP auth (2-step: email → code)
│   └── MainApp.tsx               # Main app container with tab navigation
├── components/
│   ├── PledgeFeed.tsx            # Displays all open pledges
│   ├── PledgeCard.tsx            # Individual pledge card + betting interface
│   ├── CreatePledge.tsx          # Pledge creation modal form
│   ├── MyPledges.tsx             # User's created pledges
│   ├── MyBets.tsx                # User's placed bets
│   ├── Profile.tsx               # User stats and achievements
│   └── LoadingSpinner.tsx        # Reusable loading spinner
├── hooks/
│   └── useAuth.ts                # Authentication logic (global auth state)
├── lib/
│   └── supabase.ts               # Supabase client initialization
└── types/
    └── index.ts                  # All TypeScript interfaces
```

### Data Flow Pattern

**Creating a Pledge:**
1. User fills form in `CreatePledge.tsx`
2. Upload image to `pledge-images` bucket (if provided)
3. Insert pledge record to `pledges` table
4. Update user balance (deduct stake)
5. Call `onClose()` and parent's `onUpdate()` to refresh feed

**Placing a Bet:**
1. User selects YES/NO + amount in `PledgeCard.tsx`
2. Insert to `bets` table
3. Update user balance (deduct bet amount)
4. Call `onUpdate()` callback → parent refetches all pledges

**Profile Stats Calculation:**
1. Query user's pledges: `pledges.select('status').eq('creator_id', user.id)`
2. Query user's bets: `bets.select('side, pledge:pledges(status)').eq('user_id', user.id)`
3. Calculate completion rate: `completed / total pledges`
4. Calculate betting accuracy: `correct bets / total bets`

## Database Schema

**Core Tables:**
- `users` - User profiles with balance (references `auth.users`)
- `pledges` - Fitness goals with stakes and deadlines
- `bets` - Bets placed on pledges (YES/NO)
- `verification_votes` - Community votes on proof submissions

**Key Relationships:**
- `pledges.creator_id` → `users.id` (1:many)
- `bets.user_id` → `users.id` (1:many)
- `bets.pledge_id` → `pledges.id` (1:many)
- `verification_votes.pledge_id` → `pledges.id` (1:many)

**Storage:**
- `pledge-images` bucket for user-uploaded photos (public read)

## TypeScript Configuration

- **Strict mode enabled** - all types must be explicit
- **ES2022 target** with ESNext modules
- **No unused locals/params** - will error on compilation
- Entry: `tsconfig.json` extends `tsconfig.app.json` for app code

## Styling

- **Tailwind CSS v4** - Important: v4 uses a completely different configuration syntax
- **Config location:** Theme configuration is in `src/index.css` using `@theme` directive, NOT in `tailwind.config.js`
- **Import syntax:** Use `@import "tailwindcss"` instead of `@tailwind base/components/utilities`
- **Custom colors:** Defined in `@theme` block in `index.css`:
  ```css
  @theme {
    --color-polymarket-dark: #0a0a0a;
    --color-polymarket-card: #1a1a1a;
    --color-polymarket-border: #2a2a2a;
    --color-polymarket-text: #ffffff;
    --color-polymarket-text-muted: #a0a0a0;
    --color-polymarket-accent: #3b82f6;
    --color-polymarket-success: #10b981;
    --color-polymarket-danger: #ef4444;
  }
  ```
- **Usage in components:** `bg-polymarket-dark`, `text-polymarket-text`, `border-polymarket-border`
- **Responsive design:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **PostCSS:** Uses `@tailwindcss/postcss` plugin (v4 specific)

## Code Conventions

1. **Formatting Utilities:** Date/time helpers are currently inline in components (e.g., `formatDeadline()` repeated in MyPledges, MyBets, PledgeCard). Consider extracting to `/src/utils` folder.

2. **Loading States:** All data-fetching components use `[loading, setLoading]` pattern with `LoadingSpinner` component.

3. **Error Handling:** Currently console.error only - no user-facing error UI. Add toast notifications for production.

4. **Balance Management:** User balance accessed via `user.user_metadata?.gbp_balance || 1000` (default mock balance). Updated directly in database after each transaction.

5. **Type Definitions:** All interfaces in `types/index.ts` with optional nested fields (e.g., `Pledge.creator?: User` for joined queries).

## Known Limitations & TODOs

- No React Router - tab-based navigation limits deep linking
- No optimistic UI updates - relies on refetching after mutations
- No pagination on pledge feed - could become slow with many pledges
- Balance updates are not transactional - potential race conditions
- Verification/voting system not fully implemented (UI exists but logic incomplete)
- Result calculation & pool distribution logic not implemented
- `App.tsx` shows demo UI instead of routing to LoginPage/MainApp
- Profile component uses mock user instead of real useAuth integration

## Testing Strategy

Currently no tests implemented. When adding tests:
- Use Vitest (Vite's test runner)
- Test authentication flows with Supabase mock
- Test betting logic and balance calculations
- Test form validation in CreatePledge component
- Mock Supabase client for component tests

## Database Initialization

Run SQL commands from README.md "Database Setup" section in Supabase SQL editor:
1. Create tables (users, pledges, bets, verification_votes)
2. Enable Row Level Security (RLS)
3. Create RLS policies for public read/user write
4. Initialize storage bucket for pledge images
