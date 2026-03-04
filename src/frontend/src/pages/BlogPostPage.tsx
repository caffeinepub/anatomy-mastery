import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBlogPosts } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  User,
} from "lucide-react";
import { motion } from "motion/react";

function formatDate(nanoseconds: bigint) {
  const ms = Number(nanoseconds) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <strong key={`bold-${idx}-${part.slice(0, 8)}`}>{part}</strong>
    ) : (
      part
    ),
  );
}

// Simple markdown-like renderer (no dangerouslySetInnerHTML)
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="font-display text-3xl font-bold text-foreground mt-6 mb-4"
        >
          {line.slice(2)}
        </h1>,
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="font-display text-2xl font-bold text-teal-800 mt-8 mb-3"
        >
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="font-display text-lg font-bold text-foreground mt-5 mb-2"
        >
          {line.slice(4)}
        </h3>,
      );
    } else if (line.startsWith("| ")) {
      // Table
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("| ")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0]
        .split("|")
        .filter(Boolean)
        .map((h) => h.trim());
      const rows = tableLines.slice(2).map((row) =>
        row
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim()),
      );
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-teal-50">
                {headers.map((h) => (
                  <th
                    key={`th-${h}`}
                    className="border border-teal-200 px-3 py-2 text-left font-semibold text-teal-800"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr
                  key={`tr-${j}-${row[0]}`}
                  className={j % 2 === 0 ? "bg-white" : "bg-muted/30"}
                >
                  {row.map((cell) => (
                    <td
                      key={`td-${cell.slice(0, 12)}`}
                      className="border border-border px-3 py-2 text-foreground/80"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    } else if (line.startsWith("- ") || line.startsWith("✓ ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("✓ "))
      ) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 my-3 ml-4">
          {items.map((item) => (
            <li
              key={`li-${item.slice(0, 20)}`}
              className="flex items-start gap-2 text-foreground/80"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    } else if (line.startsWith("**") && line.includes("**")) {
      elements.push(
        <p
          key={`p-bold-${i}`}
          className="text-foreground/80 leading-relaxed mb-3"
        >
          {parseBold(line)}
        </p>,
      );
    } else if (line.trim() === "") {
      elements.push(<div key={`space-${i}`} className="h-2" />);
    } else {
      elements.push(
        <p key={`p-${i}`} className="text-foreground/80 leading-relaxed mb-2">
          {parseBold(line)}
        </p>,
      );
    }
    i++;
  }

  return elements;
}

export function BlogPostPage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: posts, isLoading } = useGetAllBlogPosts();

  const post = posts?.find((p) => p.slug === slug);
  const relatedPosts =
    posts?.filter((p) => p.isPublished && p.slug !== slug).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <main
        className="container mx-auto px-4 py-10 max-w-3xl"
        data-ocid="blog.loading_state"
      >
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-10 w-full mb-3" />
        <Skeleton className="h-6 w-64 mb-8" />
        <Skeleton className="h-96 rounded-2xl" />
      </main>
    );
  }

  if (!post) {
    return (
      <main
        className="container mx-auto px-4 py-20 text-center max-w-xl"
        data-ocid="blog.error_state"
      >
        <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
        <h2 className="font-display text-2xl font-bold mb-2">
          Article Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          This post doesn't exist or may have been removed.
        </p>
        <Link to="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-muted-foreground text-sm mb-6">
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
              data-ocid="breadcrumb.link"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/blog"
              className="hover:text-foreground transition-colors"
              data-ocid="breadcrumb.link"
            >
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden"
          >
            {/* Cover image */}
            <div className="h-64 overflow-hidden">
              <img
                src="/assets/generated/blog-cover-1.dim_800x450.jpg"
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-teal-50 text-teal-700 border-teal-200">
                  NEET Biology
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedDate)}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              </div>

              <h1 className="font-display text-3xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <Separator className="mb-6" />

              {/* Content */}
              <div className="max-w-none">{renderContent(post.content)}</div>
            </div>
          </motion.article>

          {/* Back button */}
          <div className="mt-6">
            <Link to="/blog" data-ocid="blog.link">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Related articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                More Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.slice(0, 2).map((p) => (
                  <Link
                    key={String(p.id)}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block bg-white border border-border rounded-xl p-4 card-hover"
                    data-ocid="blog.link"
                  >
                    <p className="font-semibold text-sm text-foreground group-hover:text-teal-700 transition-colors line-clamp-2 mb-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.author}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
