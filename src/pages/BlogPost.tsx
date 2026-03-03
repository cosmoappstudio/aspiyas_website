import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';
import { PageSection } from '../components/PageSection';
import { Calendar, User, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const { data } = await supabase.from('blogs').select('*').eq('slug', slug).single();
        setBlog(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;
  if (!blog) return <Layout><div className="pt-32 text-center text-white/50">Yazı bulunamadı.</div></Layout>;

  return (
    <Layout>
      <article>
        {/* Hero for Blog Post */}
        <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            {blog.image_url ? (
              <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover opacity-40 scale-105" />
            ) : (
              <div className="w-full h-full bg-[#0A0A0A]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-6 text-sm font-medium text-purple-300 mb-8"
            >
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
                <Calendar size={14} /> 
                {new Date(blog.created_at).toLocaleDateString('tr-TR')}
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
                <User size={14} /> 
                Admin
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1]"
            >
              {blog.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto"
            >
              {blog.excerpt}
            </motion.p>
          </div>
        </div>

        <PageSection className="bg-[#050505]">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-purple-400 prose-img:rounded-3xl prose-strong:text-white">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </PageSection>
      </article>
    </Layout>
  );
}
