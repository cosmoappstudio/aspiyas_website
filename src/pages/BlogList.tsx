import React, { useEffect, useState } from 'react';
import { LocalizedLink } from '../components/LocalizedLink';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';
import { PageSection } from '../components/PageSection';
import { PageHeader } from '../components/PageHeader';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function BlogList() {
  const [blogs, setBlogs] = useState<{ id: string; slug: string; title: string; excerpt: string | null; image_url: string | null; created_at: string }[]>([]);

  useEffect(() => {
    supabase.from('blogs').select('id, slug, title, excerpt, image_url, created_at').order('created_at', { ascending: false }).then(({ data }) => setBlogs(data ?? []));
  }, []);

  return (
    <Layout>
      <PageSection className="pt-40 pb-20">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            tag="Blog & İçerik"
            title="Son Yazılar"
            intro="Teknoloji, yapay zeka ve dijital dönüşüm üzerine içgörülerimiz."
            className="text-center mb-24 [&_p]:mx-auto"
          />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 25 }}
            >
              <LocalizedLink to={`/blog/${blog.slug}`} className="group block h-full">
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden hover:border-purple-500/30 transition-all duration-500 h-full flex flex-col group-hover:translate-y-[-5px]">
                  {blog.image_url ? (
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img 
                        src={blog.image_url} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-white/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                      <span className="text-white/20 text-4xl font-display font-bold">Aspiyas</span>
                    </div>
                  )}
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-medium text-purple-400 mb-4 uppercase tracking-wider">
                      <Calendar size={12} />
                      <span>{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <h2 className="text-2xl font-display font-bold mb-4 group-hover:text-purple-400 transition-colors leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-white/50 text-sm mb-8 flex-1 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                      Devamını Oku <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </LocalizedLink>
            </motion.div>
          ))}
        </div>
        </div>
      </PageSection>
    </Layout>
  );
}
