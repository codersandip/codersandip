import { motion } from "framer-motion";
import { Github, Sparkles } from "lucide-react";
import { repos, GITHUB_USER } from "@/data/repos";
import { RepoCard } from "./RepoCard";
import { Button } from "@/components/ui/button";

export const OpenSource = () => {
  return (
    <section id="opensource" className="section-padding relative">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Open Source
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Building in <span className="gradient-text">Public</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            A selection of packages, tools, and apps I maintain on GitHub —
            free for the community to use, fork, and contribute to.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <RepoCard key={repo.name} meta={repo} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/50 text-foreground bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 w-4 h-4" />
              View all repositories on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
