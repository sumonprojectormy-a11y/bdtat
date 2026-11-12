const filters = document.getElementById('blog-filters');
const posts = [...document.querySelectorAll('.blog-posts > .blog-post')];
const count = document.getElementById('blog-filter-count');
const empty = document.getElementById('blog-filter-empty');
filters.elements.destination.add(new Option('Rangamati', 'rangamati'));
filters.elements.destination.add(new Option('Kuakata', 'kuakata'));

function filterGuides() {
  const { destination, tripType, language } = Object.fromEntries(new FormData(filters));
  let visible = 0;

  for (const post of posts) {
    const editions = [...post.querySelectorAll(':scope > section[lang]')];
    const availableLanguages = editions.length ? editions.map(edition => edition.lang) : [post.lang || document.documentElement.lang];
    const matchesDestination = !destination || post.dataset.destination === destination;
    const matchesTrip = !tripType || (post.dataset.tripTypes || '').split(' ').includes(tripType);
    post.hidden = !matchesDestination || !matchesTrip || Boolean(language && !availableLanguages.includes(language));
    if (!post.hidden) visible++;
    for (const edition of editions) {
      edition.hidden = Boolean(language && edition.lang !== language);
    }
  }

  count.textContent = visible + (visible === 1 ? ' guide' : ' guides');
  empty.hidden = visible !== 0;
}

filters.addEventListener('change', filterGuides);
filters.addEventListener('reset', () => requestAnimationFrame(filterGuides));
filters.addEventListener('submit', event => event.preventDefault());
filters.hidden = false;
filterGuides();
