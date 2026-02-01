SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

\restrict LhFEzEQPV6yjo2ATWdVTy3l609aSah14sHGp4hayP75gefrp1TphkkFk8s3L470

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('a92e1b8f-d685-436b-b7ff-12838b2eb9f9', '6825eb0f-640e-4e17-8e74-606630cfeb64', '6aa71cbe-8d43-4ba5-a7ce-7e34e1e2c2c4', 's256', 'QxjmFHgfH0Q4f1co1gdA8u3EOML_V4ppDLd1fdjcwAU', 'email', '', '', '2025-11-22 07:41:57.867832+00', '2025-11-22 07:41:57.867832+00', 'email/signup', NULL),
	('2404d4d4-aa3b-4dd5-ab48-fd07010cb4bf', '7b33b7bb-c341-4112-8eb5-7d41464133e5', 'ecb348d3-31f0-4a37-8d41-0107201bd4c3', 's256', '0xAxu9n35ba8CrVgAEoc6ixOny9PFqZJke7PKc-2IOk', 'email', '', '', '2025-12-13 14:02:59.482521+00', '2025-12-13 14:02:59.482521+00', 'email/signup', NULL),
	('618e5d36-9390-4b53-a486-e6776339b847', '7b33b7bb-c341-4112-8eb5-7d41464133e5', '3becbd4b-6dd0-4df1-b6dd-be6360e89fda', 's256', 'bIVOs1MmCHHD9DUbqHSNiYGmJqUUXXz2UlXuM0IRpzU', 'email', '', '', '2026-01-30 12:29:35.645856+00', '2026-01-30 12:29:35.645856+00', 'email/signup', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'abff6a8a-4b5e-4ffa-8327-c5210c7929c3', 'authenticated', 'authenticated', 'admin@ntech.com', '$2a$06$SFhe5pyDfcHfpO4i455NJeDk.UGfdYGK/MQz8aX.i7mu2Sug76HWq', '2025-11-20 09:42:04.020332+00', NULL, '', NULL, '', NULL, NULL, NULL, NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"full_name": "Admin User"}', NULL, '2025-11-20 09:01:14.801326+00', '2025-11-20 09:42:04.020332+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7b33b7bb-c341-4112-8eb5-7d41464133e5', 'authenticated', 'authenticated', 'nehalmahamud.dev@gmail.com', '$2a$10$u5s4Ef/SZKnGTfNKp0iKZuZJAgwxIo2W2.mpHe013H0UVFf.055mG', NULL, NULL, 'pkce_860362f95f76ed9420191b4af87a1f74d4deeae57961f96cf59c4e64', '2026-01-30 12:29:35.670573+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "7b33b7bb-c341-4112-8eb5-7d41464133e5", "email": "nehalmahamud.dev@gmail.com", "full_name": "Sheikh Shariar Nehal", "email_verified": false, "phone_verified": false}', NULL, '2025-12-13 14:02:59.373449+00', '2026-01-30 12:29:38.722588+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6825eb0f-640e-4e17-8e74-606630cfeb64', 'authenticated', 'authenticated', 'nhealc1@gmail.com', '$2a$10$N24aB009yBN3BAyAAv9lk.E1stoA8wVG.n06oLxNzrPk56wKvD/u.', NULL, NULL, 'pkce_f051d8e912f546e1184c0fad19da4cca6d89a40dde201e7055994eb3', '2025-11-22 07:41:57.8684+00', '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"sub": "6825eb0f-640e-4e17-8e74-606630cfeb64", "email": "nhealc1@gmail.com", "full_name": "nehal c1", "email_verified": false, "phone_verified": false}', NULL, '2025-11-22 07:41:57.862152+00', '2025-11-22 07:42:00.729863+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', 'authenticated', 'authenticated', 'ntechadmin@gmail.com', '$2a$06$4WCo9nt9vXrUA1qTodTQ/OWdaB2eZtx7IEjI1XGdrfwWzTf22kk9W', '2025-11-20 09:45:29.790649+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-01 05:13:04.423863+00', '{"provider": "email", "providers": ["email"]}', '{"full_name": "Ntech Admin"}', NULL, '2025-11-20 09:45:29.790649+00', '2026-02-01 11:15:37.892816+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('1c3d00f8-d386-48e7-97a2-1aa2b423e439', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '{"sub": "1c3d00f8-d386-48e7-97a2-1aa2b423e439", "email": "ntechadmin@gmail.com", "provider": "email", "email_verified": true}', 'email', '2025-11-20 10:00:31.080763+00', '2025-11-20 10:00:31.080763+00', '2025-11-20 10:00:31.080763+00', 'b5d015b3-0837-4bf8-afb7-bc7ee0aeb9c6'),
	('6825eb0f-640e-4e17-8e74-606630cfeb64', '6825eb0f-640e-4e17-8e74-606630cfeb64', '{"sub": "6825eb0f-640e-4e17-8e74-606630cfeb64", "email": "nhealc1@gmail.com", "full_name": "nehal c1", "email_verified": false, "phone_verified": false}', 'email', '2025-11-22 07:41:57.864923+00', '2025-11-22 07:41:57.864976+00', '2025-11-22 07:41:57.864976+00', '4902665f-8511-4fdb-a769-afe1c54d9e56'),
	('7b33b7bb-c341-4112-8eb5-7d41464133e5', '7b33b7bb-c341-4112-8eb5-7d41464133e5', '{"sub": "7b33b7bb-c341-4112-8eb5-7d41464133e5", "email": "nehalmahamud.dev@gmail.com", "full_name": "Sheikh Shariar Nehal", "email_verified": false, "phone_verified": false}', 'email', '2025-12-13 14:02:59.461521+00', '2025-12-13 14:02:59.463457+00', '2025-12-13 14:02:59.463457+00', 'ceeb36ce-f196-4c0a-bcee-cea18d13f187');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('673ae726-7e98-4706-a4b4-6faa0b5bf2c5', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 10:11:10.167715+00', '2025-11-20 10:11:10.167715+00', NULL, 'aal1', NULL, NULL, 'node', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('81943a66-4479-4f51-b2f1-1b7d092f0e8c', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 10:14:17.897982+00', '2025-11-20 10:14:17.897982+00', NULL, 'aal1', NULL, NULL, 'node', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('6ac8af32-77c4-4037-851b-beef25ef6bc5', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-21 07:03:41.648065+00', '2025-11-27 06:39:30.143307+00', NULL, 'aal1', NULL, '2025-11-27 06:39:30.14321', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('1f8b13c8-9fb4-46b0-92cb-f3380b41398f', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 11:14:32.598232+00', '2025-11-20 12:26:17.015634+00', NULL, 'aal1', NULL, '2025-11-20 12:26:17.01549', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('38068321-24f5-4cf0-a458-d1972b656a04', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 13:26:38.333191+00', '2025-11-20 14:27:26.510192+00', NULL, 'aal1', NULL, '2025-11-20 14:27:26.510096', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('b4a3dff6-aa20-4b05-b235-edd0b5905418', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2026-01-29 17:57:39.525976+00', '2026-01-30 10:45:34.197771+00', NULL, 'aal1', NULL, '2026-01-30 10:45:34.197652', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('848acc41-3614-4bda-a75b-b4aebc8401d6', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-29 06:22:57.904666+00', '2025-11-29 14:11:37.819934+00', NULL, 'aal1', NULL, '2025-11-29 14:11:37.819801', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('45e6992e-2906-4527-bb17-b66719780ccb', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2026-01-30 13:43:16.243143+00', '2026-01-30 13:43:16.243143+00', NULL, 'aal1', NULL, NULL, 'node', '13.217.209.221', NULL, NULL, NULL, NULL, NULL),
	('061a341b-2dfa-40e8-b4c9-41ddc94067e2', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-12-03 16:18:04.282282+00', '2025-12-03 18:18:33.108941+00', NULL, 'aal1', NULL, '2025-12-03 18:18:33.107048', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('8a20e117-35b9-4e96-84b0-98a08ff06891', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 15:04:49.72474+00', '2025-11-20 17:25:48.64071+00', NULL, 'aal1', NULL, '2025-11-20 17:25:48.638133', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('fa6352a8-7925-42ca-a5db-83cf575b60ea', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-29 14:11:47.088782+00', '2025-12-01 17:11:18.238722+00', NULL, 'aal1', NULL, '2025-12-01 17:11:18.237991', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('05420915-ee23-43d2-8ff9-96823a8b4bda', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 17:55:04.561418+00', '2025-11-20 19:57:34.640285+00', NULL, 'aal1', NULL, '2025-11-20 19:57:34.640179', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('e5d48e15-b718-4da0-924e-a96cf9157020', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2026-01-31 07:26:06.362799+00', '2026-01-31 16:43:48.06643+00', NULL, 'aal1', NULL, '2026-01-31 16:43:48.065353', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-20 17:03:15.456767+00', '2025-11-29 17:03:50.194175+00', NULL, 'aal1', NULL, '2025-11-29 17:03:50.194074', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('f75b1f08-5922-4ef5-aee7-68651539a453', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-12-03 19:32:31.167458+00', '2025-12-04 09:15:04.771914+00', NULL, 'aal1', NULL, '2025-12-04 09:15:04.771814', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('687de701-d880-40d0-b925-2b511e276740', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-26 20:19:53.567398+00', '2025-12-02 16:07:45.05548+00', NULL, 'aal1', NULL, '2025-12-02 16:07:45.054612', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('5fd8ddec-4e26-4927-8044-8afaba815294', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-12-03 14:45:14.73873+00', '2025-12-10 17:15:18.215073+00', NULL, 'aal1', NULL, '2025-12-10 17:15:18.214976', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('53fa6810-009b-49b9-b888-e85b2a840eb6', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2026-02-01 05:13:04.42528+00', '2026-02-01 11:15:40.89826+00', NULL, 'aal1', NULL, '2026-02-01 11:15:40.898166', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('5ac69d02-6920-4afb-aad6-d5f1cd26f112', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-30 07:25:10.194156+00', '2025-11-30 10:45:46.420951+00', NULL, 'aal1', NULL, '2025-11-30 10:45:46.42082', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '104.28.208.81', NULL, NULL, NULL, NULL, NULL),
	('53c9db28-04b6-4a43-a53a-46644497ce92', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-12-02 16:07:56.98798+00', '2026-01-29 17:55:56.047942+00', NULL, 'aal1', NULL, '2026-01-29 17:55:56.047826', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL),
	('7b21a28a-9ab4-4789-98b0-54da5ac9c695', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-30 18:41:15.158615+00', '2025-11-30 18:41:15.158615+00', NULL, 'aal1', NULL, NULL, 'node', '35.174.19.72', NULL, NULL, NULL, NULL, NULL),
	('c11d6397-1345-4b03-b3d7-33e00d00021c', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', '2025-11-21 15:58:40.865849+00', '2025-11-29 06:22:40.281922+00', NULL, 'aal1', NULL, '2025-11-29 06:22:40.281256', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '203.190.13.20', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('673ae726-7e98-4706-a4b4-6faa0b5bf2c5', '2025-11-20 10:11:10.198374+00', '2025-11-20 10:11:10.198374+00', 'password', 'd2a791e4-ea5d-4e31-9ceb-24df994f1df5'),
	('81943a66-4479-4f51-b2f1-1b7d092f0e8c', '2025-11-20 10:14:17.91215+00', '2025-11-20 10:14:17.91215+00', 'password', '6a8bb6f4-e7b0-4bd7-af44-12359481c682'),
	('1f8b13c8-9fb4-46b0-92cb-f3380b41398f', '2025-11-20 11:14:32.700948+00', '2025-11-20 11:14:32.700948+00', 'password', 'f6d17421-2f0a-424c-ac36-2c1d232b4822'),
	('38068321-24f5-4cf0-a458-d1972b656a04', '2025-11-20 13:26:38.403005+00', '2025-11-20 13:26:38.403005+00', 'password', '2473a4f0-9c31-4746-9cc2-ed16dbc214f9'),
	('8a20e117-35b9-4e96-84b0-98a08ff06891', '2025-11-20 15:04:49.781922+00', '2025-11-20 15:04:49.781922+00', 'password', '50efdcd6-b269-4251-969b-0fafa4bad4f8'),
	('dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2', '2025-11-20 17:03:15.542191+00', '2025-11-20 17:03:15.542191+00', 'password', '71b6cb0f-f75b-4431-bc2a-c9b712c7d336'),
	('05420915-ee23-43d2-8ff9-96823a8b4bda', '2025-11-20 17:55:04.669485+00', '2025-11-20 17:55:04.669485+00', 'password', 'c0af989e-e883-40b1-a18b-e8d4b88d3612'),
	('6ac8af32-77c4-4037-851b-beef25ef6bc5', '2025-11-21 07:03:41.702094+00', '2025-11-21 07:03:41.702094+00', 'password', '3f4a6952-5ac2-4922-afc3-3ffb4e5b3f5c'),
	('c11d6397-1345-4b03-b3d7-33e00d00021c', '2025-11-21 15:58:40.950382+00', '2025-11-21 15:58:40.950382+00', 'password', 'd51facfb-f71f-4ba9-88a6-38c4818bee65'),
	('687de701-d880-40d0-b925-2b511e276740', '2025-11-26 20:19:53.598409+00', '2025-11-26 20:19:53.598409+00', 'password', 'c4018e7b-e8ce-4ab0-b4e7-a9eb0a107814'),
	('848acc41-3614-4bda-a75b-b4aebc8401d6', '2025-11-29 06:22:57.915814+00', '2025-11-29 06:22:57.915814+00', 'password', '27980c89-9e56-4331-8f37-12a2c9ca9aa7'),
	('fa6352a8-7925-42ca-a5db-83cf575b60ea', '2025-11-29 14:11:47.098106+00', '2025-11-29 14:11:47.098106+00', 'password', '9ff212a4-8850-4efb-afe5-dadb7b6c9cef'),
	('5ac69d02-6920-4afb-aad6-d5f1cd26f112', '2025-11-30 07:25:10.273808+00', '2025-11-30 07:25:10.273808+00', 'password', 'bbf14da0-668b-4bd4-9331-dfc7d3b87fae'),
	('7b21a28a-9ab4-4789-98b0-54da5ac9c695', '2025-11-30 18:41:15.21614+00', '2025-11-30 18:41:15.21614+00', 'password', '797a4ced-cefb-4346-992a-0342cde737bd'),
	('53c9db28-04b6-4a43-a53a-46644497ce92', '2025-12-02 16:07:57.001872+00', '2025-12-02 16:07:57.001872+00', 'password', '72c2a549-db9c-4810-afd7-8c2f969d624f'),
	('5fd8ddec-4e26-4927-8044-8afaba815294', '2025-12-03 14:45:14.795588+00', '2025-12-03 14:45:14.795588+00', 'password', 'c9a7b59c-5da2-48f5-9f98-d5e953db84a4'),
	('061a341b-2dfa-40e8-b4c9-41ddc94067e2', '2025-12-03 16:18:04.371194+00', '2025-12-03 16:18:04.371194+00', 'password', 'ca369e6a-7e54-47ec-9b72-14fb18a916c5'),
	('f75b1f08-5922-4ef5-aee7-68651539a453', '2025-12-03 19:32:31.236645+00', '2025-12-03 19:32:31.236645+00', 'password', '58b8d280-6867-4e21-af7f-58ea7813377c'),
	('b4a3dff6-aa20-4b05-b235-edd0b5905418', '2026-01-29 17:57:39.549234+00', '2026-01-29 17:57:39.549234+00', 'password', '0af0b1bc-06cd-457b-adf4-0eaa1272b921'),
	('45e6992e-2906-4527-bb17-b66719780ccb', '2026-01-30 13:43:16.323081+00', '2026-01-30 13:43:16.323081+00', 'password', '615cba54-e1f6-4955-b55a-c6290d1f215b'),
	('e5d48e15-b718-4da0-924e-a96cf9157020', '2026-01-31 07:26:06.431477+00', '2026-01-31 07:26:06.431477+00', 'password', '3a3bbc86-9f8e-4912-99cb-0b9b10a90103'),
	('53fa6810-009b-49b9-b888-e85b2a840eb6', '2026-02-01 05:13:04.515534+00', '2026-02-01 05:13:04.515534+00', 'password', 'e709641b-b3d8-47cb-992e-0e4b831ae7ae');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") VALUES
	('bafdc189-0583-4b6c-b1c0-58453eb98293', '6825eb0f-640e-4e17-8e74-606630cfeb64', 'confirmation_token', 'pkce_f051d8e912f546e1184c0fad19da4cca6d89a40dde201e7055994eb3', 'nhealc1@gmail.com', '2025-11-22 07:42:00.74061', '2025-11-22 07:42:00.74061'),
	('37e70ed7-4698-4174-a172-ba64ffe65923', '7b33b7bb-c341-4112-8eb5-7d41464133e5', 'confirmation_token', 'pkce_860362f95f76ed9420191b4af87a1f74d4deeae57961f96cf59c4e64', 'nehalmahamud.dev@gmail.com', '2026-01-30 12:29:38.768276', '2026-01-30 12:29:38.768276');


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'cvxrcce42jus', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-20 10:11:10.18645+00', '2025-11-20 10:11:10.18645+00', NULL, '673ae726-7e98-4706-a4b4-6faa0b5bf2c5'),
	('00000000-0000-0000-0000-000000000000', 2, 'mgiihschfxct', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-20 10:14:17.906304+00', '2025-11-20 10:14:17.906304+00', NULL, '81943a66-4479-4f51-b2f1-1b7d092f0e8c'),
	('00000000-0000-0000-0000-000000000000', 3, 'vsscq22k6oc5', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 11:14:32.66035+00', '2025-11-20 12:26:10.320549+00', NULL, '1f8b13c8-9fb4-46b0-92cb-f3380b41398f'),
	('00000000-0000-0000-0000-000000000000', 4, 'yc6xzbf2rqos', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-20 12:26:10.3277+00', '2025-11-20 12:26:10.3277+00', 'vsscq22k6oc5', '1f8b13c8-9fb4-46b0-92cb-f3380b41398f'),
	('00000000-0000-0000-0000-000000000000', 5, '3x53p5ed5btt', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 13:26:38.367427+00', '2025-11-20 14:27:26.466766+00', NULL, '38068321-24f5-4cf0-a458-d1972b656a04'),
	('00000000-0000-0000-0000-000000000000', 6, 'vc7dguqf2fpu', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-20 14:27:26.488013+00', '2025-11-20 14:27:26.488013+00', '3x53p5ed5btt', '38068321-24f5-4cf0-a458-d1972b656a04'),
	('00000000-0000-0000-0000-000000000000', 7, 'hhzypqn6z6nt', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 15:04:49.75482+00', '2025-11-20 16:07:01.333485+00', NULL, '8a20e117-35b9-4e96-84b0-98a08ff06891'),
	('00000000-0000-0000-0000-000000000000', 8, '2fmqyv5kvtcx', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 16:07:01.367923+00', '2025-11-20 17:25:48.622486+00', 'hhzypqn6z6nt', '8a20e117-35b9-4e96-84b0-98a08ff06891'),
	('00000000-0000-0000-0000-000000000000', 10, 'dhj32w7pzsjl', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-20 17:25:48.626715+00', '2025-11-20 17:25:48.626715+00', '2fmqyv5kvtcx', '8a20e117-35b9-4e96-84b0-98a08ff06891'),
	('00000000-0000-0000-0000-000000000000', 9, '6icufq2d5peg', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 17:03:15.510451+00', '2025-11-20 18:12:50.636602+00', NULL, 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 11, 'yzvu6kfms5rs', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 17:55:04.625193+00', '2025-11-20 18:56:24.842631+00', NULL, '05420915-ee23-43d2-8ff9-96823a8b4bda'),
	('00000000-0000-0000-0000-000000000000', 13, 'ctkyrybibgbk', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 18:56:24.85826+00', '2025-11-20 19:57:34.42147+00', 'yzvu6kfms5rs', '05420915-ee23-43d2-8ff9-96823a8b4bda'),
	('00000000-0000-0000-0000-000000000000', 14, 'drikgmkvwoch', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-20 19:57:34.451043+00', '2025-11-20 19:57:34.451043+00', 'ctkyrybibgbk', '05420915-ee23-43d2-8ff9-96823a8b4bda'),
	('00000000-0000-0000-0000-000000000000', 12, 'dstruebqt2gl', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-20 18:12:50.64209+00', '2025-11-21 04:34:50.152705+00', '6icufq2d5peg', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 15, 'y3qrlrs2va3p', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 04:34:50.173959+00', '2025-11-21 06:16:00.905195+00', 'dstruebqt2gl', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 17, 'nj425hgaoc4a', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 07:03:41.683248+00', '2025-11-21 08:07:40.713836+00', NULL, '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 16, 'es26d62nkkof', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 06:16:00.915697+00', '2025-11-21 08:56:55.321982+00', 'y3qrlrs2va3p', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 18, 'mwlldnajwgm3', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 08:07:40.741749+00', '2025-11-21 09:52:15.333547+00', 'nj425hgaoc4a', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 20, 'suaamugm7xyp', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 09:52:15.338952+00', '2025-11-21 10:53:23.308281+00', 'mwlldnajwgm3', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 21, 'e473bzuzhqan', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 10:53:23.321319+00', '2025-11-21 11:54:31.804992+00', 'suaamugm7xyp', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 22, 'j2l3qnfbklsg', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 11:54:31.818731+00', '2025-11-21 13:37:58.628974+00', 'e473bzuzhqan', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 19, 'o3arjplwfrej', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 08:56:55.334797+00', '2025-11-21 14:30:15.863328+00', 'es26d62nkkof', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 23, 'ykehdjilzxlm', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 13:37:58.652819+00', '2025-11-21 14:38:34.12924+00', 'j2l3qnfbklsg', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 26, 'q3sbtyl62il3', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 15:58:40.904684+00', '2025-11-21 16:57:05.299105+00', NULL, 'c11d6397-1345-4b03-b3d7-33e00d00021c'),
	('00000000-0000-0000-0000-000000000000', 24, 'biq2aufyqaev', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 14:30:15.879491+00', '2025-11-21 17:14:39.649392+00', 'o3arjplwfrej', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 27, 'os7qkbkslg5t', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 16:57:05.312553+00', '2025-11-21 18:07:14.417523+00', 'q3sbtyl62il3', 'c11d6397-1345-4b03-b3d7-33e00d00021c'),
	('00000000-0000-0000-0000-000000000000', 25, 'x7xkawbm7t5o', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 14:38:34.136294+00', '2025-11-21 18:13:26.675813+00', 'ykehdjilzxlm', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 28, 'odc4bzfyumqd', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 17:14:39.653792+00', '2025-11-21 19:43:08.748338+00', 'biq2aufyqaev', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 30, 'hfryjrg66nq6', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 18:13:26.683994+00', '2025-11-21 20:03:56.743272+00', 'x7xkawbm7t5o', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 32, 'y5f4eebo7dnq', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 20:03:56.767764+00', '2025-11-21 21:30:22.051763+00', 'hfryjrg66nq6', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 33, 'ft3xdckayinf', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 21:30:22.0642+00', '2025-11-21 22:33:29.513248+00', 'y5f4eebo7dnq', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 31, 'owoah4sdl4w2', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 19:43:08.775747+00', '2025-11-22 06:12:03.219532+00', 'odc4bzfyumqd', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 34, 'bwidh2gygajw', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 22:33:29.55112+00', '2025-11-22 06:30:19.745613+00', 'ft3xdckayinf', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 35, 'in4ezb6wy4mn', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 06:12:03.243586+00', '2025-11-22 07:25:14.711631+00', 'owoah4sdl4w2', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 36, 'c3bdsvgithsx', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 06:30:19.754557+00', '2025-11-22 07:31:22.815417+00', 'bwidh2gygajw', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 37, 'aycxxxybbbdj', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 07:25:14.733073+00', '2025-11-22 08:55:28.190457+00', 'in4ezb6wy4mn', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 39, 'ivkz55fpu5xk', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 08:55:28.222992+00', '2025-11-22 12:38:25.788802+00', 'aycxxxybbbdj', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 40, '3knbjapzodbp', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 12:38:25.815151+00', '2025-11-22 14:20:51.003495+00', 'ivkz55fpu5xk', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 41, 'i3t6waq3dvr6', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 14:20:51.018438+00', '2025-11-22 16:32:55.532601+00', '3knbjapzodbp', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 38, 'ubfacngdjj6n', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 07:31:22.817477+00', '2025-11-22 17:24:55.51431+00', 'c3bdsvgithsx', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 42, 'wigar3pqek5a', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 16:32:55.561695+00', '2025-11-22 17:31:30.513195+00', 'i3t6waq3dvr6', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 44, 'v2v3plqec6z3', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 17:31:30.51482+00', '2025-11-22 18:57:00.70782+00', 'wigar3pqek5a', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 43, 'hfexhwui3mst', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 17:24:55.531885+00', '2025-11-22 18:57:11.726672+00', 'ubfacngdjj6n', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 45, 'pj2pnnfyainz', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 18:57:00.724337+00', '2025-11-23 10:20:40.748408+00', 'v2v3plqec6z3', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 47, 'wpz46r526x6j', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 10:20:40.77103+00', '2025-11-23 11:26:17.525206+00', 'pj2pnnfyainz', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 48, 'x57q5xgoibxb', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 11:26:17.544051+00', '2025-11-23 12:27:47.706992+00', 'wpz46r526x6j', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 46, 'urpkzogw64d7', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-22 18:57:11.727662+00', '2025-11-23 13:13:51.166019+00', 'hfexhwui3mst', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 49, '3e7jmyzg6hdh', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 12:27:47.729345+00', '2025-11-23 14:13:18.371805+00', 'x57q5xgoibxb', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 50, 'bqbvx2k47uxh', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 13:13:51.17554+00', '2025-11-23 14:16:31.428451+00', 'urpkzogw64d7', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 29, 'rlhzzihewqdn', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-21 18:07:14.438983+00', '2025-11-29 06:22:35.366913+00', 'os7qkbkslg5t', 'c11d6397-1345-4b03-b3d7-33e00d00021c'),
	('00000000-0000-0000-0000-000000000000', 71, '4yrfrkejvpjx', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 10:23:57.026651+00', '2025-11-29 17:03:49.055801+00', '4knkpbweyqop', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 75, '2hrn6mthqedj', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 17:03:49.061106+00', '2025-11-29 18:08:04.75459+00', '4yrfrkejvpjx', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 52, 'iaf6uzf5qh4a', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 14:16:31.430709+00', '2025-11-23 15:17:31.197855+00', 'bqbvx2k47uxh', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 53, 'zcsjgt4lhcpo', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 15:17:31.204167+00', '2025-11-23 17:58:09.432127+00', 'iaf6uzf5qh4a', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 54, 'ylm6layontey', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 17:58:09.461136+00', '2025-11-23 18:59:06.255713+00', 'zcsjgt4lhcpo', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 77, 'fxtgiqala3aw', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-30 07:25:10.23712+00', '2025-11-30 10:45:25.689706+00', NULL, '5ac69d02-6920-4afb-aad6-d5f1cd26f112'),
	('00000000-0000-0000-0000-000000000000', 51, '27tuxucw7xow', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 14:13:18.399156+00', '2025-11-24 03:39:50.254067+00', '3e7jmyzg6hdh', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 78, 'n6gkeyazxxmt', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-30 10:45:25.713286+00', '2025-11-30 10:45:25.713286+00', 'fxtgiqala3aw', '5ac69d02-6920-4afb-aad6-d5f1cd26f112'),
	('00000000-0000-0000-0000-000000000000', 56, 'j7hpf7tqhiar', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-24 03:39:50.281945+00', '2025-11-24 07:51:51.870122+00', '27tuxucw7xow', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 76, 'nzp352ikfrte', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 18:08:04.779926+00', '2025-11-30 17:08:07.333701+00', '2hrn6mthqedj', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 57, '7kztmanv4fdz', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-24 07:51:51.887222+00', '2025-11-24 12:39:40.942749+00', 'j7hpf7tqhiar', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 58, 'seezstbma6xx', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-24 12:39:40.967958+00', '2025-11-24 12:39:40.967958+00', '7kztmanv4fdz', 'dd4faf81-bc23-4dc6-8e7f-f42d11cc10c2'),
	('00000000-0000-0000-0000-000000000000', 55, 'mtslb7qjugee', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-23 18:59:06.272084+00', '2025-11-26 18:22:01.261507+00', 'ylm6layontey', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 80, 'y4r7pb7xlsvz', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-30 18:41:15.184539+00', '2025-11-30 18:41:15.184539+00', NULL, '7b21a28a-9ab4-4789-98b0-54da5ac9c695'),
	('00000000-0000-0000-0000-000000000000', 59, '6wsrsw3c5lzi', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-26 18:22:01.285035+00', '2025-11-26 21:04:28.479934+00', 'mtslb7qjugee', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 79, 'z4pdc7k76dn6', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-30 17:08:07.361959+00', '2025-12-01 06:34:15.628962+00', 'nzp352ikfrte', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 61, 'lcmntckhnw7f', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-26 21:04:28.49873+00', '2025-11-27 06:39:27.682566+00', '6wsrsw3c5lzi', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 62, 'muuvzcjbi6kf', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-27 06:39:27.695308+00', '2025-11-27 06:39:27.695308+00', 'lcmntckhnw7f', '6ac8af32-77c4-4037-851b-beef25ef6bc5'),
	('00000000-0000-0000-0000-000000000000', 60, 'i6qakcyhofrm', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-26 20:19:53.581444+00', '2025-11-27 07:27:55.182014+00', NULL, '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 63, 'i4g347vfnfzm', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-27 07:27:55.202936+00', '2025-11-28 03:59:59.939017+00', 'i6qakcyhofrm', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 74, 'frv5ewby3yad', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 15:09:52.384065+00', '2025-12-01 08:55:54.891186+00', 'jixwb2lyw4ra', 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 64, '6dk7d5bcvsam', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-28 03:59:59.966399+00', '2025-11-28 05:11:16.232771+00', 'i4g347vfnfzm', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 65, 'ais2gix5yalr', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-28 05:11:16.258427+00', '2025-11-28 06:12:12.474009+00', '6dk7d5bcvsam', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 82, 'zc5kcjcaibki', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-01 08:55:54.901525+00', '2025-12-01 11:00:51.647633+00', 'frv5ewby3yad', 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 66, 'scxcrbkhzujc', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-28 06:12:12.493096+00', '2025-11-28 08:42:38.394993+00', 'ais2gix5yalr', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 68, 'h2mkgy4pjnpv', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-29 06:22:35.395184+00', '2025-11-29 06:22:35.395184+00', 'rlhzzihewqdn', 'c11d6397-1345-4b03-b3d7-33e00d00021c'),
	('00000000-0000-0000-0000-000000000000', 83, '5pkaebpjg2uo', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-01 11:00:51.660709+00', '2025-12-01 14:02:29.260136+00', 'zc5kcjcaibki', 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 69, 'vixmwzevhh5q', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 06:22:57.911135+00', '2025-11-29 08:08:10.953166+00', NULL, '848acc41-3614-4bda-a75b-b4aebc8401d6'),
	('00000000-0000-0000-0000-000000000000', 67, '4knkpbweyqop', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-28 08:42:38.414513+00', '2025-11-29 10:23:57.005409+00', 'scxcrbkhzujc', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 70, 'g6lhb5jezidu', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 08:08:10.97765+00', '2025-11-29 14:11:33.551522+00', 'vixmwzevhh5q', '848acc41-3614-4bda-a75b-b4aebc8401d6'),
	('00000000-0000-0000-0000-000000000000', 72, 'ftogjsph35df', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-11-29 14:11:33.571382+00', '2025-11-29 14:11:33.571382+00', 'g6lhb5jezidu', '848acc41-3614-4bda-a75b-b4aebc8401d6'),
	('00000000-0000-0000-0000-000000000000', 84, 'ucuosbcxby4y', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-01 14:02:29.278572+00', '2025-12-01 15:13:38.35883+00', '5pkaebpjg2uo', 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 73, 'jixwb2lyw4ra', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-11-29 14:11:47.096832+00', '2025-11-29 15:09:52.355054+00', NULL, 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 85, 'xpm4zi6hkiar', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-01 15:13:38.369248+00', '2025-12-01 17:11:18.185863+00', 'ucuosbcxby4y', 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 86, 'r5jxu4fopkuj', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-12-01 17:11:18.211191+00', '2025-12-01 17:11:18.211191+00', 'xpm4zi6hkiar', 'fa6352a8-7925-42ca-a5db-83cf575b60ea'),
	('00000000-0000-0000-0000-000000000000', 81, 'wprnoke3nmfh', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-01 06:34:15.651877+00', '2025-12-02 13:29:26.183627+00', 'z4pdc7k76dn6', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 87, '27aq2wezc7x7', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-02 13:29:26.198646+00', '2025-12-02 16:07:44.994762+00', 'wprnoke3nmfh', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 88, '6y5gtcj6levv', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-12-02 16:07:45.025461+00', '2025-12-02 16:07:45.025461+00', '27aq2wezc7x7', '687de701-d880-40d0-b925-2b511e276740'),
	('00000000-0000-0000-0000-000000000000', 89, 'vt43hczdw7s5', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-02 16:07:56.998813+00', '2025-12-03 13:31:27.716866+00', NULL, '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 90, 'zfwsmcihut3b', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 13:31:27.739798+00', '2025-12-03 14:29:59.502217+00', 'vt43hczdw7s5', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 91, 'qspheg4b6ltu', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 14:29:59.51376+00', '2025-12-03 16:29:40.6672+00', 'zfwsmcihut3b', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 92, 'j7dciswtgws7', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 14:45:14.765815+00', '2025-12-03 16:39:45.766944+00', NULL, '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 93, 's7tsz7mu7fql', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 16:18:04.323403+00', '2025-12-03 17:17:06.63789+00', NULL, '061a341b-2dfa-40e8-b4c9-41ddc94067e2'),
	('00000000-0000-0000-0000-000000000000', 94, 'tqc2r6csk5qb', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 16:29:40.684033+00', '2025-12-03 17:39:16.17815+00', 'qspheg4b6ltu', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 95, 'a6lnjjjgta23', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 16:39:45.77194+00', '2025-12-03 18:00:05.462999+00', 'j7dciswtgws7', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 96, 'fmnfrg23avvp', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 17:17:06.659199+00', '2025-12-03 18:18:33.078335+00', 's7tsz7mu7fql', '061a341b-2dfa-40e8-b4c9-41ddc94067e2'),
	('00000000-0000-0000-0000-000000000000', 99, 'h2ugumd6fuys', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-12-03 18:18:33.091104+00', '2025-12-03 18:18:33.091104+00', 'fmnfrg23avvp', '061a341b-2dfa-40e8-b4c9-41ddc94067e2'),
	('00000000-0000-0000-0000-000000000000', 97, '4sfho3f6wbnx', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 17:39:16.191681+00', '2025-12-03 18:37:19.517812+00', 'tqc2r6csk5qb', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 101, 'qj5zsj7gqqhn', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 19:32:31.205856+00', '2025-12-04 07:28:41.410407+00', NULL, 'f75b1f08-5922-4ef5-aee7-68651539a453'),
	('00000000-0000-0000-0000-000000000000', 98, 'bfic53663ln5', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 18:00:05.477219+00', '2025-12-04 11:54:10.335953+00', 'a6lnjjjgta23', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 100, 'pzg47bu7lebp', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-03 18:37:19.533253+00', '2025-12-04 18:17:11.819841+00', '4sfho3f6wbnx', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 102, 'pyvcbcslghzn', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-04 07:28:41.429012+00', '2025-12-04 09:15:00.884246+00', 'qj5zsj7gqqhn', 'f75b1f08-5922-4ef5-aee7-68651539a453'),
	('00000000-0000-0000-0000-000000000000', 103, 'mh7uhp2sm64j', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-12-04 09:15:00.909726+00', '2025-12-04 09:15:00.909726+00', 'pyvcbcslghzn', 'f75b1f08-5922-4ef5-aee7-68651539a453'),
	('00000000-0000-0000-0000-000000000000', 104, 'nhhdw2nwjwvg', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-04 11:54:10.350939+00', '2025-12-05 15:43:05.554305+00', 'bfic53663ln5', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 106, '2mwzyc5cnur3', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-05 15:43:05.586628+00', '2025-12-05 19:41:13.739648+00', 'nhhdw2nwjwvg', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 105, 'oyussz7f5agl', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-04 18:17:11.846887+00', '2025-12-06 17:09:44.979203+00', 'pzg47bu7lebp', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 107, 'bolbaxur5dkp', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-05 19:41:13.761366+00', '2025-12-07 04:36:09.463269+00', '2mwzyc5cnur3', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 108, 'xuzajxuh6uge', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-06 17:09:44.99796+00', '2025-12-07 11:35:38.760625+00', 'oyussz7f5agl', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 110, 'qipkp3t63bwd', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-07 11:35:38.780325+00', '2025-12-07 16:43:37.798393+00', 'xuzajxuh6uge', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 111, 'arphbk7ef2eb', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-07 16:43:37.826364+00', '2025-12-08 06:08:09.434582+00', 'qipkp3t63bwd', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 112, 'hapixt7ib6gr', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-08 06:08:09.453128+00', '2025-12-08 07:56:40.373992+00', 'arphbk7ef2eb', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 113, 'cf7t2ufpudtt', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-08 07:56:40.39102+00', '2025-12-10 15:48:10.972701+00', 'hapixt7ib6gr', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 109, 'jlcyu423cgrn', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-07 04:36:09.482458+00', '2025-12-10 17:15:14.164487+00', 'bolbaxur5dkp', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 115, 'whz4e3lbzvbm', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2025-12-10 17:15:14.189638+00', '2025-12-10 17:15:14.189638+00', 'jlcyu423cgrn', '5fd8ddec-4e26-4927-8044-8afaba815294'),
	('00000000-0000-0000-0000-000000000000', 114, 'blvrg42dfoy2', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-10 15:48:10.989683+00', '2025-12-11 08:38:30.403774+00', 'cf7t2ufpudtt', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 116, 'wkofqzkmnpwy', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-11 08:38:30.422262+00', '2025-12-19 06:32:11.085668+00', 'blvrg42dfoy2', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 117, '2lkngfvzo6nv', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-19 06:32:11.111505+00', '2025-12-22 11:57:27.677148+00', 'wkofqzkmnpwy', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 118, 'khwojrgih6nq', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2025-12-22 11:57:27.702038+00', '2026-01-21 12:21:26.649211+00', '2lkngfvzo6nv', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 119, 'hmhicomaamvs', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-21 12:21:26.676612+00', '2026-01-27 18:34:22.863637+00', 'khwojrgih6nq', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 120, 'q3buvhbaxlsv', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-27 18:34:22.885127+00', '2026-01-28 09:27:17.507321+00', 'hmhicomaamvs', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 121, '27v2m4wltkrn', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-28 09:27:17.529483+00', '2026-01-28 15:34:37.242553+00', 'q3buvhbaxlsv', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 122, 'gnu27lxxqwgx', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-28 15:34:37.25881+00', '2026-01-29 08:13:24.355835+00', '27v2m4wltkrn', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 123, '2reprb42mjih', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-29 08:13:24.383974+00', '2026-01-29 12:17:01.731963+00', 'gnu27lxxqwgx', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 124, 'mxc5vmkv6hsz', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-29 12:17:01.746085+00', '2026-01-29 16:44:05.987752+00', '2reprb42mjih', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 125, 'ugha46df66ii', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-29 16:44:06.000692+00', '2026-01-29 17:55:53.325418+00', 'mxc5vmkv6hsz', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 126, '6ij5ao5xyaxv', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2026-01-29 17:55:53.33613+00', '2026-01-29 17:55:53.33613+00', 'ugha46df66ii', '53c9db28-04b6-4a43-a53a-46644497ce92'),
	('00000000-0000-0000-0000-000000000000', 127, 'znbhdlu5xau6', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-29 17:57:39.544199+00', '2026-01-30 05:41:26.341248+00', NULL, 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 128, '6xmykouwt73n', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-30 05:41:26.355555+00', '2026-01-30 06:39:54.926741+00', 'znbhdlu5xau6', 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 129, 'ew5xt7oqtq3h', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-30 06:39:54.947368+00', '2026-01-30 07:38:29.635789+00', '6xmykouwt73n', 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 130, 'vsqi4ayekuyp', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-30 07:38:29.659754+00', '2026-01-30 08:36:39.754633+00', 'ew5xt7oqtq3h', 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 131, '2rypbh26yduh', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-30 08:36:39.771243+00', '2026-01-30 09:37:44.1864+00', 'vsqi4ayekuyp', 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 132, 'z56jd67ne6sk', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-30 09:37:44.208412+00', '2026-01-30 10:45:34.16273+00', '2rypbh26yduh', 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 133, 'lc3y5ahh57uj', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2026-01-30 10:45:34.177669+00', '2026-01-30 10:45:34.177669+00', 'z56jd67ne6sk', 'b4a3dff6-aa20-4b05-b235-edd0b5905418'),
	('00000000-0000-0000-0000-000000000000', 134, 'jii232qizspu', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2026-01-30 13:43:16.284514+00', '2026-01-30 13:43:16.284514+00', NULL, '45e6992e-2906-4527-bb17-b66719780ccb'),
	('00000000-0000-0000-0000-000000000000', 135, 'zap6xfvwtgjd', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-01-31 07:26:06.403169+00', '2026-01-31 16:43:45.450253+00', NULL, 'e5d48e15-b718-4da0-924e-a96cf9157020'),
	('00000000-0000-0000-0000-000000000000', 136, 'ao3ika4dcald', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2026-01-31 16:43:45.462537+00', '2026-01-31 16:43:45.462537+00', 'zap6xfvwtgjd', 'e5d48e15-b718-4da0-924e-a96cf9157020'),
	('00000000-0000-0000-0000-000000000000', 137, 'i4b24h6hwv2o', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', true, '2026-02-01 05:13:04.471957+00', '2026-02-01 11:15:37.857659+00', NULL, '53fa6810-009b-49b9-b888-e85b2a840eb6'),
	('00000000-0000-0000-0000-000000000000', 138, 'j6pdfy22kz6f', '1c3d00f8-d386-48e7-97a2-1aa2b423e439', false, '2026-02-01 11:15:37.880266+00', '2026-02-01 11:15:37.880266+00', 'i4b24h6hwv2o', '53fa6810-009b-49b9-b888-e85b2a840eb6');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: contact_submissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."contact_submissions" ("id", "name", "email", "phone", "company", "service_type", "budget_range", "message", "status", "source_page", "notes", "created_at", "updated_at") VALUES
	('283565ad-1765-4a75-9b89-fa56dc1d199b', 'David Thompson', 'david.thompson@example.com', '+1 555-901-4411', 'Thompson Solutions', 'Web Development', '$3,000 - $5,000', 'We need a new company website with a modern design and integrated CMS. Please share your pricing and timeline.', 'new', '/contact', NULL, '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('8c64307f-8101-456c-9c72-4cb54f4545ed', 'Sarah Patel', 'sarah.patel@example.com', '+1 555-220-3344', 'CreativeHive', 'App Development', '$10,000 - $20,000', 'Looking for a cross-platform mobile app for our customer portal. Would like to schedule a discovery call.', 'in_progress', '/services/app-development', 'Follow-up scheduled for next Monday.', '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('fe6667a3-dc68-4b36-848a-c5808ca856dc', 'Michael Roberts', 'michael.roberts@example.com', NULL, 'Roberts Financial', 'AI Automation', '$2,000 - $4,000', 'We want to automate parts of our client onboarding process using AI and chatbots.', 'new', '/services/ai-automation', NULL, '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('71744fb9-b555-43f2-894f-f5b08342fa61', 'Emma Gonzalez', 'emma.gonzalez@example.com', '+1 555-771-6600', NULL, 'Web Development', '$1,000 - $2,000', 'Can you help redesign an existing site? I want better performance and improved SEO.', 'closed', '/contact', 'Converted into a paid project.', '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('05b925eb-3a3b-4ff3-85b9-60b7fc6baef7', 'Liam Johnson', 'liam.johnson@example.com', '+1 555-991-2288', 'StartUpPro', 'AI Automation', '$5,000 - $7,000', 'Need an AI assistant workflow integrated with our CRM and ticketing system.', 'in_progress', '/landing/ai', 'Awaiting technical requirements.', '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('01621e77-e39d-47b5-8da1-e65678158010', 'Olivia Wang', 'olivia.wang@example.com', NULL, 'BrightPath Learning', 'Web Development', '$7,000 - $10,000', 'We are building an online course platform and need help with development and UI design.', 'new', '/services/web-development', NULL, '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('01f53d93-2af9-494c-96ee-942a73708d94', 'Jason Miller', 'jason.miller@example.com', '+1 555-302-7788', NULL, 'App Development', '$20,000+', 'Our startup needs a full mobile app MVP with backend APIs. Please share your process.', 'in_progress', '/contact', 'Sent proposal draft.', '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('0cc89948-0836-4a0a-8241-5b99515b78a2', 'Sophia Ahmed', 'sophia.ahmed@example.com', '+1 555-889-2030', 'Ahmed Consulting', 'AI Automation', '$1,500 - $2,000', 'I want an AI chatbot that can answer client questions and schedule calls.', 'new', '/services/ai-automation', NULL, '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('7ed6d028-605b-40db-856b-be03f8f82204', 'Noah Kim', 'noah.kim@example.com', '+1 555-004-5522', NULL, 'Web Development', '$500 - $1,500', 'I need small updates and bug fixes to my existing website.', 'closed', '/contact', 'Completed quickly.', '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('5032df80-48c6-462b-bdaa-0a2d6b14260b', 'Isabella Cruz', 'isabella.cruz@example.com', '+1 555-788-3311', 'Cruz Events', 'App Development', '$3,000 - $5,000', 'Looking for a booking app for event clients with calendar sync.', 'spam', '/services/app-development', 'Marked as spam due to suspicious email behavior.', '2025-11-20 14:42:04.061452+00', '2025-11-20 14:42:04.061452+00'),
	('546a4487-58d0-43a1-84f6-d3260fcc85d9', 'Shariar Nehal', 'sheikhshariarnehal@gmail.com', '01750627421', NULL, NULL, NULL, 'Daffodil international University,Ashulia,Saver', 'new', 'contact', NULL, '2025-11-21 18:32:40.044342+00', '2025-11-21 18:32:40.044342+00'),
	('46cfdc2f-3631-4783-a50d-f9041f5f3b09', 'nehela', 'errtt@gma.cinm', '024434566', 'etggt', NULL, NULL, 'freftgfggtrt', 'new', 'contact', NULL, '2025-11-23 06:10:13.101426+00', '2025-11-23 06:10:13.101426+00'),
	('88e6c81d-13d6-41c4-8060-3726766504b5', 'nehela', 'nehal9743@gmail.com', '01750627421', 'etggt', NULL, NULL, 'dsfsdddddddddddddddddddd', 'new', 'contact', NULL, '2025-11-23 06:12:39.034168+00', '2025-11-23 06:12:39.034168+00'),
	('59264094-22a6-439f-ad01-a1af5170ca46', 'Shahrear Hossain Shihan', 'shahrearhossain10@gmail.com', '01877307127', NULL, NULL, NULL, 'I'' m UI/UX designer. Mainly focus on user experience.', 'new', 'contact', NULL, '2026-01-30 05:28:30.375379+00', '2026-01-30 05:28:30.375379+00'),
	('51372e90-d9a6-4e0f-8b81-d94d8f208500', 'Sheikh Shariar Nehal', 'nehalmahamud.dev@gmail.com', '01750627421', 'nimon4', NULL, NULL, 'Nowabgonj,Dhaka,Bangladeshewr wer', 'new', 'contact', NULL, '2026-01-30 09:26:41.987729+00', '2026-01-30 09:26:41.987729+00'),
	('0d1f3d8f-c448-468a-8d9b-b4cd85b41f0c', 'Sheikh Shariar Nehal', 'nehalmahamud.dev@gmail.com', '01750627421', 'nimon', NULL, NULL, 'fsgds erwr ewr ewr', 'new', 'contact', NULL, '2026-01-30 10:18:07.400179+00', '2026-01-30 10:18:07.400179+00'),
	('8bc7ea5c-0f2f-4e16-a354-72f31564bd5a', 'Akib Ahmed', 'ahmed22205101902@diu.edu.bd', '+8801831338619', NULL, NULL, NULL, 'wer wer wer 435 gdffed', 'new', 'contact', NULL, '2026-01-30 13:42:48.381939+00', '2026-01-30 13:42:48.381939+00'),
	('48339f31-a971-4e0e-9c0f-d53306223b97', 'Test User', 'test@example.com', '+1 555 123 4567', 'Test Company', NULL, NULL, 'This is a test message to verify that the Telegram notification is working correctly.', 'new', 'contact', NULL, '2026-02-01 13:32:13.046575+00', '2026-02-01 13:32:13.046575+00'),
	('eb8036ca-222e-4bb8-b254-0115a6e7c9e8', 'Shariar Nehal', 'sheikhshariarnehal@gmail.com', '01750627421', 'nimon', NULL, NULL, 'asdasdasdasddd asd aswe', 'new', 'contact', NULL, '2026-02-01 13:32:58.826521+00', '2026-02-01 13:32:58.826521+00');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "full_name", "role", "created_at", "updated_at", "email", "phone") VALUES
	('abff6a8a-4b5e-4ffa-8327-c5210c7929c3', 'Admin User', 'admin', '2025-11-20 09:01:14.801326+00', '2025-11-20 09:21:43.503032+00', 'admin@ntech.com', NULL),
	('1c3d00f8-d386-48e7-97a2-1aa2b423e439', 'Ntech Admin', 'admin', '2025-11-20 09:45:29.790649+00', '2025-11-20 09:46:01.32398+00', 'ntechadmin@gmail.com', NULL),
	('6825eb0f-640e-4e17-8e74-606630cfeb64', 'nehal c1', 'customer', '2025-11-22 07:41:57.861812+00', '2025-11-22 07:41:57.861812+00', NULL, NULL),
	('7b33b7bb-c341-4112-8eb5-7d41464133e5', 'Sheikh Shariar Nehal', 'customer', '2025-12-13 14:02:59.372402+00', '2025-12-13 14:02:59.372402+00', NULL, NULL);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."orders" ("id", "user_id", "email", "status", "total_amount", "currency", "payment_provider", "payment_reference", "created_at", "updated_at") VALUES
	('a213b01e-ab2a-4701-81cb-44055567232d', NULL, 'jane@example.com', 'paid', 149.00, 'usd', 'stripe', NULL, '2025-11-20 08:26:15.988579+00', '2025-11-20 08:26:15.988579+00'),
	('21d6e6d2-191e-4f27-9e22-371d7e6f407a', NULL, 'bob@example.com', 'pending', 12.00, 'usd', 'stripe', NULL, '2025-11-20 08:26:15.988579+00', '2025-11-20 08:26:15.988579+00'),
	('9cab7667-f509-4cee-aa7a-1da8f3700317', NULL, 'alice@example.com', 'paid', 2500.00, 'usd', 'stripe', NULL, '2025-11-20 08:26:15.988579+00', '2025-11-20 08:26:15.988579+00'),
	('47671da1-8d12-4801-b6a5-015d49d02299', NULL, 'john@example.com', 'canceled', 20.00, 'usd', 'stripe', NULL, '2025-11-20 08:26:15.988579+00', '2025-11-21 17:13:51.697931+00');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."products" ("id", "slug", "name", "short_description", "full_description", "price", "billing_interval", "stock", "is_active", "thumbnail_url", "seo_title", "seo_description", "seo_keywords", "created_at", "updated_at", "category", "features") VALUES
	('0cd3c12d-3446-46c6-bdb0-2fa117b6ac0a', 'chatgpt-pro-subscription', 'ChatGPT Pro Subscription', 'Access to ChatGPT Pro with advanced features', 'Get full access to ChatGPT Pro with GPT-4, unlimited messages, faster response times, and priority access to new features.', 20.00, 'monthly', 0, true, 'https://images.unsplash.com/photo-1677442136019-21780ecad995', 'ChatGPT Pro Monthly Subscription', 'ChatGPT Pro subscription with GPT-4 access and unlimited messages', NULL, '2025-11-27 06:37:02.544226+00', '2025-11-27 06:38:18.851308+00', 'AI Tools', NULL),
	('96793fb8-7269-49b1-9b3e-d0db101d1701', 'gemini-pro-subscription', 'Gemini Pro Subscription', 'Google Gemini Pro AI assistant', 'Access Google''s most advanced AI model with multimodal capabilities, including text, images, and code generation.', 18.00, 'monthly', 0, true, 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', 'Google Gemini Pro Subscription', 'Gemini Pro subscription with advanced AI capabilities', NULL, '2025-11-27 06:37:02.544226+00', '2025-11-27 06:38:18.851308+00', 'AI Tools', NULL),
	('544cf723-2c52-4095-b5e6-1fb61d238167', 'canva-pro-subscription', 'Canva Pro Subscription', 'Professional design tools and templates', 'Unlock premium content, powerful design tools, and AI features with Canva Pro. Perfect for creators and businesses.', 12.00, 'monthly', 0, true, 'https://images.unsplash.com/photo-1611162617474-5b21e879e113', 'Canva Pro Subscription', 'Canva Pro subscription for professional design', NULL, '2025-11-27 06:37:02.544226+00', '2025-11-27 06:38:18.851308+00', 'Design', NULL),
	('533fa000-4b9b-4ef3-8a37-85a5e3e46c39', 'netflix-premium-subscription', 'Netflix Premium Subscription', '4K Ultra HD streaming', 'Watch your favorite movies and TV shows in 4K Ultra HD. Supports 4 screens at once and offline downloads.', 15.00, 'monthly', 0, true, 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85', 'Netflix Premium Subscription', 'Netflix Premium 4K Ultra HD subscription', NULL, '2025-11-27 06:37:02.544226+00', '2025-11-27 06:38:18.851308+00', 'Entertainment', NULL),
	('a9e83aaa-b18f-4d77-8f2b-ca6b554ac204', 'spotify-premium-subscription', 'Spotify Premium Subscription', 'Ad-free music streaming', 'Listen to millions of songs ad-free. Download music for offline listening and enjoy high-quality audio.', 10.00, 'monthly', 0, true, 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41', 'Spotify Premium Subscription', 'Spotify Premium ad-free music subscription', NULL, '2025-11-27 06:37:02.544226+00', '2025-11-27 06:38:18.851308+00', 'Entertainment', NULL);


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: licenses_or_keys; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: newsletter_subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."posts" ("id", "slug", "title", "excerpt", "content", "author_id", "cover_image_url", "tags", "published_at", "is_published", "seo_title", "seo_description", "seo_keywords", "created_at", "updated_at") VALUES
	('2e5778aa-e8d4-4b4d-8ab1-fedc83360223', 'why-every-business-needs-a-modern-website-in-2025', 'Why Every Business Needs a Modern Website in 2025', 'Discover why a fast, mobile-friendly website is essential for business growth in 2025 and how NTechSolutions can build it for you.', 'In 2025, your website is more than a digital business card—it is the core of your online presence and often the first interaction a customer has with your brand.

At NTechSolutions, we offer comprehensive technical support, including Web and App Development and AI Automation Creation, so your business can stand out in a crowded market.

### 1. First impressions happen online
Most customers search online before they buy. A slow, outdated, or unresponsive website causes visitors to leave within seconds. A modern, conversion-focused site builds trust and makes it easy for users to contact you, shop, or book services.

### 2. Mobile-first experiences
Over half of global web traffic comes from mobile devices. If your site is not optimised for phones and tablets, you are losing leads every day. NTechSolutions designs fully responsive websites that look great and work flawlessly on any device.

### 3. Speed, security, and SEO
Search engines like Google reward fast, secure, and well-structured websites. We build with best practices in performance and SEO so that your business can rank higher and attract organic traffic.

### 4. Integrations and automation
Your website should work together with the rest of your tools. From CRM integrations to marketing automations, we connect your site to AI-powered workflows that save you time and money.

### 5. How NTechSolutions can help
We combine Web and App Development with AI Automation to create future-ready digital experiences. We also sell premium digital products and subscriptions to tools such as:
- ChatGPT Pro
- Gemini Pro
- Veo3
- Canva Pro

If you are ready to upgrade your online presence, contact NTechSolutions today and let us build a modern website that actually grows your business.', NULL, 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', '{"web development",website,"business growth",ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, 'Why Every Business Needs a Modern Website in 2025', 'Learn why a modern, mobile-friendly website is critical in 2025 and how NTechSolutions can design and develop it for your business.', '{ntechsolutions,"modern website","web development agency","business website 2025","seo web design"}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('66bf02dd-294d-4b67-a600-dc0d15bd2d20', 'how-ai-automation-transforms-small-businesses', 'How AI Automation Transforms Small Businesses', 'See how AI automation can save hours every week, reduce errors, and help small businesses scale faster with NTechSolutions.', 'AI automation is no longer a luxury reserved for big corporations. Today, small and medium businesses can use AI to streamline operations, improve customer service, and unlock new growth opportunities.

At NTechSolutions, we specialise in AI Automation Creation along with Web and App Development, supporting businesses that want to work smarter—not harder.

### 1. Automating repetitive tasks
Data entry, report generation, follow-up emails, and basic support queries can all be automated. With AI workflows, your team can focus on high-value tasks while the routine work runs in the background.

### 2. 24/7 intelligent customer support
By combining tools like ChatGPT Pro and Gemini Pro, we help businesses deploy smart chatbots that answer FAQs, qualify leads, and route important inquiries directly to your team—day and night.

### 3. Smarter marketing and sales
AI can segment your audience, personalise offers, and send targeted campaigns automatically. From lead scoring to follow-up sequences, automation helps you close more deals with less manual effort.

### 4. Connected with your existing systems
Our AI automations integrate with your website, CRM, and other tools. NTechSolutions builds custom workflows that match your processes instead of forcing you to change how you work.

### 5. Start small, scale fast
You don’t have to automate everything at once. We help you identify quick wins, such as email replies, appointment scheduling, or simple chatbots, and expand from there as you see results.

If you want to save time, reduce errors, and grow faster, talk to NTechSolutions about AI Automation Creation for your business.', NULL, 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', '{"ai automation","small business",productivity,ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, 'How AI Automation Transforms Small Businesses', 'Discover how NTechSolutions uses AI automation to save time, reduce manual work, and help small businesses grow faster.', '{"ai automation","small business automation",ntechsolutions,"chatgpt pro","gemini pro"}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('36874ce9-f5d8-4b5f-a89b-84e2fd1d2a31', 'guide-to-choosing-a-web-and-app-development-partner', 'Complete Guide to Choosing a Web & App Development Partner', 'Learn what to look for in a web and app development agency and why NTechSolutions is a smart choice for modern businesses.', 'Choosing the right web and app development partner can make or break your digital strategy. A good agency becomes a long-term technology partner, not just a one-time vendor.

Here’s a simple guide from NTechSolutions, where we offer Web and App Development, AI Automation Creation, and premium digital products.

### 1. Check their technical stack and experience
Make sure the agency is comfortable with modern frameworks and best practices. Ask about performance, security, scalability, and whether they build APIs and mobile-ready solutions.

### 2. Look for business understanding, not just coding skills
A strong development partner should understand your business model and goals. At NTechSolutions, we start with discovery sessions to map features to real business outcomes.

### 3. Evaluate UX and UI quality
Great design is not only about visuals; it’s about usability and conversion. Review past projects, user flows, and mobile responsiveness.

### 4. Ask about AI and automation capabilities
In 2025, AI-powered features—recommendation engines, chatbots, smart search—can give you a competitive edge. Our team combines development with AI Automation Creation for smarter apps.

### 5. Support, maintenance, and future growth
Your app or website will need updates, new features, and optimisations. We provide ongoing technical support and can integrate subscriptions to tools like ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro to keep your stack current.

By choosing a partner like NTechSolutions, you get long-term support, a modern tech stack, and integrated AI-driven solutions that help your business grow.', NULL, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', '{"web development","app development",agency,ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, 'Guide to Choosing the Right Web & App Development Partner', 'Find out how to choose the best web and app development agency and why NTechSolutions is a reliable, future-ready partner.', '{"web development agency","app development company",ntechsolutions,"choose development partner"}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('3e1e6d6e-9a97-4d67-b0e1-605b641e79c2', 'power-up-your-business-with-chatgpt-gemini-veo3-canva-pro', 'Power Up Your Business with ChatGPT Pro, Gemini Pro, Veo3 & Canva Pro', 'Understand how premium tools like ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro can boost productivity and marketing for your business.', 'Modern businesses run on powerful digital tools. At NTechSolutions, we not only build web and app solutions and AI automations—we also sell premium digital products and subscriptions, including ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro.

### 1. ChatGPT Pro for smarter communication and automation
ChatGPT Pro can help you write emails, create content, draft proposals, and power intelligent chatbots. Integrated with your systems, it becomes a 24/7 assistant for your team.

### 2. Gemini Pro for research and insights
Gemini Pro accelerates research, analysis, and content generation. From strategy documents to technical overviews, it helps your business move faster and make better decisions.

### 3. Veo3 for powerful video creation
Video is one of the best ways to reach your audience. With Veo3, you can generate and edit high-quality videos for ads, social media, training, and more—without a large production team.

### 4. Canva Pro for branded design at scale
Canva Pro makes it easy to maintain brand consistency across social posts, ads, presentations, and documents. Your whole team can produce on-brand visuals in minutes.

### 5. How NTechSolutions ties it all together
We help you choose the right tools and connect them to your website, apps, and AI automations. Instead of juggling random subscriptions, you get a unified, efficient digital ecosystem.

If you want to supercharge your workflows with ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro, NTechSolutions can help you set up, integrate, and get real business value from these tools.', NULL, 'https://images.unsplash.com/photo-1677442136019-21780ecad995', '{"chatgpt pro","gemini pro",veo3,"canva pro","digital products"}', '2025-11-21 14:50:10.517411+00', true, 'Boost Your Business with ChatGPT Pro, Gemini Pro, Veo3 & Canva Pro', 'See how NTechSolutions helps businesses maximise productivity using ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro subscriptions.', '{"chatgpt pro subscription","gemini pro",veo3,"canva pro",ntechsolutions}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('3ecf55e3-c2eb-4c01-b6cc-2c1c9fd9b197', 'how-ntechsolutions-builds-fast-secure-scalable-web-apps', 'How NTechSolutions Builds Fast, Secure, and Scalable Web Apps', 'A behind-the-scenes look at how NTechSolutions designs and develops fast, secure, and scalable web applications.', 'When you invest in a web application, you need it to be fast, secure, and ready to scale as your user base grows. At NTechSolutions, this is at the core of how we deliver Web and App Development projects.

### 1. Performance-first architecture
We design apps with performance in mind from day one—optimised database queries, modern front-end frameworks, caching, and CDNs to ensure your users enjoy a smooth experience.

### 2. Security best practices
Security is not optional. We follow industry best practices for authentication, authorisation, encryption, and secure coding standards to protect your data and your customers.

### 3. Scalability and cloud-native thinking
Our apps are built to grow with you. We design for scalability using cloud platforms, containerisation, and modular architectures so you can handle more users and features without rebuilding from scratch.

### 4. AI and automation as built-in advantages
By combining development with AI Automation Creation, we can add AI-powered features like chatbots, smart search, recommendation engines, and automated workflows directly into your app.

### 5. Continuous support and improvement
We don’t disappear after launch. NTechSolutions provides ongoing technical support, performance monitoring, and feature enhancements so your app stays competitive.

If you need a fast, secure, and scalable web app tailored to your business, our team at NTechSolutions is ready to help.', NULL, 'https://images.unsplash.com/photo-1518770660439-4636190af475', '{"web apps",security,performance,ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, 'How NTechSolutions Builds Fast, Secure, Scalable Web Apps', 'Learn how NTechSolutions designs secure, high-performance, and scalable web applications for growing businesses.', '{"web app development","secure web apps","performance optimisation",ntechsolutions}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('a02dfd4d-558b-475c-baf8-c4dd71948328', '10-ways-to-automate-your-workflow-with-ai-in-2025', '10 Ways to Automate Your Workflow with AI in 2025', 'Practical AI automation ideas you can apply right now with the help of NTechSolutions to save time and money.', 'AI automation is transforming how businesses work in 2025. Whether you run a startup, agency, or local business, you can use automation to save time and reduce manual effort.

Here are 10 ways NTechSolutions can help you automate your workflow using AI:

1. Automatic email replies to common questions  
2. AI-powered lead qualification and scoring  
3. Chatbots embedded on your website for 24/7 support  
4. Automated social media content drafting  
5. Smart appointment scheduling and reminders  
6. Invoice generation and payment reminders  
7. Internal knowledge assistants using ChatGPT Pro or Gemini Pro  
8. Automated reporting dashboards pulling data from multiple tools  
9. Document summarisation and meeting note generation  
10. Integration between your CRM, website, and marketing tools

We offer AI Automation Creation and Web and App Development to connect all of these workflows into a single, smooth system. We can also provide subscriptions for tools like ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro so your team has everything needed to execute efficiently.

If you want to turn manual processes into automated, AI-powered workflows, NTechSolutions is here to guide and implement the right solutions for your business.', NULL, 'https://images.unsplash.com/photo-1555255707-c1f20d8a6bb3', '{"ai automation","workflow automation",productivity,ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, '10 Ways to Automate Your Workflow with AI in 2025', 'Explore ten practical AI automation ideas that NTechSolutions can implement to streamline your business workflows in 2025.', '{"workflow automation","ai automation ideas",ntechsolutions,"business productivity"}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('9d1d1879-c44b-41bb-8326-acee4dacc2fc', 'what-is-ai-automation-and-how-to-start', 'What Is AI Automation and How Can Your Business Start?', 'A simple explanation of AI automation and a step-by-step roadmap to get started with NTechSolutions.', 'The term "AI automation" is everywhere, but what does it actually mean for your business?

### What is AI automation?
AI automation is the use of artificial intelligence to perform tasks that usually require human effort—like answering questions, processing data, or making recommendations. Instead of just running a fixed script, AI can understand context and adapt to different situations.

### How NTechSolutions approaches AI automation
At NTechSolutions, we combine AI models like ChatGPT Pro and Gemini Pro with custom workflows and integrations. We call this AI Automation Creation—tailored automations designed to match your exact processes.

### 3 simple steps to get started

1. **Map your workflows**  
   We help you identify repetitive tasks in sales, support, marketing, and operations.

2. **Pick the right tools**  
   From ChatGPT Pro and Gemini Pro to Veo3 and Canva Pro, we recommend the best digital products and subscriptions for your use case.

3. **Build and integrate automations**  
   Our team builds AI-powered workflows and connects them to your website, apps, and internal tools so everything works together smoothly.

### Why start now?
Businesses that adopt AI automation early gain a competitive advantage in speed, customer experience, and cost efficiency. With NTechSolutions as your technology partner, getting started is much easier than you think.

If you’re curious about AI automation but not sure where to begin, reach out to NTechSolutions for a strategy session.', NULL, 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f', '{"ai automation","getting started","digital transformation",ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, 'What Is AI Automation and How Can Your Business Start?', 'Understand AI automation in simple terms and learn how NTechSolutions helps businesses start with practical AI workflows.', '{"what is ai automation","ai for business",ntechsolutions,"chatgpt pro automation"}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('9392ad20-e9b2-4ca5-95d3-1543153f65e3', '7-must-have-features-for-a-high-converting-business-website', '7 Must-Have Features for a High-Converting Business Website', 'Discover the essential features every business website needs to attract visitors and turn them into customers.', 'A beautiful website is not enough. To grow your business, your site must be designed to convert visitors into leads and customers.

Here are 7 must-have features NTechSolutions includes when we deliver Web and App Development projects:

1. **Clear value proposition on the homepage**  
   Visitors should instantly understand who you are, what you do, and who you help.

2. **Fast, mobile-friendly design**  
   Speed and responsiveness are key ranking factors and user expectations.

3. **Strong calls-to-action (CTAs)**  
   Buttons and forms that guide users to contact, book, or buy.

4. **Trust elements**  
   Testimonials, case studies, certifications, and social proof.

5. **Integrated chat and AI support**  
   Using ChatGPT Pro-based chatbots, we enable real-time assistance without needing a large support team.

6. **SEO foundations**  
   Clean URLs, meta tags, headings, and structured content to help search engines understand your pages.

7. **Analytics and tracking**  
   You can’t improve what you don’t measure. We connect your site to analytics tools and reports.

With NTechSolutions, you also get the option to integrate AI Automation Creation and premium subscriptions like Gemini Pro, Veo3, and Canva Pro to enhance your marketing and content production.

If you want a website that not only looks good but actively grows your business, our team is ready to help.', NULL, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', '{"web design","conversion optimisation","business website",ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, '7 Must-Have Features for a High-Converting Business Website', 'Learn the seven essential features NTechSolutions includes to build high-converting business websites.', '{"business website features","conversion focused design",ntechsolutions,"web development"}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('1364331e-0f46-42ef-a45c-83ed3ca0884c', 'why-subscription-based-digital-tools-are-the-future-of-work', 'Why Subscription-Based Digital Tools Are the Future of Work', 'Find out why businesses are moving to subscription-based tools like ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro.', 'From design and video to AI assistants and automation, the world is shifting to subscription-based digital tools. Instead of buying expensive one-time software, businesses now pay for always-updated, cloud-based services.

At NTechSolutions, we sell premium digital products such as subscriptions to ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro—and help you integrate them into your daily workflows.

### 1. Always up to date
Subscription tools receive regular updates, new features, and security improvements. You avoid large upgrade costs and stay ahead with the latest capabilities.

### 2. Lower upfront cost
Instead of big one-time purchases, subscriptions spread the cost over time, which is better for cash flow—especially for startups and small businesses.

### 3. Better collaboration
Cloud-based tools make it easy for teams to work together, share assets, and maintain consistent branding and processes.

### 4. Easy integration with AI and automations
Tools like ChatGPT Pro and Gemini Pro can be integrated into your website, apps, and workflows as part of our AI Automation Creation service.

### 5. Flexibility and scalability
You can start small and add more licenses or tools as your team grows.

If you want help selecting and integrating the right subscriptions for your business, NTechSolutions can guide you and provide access to ChatGPT Pro, Gemini Pro, Veo3, Canva Pro, and more.', NULL, 'https://images.unsplash.com/photo-1558655147-9a412961c28c', '{"digital tools",subscriptions,"future of work",ntechsolutions}', '2025-11-21 14:50:10.517411+00', true, 'Why Subscription-Based Digital Tools Are the Future of Work', 'See why businesses rely on subscription tools like ChatGPT Pro, Gemini Pro, Veo3, and Canva Pro—and how NTechSolutions can help.', '{"subscription tools","chatgpt pro","gemini pro",veo3,"canva pro",ntechsolutions}', '2025-11-21 14:50:10.517411+00', '2025-11-21 14:50:10.517411+00'),
	('adf125df-8787-4a18-bc27-917ffff1b766', 'ntechsolutions-your-web-ai-and-digital-product-partner', 'NTechSolutions: Your All-in-One Web, AI, and Digital Product Partner', 'An overview of NTechSolutions services, including web and app development, AI automation, and premium digital product subscriptions.', 'NTechSolutions is a modern IT agency focused on helping businesses grow with the right mix of technology, AI, and digital tools.

### What we offer

**1. Web and App Development**  
We design and build fast, secure, and scalable websites and web applications tailored to your business goals.

**2. AI Automation Creation**  
We identify repetitive processes and transform them into AI-powered workflows using tools like ChatGPT Pro and Gemini Pro.

**3. Premium digital product subscriptions**  
NTechSolutions also sells and supports premium digital products such as:
- ChatGPT Pro  
- Gemini Pro  
- Veo3  
- Canva Pro  

We help you choose, set up, and integrate these tools into your daily operations.

### Why businesses choose NTechSolutions

- End-to-end technical support—from idea to deployment and maintenance  
- A focus on real business outcomes, not just code  
- Expertise in both development and AI automation  
- The ability to unify your website, apps, and digital tools into one connected system

