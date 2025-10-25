-- Seed script for FitLock dummy data
-- Run this in Supabase SQL Editor to populate with sample users, pledges, and bets

-- First, create dummy users in auth.users, then in public.users
-- Note: This creates auth records without actual authentication (for testing only)
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
) VALUES
('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'alice@example.com', crypt('dummy-password', gen_salt('bf')), NOW() - INTERVAL '30 days', NULL, '', NULL, '', NULL, '', '', NULL, NOW() - INTERVAL '30 days', '{"provider":"email","providers":["email"]}', '{"name":"FitAlice"}', NULL, NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'bob@example.com', crypt('dummy-password', gen_salt('bf')), NOW() - INTERVAL '25 days', NULL, '', NULL, '', NULL, '', '', NULL, NOW() - INTERVAL '25 days', '{"provider":"email","providers":["email"]}', '{"name":"GymBob"}', NULL, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
('00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'authenticated', 'authenticated', 'charlie@example.com', crypt('dummy-password', gen_salt('bf')), NOW() - INTERVAL '20 days', NULL, '', NULL, '', NULL, '', '', NULL, NOW() - INTERVAL '20 days', '{"provider":"email","providers":["email"]}', '{"name":"CardioCharlie"}', NULL, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
('00000000-0000-0000-0000-000000000000', '44444444-4444-4444-4444-444444444444', 'authenticated', 'authenticated', 'diana@example.com', crypt('dummy-password', gen_salt('bf')), NOW() - INTERVAL '15 days', NULL, '', NULL, '', NULL, '', '', NULL, NOW() - INTERVAL '15 days', '{"provider":"email","providers":["email"]}', '{"name":"DianaDiscipline"}', NULL, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL),
('00000000-0000-0000-0000-000000000000', '55555555-5555-5555-5555-555555555555', 'authenticated', 'authenticated', 'ethan@example.com', crypt('dummy-password', gen_salt('bf')), NOW() - INTERVAL '10 days', NULL, '', NULL, '', NULL, '', '', NULL, NOW() - INTERVAL '10 days', '{"provider":"email","providers":["email"]}', '{"name":"EthanEndurance"}', NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL)
ON CONFLICT (id) DO NOTHING;

-- Now insert into public.users table (linked to auth.users)
INSERT INTO public.users (id, email, name, gbp_balance, created_at) VALUES
('11111111-1111-1111-1111-111111111111', 'alice@example.com', 'FitAlice', 850, NOW() - INTERVAL '30 days'),
('22222222-2222-2222-2222-222222222222', 'bob@example.com', 'GymBob', 1200, NOW() - INTERVAL '25 days'),
('33333333-3333-3333-3333-333333333333', 'charlie@example.com', 'CardioCharlie', 950, NOW() - INTERVAL '20 days'),
('44444444-4444-4444-4444-444444444444', 'diana@example.com', 'DianaDiscipline', 1100, NOW() - INTERVAL '15 days'),
('55555555-5555-5555-5555-555555555555', 'ethan@example.com', 'EthanEndurance', 780, NOW() - INTERVAL '10 days')
ON CONFLICT (id) DO NOTHING;

-- Create some pledges with different statuses and deadlines
INSERT INTO pledges (id, creator_id, goal, stake, deadline, status, created_at, image_url) VALUES
-- Open pledges (can be bet on)
('aaaaaaaa-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Run 100km this month - I will run a total of 100 kilometers by the end of this month. Will track with Strava.', 50, (CURRENT_DATE + INTERVAL '15 days')::DATE, 'open', NOW() - INTERVAL '5 days', NULL),
('aaaaaaaa-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Lose 5kg in 6 weeks - Starting weight: 85kg. Goal: 80kg. Will post weekly weigh-in photos.', 100, (CURRENT_DATE + INTERVAL '35 days')::DATE, 'open', NOW() - INTERVAL '7 days', NULL),
('aaaaaaaa-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Do 50 pushups daily for 30 days - Will do 50 pushups every single day for the next 30 days. No rest days!', 75, (CURRENT_DATE + INTERVAL '25 days')::DATE, 'open', NOW() - INTERVAL '3 days', NULL),
('aaaaaaaa-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'Attend gym 5x/week for a month - Will go to the gym at least 5 times per week for 4 weeks straight. Will share gym check-in screenshots.', 80, (CURRENT_DATE + INTERVAL '20 days')::DATE, 'open', NOW() - INTERVAL '2 days', NULL),
('aaaaaaaa-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'Complete a half marathon - Will complete a half marathon (21.1km) by the deadline. Will share race results or Strava proof.', 120, (CURRENT_DATE + INTERVAL '45 days')::DATE, 'open', NOW() - INTERVAL '1 day', NULL),
('aaaaaaaa-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'No sugar for 2 weeks - Zero added sugar for 14 consecutive days. Will post daily meal logs.', 60, (CURRENT_DATE + INTERVAL '10 days')::DATE, 'open', NOW() - INTERVAL '4 days', NULL)
ON CONFLICT (id) DO NOTHING;

-- Add bets on these pledges to create interesting odds
INSERT INTO bets (user_id, pledge_id, side, amount, created_at) VALUES
-- Bets on pledge-1 (Run 100km) - Mixed sentiment
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-1111-1111-1111-111111111111', 'yes', 30, NOW() - INTERVAL '4 days'),
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-1111-1111-1111-111111111111', 'yes', 40, NOW() - INTERVAL '4 days'),
('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-1111-1111-1111-111111111111', 'no', 25, NOW() - INTERVAL '3 days'),
('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-1111-1111-1111-111111111111', 'yes', 20, NOW() - INTERVAL '2 days'),

-- Bets on pledge-2 (Lose 5kg) - Mostly YES
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-2222-2222-2222-222222222222', 'yes', 50, NOW() - INTERVAL '6 days'),
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-2222-2222-2222-222222222222', 'yes', 35, NOW() - INTERVAL '5 days'),
('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-2222-2222-2222-222222222222', 'yes', 40, NOW() - INTERVAL '4 days'),
('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-2222-2222-2222-222222222222', 'no', 15, NOW() - INTERVAL '3 days'),

-- Bets on pledge-3 (50 pushups daily) - Skeptical crowd
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-3333-3333-3333-333333333333', 'no', 45, NOW() - INTERVAL '2 days'),
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-3333-3333-3333-333333333333', 'no', 50, NOW() - INTERVAL '2 days'),
('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-3333-3333-3333-333333333333', 'yes', 30, NOW() - INTERVAL '1 day'),
('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-3333-3333-3333-333333333333', 'no', 35, NOW() - INTERVAL '1 day'),

-- Bets on pledge-4 (Gym 5x/week) - Balanced
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-4444-4444-4444-444444444444', 'yes', 40, NOW() - INTERVAL '1 day'),
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-4444-4444-4444-444444444444', 'no', 35, NOW() - INTERVAL '1 day'),
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-4444-4444-4444-444444444444', 'yes', 45, NOW() - INTERVAL '1 day'),
('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-4444-4444-4444-444444444444', 'no', 30, NOW() - INTERVAL '12 hours'),

-- Bets on pledge-5 (Half marathon) - High confidence
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-5555-5555-5555-555555555555', 'yes', 60, NOW() - INTERVAL '1 day'),
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-5555-5555-5555-555555555555', 'yes', 70, NOW() - INTERVAL '1 day'),
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-5555-5555-5555-555555555555', 'yes', 55, NOW() - INTERVAL '1 day'),
('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-5555-5555-5555-555555555555', 'yes', 50, NOW() - INTERVAL '12 hours'),

-- Bets on pledge-6 (No sugar) - Very skeptical
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-6666-6666-6666-666666666666', 'no', 40, NOW() - INTERVAL '3 days'),
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-6666-6666-6666-666666666666', 'no', 50, NOW() - INTERVAL '3 days'),
('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-6666-6666-6666-666666666666', 'no', 45, NOW() - INTERVAL '2 days'),
('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-6666-6666-6666-666666666666', 'yes', 20, NOW() - INTERVAL '1 day')
ON CONFLICT (user_id, pledge_id) DO NOTHING;

-- Verify the data
SELECT
    p.goal,
    p.stake,
    u.name as creator,
    COUNT(b.id) as bet_count,
    SUM(CASE WHEN b.side = 'yes' THEN b.amount ELSE 0 END) as yes_pool,
    SUM(CASE WHEN b.side = 'no' THEN b.amount ELSE 0 END) as no_pool,
    (p.stake + COALESCE(SUM(b.amount), 0)) as total_pool
FROM pledges p
LEFT JOIN users u ON p.creator_id = u.id
LEFT JOIN bets b ON p.id = b.pledge_id
WHERE p.status = 'open'
GROUP BY p.id, p.goal, p.stake, u.name
ORDER BY p.created_at DESC;
