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

- **Tabs Structure:**
    - **Big Plus in the middle**: Button for **"Make a Pledge"**.
    - **"My Pledges"**: View all active and completed pledges the user has created.
    - **"My Bets"**: View all bets the user has placed on other pledges.
    
    **Example Bottom Nav Layout:**
    
    - **Home / Feed**: (scrollable feed with pledges)
    - **Make a Pledge (Big Plus)**: For creating new pledges.
    - **My Bets**: For managing bets placed on others.

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
    - User clicks **“Create a Pledge”** button (from the **plus button**).
    - User:
        - Enters a **goal description** (e.g., “I will hit a 100kg bench by Jan 1”).
        - Uploads a **picture**.
        - **Sets stake** (e.g., £50).
        - **Selects proof method** (e.g., Strava, video).
        - Chooses a **deadline** for goal completion.
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
    - **Pledger** submits proof of goal completion by the deadline.
    - **Friends vote** on the proof (Yes/No).
    - **Majority vote wins** (e.g., 2/3 votes required for success).
    - **Outcome** is displayed (YES or NO).
    - The **betting pool** is split between the correct bettors.

---

### **7. Result Calculation & Pool Split**

- **User Flow:**
    - System calculates **who owes what** based on the bet results.
    - The **pledger’s stake** is returned (if successful) + a portion of the **betting pool**.
    - The pool is split between the correct bettors (YES or NO), and the results are displayed with a **summary of all bets**.

---

### **8. Leaderboard & Profile**

- **User Flow:**
    - Users can see a **leaderboard** showing:
        - Top **achievers** (most completed pledges).
        - Top **predictors** (most accurate bettors).
    - User profile shows **success rate** (pledges completed) and **betting accuracy**.

---

### **Tech Stack for MVP (1 Week)**

- **Frontend:**
    - **React** (for building the app)
    - **React Router** (for navigation between views)
    - **Styled Components** (for styling) or **Tailwind CSS**
- **Backend:**
    - **Firebase** or **Supabase** (for user authentication, database, and backend logic).
    - **Node.js** (if custom development is used).
- **Database Schema (for Pledges & Bets)**

```json
{
  "users": [
    {"id": "u1", "name": "Yousaf", "email": "yousaf@example.com", "gbp_balance": 1000, "profile_picture": "image_url"}
  ],
  "pledges": [
    {
      "id": "p1",
      "creator_id": "u1",
      "goal": "Run 5k under 25min",
      "deadline": "2025-11-30",
      "stake": 50,
      "status": "open",
      "image_url": "image_url",
      "bets": [
        {"user_id": "u2", "side": "yes", "amount": 10},
        {"user_id": "u3", "side": "no", "amount": 20}
      ],
      "proof_url": "",
      "verification_votes": [
        {"user_id": "u2", "vote": "yes"},
        {"user_id": "u3", "vote": "no"}
      ]
    }
  ]
}

```

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