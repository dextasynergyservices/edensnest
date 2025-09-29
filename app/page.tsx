"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Book,
  Play,
  GraduationCap,
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Star,
  Users,
  Award,
} from "lucide-react";
import Image from "next/image";
import Footer from "../components/ui/footer";

// Custom hook for scroll-based scaling
function useScrollScale(initialScale = 1, scaleRange = 0.3) {
  const [scale, setScale] = useState(initialScale);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;

      // Calculate distance from center of viewport
      const distanceFromCenter = Math.abs(elementCenter - windowCenter);
      const maxDistance = windowHeight / 2 + rect.height / 2;

      // Calculate scale based on distance (closer to center = larger)
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
      const newScale = initialScale + scaleRange * (1 - normalizedDistance);

      setScale(Math.max(0.7, Math.min(1.3, newScale)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialScale, scaleRange]);

  return { scale, elementRef };
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroImageScale = useScrollScale(1, 0.4);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as any },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    // close mobile menu after navigation
    setMobileOpen(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-bold text-xl"
            >
              <Image
                src="./logo.png"
                alt="Edens Nest"
                width={200}
                height={200}
              />
            </motion.div>
            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {/* simple hamburger / close icons */}
                {mobileOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Books", "Videos", "Courses", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-600 hover:text-primary transition-colors font-medium"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col py-3">
                {["About", "Books", "Videos", "Courses", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-left w-full py-2 px-2 text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      {item}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 md:pb-10 lg:pb-10"
        style={{
          // offset for fixed navbar using paddingTop so the hero portrait isn't covered
          paddingTop: "4rem",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.6)), url('/hero_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div ref={heroImageScale.elementRef} className="relative z-10">
              <motion.img
                src="/hero_image.png"
                alt="Edens Nest"
                className="w-48 h-48 rounded-2xl mx-auto mb-6 border-4 border-white shadow-2xl object-cover"
                style={{
                  scale: heroImageScale.scale,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 text-primary"
          >
            Transform Your Life
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Bestselling author, course creator, and life transformation coach
            helping thousands achieve their dreams through proven strategies and
            inspiring content.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection("books")}
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore My Books <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
            >
              View Courses
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-gray-600">Books Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">25K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-gray-600">Videos</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Books Section */}
      <BooksSection />

      {/* Videos Section */}
      <VideosSection />

      {/* Courses Section */}
      <CoursesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Site footer (moved to component) */}
      <Footer />
    </div>
  );
}

function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const aboutImageScale = useScrollScale(1, 0.5);

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            About Edens Nest
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over a decade of experience in personal development and
            business coaching, I&apos;ve dedicated my life to helping others
            unlock their full potential.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            ref={aboutImageScale.elementRef}
            className="w-full"
          >
            <div className="relative w-full max-h-full overflow-hidden">
              <motion.img
                src="/about.png"
                alt="Edens Nest speaking"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{
                  scale: aboutImageScale.scale,
                  transition: "transform 0.1s ease-out",
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 relative z-10"
          >
            <h3 className="text-3xl font-bold text-gray-800">My Journey</h3>
            <p className="text-gray-600 leading-relaxed">
              From struggling entrepreneur to bestselling author, my journey has
              been filled with challenges that shaped me into the mentor I am
              today. I believe everyone has the power to create extraordinary
              change in their lives.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-gray-700">Award-winning Author</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-secondary" />
                <span className="text-gray-700">Life Coach</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-primary" />
                <span className="text-gray-700">Speaker</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-secondary" />
                <span className="text-gray-700">Educator</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BooksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const books = [
    {
      title: "Know You, Choose Better",
      description:
        "A comprehensive guide to discovering and maximizing your inner strength.",
      price: "$19.99",
      selarLink: "#",
      image:
        "/book1.png",
      badge: "Bestseller",
    },
    {
      title: "The ABC of Family Bonding",
      description:
        "Transform your thinking patterns to achieve extraordinary results.",
      price: "$24.99",
      selarLink: "https://selar.co/success-mindset",
      image:
        "/book2.png",
      badge: "New Release",
    },
    {
      title: "Happy Family Secrets",
      description:
        "Daily practices that millionaires use to create lasting wealth.",
      price: "$29.99",
      selarLink: "https://selar.co/wealth-habits",
      image:
        "/book3.png",
      badge: "Popular",
    },
  ];

  return (
    <section id="books" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Bestselling Books
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover life-changing insights through my collection of
            transformational books, trusted by thousands worldwide.
          </p>
        </motion.div>

        <motion.div
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid md:grid-cols-3 gap-8"
        >
          {books.map((book, index) => (
            <BookCard
              key={book.title}
              book={book}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BookCard({
  book,
  index,
  inView,
}: {
  book: any;
  index: number;
  inView: boolean;
}) {
  const bookImageScale = useScrollScale(1, 0.1);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
    >
      <div className="relative" ref={bookImageScale.elementRef}>
        <motion.img
          src={book.image}
          alt={book.title}
          className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
          style={{
            scale: bookImageScale.scale,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {book.badge}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{book.title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{book.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-primary">{book.price}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>
        <a
          href={book.selarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Book className="w-5 h-5" />
          Get This Book
        </a>
      </div>
    </motion.div>
  );
}

function VideosSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const videos = [
    {
      title: "Morning Routine for Success",
      views: "125K views",
      duration: "12:34",
      thumbnail:
        "https://images.pexels.com/photos/4050317/pexels-photo-4050317.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "https://youtube.com/watch?v=example1",
    },
    {
      title: "Building Confidence Daily",
      views: "89K views",
      duration: "8:45",
      thumbnail:
        "https://images.pexels.com/photos/3790811/pexels-photo-3790811.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "https://youtube.com/watch?v=example2",
    },
    {
      title: "Financial Freedom Blueprint",
      views: "156K views",
      duration: "15:22",
      thumbnail:
        "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "https://youtube.com/watch?v=example3",
    },
    {
      title: "Productivity Masterclass",
      views: "203K views",
      duration: "18:11",
      thumbnail:
        "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=600",
      url: "https://youtube.com/watch?v=example4",
    },
  ];

  return (
    <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Inspiring Videos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch my latest videos packed with actionable insights and
            strategies for personal and professional growth.
          </p>
        </motion.div>

        <motion.div
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {videos.map((video, index) => (
            <VideoCard
              key={video.title}
              video={video}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://youtube.com/@edensnest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:brightness-90 transition-colors duration-300"
          >
            <Play className="w-5 h-5" />
            Subscribe on YouTube
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function VideoCard({
  video,
  index,
  inView,
}: {
  video: any;
  index: number;
  inView: boolean;
}) {
  const videoImageScale = useScrollScale(1, 0.3);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
      onClick={() => window.open(video.url, "_blank")}
    >
      <div className="relative" ref={videoImageScale.elementRef}>
        <motion.img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          style={{
            scale: videoImageScale.scale,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-primary ml-1" />
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-500">{video.views}</p>
      </div>
    </motion.div>
  );
}

function CoursesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const courses = [
    {
      title: "Love Life Secrets",
      description:
        "A comprehensive 8-week program designed to help you create lasting change in every area of your life.",
      price: "$497",
      originalPrice: "$697",
      students: "2,847",
      rating: "4.9",
      selarLink: "https://selar.co/life-transformation",
      features: [
        "8 weeks of content",
        "Live Q&A sessions",
        "Private community",
        "Lifetime access",
      ],
      image:
        "course.png",
    },
    {
      title: "Bonding Made Simple",
      description:
        "Scale your business from 6 to 7 figures with proven strategies and systems.",
      price: "$997",
      originalPrice: "$1,497",
      students: "1,523",
      rating: "4.8",
      selarLink: "https://selar.co/business-accelerator",
      features: [
        "12 modules",
        "1-on-1 coaching call",
        "Business templates",
        "Marketing strategies",
      ],
      image:
        "course2.png",
    },
    {
      title: "Conflict Resolution",
      description:
        "Master the art of resolving conflicts and building stronger relationships.",
      price: "$997",
      originalPrice: "$1,497",
      students: "1,523",
      rating: "4.8",
      selarLink: "https://selar.co/business-accelerator",
      features: [
        "12 modules",
        "1-on-1 coaching call",
        "Business templates",
        "Marketing strategies",
      ],
      image:
        "course3.png",
    },
    {
      title: "Parenting 101",
      description:
        "A comprehensive guide to understanding and nurturing your child's development.",
      price: "$997",
      originalPrice: "$1,497",
      students: "1,523",
      rating: "4.8",
      selarLink: "https://selar.co/business-accelerator",
      features: [
        "12 modules",
        "1-on-1 coaching call",
        "Business templates",
        "Marketing strategies",
      ],
      image:
        "course4.png",
    },
  ];

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Transformational Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who have transformed their lives through
            my comprehensive online courses and coaching programs.
          </p>
        </motion.div>

        <motion.div
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course, index) => (
            <CourseCard
              key={course.title}
              course={course}
              index={index}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CourseCard({
  course,
  index,
  inView,
}: {
  course: any;
  index: number;
  inView: boolean;
}) {
  const courseImageScale = useScrollScale(1, 0.35);

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="relative" ref={courseImageScale.elementRef}>
        <motion.img
          src={course.image}
          alt={course.title}
          className="w-full h-80 object-cover bg-gray-50"
          style={{
            scale: courseImageScale.scale,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {course.students} students
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-gray-600">({course.rating})</span>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">
            What&apos;s included:
          </h4>
          <ul className="space-y-2">
            {course.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-3xl font-bold text-primary">
              {course.price}
            </span>
            <span className="text-lg text-gray-400 line-through ml-2">
              {course.originalPrice}
            </span>
          </div>
        </div>

        <a
          href={course.selarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <GraduationCap className="w-5 h-5" />
          Enroll Now
        </a>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const contactBgScale = useScrollScale(1, 0.2);

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/edensnest",
      label: "Instagram",
    },
    { icon: Twitter, href: "https://twitter.com/edensnest", label: "Twitter" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/edensnest",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:hello@edensnest.com", label: "Email" },
  ];

  return (
    <section
      id="contact"
      className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        // Higher-contrast teal -> deep navy gradient for better readability
        background:
          "linear-gradient(135deg, rgba(25,135,135,1) 0%, rgba(6,12,31,1) 100%)",
      }}
    >
      <motion.div
        ref={contactBgScale.elementRef}
        className="absolute inset-0"
        style={{
          scale: contactBgScale.scale,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            // subtle overlay to add depth while keeping text contrast high
            background:
              "linear-gradient(135deg, rgba(25,135,135,0.12), rgba(6,12,31,0.45))",
          }}
        ></div>
      </motion.div>
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-12">
            Ready to start your transformation journey? Connect with Edens Nest
            on social media or drop a message. We&apos;d love to hear from you!
          </p>
        </motion.div>

        <motion.div
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              variants={{
                initial: { opacity: 0, scale: 0 },
                animate: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.4 }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            >
              <social.icon className="w-7 h-7 text-white" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Get My Free Success Guide
          </h3>
          <p className="text-white mb-6">
            Subscribe to receive my exclusive 5-step success blueprint that has
            helped thousands achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white/50 outline-none"
            />
            <button className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300">
              Get Free Guide
            </button>
          </div>
        </motion.div>

        {/* small non-white separator to visually separate the contact card from the footer */}
        <div
          className="w-full h-2"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,12,31,0.9), rgba(6,12,31,0.8))",
          }}
        />
      </div>
    </section>
  );
}
