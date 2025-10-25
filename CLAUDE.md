# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FitLock is a fitness accountability platform combining fitness pledges with a Polymarket-style betting system. Users create fitness goals (pledges), stake mock GBP on them, and others bet on whether they'll succeed. The platform includes social verification through community voting.

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Supabase (PostgreSQL + Auth + Storage)

## File Structure

**IMPORTANT:** The git repository root is `/Users/yousafbilal/Coding/Fitness Polymarket 2 - Web/` which contains:
  - `fitlock-app/` - The actual React application (cd into this to run npm commands)
  - `README.md` - Project documentation (at repo root)
  - `CLAUDE.md` - This file (at repo root)

**The default working directory will be the repository root. To run npm commands, use absolute paths or cd into fitlock-app:**
```bash
# Example: run dev server
cd "/Users/yousafbilal/Coding/Fitness Polymarket 2 - Web/fitlock-app" && npm run dev
```

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
- **Authentication is OPTIONAL** - guests can browse pledges without signing in
- Uses Supabase authentication: Google OAuth + Magic Link (email OTP, no passwords)
- Custom `useAuth()` hook (`src/hooks/useAuth.ts`) manages auth state globally
- Hook subscribes to `supabase.auth.onAuthStateChange()` for real-time session updates
- Components access auth via `const { user, userProfile, signOut } = useAuth()`
- User balance from `userProfile?.gbp_balance` (stored in `users` table, not auth metadata)
- Sign In button in header opens modal with `LoginForm` component
- Protected actions (create pledge, place bet) prompt login if guest
- Auth callback handled by `AuthCallback.tsx` component which creates/updates user profile

### State Management
- **No Redux/Context** - uses React hooks + Supabase as single source of truth
- Local component state (useState) for UI and form inputs
- Server state via direct Supabase queries (no React Query)
- Auth state shared via `useAuth()` hook pattern
- Parent components pass `onUpdate()` callbacks to children for triggering data refreshes after mutations

### Navigation
- **No React Router** - tab-based navigation managed in `App.tsx` (main entry point)
- State: `[activeTab, setActiveTab] = useState<'browse' | 'make' | 'my-pledges' | 'my-bets' | 'how-it-works'>()`
- Bottom fixed navigation bar with 5 tabs: Browse, My Pledges, Make (center +), My Bets, How It Works
- CreatePledge component renders as modal overlay when activeTab is 'make' or showCreatePledge is true
- Protected tabs (My Pledges, My Bets, Make) show "Sign In" prompt for guests
- Browse and How It Works are public (no auth required)

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
├── main.tsx                      # React root initialization (renders App)
├── App.tsx                       # Main app with tab navigation + Supabase integration + auth modal
├── components/
│   ├── PledgeCard.tsx            # Individual pledge card (click to open detail modal)
│   ├── PledgeDetailModal.tsx    # Modal for viewing pledge details + placing bets
│   ├── CreatePledge.tsx          # Pledge creation modal form
│   ├── LoginForm.tsx             # Login form (Google OAuth + Magic Link)
│   ├── AuthCallback.tsx          # Auth callback handler (creates/updates user profile)
│   ├── MyPledges.tsx             # User's created pledges tab (auth required)
│   ├── MyBets.tsx                # User's placed bets tab (auth required)
│   ├── HowItWorks.tsx            # Informational page explaining platform
│   └── LoadingSpinner.tsx        # Reusable loading spinner
├── hooks/
│   └── useAuth.ts                # Authentication logic (global auth state, signOut)
├── lib/
│   └── supabase.ts               # Supabase client initialization
├── types/
│   └── index.ts                  # All TypeScript interfaces (User, Pledge, Bet, VerificationVote)
├── utils/
│   └── payoutCalculator.ts       # Payout calculation logic (odds, potential payouts)
└── index.css                     # Global styles + Tailwind v4 theme configuration
```

**Note:** There is no `pages/` directory. `App.tsx` handles all routing via tab state and manages login modal state.

### Data Flow Pattern

**Creating a Pledge:**
1. User fills form in `CreatePledge.tsx`
2. Upload image to `pledge-images` bucket (if provided)
3. Insert pledge record to `pledges` table
4. Update user balance (deduct stake)
5. Call `onClose()` and parent's `onUpdate()` to refresh feed

**Placing a Bet:**
1. User clicks on a pledge card → opens `PledgeDetailModal.tsx`
2. User selects YES/NO + amount, sees live payout calculations
3. Insert to `bets` table
4. Update user balance (deduct bet amount)
5. Call `onPlaceBet()` callback → parent (App.tsx) refetches all pledges

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

1. **Utilities Folder:** `/src/utils` exists with `payoutCalculator.ts` for betting calculations including:
   - `calculatePotentialPayout()` - shows users what they'll win if their bet wins
   - `calculateOdds()` - converts bet amounts to YES/NO percentages
   - `calculateAllPayouts()` - splits pool when pledge resolves
   - `calculateSinglePayout()` - proportional distribution helper

2. **Loading States:** All data-fetching components use `[loading, setLoading]` pattern with `LoadingSpinner` component.

3. **Error Handling:** Currently console.error + browser alerts - no toast notifications yet. Production should add proper toast/snackbar library.

4. **Balance Management:** User balance accessed via `userProfile?.gbp_balance || 1000` (default mock balance, stored in `users` table). Updated directly in database after each transaction. **Warning:** Not transactional yet - potential race conditions.

5. **Type Definitions:** All interfaces in `types/index.ts` (User, Pledge, Bet, VerificationVote) with optional nested fields (e.g., `Pledge.creator?: User` for joined queries).

## Known Limitations & TODOs

**Implemented Features:**
- ✅ Tab-based navigation with 5 tabs (Browse, My Pledges, Make, My Bets, How It Works)
- ✅ Guest browsing - can view pledges without authentication
- ✅ Authentication UI - Google OAuth + Magic Link login (LoginForm component)
- ✅ Auth callback handling - creates/updates user profile automatically (AuthCallback component)
- ✅ Protected routes - prompts login for creating pledges, placing bets, viewing My Pledges/Bets
- ✅ Sign In button in header, opens modal with LoginForm
- ✅ Browse feed showing open pledges with card UI (public, no auth required)
- ✅ PledgeDetailModal with live odds and payout calculations
- ✅ Payout calculator utilities (odds, potential payouts, pool distribution)
- ✅ How It Works informational page (public)
- ✅ useAuth hook with auth state, user profile, and signOut
- ✅ Mock user balance system (£1000 default, stored in users table)
- ✅ Bet placement flow (YES/NO with amount selection)
- ✅ Pledge creation flow
- ✅ MyPledges and MyBets components

**Still TODO:**
- ⚙️ Supabase auth provider configuration (Google OAuth in Google Cloud Console + SMTP for magic links)
- ❌ No React Router - tab-based navigation limits deep linking
- ❌ No optimistic UI updates - relies on refetching after mutations
- ❌ No pagination on pledge feed - could become slow with many pledges
- ❌ Balance updates are not transactional - potential race conditions
- ❌ Verification/voting system not implemented (no proof submission UI, no voting)
- ❌ Result calculation implemented but not triggered (no pledge resolution flow)
- ❌ No profile/leaderboard UI yet
- ❌ No real-time updates (no Supabase subscriptions)
- ❌ No image upload for pledges yet (structure exists but not wired up)

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
