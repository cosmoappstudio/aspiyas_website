import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocalizedLink } from '../components/LocalizedLink';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';
import Section from '../components/Section';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function BlogList() {
  const [blogs, setBlogs] = useState<{ id: string; slug: string; title: string; excerpt: string | null; image_url: string | null; created_at: string }[]>([]);

  useEffect(() => {
    supabase.from('blogs').select('id, slug, title, excerpt, image_url, created_at').order('created_at', { ascending: false }).then(({ data }) => setBlogs(data ?? []));
  }, []);

  return (
    <Layout>
      <Section className="pt-40 pb-20 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center mb-24 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
          >
            Blog & İçerik
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Son Yazılar
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-xl max-w-2xl mx-auto font-light"
          >
            Teknoloji, yapay zeka ve dijital dönüşüm üzerine içgörülerimiz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
      </Section>
    </Layout>
  );
}
