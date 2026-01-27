import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

// Base skeleton with shimmer animation
export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-md bg-muted/50",
      "before:absolute before:inset-0 before:-translate-x-full",
      "before:animate-[shimmer_2s_infinite]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      className
    )}
  />
);

// Image skeleton with aspect ratio
export const ImageSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("relative overflow-hidden rounded-xl", className)}>
    <Skeleton className="w-full h-full absolute inset-0" />
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center"
      >
        <svg
          className="w-6 h-6 text-muted-foreground/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </motion.div>
    </div>
  </div>
);

// Card skeleton for project cards
export const ProjectCardSkeleton = () => (
  <div className="glass-card rounded-xl overflow-hidden">
    <ImageSkeleton className="aspect-video" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  </div>
);

// Experience card skeleton
export const ExperienceCardSkeleton = () => (
  <div className="glass-card rounded-xl p-6 space-y-4">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  </div>
);

// Skills category skeleton
export const SkillsCategorySkeleton = () => (
  <div className="glass-card rounded-xl p-6 space-y-6">
    <div className="flex items-center gap-2">
      <Skeleton className="w-2 h-2 rounded-full" />
      <Skeleton className="h-5 w-24" />
    </div>
    <div className="space-y-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

// Stats skeleton
export const StatsSkeleton = () => (
  <div className="text-center space-y-4">
    <Skeleton className="w-16 h-16 rounded-2xl mx-auto" />
    <Skeleton className="h-12 w-24 mx-auto" />
    <Skeleton className="h-4 w-32 mx-auto" />
  </div>
);

// About section skeleton
export const AboutSkeleton = () => (
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <ImageSkeleton className="aspect-square max-w-md mx-auto w-full" />
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-12 w-36 rounded-full" />
        <Skeleton className="h-12 w-36 rounded-full" />
      </div>
    </div>
  </div>
);

// Hero skeleton
export const HeroSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
      <Skeleton className="h-6 w-48 mx-auto rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
        <Skeleton className="h-16 w-3/4 mx-auto" />
      </div>
      <Skeleton className="h-8 w-64 mx-auto" />
      <div className="space-y-3 max-w-xl mx-auto">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6 mx-auto" />
      </div>
      <div className="flex gap-4 justify-center pt-4">
        <Skeleton className="h-14 w-40 rounded-full" />
        <Skeleton className="h-14 w-40 rounded-full" />
      </div>
    </div>
  </div>
);
