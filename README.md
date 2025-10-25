## **MVP Product Requirement Document (PRD)**

**Project Name:** FitLock (Working Title)

**Core Concept:**

FitLock is a **fitness accountability platform** where users create **fitness pledges**, **bet** on goals, and receive **rewards** based on the outcome. The MVP will focus on **mock GBP stakes**, **social verification**, and **simple result calculation** without actual financial integration.

---

## **🚀 Current Implementation Status**

**What's Working Now:**
- 🏠 Full tab-based navigation (Browse, My Pledges, Make, My Bets, How It Works)
- 👤 **Guest browsing** - users can browse pledges without signing in
- 🔐 **Authentication** - Google OAuth + Magic Link login (UI implemented, needs Supabase configuration)
- 🔒 Sign In button in header, with modal login form
- 📋 Browse feed displaying open pledges in a responsive grid
- 💰 Complete betting system with live odds and payout calculations
- 📊 Advanced payout calculator (potential returns, profit calculations, pool odds)
- ✍️ Pledge creation modal with goal, stake, and deadline
- 📱 Fully responsive UI with Polymarket-inspired dark theme
- 🎓 "How It Works" educational page with examples
- ✅ Protected routes - auth required for creating pledges, placing bets, viewing My Pledges/Bets

**What's Missing:**
- ⚙️ Supabase auth provider configuration (Google OAuth + SMTP for magic links)
- 🏆 Pledge resolution & verification system
- 👥 Community voting on proof
- 🎖️ Profile pages & leaderboards
- 📸 Image uploads for pledges

---

### **Core Features for MVP (1-Week Build)**

---

### **1. Onboarding (Google OAuth + Magic Link)**

- **User Flow:**
    - **Option 1:** User clicks **"Continue with Google"** for instant login
    - **Option 2:** User enters **email address** and receives a **magic link**
    - User clicks the **magic link** in their email to log in
    - **No passwords or codes required** - seamless authentication

---

### **2. Bottom Navigation (Tabs)**

- **Navigation Structure:**
    - **Feed**: Scrollable list of all pledges from other users
    - **Make a Pledge (Big Plus)**: Central button for creating new pledges
    - **My Pledges**: View all pledges the user has created (active and completed)
    - **My Bets**: View all bets the user has placed on other pledges
    
    **Bottom Navigation Layout:**
    ```
    [Feed] [➕ Make Pledge] [My Pledges] [My Bets]
    ```

---

### **3. Initial Feed (Scrollable Pledge List)**

- **User Flow:**
    - **Scrollable feed** with each **pledge** displayed in a **card format**:
        - **User’s picture**.
        - **Pledge text** (e.g., "I will hit a 100kg bench by Jan 1").
        - **Bet button** to place a bet.
    - **Bet YES/NO** with **GBP stake**.

---

### **4. Pledge Creation Flow**

- **User Flow:**
    - User clicks **"Create a Pledge"** button (from the **plus button**).
    - User:
        - Enters a **goal description** (e.g., "I will hit a 100kg bench by Jan 1").
        - Uploads a **picture** (optional, max 5MB, JPG/PNG/WebP).
        - **Sets stake** (e.g., £50, minimum £1).
        - **Selects proof method** (photo, video, or Strava link).
        - Chooses a **deadline** for goal completion (minimum 1 day, maximum 1 year).
    - Once created, the pledge is added to the **scrollable feed**.

---

### **5. Betting Flow**

- **User Flow:**
    - Users can **scroll through pledges** and bet on them.
    - For each pledge, there will be:
        - **YES** or **NO** options.
        - **Bet amount** field (users input GBP or use a preset amount).
    - Once the bet is placed, the system tracks the **betting pool** (who bet YES or NO, and how much they bet).

---

### **6. Verification Process**

- **User Flow:**
    - **Pledger** submits proof of goal completion by the deadline (photo, video, or Strava link)
    - **Community voting** opens for 48 hours after proof submission
    - **Any registered user** can vote on the proof (Yes/No)
    - **Voting Rules:**
        - Minimum 3 votes required for verification
        - Majority vote wins (e.g., 3/5 votes = success)
        - If tied, pledger wins (benefit of doubt)
        - Users cannot vote on their own pledges
    - **Outcome** is displayed (YES or NO) after voting period
    - The **betting pool** is split between the correct bettors

---

### **7. Result Calculation & Pool Split**

- **Pool Distribution Logic:**
    - **If Pledger Succeeds (YES wins):**
        - Pledger gets their stake back + 50% of the betting pool
        - YES bettors split remaining 50% proportionally by stake amount
        - NO bettors lose their entire bet amount
    - **If Pledger Fails (NO wins):**
        - Pledger loses their entire stake
        - NO bettors split the total pool (pledger's stake + all bets) proportionally by stake amount
        - YES bettors lose their entire bet amount
    - **Platform Fee:** 5% of total pool goes to platform (deducted before distribution)
    - **Results Summary:** Shows all bettors, amounts won/lost, and final balances

---

### **8. User Balance & Funding**

- **Initial Balance:**
    - New users start with **£100 mock balance** (no real money)
    - Balance is used for both creating pledges and placing bets
- **Balance Management:**
    - Users can "top up" their balance with mock funds (for testing)
    - Minimum bet amount: **£1**
    - Maximum bet amount: **User's current balance**
    - Insufficient balance prevents betting or pledge creation
- **Balance Display:**
    - Current balance shown in profile and navigation
    - Transaction history available in profile

### **9. Leaderboard & Profile**

- **User Flow:**
    - Users can see a **leaderboard** showing:
        - Top **achievers** (most completed pledges)
        - Top **predictors** (most accurate bettors)
        - Top **earners** (highest profit from betting)
    - User profile shows **success rate** (pledges completed) and **betting accuracy**

---

### **Tech Stack for MVP (1 Week)**

- **Frontend:**
  - **React 18** with **TypeScript** (for building the app)
  - **Vite** (for fast development and building)
  - **Tailwind CSS** (for styling and responsive design)
  - **React Hooks** (for state management)
- **Backend:**
  - **Supabase** (for user authentication, database, and file storage)
  - **PostgreSQL** (via Supabase for data storage)
  - **Supabase Storage** (for image uploads)
- **Database Schema Overview:**
  - **users**: User profiles with balance and authentication
  - **pledges**: Fitness goals with stakes and deadlines  
  - **bets**: Individual bets placed on pledges
  - **verification_votes**: Community voting on proof submissions

---

### **MVP Features List (1-Week Build)**

| Category | Feature | Priority | Notes |
| --- | --- | --- | --- |
| **Onboarding** | Email-based login with code | High | Simple email/code flow |
| **Bottom Navigation** | Tabs: Make a Pledge (Big Plus), My Pledges, My Bets | High | Simple navigation |
| **Pledge Feed** | Scrollable feed with picture, pledge text, bet button | High | Interactive feed |
| **Pledge Creation** | Goal input, GBP stake, proof method, deadline | High | Simple form |
| **Betting Interface** | Bet YES/NO with GBP stake | High | Simple betting interface |
| **Verification** | Social voting on proof | Medium | Manual voting by friends |
| **Result Calculation** | Split betting pool, show winners/losers | High | Simple pool split |
| **Leaderboard/Profile** | Show top achievers and top predictors | Medium | Stats on user success and betting accuracy |
| **Notifications** | Notify users on pledge result | Low | Simple email notifications |

---

### **1-Week MVP Build Plan**

### **Current Progress Status**

#### ✅ **Completed (Days 1-4 equivalent)**
- ✅ **Core UI Framework**: Tab-based navigation (Browse, My Pledges, Make, My Bets, How It Works)
- ✅ **Pledge Feed**: Scrollable grid of pledge cards showing open pledges
- ✅ **Pledge Creation Flow**: Full modal form with goal, stake, deadline inputs
- ✅ **Betting Interface**: PledgeDetailModal with YES/NO betting, live odds, payout calculator
- ✅ **Payout Calculations**: Complete utilities for odds, potential payouts, and pool distribution
- ✅ **My Pledges**: View user's created pledges with status
- ✅ **My Bets**: View user's placed bets with current status
- ✅ **How It Works**: Comprehensive informational page explaining the platform
- ✅ **Supabase Integration**: Database queries, nested relationships (pledges + creator + bets)
- ✅ **Auth Hook Structure**: useAuth hook created (ready for implementation)
- ✅ **Balance System**: Mock GBP balance tracking (£1000 default)

#### 🚧 **In Progress / Remaining Work**

**Authentication (Day 1-2 equivalent - UI DONE, NEEDS CONFIG)**
- ✅ Email OTP (Magic Link) login UI implemented
- ✅ Google OAuth login UI implemented
- ✅ User registration flow (creates user profile automatically on first login)
- ✅ Profile picture from Google OAuth
- ⚙️ **NEEDS SETUP:** Google OAuth configuration in Google Cloud Console
- ⚙️ **NEEDS SETUP:** SMTP configuration for magic link emails (or use Supabase default with limits)

**Verification & Results (Day 5-6 equivalent - NOT DONE)**
- ❌ Proof submission UI (upload photo/video/Strava)
- ❌ Community voting interface
- ❌ Pledge resolution workflow
- ❌ Automatic payout distribution on resolution
- ❌ Winner/loser summary display

**Profile & Leaderboard (Day 7 equivalent - NOT DONE)**
- ❌ User profile page with stats
- ❌ Leaderboard (top achievers, predictors, earners)
- ❌ Transaction history

**Additional Polish Needed**
- ❌ Image upload for pledge creation (backend structure exists)
- ❌ Real-time updates via Supabase subscriptions
- ❌ Better error handling (replace alerts with toast notifications)
- ❌ Pagination for pledge feed
- ❌ Loading states improvements
- ❌ Transactional balance updates (currently has race condition risk)

---

### **Next Steps to Complete MVP**

1. **Phase 1: Authentication Configuration (Priority: HIGH - 1-2 hours)**
   - ✅ Email OTP login UI - DONE
   - ✅ Wire up useAuth hook to Supabase auth - DONE
   - ✅ User registration with name/email - DONE
   - ⚙️ **TODO:** Set up Google OAuth in Google Cloud Console (follow instructions in section 2.3)
   - ⚙️ **TODO:** Configure SMTP for magic links or accept Supabase rate limits for testing
   - ⚙️ **TODO:** Test login/logout flows after configuration

2. **Phase 2: Pledge Resolution Flow (Priority: HIGH)**
   - Add proof submission UI to MyPledges
   - Build community voting interface
   - Implement pledge status transitions (open → closed → completed/failed)
   - Trigger payout distribution from payoutCalculator utilities
   - Show results and payouts to users

3. **Phase 3: Profile & Social Features (Priority: MEDIUM)**
   - Create profile page with user stats
   - Build leaderboard with top users
   - Add transaction history

4. **Phase 4: Polish & Production Readiness (Priority: MEDIUM)**
   - Add image uploads for pledges
   - Implement toast notifications
   - Add real-time updates
   - Optimize with pagination
   - Fix balance transaction race conditions

---

### **Estimated Remaining Time**
- **Phase 1 (Auth)**: 1-2 days
- **Phase 2 (Resolution)**: 2-3 days
- **Phase 3 (Profile/Social)**: 1-2 days
- **Phase 4 (Polish)**: 1-2 days
- **Total**: ~5-9 days to complete full MVP

---

## **Setup Instructions**

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### **1. Clone and Install Dependencies**
```bash
cd fitlock-app
npm install
```

### **2. Set up Supabase**

#### **2.1 Create Supabase Project**
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a region close to your users
3. Wait for the project to be ready (usually 2-3 minutes)

#### **2.2 Get API Credentials**
1. Go to **Settings > API** in your Supabase dashboard
2. Copy your **Project URL** and **anon public** key
3. Create a `.env` file in the `fitlock-app` directory:
```bash
# Create .env file
touch .env
```

Add the following environment variables to your `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### **2.3 Configure Authentication Providers**

**Google OAuth Setup:**
1. Go to **Authentication > Providers** in your Supabase dashboard
2. Enable **Google** provider
3. Go to [Google Cloud Console](https://console.cloud.google.com/)
4. Create a new project or select existing one
5. Enable **Google+ API** and **Google Identity API**
6. Go to **Credentials > Create Credentials > OAuth 2.0 Client ID**
7. Set **Application type** to "Web application"
8. Add **Authorized redirect URIs:**
   - `https://tgiufdsjpffwauuhskar.supabase.co/auth/v1/callback`
   - `http://localhost:5173/auth/callback` (for local development)
   - `http://localhost:5174/auth/callback` (alternative port)
9. Copy **Client ID** and **Client Secret** to Supabase Google provider settings
10. **IMPORTANT:** In Supabase Google provider settings, enable "Skip nonce verification" temporarily for development

**Magic Link Setup:**
1. Go to **Authentication > Settings** in your Supabase dashboard
2. Under **General Settings**, configure:
   - **Site URL:** `http://localhost:5173` (for development)
3. Under **Redirect URLs**, add:
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5174/auth/callback` (alternative port)
4. **IMPORTANT:** Under **SMTP Settings** (for Magic Link emails):
   - By default, Supabase rate-limits emails severely on free tier (3-4 per hour)
   - For testing, you can use Supabase's built-in email service (limited)
   - For production, configure custom SMTP (Gmail, SendGrid, etc.)
5. Magic Link is automatically enabled once SMTP is configured

**Troubleshooting Auth Issues:**

**Issue: "This site can't be reached" when using Google OAuth**
- Check that your Google Cloud Console redirect URI EXACTLY matches: `https://tgiufdsjpffwauuhskar.supabase.co/auth/v1/callback`
- Verify you copied the Client ID and Secret correctly to Supabase
- Make sure Google OAuth is enabled in Supabase Auth > Providers
- Wait a few minutes after saving changes for them to propagate

**Issue: "Failed to send magic link"**
- Check Supabase logs in Dashboard > Logs for detailed error messages
- Verify your email isn't rate-limited (Supabase free tier has strict limits)
- If using custom SMTP, verify your SMTP credentials are correct
- Try disabling "Confirm email" requirement in Auth Settings if testing locally
- Alternative: Use a custom email service like Resend or SendGrid for production

#### **2.4 Configure Email Templates (Optional)**
1. Go to **Authentication > Email Templates** in Supabase
2. Customize the **Magic Link** template with your branding
3. Set **Subject:** "Your FitLock Magic Link"
4. Update the email content as needed

### **3. Database Setup**
Run these SQL commands in your Supabase SQL editor:

```sql
-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  gbp_balance INTEGER DEFAULT 1000,
  profile_picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pledges table
CREATE TABLE pledges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES users(id) NOT NULL,
  goal TEXT NOT NULL,
  deadline DATE NOT NULL,
  stake INTEGER NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'completed', 'failed')),
  image_url TEXT,
  proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bets table
CREATE TABLE bets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  pledge_id UUID REFERENCES pledges(id) NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('yes', 'no')),
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pledge_id)
);

-- Create verification_votes table
CREATE TABLE verification_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  pledge_id UUID REFERENCES pledges(id) NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('yes', 'no')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pledge_id)
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('pledge-images', 'pledge-images', true);

-- Set up RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_votes ENABLE ROW LEVEL SECURITY;

-- Users can read and update their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Pledges are public to read, users can create their own
CREATE POLICY "Pledges are viewable by everyone" ON pledges FOR SELECT USING (true);
CREATE POLICY "Users can create pledges" ON pledges FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Bets are viewable by everyone, users can create their own
CREATE POLICY "Bets are viewable by everyone" ON bets FOR SELECT USING (true);
CREATE POLICY "Users can create bets" ON bets FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Verification votes are viewable by everyone, users can create their own
CREATE POLICY "Votes are viewable by everyone" ON verification_votes FOR SELECT USING (true);
CREATE POLICY "Users can create votes" ON verification_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### **4. Start Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### **5. Production Build**
```bash
npm run build
npm run preview
```

### **6. Testing**
```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

### **7. Error Handling**
- **Network errors**: Graceful fallbacks with retry options
- **Authentication errors**: Clear login prompts and session management
- **File upload errors**: Size and format validation with user feedback
- **Balance errors**: Insufficient funds warnings and prevention
- **Database errors**: User-friendly error messages and logging

### **8. Deployment**
```bash
# Build for production
npm run build

# Deploy to Vercel/Netlify (recommended)
# Connect your GitHub repo to Vercel/Netlify
# Set environment variables in deployment platform
```

---

## **Troubleshooting**

### **Common Issues**
- **Supabase connection errors**: Verify your `.env` file has correct URL and key
- **Image upload fails**: Check file size (max 5MB) and format (JPG/PNG/WebP)
- **Authentication issues**: Clear browser cache and try logging in again
- **Database errors**: Ensure all SQL commands were run in Supabase SQL editor
- **Build errors**: Delete `node_modules` and run `npm install` again

### **Development Tips**
- Use browser dev tools to debug API calls
- Check Supabase logs for database errors
- Test with different user accounts to verify permissions
- Use mock data for testing before real user interactions

---

## **Project Structure**
```
fitlock-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── LoginForm.tsx       # Google OAuth + Magic Link login
│   │   ├── AuthCallback.tsx    # Authentication callback handler
│   │   ├── PledgeCard.tsx      # Individual pledge display
│   │   ├── PledgeDetailModal.tsx # Pledge detail modal
│   │   ├── CreatePledge.tsx    # Pledge creation form
│   │   ├── MyPledges.tsx       # User's created pledges
│   │   ├── MyBets.tsx          # User's placed bets
│   │   ├── HowItWorks.tsx      # How it works component
│   │   └── LoadingSpinner.tsx  # Loading spinner
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts       # Authentication logic
│   ├── lib/                 # External service configs
│   │   └── supabase.ts      # Supabase client setup
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Database and app types
│   ├── utils/               # Utility functions
│   │   └── payoutCalculator.ts # Payout calculation logic
│   ├── App.tsx              # Main app component (with Supabase integration)
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles (Tailwind imports)
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```