import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-headline font-black text-primary neon-text-primary mb-4">
          404
        </h1>
        <p className="text-xl font-headline text-on-surface mb-2">Node Not Found</p>
        <p className="text-on-surface-variant font-label text-sm mb-8">
          The data-stream you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 border border-primary text-primary font-label font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-200 shadow-neon-primary-sm"
        >
          Return to Terminal
        </Link>
      </div>
    </div>
  );
}
