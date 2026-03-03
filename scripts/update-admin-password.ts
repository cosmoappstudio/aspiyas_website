/**
 * Admin şifresini günceller.
 * Kullanım: npx tsx scripts/update-admin-password.ts
 */
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('VITE_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

const EMAIL = 'info@aspiyas.com';
const NEW_PASSWORD = 'A$piyaZ_!**15?';

async function main() {
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Hata:', listError.message);
    process.exit(1);
  }

  const user = users?.find((u: { email?: string }) => u.email === EMAIL);
  if (!user) {
    console.error(`${EMAIL} kullanıcısı bulunamadı.`);
    process.exit(1);
  }

  const { error } = await supabase.auth.admin.updateUserById(user.id, { password: NEW_PASSWORD });
  if (error) {
    console.error('Hata:', error.message);
    process.exit(1);
  }

  console.log('Şifre güncellendi. info@aspiyas.com ile yeni şifreyle giriş yapabilirsiniz.');
}

main();
