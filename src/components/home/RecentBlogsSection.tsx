import { useEffect, useState } from 'react';
import { LocalizedLink } from '../LocalizedLink';
import Section from '../Section';
import { supabase } from '../../lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage, pickLangContent } from '../../hooks/useLanguage';

const BLOG_LIMIT = 3;

interface BlogItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  created_at: string;
  image_url: string | null;
}

interface RecentBlogsContent {
  tag: string;
  title: string;
  allPosts: string;
  readMore: string;
  empty: string;
}

const DEFAULT: RecentBlogsContent = { tag: 'Blog & İçerik', title: 'Son yazılar', allPosts: 'Tüm yazılar', readMore: 'Devamını Oku', empty: 'Henüz blog yazısı yok. Yakında burada görünecek.' };

export function RecentBlogsSection() {
  const lang = useLanguage();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stringsRaw, setStringsRaw] = useState<unknown>(null);
  const strings = pickLangContent<RecentBlogsContent>(stringsRaw, lang) ?? DEFAULT;

  useEffect(() => {
    supabase.from('site_sections').select('content').eq('key', 'recent_blogs').single().then(({ data }) => {
      if (data?.content) setStringsRaw(data.content);
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from('blogs')
          .select('id, slug, title, excerpt, created_at, image_url')
          .order('created_at', { ascending: false })
          .limit(BLOG_LIMIT);
        setBlogs((data ?? []) as BlogItem[]);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Section className="bg-[#050505] relative overflow-hidden" id="blog">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <span className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              {strings.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              {strings.title}
            </h2>
            <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
          </div>
          <LocalizedLink
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {strings.allPosts}
            <ArrowRight size={16} />
          </LocalizedLink>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 h-40 animate-pulse"
              />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/50 text-sm">
            {strings.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <LocalizedLink
                  to={`/blog/${blog.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-[#080808]/80 overflow-hidden hover:border-purple-500/25 transition-all duration-300 relative backdrop-blur-sm"
                >
                  {blog.image_url ? (
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={blog.image_url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-gradient-to-br from-purple-500/10 to-transparent flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px]" />
                      <span className="text-white/30 text-sm font-display relative z-10">Aspiyas</span>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                      <Calendar size={12} />
                      {new Date(blog.created_at).toLocaleDateString('tr-TR')}
                    </div>
                    <h3 className="font-display font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="mt-1 text-xs text-white/55 line-clamp-2">{blog.excerpt}</p>
                    )}
                  </div>
                </LocalizedLink>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
