const language = document.querySelector('#language');
language.addEventListener('click', () => {
  const lang = document.documentElement.lang === 'en' ? 'bn' : 'en';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(element => {
    element.innerHTML = element.dataset[lang];
  });
  language.textContent = lang === 'en' ? 'বাংলা' : 'English';
  language.ariaLabel = lang === 'en' ? 'Switch language to Bangla' : 'Switch language to English';
});

document.querySelector('#year').textContent = new Date().getFullYear();
function openWhatsApp(message) {
  window.location.assign('https://wa.me/8801707128274?text=' + encodeURIComponent(message));
}

const form = document.querySelector('#brief-form');
const service = document.querySelector('#service');
const route = document.querySelector('#route');
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    service.value = link.dataset.service;
    route.placeholder = service.value === 'Flight tickets' ? 'Dhaka → Kuala Lumpur' : '';
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const details = new FormData(form);
  const message = [
    'Hello BDTAT, I would like a travel quote.',
    'Name: ' + details.get('name').trim(),
    'Service: ' + details.get('service'),
    'Route or destination: ' + details.get('route').trim(),
    'Travel date: ' + (details.get('date') || 'Flexible'),
    'Travellers: ' + details.get('travellers'),
    'Details: ' + (details.get('notes').trim() || 'To discuss')
  ].join('\n');
  openWhatsApp(message);
});

const dialog = document.querySelector('#destination-dialog');
const ideas = {
  Malaysia: ['Kuala Lumpur city tour', 'Langkawi island holiday', 'Penang heritage and food'],
  Maldives: ['Island stays', 'Lagoon excursions', 'Resort enquiries'],
  Thailand: ['Bangkok city breaks', 'Phuket and Krabi coast', 'Chiang Mai cultural trips']
};
let selected;
document.querySelectorAll('[data-place]').forEach(card => {
  card.addEventListener('click', () => {
    selected = card.dataset.place;
    const image = document.querySelector('#dialog-image');
    image.src = card.querySelector('img').src;
    image.alt = card.querySelector('img').alt;
    document.querySelector('#dialog-title').textContent = selected;
    document.querySelector('#dialog-list').replaceChildren(...ideas[selected].map(idea => {
      const item = document.createElement('li');
      item.textContent = idea;
      return item;
    }));
    dialog.showModal();
  });
});
dialog.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-plan').addEventListener('click', () => {
  service.value = selected === 'Malaysia' ? 'Malaysia tours' : 'Custom holidays';
  route.value = selected;
  dialog.close();
  document.querySelector('#plan').scrollIntoView();
});

const bookingTabs = document.querySelectorAll('[data-booking-tab]');
const bookingForms = document.querySelectorAll('[data-booking-form]');
bookingTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    bookingTabs.forEach(button => button.setAttribute('aria-pressed', String(button === tab)));
    bookingForms.forEach(panel => {
      panel.hidden = panel.dataset.bookingForm !== tab.dataset.bookingTab;
    });
  });
});

const returnDate = document.querySelector('#return-date');
const returnInput = returnDate.querySelector('input');
document.querySelectorAll('input[name="Trip type"]').forEach(choice => {
  choice.addEventListener('change', () => {
    const roundTrip = choice.value === 'Round trip';
    returnDate.hidden = !roundTrip;
    returnInput.disabled = !roundTrip;
    returnInput.required = roundTrip;
  });
});

const now = new Date();
const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
form.elements.namedItem('date').min = today;
bookingForms.forEach(panel => {
  panel.querySelectorAll('input[type="date"]').forEach(input => { input.min = today; });
  const start = panel.querySelector('[name="Departure"], [name="Check-in"]');
  const end = panel.querySelector('[name="Return"], [name="Check-out"]');
  if (start && end) {
    start.addEventListener('change', () => {
      if (!start.value || end.name !== 'Check-out') {
        end.min = start.value || today;
        return;
      }
      const nextDay = new Date(start.value + 'T00:00:00Z');
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);
      end.min = nextDay.toISOString().slice(0, 10);
    });
  }
  panel.addEventListener('submit', event => {
    event.preventDefault();
    const details = Array.from(new FormData(panel), ([label, value]) =>
      value.trim() ? label + ': ' + value.trim() : ''
    ).filter(Boolean);
    const message = ['Hello BDTAT, I would like a quote for ' + panel.dataset.bookingForm.toLowerCase() + '.', ...details].join('\n');
    openWhatsApp(message);
  });
});

const quickDestination = document.querySelector('#quick-destination');
const quickStyle = document.querySelector('#quick-style');
const bookingSection = document.querySelector('.booking');
new IntersectionObserver(([entry]) => {
  bookingSection.classList.toggle('booking-in-view', entry.isIntersecting);
}).observe(bookingSection);

function updateDateHints() {
  const hint = document.documentElement.lang === 'bn' ? 'তারিখ বাছুন' : 'Select date';
  bookingSection.querySelectorAll('input[type="date"]').forEach(input => {
    input.dataset.dateHint = hint;
  });
}
updateDateHints();
language.addEventListener('click', updateDateHints);

language.addEventListener('click', () => {
  const labelKey = document.documentElement.lang === 'bn' ? 'bnLabel' : 'enLabel';
  quickDestination.querySelectorAll('optgroup').forEach(group => {
    group.label = group.dataset[labelKey];
  });
});

const multiCity = document.querySelector('#multi-city');
const extraFlights = document.querySelector('#extra-flights');
const addFlight = document.querySelector('#add-flight');
const flightTemplate = document.querySelector('#flight-template');
const maxFlights = 6;

function syncFlightLegs() {
  const legs = [...extraFlights.children];
  const bangla = document.documentElement.lang === 'bn';
  let earliest = bookingForms[0].elements.namedItem('Departure').value || today;
  legs.forEach((leg, index) => {
    const number = index + 2;
    leg.querySelector('legend').textContent = (bangla ? 'ফ্লাইট ' : 'Flight ') + number;
    leg.querySelector('button').hidden = legs.length === 1;
    leg.querySelectorAll('input').forEach(input => {
      const field = input.dataset.field || input.name;
      input.dataset.field = field;
      input.name = 'Flight ' + number + ' ' + field;
      input.disabled = multiCity.hidden;
      if (input.type === 'date') {
        input.min = earliest;
        earliest = input.value || earliest;
      }
    });
  });
  addFlight.disabled = legs.length >= maxFlights - 1;
  updateDateHints();
}

function appendFlight() {
  extraFlights.append(flightTemplate.content.cloneNode(true));
  syncFlightLegs();
  if (document.documentElement.lang === 'bn') {
    extraFlights.lastElementChild.querySelectorAll('[data-bn]').forEach(node => {
      node.textContent = node.dataset.bn;
    });
  }
}

document.querySelectorAll('input[name="Trip type"]').forEach(choice => {
  choice.addEventListener('change', () => {
    multiCity.hidden = choice.value !== 'Multi-city';
    if (!multiCity.hidden && !extraFlights.children.length) appendFlight();
    syncFlightLegs();
  });
});
addFlight.addEventListener('click', () => {
  appendFlight();
  extraFlights.lastElementChild.querySelector('input').focus();
});
extraFlights.addEventListener('click', event => {
  if (event.target.matches('.remove-flight') && extraFlights.children.length > 1) {
    event.target.closest('fieldset').remove();
    syncFlightLegs();
    addFlight.focus();
  }
});
extraFlights.addEventListener('change', syncFlightLegs);
bookingForms[0].elements.namedItem('Departure').addEventListener('change', syncFlightLegs);
language.addEventListener('click', syncFlightLegs);

const travelMenu = document.querySelector('#travel-menu');
// Group the mobile navigation by visitor task while retaining every original link.
const mobileMenuLinks = travelMenu.querySelector('.menu-links');
const mobileItems = [...mobileMenuLinks.querySelectorAll('a')];
const menuCategories = [
  { en: 'Plan your journey', bn: 'ভ্রমণের পরিকল্পনা', items: [
    ['Itinerary', '🗓️'], ['Destinations', '📍'], ['Tour Packages', '🧳']
  ] },
  { en: 'Book travel', bn: 'ভ্রমণ বুকিং', items: [
    ['Flights', '✈️'], ['Hotels', '🏨'], ['Tours', '🌴'], ['Visa', '🛂']
  ] },
  { en: 'Explore BDTAT', bn: 'বিডিটিএটি সম্পর্কে', items: [
    ['Services', '✨'], ['Blog', '📖'], ['Reviews & Photos', '⭐'],
    ['Booking FAQ', '❔'], ['Contact BDTAT', '💬']
  ] }
];
const findMobileItem = name => mobileItems.find(link =>
  link.dataset.en === name || (name === 'Itinerary' && link.dataset.en === 'Plan My Tour'));
mobileMenuLinks.replaceChildren();
menuCategories.forEach(category => {
  const section = document.createElement('section');
  section.className = 'mobile-menu-group';
  const heading = document.createElement('h3');
  heading.className = 'mobile-menu-group-title';
  heading.dataset.en = category.en;
  heading.dataset.bn = category.bn;
  heading.textContent = document.documentElement.lang === 'bn' ? category.bn : category.en;
  section.append(heading);
  category.items.forEach(([name, icon]) => {
    const link = findMobileItem(name);
    if (!link) return;
    if (name === 'Itinerary') {
      link.dataset.en = 'Itinerary';
      link.dataset.bn = 'ভ্রমণসূচি';
      link.textContent = document.documentElement.lang === 'bn' ? 'ভ্রমণসূচি' : 'Itinerary';
      link.classList.add('menu-featured');
    }
    link.dataset.icon = icon;
    section.append(link);
  });
  mobileMenuLinks.append(section);
});
travelMenu.querySelector('#travel-menu-title').dataset.en = 'Explore BDTAT';
travelMenu.querySelector('#travel-menu-title').dataset.bn = 'বিডিটিএটি ঘুরে দেখুন';
travelMenu.querySelector('#travel-menu-title').textContent = 'Explore BDTAT';
const mobileClose = travelMenu.querySelector('#close-travel-menu');
mobileClose.setAttribute('aria-label', 'Close menu');
mobileClose.dataset.en = '✕';
mobileClose.dataset.bn = '✕';
mobileClose.textContent = '✕';
document.querySelector('#open-travel-menu').addEventListener('click', () => travelMenu.showModal());
document.querySelector('#close-travel-menu').addEventListener('click', () => travelMenu.close());
travelMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    travelMenu.close();
    const tab = [...bookingTabs].find(button => button.dataset.bookingTab === link.dataset.menuBooking);
    if (tab) {
      tab.click();
      tab.focus({preventScroll:true});
    }
  });
});
