## **MVP Product Requirement Document (PRD)**

**Project Name:** FitLock (Working Title)

**Core Concept:**

FitLock is a **fitness accountability platform** where users create **fitness pledges**, **bet** on goals, and receive **rewards** based on the outcome. The MVP will focus on **mock GBP stakes**, **social verification**, and **simple result calculation** without actual financial integration.

---

### **Core Features for MVP (1-Week Build)**

---

### **1. Onboarding (Email-based Login)**

- **User Flow:**
    - User enters **email address**.
    - System sends a **code to their email** for login.
    - User enters the **code** to log in.

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

### **Day 1-2: Onboarding & Pledge Creation**

- Build **email login** (user enters email, receives code).
- Create **pledge creation form** (goal, stake, proof, deadline).
- Add **user profile picture upload**.
- Store **pledge data** in the database.

### **Day 3-4: Betting & Feed Display**

- Build **scrollable pledge feed** with picture, goal, and bet button.
- Implement **betting interface** (YES/NO, GBP stake).
- Track **bets and stakes** in the database.

### **Day 5-6: Verification & Result Calculation**

- Implement **proof submission** and **social voting** for verification.
- Develop **result calculation** and split betting pool based on outcome.
- Display **winner/loser summary** and pool split.

### **Day 7: Leaderboard & Polish**

- Create **leaderboard** showing top achievers and bettors.
- Final **testing** of the entire flow (pledge creation → betting → verification → result).
- **Bug fixing** and final polish.

---

### **Key Milestones for the Week**

1. **End of Day 2**:
    - Completed **onboarding** and **pledge creation** flow.
    - **Profile** setup and data storage.
2. **End of Day 4**:
    - **Betting interface** completed.
    - **Feed display** showing user pledges.
3. **End of Day 6**:
    - **Verification system** in place (social voting).
    - **Result calculation** and pool splitting working.
4. **End of Day 7**:
    - **Full MVP flow tested**.
    - **Leaderboard and profile page** implemented.
    - Ready for **first user testing**.

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
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env` file in the `fitlock-app` directory with your Supabase credentials:
```bash
# Create .env file
touch .env
```

Add the following environment variables to your `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual Supabase credentials.

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
│   │   ├── PledgeCard.tsx   # Individual pledge display
│   │   ├── PledgeFeed.tsx   # Scrollable pledge list
│   │   ├── CreatePledge.tsx # Pledge creation form
│   │   ├── MyPledges.tsx    # User's created pledges
│   │   ├── MyBets.tsx       # User's placed bets
│   │   ├── Profile.tsx      # User profile and stats
│   │   └── LoadingSpinner.tsx
│   ├── pages/               # Main page components
│   │   ├── LoginPage.tsx    # Email authentication
│   │   └── MainApp.tsx      # Main app with navigation
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts       # Authentication logic
│   ├── lib/                 # External service configs
│   │   └── supabase.ts      # Supabase client setup
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Database and app types
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```