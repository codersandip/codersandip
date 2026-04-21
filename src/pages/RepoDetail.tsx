import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import {
  ArrowLeft,
  Github,
  Star,
  GitFork,
  Eye,
  Code2,
  Calendar,
  GitBranch,
  Scale,
  HardDrive,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  CircleDot,
} from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { GITHUB_USER, getRepoMeta } from "@/data/repos";

interface GithubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  default_branch: string;
  language: string | null;
  topics: string[];
  size: number;
  license: { name: string } | null;
  created_at: string;
  updated_at: string;
  clone_url: string;
}

const fetchRepo = async (name: string): Promise<GithubRepo> => {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`);
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  return res.json();
};

const fetchReadme = async (name: string): Promise<string> => {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${name}/readme`
  );
  if (!res.ok) throw new Error(`README: ${res.status}`);
  const json = await res.json();
  // Decode base64 → utf-8
  return decodeURIComponent(escape(atob(json.content.replace(/\s/g, ""))));
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const RepoDetail = () => {
  const { name } = useParams<{ name: string }>();
  const meta = name ? getRepoMeta(name) : undefined;
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data: repo, isLoading, isError } = useQuery({
    queryKey: ["github-repo", name],
    queryFn: () => fetchRepo(name!),
    enabled: !!name,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const { data: readme, isLoading: readmeLoading, isError: readmeError } =
    useQuery({
      queryKey: ["github-readme", name],
      queryFn: () => fetchReadme(name!),
      enabled: !!name,
      staleTime: 1000 * 60 * 10,
      retry: 1,
    });

  useEffect(() => {
    if (meta) {
      document.title = `${meta.title} — Sandip Tawhare`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", meta.description.slice(0, 160));
    }
  }, [meta]);

  if (!name) return <Navigate to="/" replace />;

  const cloneUrl = repo?.clone_url || `https://github.com/${GITHUB_USER}/${name}.git`;

  const handleCopyClone = async () => {
    await navigator.clipboard.writeText(cloneUrl);
    setCopied(true);
    toast({ title: "Clone URL copied", description: cloneUrl });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container-custom max-w-5xl">
          {/* Back link */}
          <Link
            to="/#opensource"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 md:p-8 mb-8 border border-border/50"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                {meta?.category || "Repository"}
              </Badge>
              {repo?.language && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Code2 className="w-3 h-3" />
                  {repo.language}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">{meta?.title || name}</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-1 font-mono">
              {GITHUB_USER}/{name}
            </p>
            <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-3xl">
              {repo?.description || meta?.description || meta?.tagline}
            </p>

            {/* Topics */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {(repo?.topics?.length ? repo.topics : meta?.tech || []).map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-muted-foreground">
              {isLoading ? (
                <>
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-20" />
                </>
              ) : (
                <>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-primary" />
                    <strong className="text-foreground">{repo?.stargazers_count ?? 0}</strong> stars
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4 text-primary" />
                    <strong className="text-foreground">{repo?.forks_count ?? 0}</strong> forks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-primary" />
                    <strong className="text-foreground">{repo?.watchers_count ?? 0}</strong> watchers
                  </span>
                  {repo?.created_at && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      Created {formatDate(repo.created_at)}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-7">
              <Button
                asChild
                size="lg"
                className="gradient-bg text-primary-foreground"
              >
                <a
                  href={repo?.html_url || `https://github.com/${GITHUB_USER}/${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 w-4 h-4" />
                  View on GitHub
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleCopyClone}
                className="border-primary/40"
              >
                {copied ? (
                  <Check className="mr-2 w-4 h-4 text-primary" />
                ) : (
                  <Copy className="mr-2 w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy clone URL"}
              </Button>
              {repo?.homepage && (
                <Button asChild size="lg" variant="outline" className="border-primary/40">
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Live demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr,280px] gap-8">
            {/* README */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 border border-border/50 min-w-0"
            >
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Github className="w-5 h-5 text-primary" />
                README
              </h2>

              {readmeLoading && (
                <div className="space-y-3">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-32 w-full mt-4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}

              {readmeError && !readmeLoading && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-sm">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground mb-1">Couldn't load README</p>
                    <p className="text-muted-foreground">
                      GitHub may be rate-limiting requests. View the README directly on{" "}
                      <a
                        href={`https://github.com/${GITHUB_USER}/${name}#readme`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        GitHub
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}

              {readme && (
                <article className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:gradient-text prose-a:text-primary prose-code:text-primary prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-img:rounded-lg">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {readme}
                  </ReactMarkdown>
                </article>
              )}
            </motion.div>

            {/* Sidebar — Quick stats */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-6 border border-border/50">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Quick Stats
                </h3>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-5 w-full" />
                    ))}
                  </div>
                ) : isError ? (
                  <p className="text-sm text-muted-foreground italic">
                    Stats unavailable
                  </p>
                ) : (
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <CircleDot className="w-4 h-4" />
                        Open issues
                      </span>
                      <strong className="text-foreground">{repo?.open_issues_count}</strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <GitBranch className="w-4 h-4" />
                        Default branch
                      </span>
                      <strong className="text-foreground font-mono text-xs">
                        {repo?.default_branch}
                      </strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Scale className="w-4 h-4" />
                        License
                      </span>
                      <strong className="text-foreground text-xs">
                        {repo?.license?.name || "—"}
                      </strong>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <HardDrive className="w-4 h-4" />
                        Size
                      </span>
                      <strong className="text-foreground">
                        {repo ? `${(repo.size / 1024).toFixed(1)} MB` : "—"}
                      </strong>
                    </li>
                    {repo?.updated_at && (
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          Updated
                        </span>
                        <strong className="text-foreground text-xs">
                          {formatDate(repo.updated_at)}
                        </strong>
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {meta?.highlights?.length ? (
                <div className="glass-card rounded-2xl p-6 border border-border/50">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    Highlights
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {meta.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span className="text-foreground/90">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RepoDetail;
