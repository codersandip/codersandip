import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MagneticButton } from "./MagneticButton";
import { GITHUB_USER, RepoMeta } from "@/data/repos";

interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const fetchRepo = async (name: string): Promise<GithubRepo> => {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${name}`);
  if (!res.ok) throw new Error("Failed to fetch repo");
  return res.json();
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

interface RepoCardProps {
  meta: RepoMeta;
  index: number;
}

export const RepoCard = ({ meta, index }: RepoCardProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-repo", meta.name],
    queryFn: () => fetchRepo(meta.name),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative glass-card rounded-2xl p-6 flex flex-col h-full overflow-hidden border border-border/50 hover:border-primary/40 transition-colors"
    >
      {/* Gradient halo */}
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <Github className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-base truncate">{meta.title}</h3>
            <p className="text-xs text-muted-foreground truncate font-mono">
              {GITHUB_USER}/{meta.name}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-wider">
          {meta.category}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 min-h-[3.75rem]">
        {data?.description || meta.tagline}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(data?.topics?.length ? data.topics.slice(0, 4) : meta.tech.slice(0, 4)).map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5 mt-auto">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
          </>
        ) : isError ? (
          <span className="text-xs italic">Live stats unavailable</span>
        ) : (
          <>
            {data?.language && (
              <span className="flex items-center gap-1">
                <Code2 className="w-3 h-3" />
                {data.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {data?.stargazers_count ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              {data?.forks_count ?? 0}
            </span>
            {data?.updated_at && (
              <span className="ml-auto">{formatDate(data.updated_at)}</span>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <MagneticButton className="flex-1">
          <Button asChild size="sm" className="w-full gradient-bg text-primary-foreground">
            <Link to={`/repo/${meta.name}`} aria-label={`View ${meta.title} details`}>
              Details
              <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
            </Link>
          </Button>
        </MagneticButton>
        <Button asChild variant="outline" size="sm" className="border-primary/40 text-foreground bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary">
          <a
            href={data?.html_url || `https://github.com/${GITHUB_USER}/${meta.name}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${meta.title} on GitHub`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </Button>
      </div>
    </motion.article>
  );
};
