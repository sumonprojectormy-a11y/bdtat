const tourForm = document.querySelector('#tour-form');
const tourFields = tourForm.elements;
const tourResult = document.querySelector('#tour-result');
const tourTitle = document.querySelector('#tour-result-title');
const tourDays = document.querySelector('#tour-days');
const tourSection = document.querySelector('#tour-planner');
const activities = {
  7: [["Laboni Beach walk", "লাবণী সৈকতে হাঁটা"], ["Inani Beach outing", "ইনানী সৈকত ভ্রমণ"], ["Himchari excursion", "হিমছড়ি ভ্রমণ"], ["Local markets and seafood", "স্থানীয় বাজার ও সামুদ্রিক খাবার"]],
  8: [["Tea garden outing", "চা বাগান ভ্রমণ"], ["Jaflong day trip", "জাফলংয়ে দিনভ্রমণ"], ["Ratargul boat outing, subject to conditions", "পরিস্থিতি অনুকূলে রাতারগুলে নৌভ্রমণ"], ["Sylhet city and local food", "সিলেট শহর ও স্থানীয় খাবার"]],
  9: [["Valley viewpoints", "উপত্যকার ভিউপয়েন্ট"], ["Sunrise and a relaxed morning", "সূর্যোদয় ও আরামদায়ক সকাল"], ["Guided walk where access is permitted", "অনুমোদিত পথে গাইডসহ হাঁটা"], ["Local meals and sunset views", "স্থানীয় খাবার ও সূর্যাস্ত"]],
  10: [["Guided mangrove cruise", "গাইডসহ ম্যানগ্রোভ নৌভ্রমণ"], ["Birdwatching from the boat", "নৌকা থেকে পাখি দেখা"], ["Forest stop if included in the permitted route", "অনুমোদিত রুটে থাকলে বন ভ্রমণ"], ["River scenery and onboard leisure", "নদীর দৃশ্য ও নৌযানে অবসর"]],
  11: [["Guided hill viewpoints, subject to access", "প্রবেশের অনুমতি সাপেক্ষে গাইডসহ পাহাড় ভ্রমণ"], ["Town markets and local food", "শহরের বাজার ও স্থানীয় খাবার"], ["Relaxed scenic drive", "আরামদায়ক প্রাকৃতিক দৃশ্যের পথে ভ্রমণ"], ["Sunset viewpoint", "সূর্যাস্তের ভিউপয়েন্ট"]],
  12: [["Kaptai Lake boat trip", "কাপ্তাই হ্রদে নৌভ্রমণ"], ["Lakeside sightseeing", "হ্রদের পাড়ে ঘোরাঘুরি"], ["Local markets and food", "স্থানীয় বাজার ও খাবার"], ["Relaxed lake views", "হ্রদের দৃশ্য উপভোগ"]],
  13: [["Ubud day trip", "উবুদে দিনভ্রমণ"], ["Sanur beach time", "সানুর সৈকতে অবসর"], ["Rice terrace outing", "ধানের সোপান ভ্রমণ"], ["Local markets and cafés", "স্থানীয় বাজার ও ক্যাফে"]],
  14: [["Hanoi Old Quarter walk", "হ্যানয়ের পুরোনো এলাকায় হাঁটা"], ["Hoan Kiem Lake and cafés", "হোয়ান কিয়েম হ্রদ ও ক্যাফে"], ["Ninh Binh day trip", "নিন বিনে দিনভ্রমণ"], ["Vietnamese food tour", "ভিয়েতনামি খাবারের ট্যুর"]],
  15: [["Kathmandu heritage walk", "কাঠমান্ডুর ঐতিহ্যবাহী এলাকায় হাঁটা"], ["Patan sightseeing", "পাতানের দর্শনীয় স্থান"], ["Bhaktapur day trip", "ভক্তপুরে দিনভ্রমণ"], ["Local crafts and cafés", "স্থানীয় হস্তশিল্প ও ক্যাফে"]],
  16: [["Colombo city sights", "কলম্বোর দর্শনীয় স্থান"], ["Galle Fort day trip", "গল ফোর্টে দিনভ্রমণ"], ["Coastal cafés and beach time", "উপকূলের ক্যাফে ও সৈকতে অবসর"], ["Local markets and Sri Lankan food", "স্থানীয় বাজার ও শ্রীলঙ্কান খাবার"]],

  1: [
    ['KLCC Park and city views', 'কেএলসিসি পার্ক ও শহরের দৃশ্য'],
    ['Aquaria KLCC and the park', 'অ্যাকুয়ারিয়া কেএলসিসি ও পার্ক'],
    ['Genting Highlands day trip', 'গেন্টিং হাইল্যান্ডসে দিনভ্রমণ'],
    ['Bukit Bintang shopping', 'বুকিত বিনতাংয়ে কেনাকাটা'],
    ['Perdana Botanical Garden', 'পারদানা বোটানিক্যাল গার্ডেন']
  ],
  2: [
    ['Phuket Old Town', 'ফুকেট ওল্ড টাউন'],
    ['Beach time at Kata', 'কাটা সমুদ্রসৈকতে অবসর'],
    ['Phang Nga Bay excursion', 'ফাং ঙ্গা বে ভ্রমণ'],
    ['Local markets and cafés', 'স্থানীয় বাজার ও ক্যাফে'],
    ['Coastal viewpoints', 'উপকূলের ভিউপয়েন্ট']
  ],
  3: [
    ['Marina Bay waterfront', 'মেরিনা বে ওয়াটারফ্রন্ট'],
    ['Gardens by the Bay', 'গার্ডেনস বাই দ্য বে'],
    ['Sentosa island outing', 'সেন্তোসা দ্বীপ ভ্রমণ'],
    ['Orchard Road shopping', 'অর্চার্ড রোডে কেনাকাটা'],
    ['Singapore Botanic Gardens', 'সিঙ্গাপুর বোটানিক গার্ডেন']
  ],
  5: [
    ['Island beach time', 'দ্বীপের সৈকতে অবসর'],
    ['Guided reef snorkeling', 'গাইডসহ রিফ স্নরকেলিং'],
    ['Lagoon excursion', 'লেগুন ভ্রমণ'],
    ['Local island visit', 'স্থানীয় দ্বীপ ঘুরে দেখা'],
    ['Sunset by the water', 'জলের ধারে সূর্যাস্ত']
  ]
};
const arrival = ['Arrival, transfer and check-in', 'আগমন, যাতায়াত ও চেক-ইন'];
const departure = ['Checkout and onward transfer', 'চেকআউট ও পরবর্তী যাত্রা'];
const transfer = ['Travel from Kuala Lumpur to Singapore and check in', 'কুয়ালালামপুর থেকে সিঙ্গাপুর যাত্রা ও চেক-ইন'];
const flexible = ['Free time or an activity arranged with BDTAT', 'অবসর বা বিডিট্যাটের মাধ্যমে নির্ধারিত কার্যক্রম'];
const generic = [
  ['Local highlights and a guided tour', 'স্থানীয় দর্শনীয় স্থান ও গাইডেড ট্যুর'],
  ['Local food and markets', 'স্থানীয় খাবার ও বাজার'],
  ['Relaxed afternoon at your leisure', 'নিজের মতো আরামদায়ক বিকেল']
];
const locale = () => document.documentElement.lang === 'bn' ? 1 : 0;
const phrase = (en, bn) => [en, bn][locale()];
const optionName = (field, value) => [...tourFields[field].options].find(option => option.value === value).textContent;
let trip;

function syncDestination() {
  const other = tourFields.destination.value === '6';
  tourFields.days.min = tourFields.destination.value === '4' ? 4 : 2;
  tourFields.other.disabled = !other;
  tourFields.other.required = other;
  tourFields.other.closest('label').hidden = !other;
}
tourFields.destination.addEventListener('change', syncDestination);
tourFields.date.min = today;
syncDestination();

document.querySelector('#quick-plan').addEventListener('click', () => {
  const places = {Anywhere: '0', Malaysia: '1', Thailand: '2', Singapore: '3', Maldives: '5'};
  const exactMatch = [...tourFields.destination.options].find(option => option.dataset.en === quickDestination.value || option.dataset.en?.startsWith(quickDestination.value + ' ·'));
  tourFields.destination.value = exactMatch?.value ?? places[quickDestination.value] ?? '6';
  tourFields.other.value = tourFields.destination.value === '6' ? quickDestination.value : '';
  const styles = {'Family time': '0', 'Relax & recharge': '6', 'Celebrate together': '7'};
  tourFields.style.value = styles[quickStyle.value] ?? '5';
  if (quickStyle.value === 'Relax & recharge') tourFields.pace.value = '0';
  syncDestination();
  tourResult.hidden = true;
  tourSection.scrollIntoView();
  tourFields.destination.focus({preventScroll: true});
});

function buildDays(place, count, style, pace) {
  const priority = [1, 0, 2, 3, 4, 0, 0, 2][style];
  const days = [{options: [arrival], selected: 0}];
  const transferDay = Math.max(1, Math.floor(count / 2));
  for (let day = 1; day < count - 1; day++) {
    if (place === '4' && day === transferDay) {
      days.push({options: [transfer], selected: 0});
      continue;
    }
    const country = place === '4' ? (day < transferDay ? '1' : '3') : place;
    const options = activities[country] ?? generic;
    const primary = (priority + day - 1) % options.length;
    const paired = options.map((activity, index) => {
      const next = options[(index + 1) % options.length];
      return activity.map((label, lang) => label + ' · ' + next[lang]);
    });
    days.push({options: [...(pace === '1' ? paired : options), flexible], selected: day > 6 ? options.length : primary});
  }
  days.push({options: [departure], selected: 0});
  return days;
}

function destinationName() {
  return trip.place === '6' ? trip.details.other : optionName('destination', trip.place);
}

function summary() {
  const d = trip.details;
  return [
    d.city.trim() + ' → ' + destinationName(),
    d.date || phrase('Flexible dates', 'নমনীয় তারিখ'),
    d.days + phrase(' days', ' দিন'),
    d.adults + phrase(' adults', ' প্রাপ্তবয়স্ক'),
    d.children + phrase(' children', ' শিশু'),
    d.budget ? 'BDT ' + Number(d.budget).toLocaleString(locale() ? 'bn-BD' : 'en-BD') : phrase('Budget to discuss', 'বাজেট আলোচনা সাপেক্ষ'),
    optionName('style', d.style),
    optionName('pace', d.pace)
  ].join(' · ');
}

function renderTour() {
  if (!trip || tourResult.hidden) return;
  tourTitle.textContent = phrase('Suggested itinerary', 'প্রস্তাবিত ভ্রমণসূচি') + ' · ' + destinationName();
  document.querySelector('#tour-summary').textContent = summary();
  tourDays.replaceChildren(...trip.days.map((day, index) => {
    const item = document.createElement('li');
    item.className = 'tour-day';
    const label = document.createElement('label');
    label.textContent = phrase('Day ', 'দিন ') + (index + 1);
    if (day.options.length === 1) {
      item.append(label.textContent + ' · ' + day.options[0][locale()]);
      return item;
    }
    const select = document.createElement('select');
    day.options.forEach((activity, choice) => {
      select.add(new Option(activity[locale()], choice, false, choice === day.selected));
    });
    select.addEventListener('change', () => { day.selected = Number(select.value); });
    label.append(select);
    item.append(label);
    return item;
  }));
  tourResult.hidden = false;
}

tourForm.addEventListener('input', () => { tourResult.hidden = true; });

tourForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(tourForm);
  const details = Object.fromEntries(data);
  const count = Number(details.days);
  const suggestions = count >= 6 && details.style !== '1' && details.style !== '4'
    ? ['4', '1', '3']
    : details.style === '1' || details.style === '4' ? ['2', '5', '1'] : ['1', '3', '2'];
  const localSuggestions = details.style === '4' ? ['8', '10'] : ['7', '8'];
  suggestions.unshift(...localSuggestions);
  trip = {details, extras: data.getAll('extras'), days: []};
  if (details.destination === '0') {
    const picker = document.createElement('select');
    picker.setAttribute('aria-label', phrase('Suggested destinations', 'প্রস্তাবিত গন্তব্য'));
    suggestions.forEach(value => picker.add(new Option(optionName('destination', value), value)));
    picker.addEventListener('change', () => chooseTour(picker.value));
    tourResult.querySelector('select[data-suggestions]')?.remove();
    picker.dataset.suggestions = '';
    tourTitle.before(picker);
  } else {
    tourResult.querySelector('select[data-suggestions]')?.remove();
  }
  chooseTour(details.destination === '0' ? suggestions[0] : details.destination);
  tourTitle.focus();
});

function chooseTour(place) {
  const count = Number(trip.details.days);
  trip.place = place;
  trip.days = buildDays(place, count, trip.details.style, trip.details.pace);
  tourResult.hidden = false;
  renderTour();
}

language.addEventListener('click', () => {
  const labelKey = locale() ? 'bnLabel' : 'enLabel';
  tourFields.destination.querySelectorAll('optgroup').forEach(group => {
    group.label = group.dataset[labelKey];
  });
  const picker = tourResult.querySelector('select[data-suggestions]');
  if (picker) {
    picker.setAttribute('aria-label', phrase('Suggested destinations', 'প্রস্তাবিত গন্তব্য'));
    [...picker.options].forEach(option => { option.textContent = optionName('destination', option.value); });
  }
  renderTour();
});

function tourText() {
  const extras = trip.extras.map(value => {
    const input = [...tourForm.querySelectorAll('[name="extras"]')].find(box => box.value === value);
    return input.nextElementSibling.textContent;
  });
  return [
    tourTitle.textContent,
    summary(),
    ...trip.days.map((day, index) => phrase('Day ', 'দিন ') + (index + 1) + ' · ' + day.options[day.selected][locale()]),
    phrase('Services: ', 'সেবা: ') + (extras.join(', ') || phrase('To discuss', 'আলোচনা সাপেক্ষ'))
  ].join('\n');
}

document.querySelector('#tour-edit').addEventListener('click', () => tourFields.destination.focus());
document.querySelector('#tour-quote').addEventListener('click', () => {
  openWhatsApp(phrase('Hello BDTAT, please quote this trip.', 'বিডিট্যাট, এই ভ্রমণের কোটেশন দিন।') + '\n\n' + tourText());
});
document.querySelector('#tour-save').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([tourText()], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'BDTAT-itinerary.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

new IntersectionObserver(([entry]) => {
  document.body.classList.toggle('tour-planner-in-view', entry.isIntersecting);
}).observe(tourSection);
