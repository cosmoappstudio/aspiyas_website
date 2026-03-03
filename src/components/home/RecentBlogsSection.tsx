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
    <Section className="bg-[#050505]" id="blog">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <span className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase block mb-2">
              {strings.tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              {strings.title}
            </h2>
          </div>
          <LocalizedLink
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {strings.allPosts}
            <ArrowRight size={16} />
          </LocalizedLink>
        </div>

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
                  className="group block rounded-2xl border border-white/10 bg-[#050505] overflow-hidden hover:border-white/20 transition-colors"
                >
                  {blog.image_url ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={blog.image_url}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-white/5 flex items-center justify-center">
                      <span className="text-white/20 text-sm font-display">Aspiyas</span>
                    </div>
                  )}
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
