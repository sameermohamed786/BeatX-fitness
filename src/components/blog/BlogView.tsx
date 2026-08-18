'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, ArrowRight, Search, X, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/data/mockData';
import { BlogPost } from '@/types';
import { TiltCard } from '../ui/TiltCard';

export const BlogView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Workout', 'Nutrition', 'Recovery', 'Mindset'];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-xs font-black uppercase tracking-widest text-[#FF7A00]">
          Science & Performance Lab
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          BeatX <span className="text-gradient-red">Journal & Insights</span>
        </h1>
        <p className="text-base text-white/70 font-medium">
          Deep dives into rhythm-driven EPOC, infrared muscular recovery, and precision macronutrient loading.
        </p>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#FF3B30] to-[#FF7A00] text-white shadow-lg shadow-[#FF3B30]/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TiltCard glowColor="orange" className="h-full flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-[#FF3B30] text-white px-2.5 py-0.5 rounded text-[9px] font-black uppercase">
                    {post.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white/80 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#FF7A00]" />
                    {post.readTime}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] text-white/40 font-bold uppercase">{post.date}</span>
                  <h3 className="text-xl font-black text-white group-hover:text-[#FF3B30] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="text-xs text-white/70">
                  <span className="font-bold block text-white">{post.author}</span>
                  <span className="text-[10px] text-white/40">{post.authorRole}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-[#FF3B30] text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl glass-card border border-white/20 p-6 sm:p-8 bg-[#141416]/95 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 text-white/60 hover:text-white rounded-full bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-2.5 py-0.5 text-[9px] font-black uppercase rounded bg-[#FF3B30] text-white">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedPost.title}</h2>
                <div className="flex items-center gap-3 text-xs text-white/50 pt-1">
                  <span>By <strong className="text-white">{selectedPost.author}</strong></span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-white/10">
                <Image src={selectedPost.image} alt={selectedPost.title} fill sizes="100vw" className="object-cover" />
              </div>

              <div className="text-sm text-white/80 space-y-4 leading-relaxed font-medium pt-2">
                <p>{selectedPost.content}</p>
                <p>
                  At BeatX Studio, our athletic programming continuously integrates real-time scientific feedback to ensure maximum metabolic return per minute trained.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
