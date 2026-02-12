import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, User, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "The Future of AI in Email Marketing",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we send emails, personalize content, and analyze campaign performance.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
      category: "AI Trends",
      date: "Oct 24, 2023",
      readTime: "5 min read",
      author: "Alex Morgan"
    },
    {
      id: 2,
      title: "10 Strategies to Boost Open Rates",
      excerpt: "Struggling with low open rates? Here are 10 proven strategies backed by data to help you get your emails read by more people.",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&auto=format&fit=crop&q=60",
      category: "Strategy",
      date: "Oct 22, 2023",
      readTime: "8 min read",
      author: "Sarah Connor"
    },
    {
      id: 3,
      title: "Understanding Lead Scoring Models",
      excerpt: "Learn how to build an effective lead scoring model that helps your sales team focus on the prospects most likely to convert.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      category: "Sales",
      date: "Oct 18, 2023",
      readTime: "6 min read",
      author: "John Wick"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold tracking-wider uppercase text-sm"
          >
            From Our Blog
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4"
          >
            Latest Insights & Resources
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Stay ahead of the curve with expert tips, industry trends, and in-depth guides on email marketing and automation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {blog.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {blog.readTime}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link to="/blog/post-1">{blog.title}</Link>
                </h3>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden">
                       <img src={`https://ui-avatars.com/api/?name=${blog.author}&background=random`} alt={blog.author} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{blog.author}</span>
                  </div>
                  <Link to="/blog/post-1" className="text-blue-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            View All Articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
