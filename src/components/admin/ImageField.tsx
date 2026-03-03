import { useRef, useState, type ChangeEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload } from 'lucide-react';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Önerilen boyut, örn: "1200×800" */
  recommendedSize?: string;
}

export function ImageField({ label, value, onChange, recommendedSize }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase.storage.from('images').upload(path, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(data.path);
      onChange(urlData.publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Yükleme başarısız. Supabase Storage bucket "images" oluşturulmuş olmalı.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-xs text-white/50 mb-1">
        {label}
        {recommendedSize && (
          <span className="ml-2 text-purple-400">(Önerilen: {recommendedSize}px)</span>
        )}
      </label>
      <div className="flex gap-2">
        <input
          type="url"
          className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-white"
          placeholder="https://..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileSelect}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? 'Yükleniyor...' : 'Dosyadan'}
        </button>
      </div>
    </div>
  );
}
