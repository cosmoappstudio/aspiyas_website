import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabase';
import { PageSection } from '../components/PageSection';
import { motion } from 'motion/react';

export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const { data } = await supabase.from('pages').select('*').eq('slug', slug).single();
        setPage(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <Layout><div className="pt-32 text-center text-white/50">Yükleniyor...</div></Layout>;
  if (!page) return <Layout><div className="pt-32 text-center text-white/50">Sayfa bulunamadı.</div></Layout>;

  return (
    <Layout>
      <PageSection className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-12 leading-tight"
          >
            {page.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-white/70 prose-p:font-light prose-p:leading-relaxed prose-a:text-purple-400 prose-img:rounded-3xl prose-strong:text-white"
          >
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </motion.div>
        </div>
      </PageSection>
    </Layout>
  );
}
