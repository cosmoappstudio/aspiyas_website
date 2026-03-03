/**
 * Admin kullanıcı oluşturma scripti.
 * Supabase Service Role Key gerektirir (Dashboard → Settings → API).
 *
 * Kullanım:
 *   SUPABASE_SERVICE_ROLE_KEY=xxx ADMIN_PASSWORD=xxx npx tsx scripts/create-admin.ts
 * veya .env içinde tanımlayıp:
 *   npx tsx scripts/create-admin.ts
 */
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.ADMIN_PASSWORD || 'Aspiyas2025!';

if (!url || !serviceKey) {
  console.error('Hata: VITE_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.');
  console.error('Supabase Dashboard → Settings → API → service_role key');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'info@aspiyas.com',
    password,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes('already been registered')) {
      console.log('info@aspiyas.com zaten kayıtlı. Şifre güncellemek için Supabase Dashboard → Authentication → Users kullanın.');
      process.exit(0);
    }
    console.error('Hata:', error.message);
    process.exit(1);
  }

  console.log('Admin kullanıcı oluşturuldu. info@aspiyas.com ile giriş yapabilirsiniz.');
  console.log('İlk girişten sonra şifrenizi değiştirmeniz önerilir.');
}

main();
