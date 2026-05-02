-- ═══════════════════════════════════════════════════════════════
-- HMG Academy — Complete Supabase Setup SQL  v4
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New Query
-- Safe to re-run (all CREATE uses IF NOT EXISTS)
-- ═══════════════════════════════════════════════════════════════

-- 1. Core CMS config (singleton)
CREATE TABLE IF NOT EXISTS hmg_admin_config (
  id           TEXT PRIMARY KEY DEFAULT 'singleton',
  notes        JSONB NOT NULL DEFAULT '[]',
  tools        JSONB NOT NULL DEFAULT '[]',
  testi        JSONB NOT NULL DEFAULT '[]',
  wa_templates JSONB NOT NULL DEFAULT '[]',
  uploads      JSONB NOT NULL DEFAULT '[]',
  settings     JSONB NOT NULL DEFAULT '{}',
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Login rate limiting
CREATE TABLE IF NOT EXISTS hmg_login_attempts (
  id         BIGSERIAL PRIMARY KEY,
  ip_hash    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_login_ip_time ON hmg_login_attempts(ip_hash, created_at);

-- 3. Sessions
CREATE TABLE IF NOT EXISTS hmg_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash    TEXT,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON hmg_sessions(active, expires_at);

-- 4. Audit log
CREATE TABLE IF NOT EXISTS hmg_audit_log (
  id         BIGSERIAL PRIMARY KEY,
  action     TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT 'system',
  detail     TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_audit_created  ON hmg_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_category ON hmg_audit_log(category);

-- 5. Announcements
CREATE TABLE IF NOT EXISTS hmg_announcements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text       TEXT NOT NULL,
  btn_text   TEXT NOT NULL DEFAULT '',
  btn_link   TEXT NOT NULL DEFAULT '',
  theme      TEXT NOT NULL DEFAULT 'gold',
  active     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ann_active ON hmg_announcements(active);

-- 6. Exam registrations
CREATE TABLE IF NOT EXISTS hmg_registrations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL DEFAULT '',
  exam_type  TEXT NOT NULL,
  school     TEXT NOT NULL DEFAULT '',
  notes      TEXT NOT NULL DEFAULT '',
  status     TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_reg_status ON hmg_registrations(status, created_at DESC);

-- 7. Backup history
CREATE TABLE IF NOT EXISTS hmg_backup_history (
  id         BIGSERIAL PRIMARY KEY,
  label      TEXT NOT NULL DEFAULT 'Backup',
  snapshot   JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Admin notepad
CREATE TABLE IF NOT EXISTS hmg_admin_notepad (
  id         TEXT PRIMARY KEY DEFAULT 'singleton',
  content    TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO hmg_admin_notepad (id, content) VALUES ('singleton', '')
  ON CONFLICT (id) DO NOTHING;

-- 9. Deploy history
CREATE TABLE IF NOT EXISTS hmg_deploy_history (
  id         BIGSERIAL PRIMARY KEY,
  files      JSONB NOT NULL DEFAULT '[]',
  message    TEXT NOT NULL DEFAULT '',
  pushed     INT NOT NULL DEFAULT 0,
  failed     INT NOT NULL DEFAULT 0,
  results    JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Site configuration (global settings)
CREATE TABLE IF NOT EXISTS hmg_site_config (
  id         TEXT PRIMARY KEY DEFAULT 'singleton',
  hero       JSONB NOT NULL DEFAULT '{}',
  contact    JSONB NOT NULL DEFAULT '{}',
  seo        JSONB NOT NULL DEFAULT '{}',
  stats      JSONB NOT NULL DEFAULT '{}',
  footer     JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO hmg_site_config (id) VALUES ('singleton')
  ON CONFLICT (id) DO NOTHING;

-- 11. Content calendar
CREATE TABLE IF NOT EXISTS hmg_calendar (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  event_date  DATE NOT NULL,
  event_type  TEXT NOT NULL DEFAULT 'content',
  color       TEXT NOT NULL DEFAULT 'gold',
  done        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_cal_date ON hmg_calendar(event_date);

-- 12. Enquiries cache (Formspree submissions cached server-side)
CREATE TABLE IF NOT EXISTS hmg_enquiries_cache (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter    TEXT NOT NULL DEFAULT '',
  email        TEXT NOT NULL DEFAULT '',
  message      TEXT NOT NULL DEFAULT '',
  phone        TEXT NOT NULL DEFAULT '',
  subject      TEXT NOT NULL DEFAULT '',
  read         BOOLEAN NOT NULL DEFAULT FALSE,
  source       TEXT NOT NULL DEFAULT 'formspree',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_enquiries_read ON hmg_enquiries_cache(read, submitted_at DESC);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- anon key → ZERO access. service_role → full access (bypasses RLS).
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE hmg_admin_config     ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_login_attempts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_sessions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_audit_log        ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_announcements    ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_registrations    ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_backup_history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_admin_notepad    ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_deploy_history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_site_config      ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_calendar         ENABLE ROW LEVEL SECURITY;
ALTER TABLE hmg_enquiries_cache  ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (safe to re-run)
DO $$ DECLARE r RECORD;
BEGIN
  FOR r IN SELECT policyname, tablename FROM pg_policies
    WHERE tablename LIKE 'hmg_%' LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- Deny ALL anon access to every table
CREATE POLICY "anon_deny" ON hmg_admin_config    FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_login_attempts  FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_sessions        FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_audit_log       FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_announcements   FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_registrations   FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_backup_history  FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_admin_notepad   FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_deploy_history  FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_site_config     FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_calendar        FOR ALL TO anon USING (false) WITH CHECK (false);
CREATE POLICY "anon_deny" ON hmg_enquiries_cache FOR ALL TO anon USING (false) WITH CHECK (false);

-- Seed singletons
INSERT INTO hmg_admin_config (id) VALUES ('singleton') ON CONFLICT (id) DO NOTHING;
INSERT INTO hmg_site_config  (id) VALUES ('singleton') ON CONFLICT (id) DO NOTHING;

-- Verify
SELECT tablename, rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename LIKE 'hmg_%'
ORDER BY tablename;
-- Expected: 12 tables, all rls_enabled = true
