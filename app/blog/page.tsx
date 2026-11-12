import type { Metadata } from 'next';
import SiteContent from '../../components/site-content';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Travel Blog | BDTAT',
  description: 'Travel ideas and practical planning guides from BD Travel and Tours.',
};

export default function BlogPage() {
  return (
    <SiteContent
      page="blog"
      stylesheets={['/style.css', '/blog.css']}
      scripts={['/blog-filters.js', '/jump-top.js']}
    />
  );
}
