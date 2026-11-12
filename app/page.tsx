import type { Metadata } from 'next';
import SiteContent from '../components/site-content';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'BDTAT — BD Travel and Tours',
  description: 'Request Dhaka–Kuala Lumpur flight quotes, Malaysia tours, KLIA airport transfers and custom holidays from BD Travel and Tours.',
};

export default function HomePage() {
  return (
    <SiteContent
      page="home"
      stylesheets={['/style.css']}
      scripts={['/app.js', '/tour.js', '/jump-top.js']}
    />
  );
}
