// HMG Academy v6 Supabase configuration example
// Copy this file to config.js and replace the values.
// This enables live CMS updates, admin login, media upload and backup storage.
// The site works without Supabase in local demo mode, but public users will not see admin changes unless Supabase is configured.

window.HMG_SUPABASE = {
  url: "https://YOUR_PROJECT_ID.supabase.co",
  anonKey: "YOUR_SUPABASE_ANON_KEY",
  table: "hmg_backup_storage"
};
