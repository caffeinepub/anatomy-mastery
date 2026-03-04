import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBlogPosts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import { motion } from "motion/react";

function formatDate(nanoseconds: bigint) {
  const ms = Number(nanoseconds) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const COVER_IMAGES = [
  "/assets/generated/blog-cover-1.dim_800x450.jpg",
  "/assets/generated/blog-cover-2.dim_800x450.jpg",
];

export function BlogPage() {
  const { data: posts, isLoading } = useGetAllBlogPosts();
  const published = posts?.filter((p) => p.isPublished) ?? [];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-800 to-teal-900 text-white py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-3 bg-teal-600/30 text-teal-200 border-teal-500/30">
              Study Blog
            </Badge>
            <h1 className="font-display text-4xl font-bold mb-3">
              Anatomy Study Blog
            </h1>
            <p className="text-teal-100/75 max-w-lg">
              In-depth articles on anatomy topics, exam strategies, and
              high-yield concepts for NEET and medical entrance exams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="h-80 rounded-2xl"
                data-ocid="blog.loading_state"
              />
            ))}
          </div>
        ) : published.length === 0 ? (
          <div className="text-center py-20" data-ocid="blog.empty_state">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              No Articles Yet
            </h2>
            <p className="text-muted-foreground">
              Check back soon for study guides and exam tips.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured first post */}
            {published.slice(0, 1).map((post, i) => (
              <motion.div
                key={String(post.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="md:col-span-2 lg:col-span-2"
                data-ocid={`blog.item.${i + 1}`}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block rounded-2xl border border-border bg-white overflow-hidden card-hover"
                  data-ocid="blog.link"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={COVER_IMAGES[i % COVER_IMAGES.length]}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-teal-50 text-teal-700 border-teal-200">
                        Featured
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.publishedDate)}
                      </div>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-foreground mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <span className="flex items-center gap-1 text-teal-700 font-semibold text-sm group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Remaining posts */}
            {published.slice(1).map((post, i) => (
              <motion.div
                key={String(post.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i + 1) * 0.1 }}
                data-ocid={`blog.item.${i + 2}`}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block rounded-2xl border border-border bg-white overflow-hidden card-hover h-full"
                  data-ocid="blog.link"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={COVER_IMAGES[(i + 1) % COVER_IMAGES.length]}
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
                    <h3 className="font-display font-bold text-foreground line-clamp-2 mb-3 group-hover:text-teal-700 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
