import { readFileSync } from 'node:fs';
import { join } from 'node:path';

type Props = {
  page: 'home' | 'blog';
  stylesheets: string[];
  scripts: string[];
};

export default function SiteContent({ page, stylesheets, scripts }: Props) {
  // Read checked-in BDTAT content when Next.js prerenders the page.
  const markup = readFileSync(join(process.cwd(), 'content', `${page}.html`), 'utf8');

  return (
    <>
      {stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} precedence="bdtat" />
      ))}
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {/* Defer preserves the source site's script order and waits for the HTML. */}
      {scripts.map((src) => (
        <script key={src} src={src} defer />
      ))}
    </>
  );
}
