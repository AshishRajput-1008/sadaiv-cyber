import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Eye, Heart, Share2, Bookmark, Search, Filter, TrendingUp, Zap, Globe, Shield, Users } from 'lucide-react';
import Image from 'next/image';

// Define interfaces for type safety
interface Post {
  id: string | number;
  image: string;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  views: string;
  likes: number;
  author: string;
  authorImage: string;
  trending: boolean;
  featured?: boolean;
  layout?: string;
}

interface Stat {
  icon: any;
  label: string;
  value: string;
  color: string;
}

const NextLevelBlog: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [hoveredPost, setHoveredPost] = useState<string | number | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string | number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string | number>>(new Set());
  const [activeTab, setActiveTab] = useState<string>('Latest');

  const categories: string[] = ['All', 'Cybersecurity', 'Digital Inclusion', 'Women Empowerment', 'AI Education', 'Blockchain', 'Child Safety'];

  const featuredPost: Post = {
    id: 'featured',
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    date: "January 10, 2025",
    title: "Cyber Warriors: Training India's Next Generation of Digital Defenders",
    excerpt: "Our intensive cybersecurity program has trained over 5,000 youth in ethical hacking, digital forensics, and online safety protocols. Discover how we're building a secure digital future.",
    category: "Cybersecurity",
    readTime: "8 min read",
    views: "12.5K",
    likes: 234,
    author: "Dr. Priya Singh",
    authorImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXmPuDRk-foHpYeZ2MOBxC8AGj9DQwkARDNg&s",
    trending: true,
    featured: true
  };

  const blogPosts: Post[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
      date: "Jan 8, 2025",
      title: "Digital Divide: Bridging Technology Gaps in Rural India",
      excerpt: "How we're bringing computers, internet access, and digital literacy to remote villages across 15 states.",
      category: "Digital Inclusion",
      readTime: "6 min read",
      views: "8.2K",
      likes: 156,
      author: "Rajesh Kumar",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      trending: false,
      layout: "horizontal"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop",
      date: "Jan 5, 2025",
      title: "Women Leading Tech Revolution",
      excerpt: "Empowering 2,000+ women with coding skills, entrepreneurship training, and leadership development.",
      category: "Women Empowerment",
      readTime: "10 min read",
      views: "15.7K",
      likes: 289,
      author: "Anita Sharma",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      trending: true,
      layout: "vertical"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      date: "Jan 2, 2025",
      title: "AI Ethics Workshop Series",
      excerpt: "Teaching responsible AI development, bias prevention, and ethical considerations to young programmers.",
      category: "AI Education",
      readTime: "7 min read",
      views: "6.8K",
      likes: 98,
      author: "Dr. Amit Patel",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      trending: false,
      layout: "horizontal"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
      date: "Dec 28, 2024",
      title: "Blockchain for Social Good",
      excerpt: "Using blockchain technology for transparent charity operations and traceable impact measurement.",
      category: "Blockchain",
      readTime: "9 min read",
      views: "4.3K",
      likes: 67,
      author: "Vikram Singh",
      authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      trending: false,
      layout: "square"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      date: "Dec 25, 2024",
      title: "Online Safety for Kids",
      excerpt: "Protecting children from cyber predators, digital addiction, and inappropriate content exposure.",
      category: "Child Safety",
      readTime: "5 min read",
      views: "11.2K",
      likes: 201,
      author: "Meera Joshi",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
      trending: true,
      layout: "horizontal"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
      date: "Dec 20, 2024",
      title: "Quantum Computing Security Implications",
      excerpt: "Preparing for the post-quantum cryptography era and its impact on current security systems.",
      category: "Cybersecurity",
      readTime: "12 min read",
      views: "3.1K",
      likes: 45,
      author: "Dr. Kiran Reddy",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      trending: false,
      layout: "horizontal"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = currentCategory === 'All' || post.category === currentCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'Latest' 
      ? post.date.includes('2025') 
      : post.date.includes('2024');
    return matchesCategory && matchesSearch && matchesTab;
  });

  const stats: Stat[] = [
    { icon: Globe, label: "Global Reach", value: "50M+", color: "text-blue-400" },
    { icon: Users, label: "Community", value: "100K+", color: "text-green-400" },
    { icon: Shield, label: "Security Posts", value: "500+", color: "text-purple-400" },
    { icon: TrendingUp, label: "Monthly Views", value: "2.5M", color: "text-orange-400" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Interviews
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
              Stories of <span className="text-orange-500 font-semibold">digital transformation</span>, 
              <span className="text-purple-400 font-semibold">cyber innovation</span>, and 
              <span className="text-blue-400 font-semibold">community empowerment</span>.
            </p>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab('Latest')}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'Latest'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Latest Interviews
              </button>
              <button
                onClick={() => setActiveTab('Previous')}
                className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  activeTab === 'Previous'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Previous Interviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post (only shown in Latest tab) */}
      {activeTab === 'Latest' && (
        <section className="py-4 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="md:flex">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        FEATURED
                      </span>
                      {featuredPost.trending && (
                        <span className="bg-orange-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          TRENDING
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        src={featuredPost.authorImage}
                        alt={featuredPost.author}
                        width={50}
                        height={50}
                        className="w-12 h-12 rounded-full border-2 border-orange-500"
                      />
                      <div>
                        <p className="text-white font-semibold">{featuredPost.author}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {featuredPost.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <button className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                      <span>Read Full Story</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Previous Interviews Cards (only shown in Previous tab) */}
      {activeTab === 'Previous' && (
        <section className="py-8 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">Previous Interviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                  >
                    <div className="relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      {post.trending && (
                        <span className="absolute top-3 left-3 bg-orange-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          TRENDING
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full border-2 border-orange-500"
                        />
                        <div>
                          <p className="text-white text-sm font-semibold">{post.author}</p>
                          <span className="text-gray-400 text-xs flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
                        {/* <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span> */}
                        {/* <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </span> */}
                      </div>
                      <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-sm hover:from-orange-600 hover:to-red-700 transition-all duration-300">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NextLevelBlog;