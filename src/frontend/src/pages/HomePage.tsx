import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/hooks/useActor";
import { useGetAllBlogPosts, useGetAllBodySystems } from "@/hooks/useQueries";
import { seedInitialData } from "@/utils/seedData";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bone,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Target,
  Users,
  Utensils,
  Wind,
  Zap,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useEffect } from "react";

const SYSTEM_ICONS: Record<string, React.ElementType> = {
  "skeletal-system": Bone,
  "nervous-system": Brain,
  "cardiovascular-system": Activity,
  "respiratory-system": Wind,
  "digestive-system": Utensils,
};

const SYSTEM_COLORS: Record<string, string> = {
  "skeletal-system": "from-amber-50 to-amber-100/50 border-amber-200",
  "nervous-system": "from-violet-50 to-violet-100/50 border-violet-200",
  "cardiovascular-system": "from-red-50 to-red-100/50 border-red-200",
  "respiratory-system": "from-sky-50 to-sky-100/50 border-sky-200",
  "digestive-system": "from-emerald-50 to-emerald-100/50 border-emerald-200",
};

const SYSTEM_ICON_COLORS: Record<string, string> = {
  "skeletal-system": "text-amber-600 bg-amber-100",
  "nervous-system": "text-violet-600 bg-violet-100",
  "cardiovascular-system": "text-red-600 bg-red-100",
  "respiratory-system": "text-sky-600 bg-sky-100",
  "digestive-system": "text-emerald-600 bg-emerald-100",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function formatDate(nanoseconds: bigint) {
  const ms = Number(nanoseconds) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function HomePage() {
  const { data: systems, isLoading: systemsLoading } = useGetAllBodySystems();
  const { data: posts, isLoading: postsLoading } = useGetAllBlogPosts();
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (actor && !isFetching) {
      seedInitialData(actor);
    }
  }, [actor, isFetching]);

  const publishedPosts = posts?.filter((p) => p.isPublished).slice(0, 3) ?? [];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-gradient min-h-[520px] flex items-center">
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-anatomy.dim_1200x500.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 bg-teal-600/20 text-teal-200 border-teal-500/30 hover:bg-teal-600/30">
              NEET & Medical Entrance Preparation
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5 text-balance">
              Master Human
              <span className="text-teal-300"> Anatomy</span>
              <br />
              with Precision
            </h1>
            <p className="text-teal-100/80 text-lg leading-relaxed mb-8 max-w-lg">
              Comprehensive body system guides, interactive MCQs, and
              NEET-focused study material — everything you need to score full
              marks in anatomy.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/system/$slug" params={{ slug: "skeletal-system" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-teal-800 rounded-xl font-semibold text-sm shadow-teal hover:shadow-lg transition-shadow"
                  data-ocid="hero.primary_button"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/blog">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-teal-600/30 text-white border border-teal-400/30 rounded-xl font-semibold text-sm hover:bg-teal-600/40 transition-colors"
                  data-ocid="hero.secondary_button"
                >
                  Read Study Blog
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              {[
                { icon: BookOpen, label: "5 Body Systems" },
                { icon: Target, label: "MCQ Practice" },
                { icon: Zap, label: "NEET-Focused" },
                { icon: Users, label: "Free Access" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-teal-300" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Body Systems Grid */}
      <section
        className="container mx-auto px-4 py-16"
        data-ocid="systems.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Explore Body Systems
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Deep-dive into each system with detailed structure, function, common
            disorders, and NEET-specific study points.
          </p>
        </motion.div>

        {systemsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 5 }, (_, i) => i).map((i) => (
              <Skeleton
                key={`skeleton-${i}`}
                className="h-52 rounded-2xl"
                data-ocid="systems.loading_state"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {systems?.map((system, i) => {
              const Icon = SYSTEM_ICONS[system.slug] || BookOpen;
              const gradient =
                SYSTEM_COLORS[system.slug] ||
                "from-teal-50 to-teal-100/50 border-teal-200";
              const iconColor =
                SYSTEM_ICON_COLORS[system.slug] || "text-teal-600 bg-teal-100";
              return (
                <motion.div
                  key={String(system.id)}
                  variants={itemVariants}
                  data-ocid={`systems.item.${i + 1}`}
                >
                  <Link
                    to="/system/$slug"
                    params={{ slug: system.slug }}
                    className={`block p-6 rounded-2xl bg-gradient-to-br ${gradient} border card-hover group`}
                    data-ocid="systems.link"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconColor}`}
                    >
                      <Icon className="w-5.5 h-5.5" strokeWidth={2} />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-teal-700 transition-colors">
                      {system.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
                      {system.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-semibold text-teal-700">
                      Explore System{" "}
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Call to action card */}
            <motion.div variants={itemVariants}>
              <div className="p-6 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center mb-3">
                  <Target className="w-5.5 h-5.5 text-teal-600" />
                </div>
                <p className="font-display font-semibold text-teal-800 mb-1">
                  More systems coming soon
                </p>
                <p className="text-teal-600/70 text-sm">
                  Muscular, Endocrine & more
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Features / Why Section */}
      <section className="bg-teal-50/50 border-y border-teal-100">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Built for NEET Success
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every section is crafted with the NEET exam syllabus in mind, so
              you study what matters most.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Detailed Content",
                desc: "Structure, function, and disorder breakdowns for every body system",
              },
              {
                icon: Target,
                title: "NEET Points",
                desc: "High-yield facts specifically flagged for NEET Biology questions",
              },
              {
                icon: CheckCircle2,
                title: "MCQ Practice",
                desc: "Interactive questions with instant feedback and explanations",
              },
              {
                icon: Zap,
                title: "Expert Blog",
                desc: "In-depth articles on complex topics by medical educators",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-teal-700" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1.5">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Preview */}
      <section
        className="container mx-auto px-4 py-16"
        data-ocid="blog.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Study Blog
            </h2>
            <p className="text-muted-foreground">
              Expert insights for NEET preparation
            </p>
          </div>
          <Link
            to="/blog"
            className="flex items-center gap-1 text-teal-700 font-semibold text-sm hover:text-teal-800"
            data-ocid="blog.link"
          >
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2].map((i) => (
              <Skeleton
                key={i}
                className="h-64 rounded-2xl"
                data-ocid="blog.loading_state"
              />
            ))}
          </div>
        ) : publishedPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {publishedPosts.map((post, i) => (
              <motion.div
                key={String(post.id)}
                variants={itemVariants}
                data-ocid={`blog.item.${i + 1}`}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block rounded-2xl border border-border bg-white overflow-hidden card-hover"
                  data-ocid="blog.link"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={
                        i % 2 === 0
                          ? "/assets/generated/blog-cover-1.dim_800x450.jpg"
                          : "/assets/generated/blog-cover-2.dim_800x450.jpg"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-teal-50 text-teal-700"
                      >
                        NEET Biology
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.publishedDate)}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-foreground line-clamp-2 mb-2 group-hover:text-teal-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      By {post.author}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="blog.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Blog articles coming soon</p>
          </div>
        )}
      </section>
    </main>
  );
}
