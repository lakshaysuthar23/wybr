export const INTENTS = [
  { id: 'love', label: 'Love & dates', short: 'Love', hue: 335, icon: 'heart', blurb: 'A partner who matches your vibe' },
  { id: 'movie', label: 'Movie buddy', short: 'Movies', hue: 265, icon: 'film', blurb: "Someone for tonight's show" },
  { id: 'sports', label: 'Sports & gym', short: 'Sports', hue: 150, icon: 'ball', blurb: 'A buddy for your game or workout' },
  { id: 'startup', label: 'Co-founder', short: 'Startup', hue: 35, icon: 'rocket', blurb: 'Builders and future co-founders' },
  { id: 'social', label: 'Coffee & walks', short: 'Hangouts', hue: 195, icon: 'coffee', blurb: 'Easy company when you are bored' },
]
export const AXES = [
  { id: 'energy', name: 'Energy', l: 'Calm', r: 'Lively' },
  { id: 'plans', name: 'Plans', l: 'Spontaneous', r: 'Planner' },
  { id: 'talk', name: 'Talk', l: 'Listener', r: 'Talker' },
  { id: 'out', name: 'Outdoors', l: 'Homebody', r: 'Outdoorsy' },
  { id: 'fun', name: 'Humour', l: 'Serious', r: 'Playful' },
]
export const INTERESTS = ['Coffee', 'Indie music', 'Trekking', 'Films', 'Books', 'Badminton', 'Cricket', 'Football', 'Running', 'Yoga', 'Gym', 'Startups', 'AI', 'Design', 'Food', 'Travel', 'Board games', 'Photography', 'Stand-up', 'Dance']

const P = (kind, cap, likes, ago) => ({ kind, cap, likes, ago })
export const USERS = [
  { id: 'aarav', handle: 'aarav.k', name: 'Aarav', age: 27, gender: 'man', area: 'Indiranagar', x: 68, y: 24, live: true, level: 1, intents: ['love', 'social'], interests: ['Coffee', 'Indie music', 'Trekking', 'Photography'], vibe: [62, 40, 55, 78, 64], alias: 'Quiet Comet',
    bio: 'Product designer. Sunday hikes, filter coffee and playlists nobody asked for. Looking for someone easy to talk to.',
    face: { bg: [20, 340], skin: '#e2b08c', hair: '#2a1b16', style: 'short', shirt: '#2f3a5f', beard: true },
    posts: [P('trek', 'Nandi Hills at 5 AM. Worth the alarm.', 214, '2d'), P('cafe', 'Found the best filter coffee in HSR.', 156, '5d'), P('music', 'Playlist for slow Sundays.', 98, '1w')] },
  { id: 'ananya', handle: 'ananya.r', name: 'Ananya', age: 25, gender: 'woman', area: 'Koramangala', x: 58, y: 64, live: true, level: 2, intents: ['love', 'movie'], interests: ['Films', 'Books', 'Coffee', 'Stand-up'], vibe: [70, 55, 72, 50, 82], alias: 'Neon Fox',
    bio: 'Writer by day, film nerd by night. I will judge your taste in movies kindly.',
    face: { bg: [300, 220], skin: '#d9a07c', hair: '#1d1414', style: 'long', shirt: '#c2185b', glasses: true },
    posts: [P('movie', 'Third rewatch of my favourite thriller.', 302, '1d'), P('cafe', 'Books and a flat white.', 187, '4d'), P('music', 'Stand-up night was unreal.', 120, '1w')] },
  { id: 'rohan', handle: 'rohan.s', name: 'Rohan', age: 29, gender: 'man', area: 'HSR Layout', x: 74, y: 78, live: true, level: 1, intents: ['sports', 'social'], interests: ['Badminton', 'Cricket', 'Gym', 'Food'], vibe: [85, 35, 80, 90, 78], alias: 'Turbo Falcon',
    bio: 'Badminton at 7 AM, biryani at 2 PM. Need a doubles partner who shows up on time.',
    face: { bg: [150, 190], skin: '#c98d68', hair: '#17110f', style: 'spiky', shirt: '#0e7c4a' },
    posts: [P('sport', 'Doubles league. We lost. Dinner was great.', 143, '3d'), P('gym', 'Leg day, no excuses.', 88, '6d'), P('food', 'Post-match biryani.', 201, '2w')] },
  { id: 'meera', handle: 'meera.v', name: 'Meera', age: 31, gender: 'woman', area: 'Jayanagar', x: 34, y: 72, live: false, level: 2, intents: ['startup', 'social'], interests: ['Startups', 'AI', 'Books', 'Running'], vibe: [58, 80, 60, 55, 45], alias: 'Calm Orbit',
    bio: 'Fintech operator. Building a lending product and looking for a technical co-founder.',
    face: { bg: [35, 15], skin: '#d6a07b', hair: '#241713', style: 'bun', shirt: '#7a3b00' },
    posts: [P('code', 'Shipped our first underwriting model.', 176, '2d'), P('cafe', 'Founder breakfast in Jayanagar.', 92, '5d'), P('trek', 'Run club 10K.', 64, '2w')] },
  { id: 'kabir', handle: 'kabir.m', name: 'Kabir', age: 26, gender: 'man', area: 'Whitefield', x: 88, y: 30, live: true, level: 1, intents: ['movie', 'social'], interests: ['Films', 'Indie music', 'Stand-up', 'Board games'], vibe: [74, 30, 66, 45, 88], alias: 'Pixel Panda',
    bio: 'Back-row seat person. Will happily watch the same movie twice if you bring snacks.',
    face: { bg: [265, 300], skin: '#e0ad8a', hair: '#3a2417', style: 'curly', shirt: '#4527a0', glasses: true },
    posts: [P('movie', 'Midnight show with strangers is a vibe.', 260, '1d'), P('music', 'Gig at a tiny bar. 10/10.', 133, '4d'), P('food', 'Board game cafe champion.', 77, '1w')] },
  { id: 'ishita', handle: 'ishita.b', name: 'Ishita', age: 24, gender: 'woman', area: 'Church Street', x: 47, y: 40, live: true, level: 1, intents: ['love', 'movie', 'social'], interests: ['Films', 'Food', 'Dance', 'Photography'], vibe: [88, 25, 78, 60, 92], alias: 'Sunny Echo',
    bio: 'Dancer. Street food hunter. I talk a lot and I listen more than I admit.',
    face: { bg: [45, 330], skin: '#e8b895', hair: '#2b1810', style: 'bob', shirt: '#ef6c00' },
    posts: [P('food', 'Street food crawl, Church Street edition.', 340, '12h'), P('music', 'Dance class recap.', 210, '3d'), P('movie', 'Rom-com marathon, no regrets.', 112, '1w')] },
  { id: 'dev', handle: 'dev.n', name: 'Dev', age: 33, gender: 'man', area: 'Indiranagar', x: 66, y: 28, live: false, level: 2, intents: ['startup', 'social'], interests: ['Startups', 'AI', 'Design', 'Running'], vibe: [48, 78, 52, 62, 40], alias: 'Steady Mango',
    bio: 'Second-time founder building developer tools. Hiring a design-minded co-founder.',
    face: { bg: [195, 230], skin: '#d29b78', hair: '#1c1512', style: 'short', shirt: '#01579b', beard: true, glasses: true },
    posts: [P('code', 'Demo day notes. Lots to fix.', 158, '3d'), P('trek', 'Morning run, Cubbon Park.', 71, '1w'), P('cafe', 'Whiteboard coffee.', 55, '2w')] },
  { id: 'tanvi', handle: 'tanvi.j', name: 'Tanvi', age: 28, gender: 'woman', area: 'Jayanagar', x: 36, y: 70, live: true, level: 1, intents: ['sports', 'love', 'social'], interests: ['Running', 'Yoga', 'Trekking', 'Coffee'], vibe: [66, 62, 48, 92, 58], alias: 'Misty Rover',
    bio: 'Runner and yoga teacher. Looking for people who like early mornings and slow evenings.',
    face: { bg: [165, 120], skin: '#cf9570', hair: '#1f1411', style: 'long', shirt: '#00695c' },
    posts: [P('sport', 'Sunrise 10K. Legs gone.', 189, '2d'), P('trek', 'Weekend trek to Savandurga.', 247, '6d'), P('cafe', 'Chai after yoga.', 83, '2w')] },
  { id: 'arjun', handle: 'arjun.p', name: 'Arjun', age: 30, gender: 'man', area: 'Koramangala', x: 60, y: 62, live: true, level: 1, intents: ['sports', 'love'], interests: ['Football', 'Gym', 'Travel', 'Food'], vibe: [80, 45, 70, 82, 72], alias: 'Rapid Otter',
    bio: 'Football on weekends, lifts before work. Always up for a new city or a new burger.',
    face: { bg: [10, 340], skin: '#bf8660', hair: '#120d0b', style: 'cap', shirt: '#b71c1c', beard: true },
    posts: [P('sport', 'Sunday 7-a-side. Hat-trick.', 178, '3d'), P('gym', 'New PR on deadlift.', 134, '1w'), P('trek', 'Goa trip, no plans.', 301, '3w')] },
  { id: 'sara', handle: 'sara.h', name: 'Sara', age: 27, gender: 'woman', area: 'Domlur', x: 66, y: 46, live: true, level: 1, intents: ['love', 'social'], interests: ['Travel', 'Food', 'Indie music', 'Photography'], vibe: [72, 38, 64, 76, 80], alias: 'Golden Wren',
    bio: 'Travel photographer. Collecting good conversations and better coffee.',
    face: { bg: [330, 40], skin: '#dba583', hair: '#2e1c14', style: 'curly', shirt: '#6a1b9a' },
    posts: [P('trek', 'Hampi at golden hour.', 412, '1d'), P('cafe', 'Domlur cafe find.', 150, '5d'), P('food', 'Momos, always momos.', 99, '2w')] },
]

export const PLANS = [
  { id: 'p1', intent: 'movie', host: 'kabir', title: 'Late-night thriller show', where: 'Starlight Cinemas, Koramangala', when: 'Tonight 9:30 PM', seats: 1 },
  { id: 'p2', intent: 'sports', host: 'rohan', title: 'Badminton doubles', where: 'Smash Arena, HSR', when: 'Sat 7:00 AM', seats: 1 },
  { id: 'p3', intent: 'startup', host: 'meera', title: 'Founder coffee', where: 'Desk & Dosa Cowork Cafe, Jayanagar', when: 'Sun 11:00 AM', seats: 2 },
  { id: 'p4', intent: 'social', host: 'tanvi', title: 'Sunrise walk and chai', where: 'Lalbagh West Gate', when: 'Sat 6:00 AM', seats: 3 },
  { id: 'p5', intent: 'love', host: 'ananya', title: 'Board-game cafe night', where: 'Dice & Dream Cafe, Indiranagar', when: 'Fri 8:00 PM', seats: 1 },
]

export const VENUES = {
  love: [{ id: 'v1', name: 'Filter & Fern', area: 'Indiranagar', x: 68, y: 24 }, { id: 'v2', name: 'Mellow Roast', area: 'Ulsoor', x: 56, y: 32 }, { id: 'v3', name: 'Loft Brew', area: 'Church Street', x: 47, y: 40 }, { id: 'v4', name: 'The Book Bean', area: 'Domlur', x: 66, y: 46 }, { id: 'v5', name: 'Quiet Cup', area: 'Koramangala', x: 60, y: 58 }, { id: 'v6', name: 'Brew Lab', area: 'HSR', x: 74, y: 78 }, { id: 'v7', name: 'Chai Corner', area: 'Jayanagar', x: 34, y: 72 }],
  movie: [{ id: 'm1', name: 'Starlight Cinemas', area: 'Koramangala', x: 60, y: 60 }, { id: 'm2', name: 'Grand Screen', area: 'Indiranagar', x: 67, y: 27 }, { id: 'm3', name: 'Orbit Multiplex', area: 'Whitefield', x: 88, y: 30 }, { id: 'm4', name: 'Cine Square', area: 'Jayanagar', x: 35, y: 70 }],
  sports: [{ id: 's1', name: 'Smash Arena', area: 'HSR', x: 74, y: 76 }, { id: 's2', name: 'Turf Nine', area: 'Koramangala', x: 58, y: 66 }, { id: 's3', name: 'Cubbon Park track', area: 'Central', x: 50, y: 36 }, { id: 's4', name: 'Court 12 Club', area: 'Indiranagar', x: 66, y: 28 }],
  startup: [{ id: 'f1', name: 'Desk & Dosa Cowork Cafe', area: 'Jayanagar', x: 34, y: 72 }, { id: 'f2', name: 'Stack Cafe', area: 'Indiranagar', x: 68, y: 26 }, { id: 'f3', name: 'Founders Table', area: 'Koramangala', x: 59, y: 62 }],
  social: [{ id: 'w1', name: 'Lalbagh West Gate', area: 'Jayanagar', x: 40, y: 66 }, { id: 'w2', name: 'Cubbon Park bandstand', area: 'Central', x: 50, y: 36 }, { id: 'w3', name: 'Chai Corner', area: 'Jayanagar', x: 34, y: 72 }, { id: 'w4', name: 'Domlur Lake path', area: 'Domlur', x: 66, y: 46 }],
}
export const SLOTS = ['Tonight 8:00 PM', 'Tomorrow 6:00 PM', 'Sat 11:00 AM', 'Sat 6:00 PM', 'Sun 5:00 PM']
export const PARTNER_SLOTS = ['Sat 6:00 PM', 'Sun 5:00 PM']
export const ME_AT = { x: 58, y: 64 }
export const km = (a, b) => Math.round(Math.hypot(a.x - b.x, a.y - b.y) * 0.16 * 10) / 10
export const isFair = (v, a, b) => { const da = km(v, a), db = km(v, b); return Math.abs(da - db) <= 2.5 && Math.max(da, db) <= 7 }

export const STARTERS = ['Best thing you did this week?', 'Pick one: beach or mountains', 'What do you do when you are bored?', 'Weirdest talent?']
export const REPLIES = ['Ha, good one. Honestly a very average week, but it had a great Sunday in it.', 'Mountains. Always. Cold air and no signal.', 'I explore random food places. It always ends well or very badly.', 'I can fold a paper plane that flies. Ask me for proof.', 'Okay, you sound fun. Tell me more.', 'I like this. Which side of the city are you on?']
export const THREAD_REPLIES = ['Haha, that works for me.', 'Sounds good. When are you free?', 'Love that. Tell me more.', 'Okay, let us do it.']

export const INITIAL_THREADS = {
  kabir: [{ k: 'them', t: 'That midnight show was wild. Want to catch the next one?', at: '9:12 PM' }, { k: 'them', t: 'I will bring the snacks.', at: '9:13 PM' }],
  ishita: [{ k: 'me', t: 'Your street food crawl post made me hungry.', at: 'Yesterday' }, { k: 'them', t: 'Typing…', at: '', typing: true }],
  dev: [{ k: 'them', t: 'Saw your profile. Are you a developer or a designer?', at: '8:40 PM' }],
}
export const TIERS = [{ n: 'Joined', d: 'Phone verified.' }, { n: 'Verified', d: 'Selfie verified. Safer to meet.' }, { n: 'Trusted', d: 'Showed up to real meetups.' }]

export const initial = {
  stage: 'welcome', name: '', age: '', dob: { d: 15, m: 5, y: 2000 }, notifs: [{ id: 'n1', k: 'msg', u: 'kabir', t: 'Kabir sent you a message', at: '9:13 PM', unr: true }, { id: 'n2', k: 'msg', u: 'dev', t: 'Dev sent you a message', at: '8:40 PM', unr: true }, { id: 'n3', k: 'match', u: 'meera', t: 'Meera matches your vibe 91%', at: 'Today', unr: true }, { id: 'n4', k: 'plan', u: 'rohan', t: 'Rohan is hosting a badminton game tonight', at: 'Yesterday', unr: false }], gender: '', phone: '', intents: [], interests: [], vibe: [50, 50, 50, 50, 50], bio: '', trust: 0,
  tab: 'home', theme: 'light', seg: 'foryou', filter: 'all', myPosts: [], meets: [], threads: INITIAL_THREADS, unread: { kabir: 2, dev: 1 },
  notify: { matches: true, chats: true, plans: true }, privacy: { live: true, area: false }, safety: { shareLoc: true, checkin: true, exitCall: false },
}

export const myHandle = (s) => (s.name || 'you').toLowerCase().replace(/[^a-z]/g, '') + '.w'
export function matchPct(s, u) {
  const mine = s.vibe || [50, 50, 50, 50, 50]
  const d = AXES.reduce((a, _, i) => a + Math.abs(mine[i] - u.vibe[i]), 0) / AXES.length
  const shared = u.interests.filter((x) => (s.interests || []).includes(x)).length
  const ints = u.intents.filter((x) => (s.intents || []).includes(x)).length
  return Math.max(48, Math.min(98, Math.round(100 - d * 0.75 + shared * 2.5 + ints * 2)))
}
export function vibeType(v) {
  const [e, p, t, o, f] = v
  if (o > 70 && e > 60) return 'Adventurous spark'
  if (e < 45 && t < 50) return 'Quiet thinker'
  if (f > 70 && t > 65) return 'Playful talker'
  if (p > 65) return 'Thoughtful planner'
  return 'Easygoing explorer'
}
export const fmt = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`

export const meUser = (s) => ({ id: 'me', name: s.name || 'You', handle: myHandle(s), age: s.age, face: s.gender === 'man'
  ? { bg: [260, 320], skin: '#dcaa86', hair: '#241812', style: 'short', shirt: '#3b2f8f' }
  : { bg: [330, 270], skin: '#e0b08c', hair: '#231512', style: 'long', shirt: '#b0306a' } })

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const daysIn = (m, y) => new Date(y, m, 0).getDate()
export const ageOf = ({ d, m, y }) => { const n = new Date(); let a = n.getFullYear() - y; if (n.getMonth() + 1 < m || (n.getMonth() + 1 === m && n.getDate() < d)) a--; return a }

export const meFull = (s) => ({ ...meUser(s), area: 'Bengaluru', live: true, level: s.trust, intents: s.intents, interests: s.interests, bio: s.bio, posts: s.myPosts, vibe: s.vibe })

const pick = (a) => a[Math.floor(Math.random() * a.length)]
const has = (t, re) => re.test(t)
const lastPicked = {}
function once(key, arr) { let r, i = 0; do { r = pick(arr) } while (r === lastPicked[key] && arr.length > 1 && i++ < 5); lastPicked[key] = r; return r }
/* keyword engine: reply that actually answers what was said */
export function smartReply(u, text, opts = {}) {
  const t = ' ' + text.toLowerCase().replace(/[^a-z0-9?' ]/g, ' ').replace(/\s+/g, ' ').trim() + ' '
  const room = !!opts.room, mine = opts.interests || []
  const shared = u.interests.filter((x) => mine.includes(x))
  const R = (k, a) => once(k, a)
  if (has(t, /^ (hi|hii+|hello|hey+|heyy+|yo|hola|namaste|sup|good (morning|evening|afternoon)) /) || has(t, / (hi|hello|hey|hii+) $/) && t.split(' ').length < 5)
    return R('hi', ['Hey! Good to meet you.', 'Hi! How is your day going?', `Hello! I'm ${room ? 'glad we matched' : u.name}. What's up?`, 'Heyy. Finally someone fun to talk to.'])
  if (has(t, / (how are you|how r u|hru|how are u|wassup|whats up|what s up|how is it going|how s it going) /))
    return R('how', ['Doing good, a little tired but happy. You?', 'Pretty great actually. Just got done with a long day. How about you?', 'Good! Better now that we are chatting. How is yours?'])
  if (has(t, / (your name|ur name|who are you|what s your name|whats your name) /))
    return room ? R('nm', ['Names come after the reveal. That is the fun part. Guess?', 'Ha, nice try. Ask me again after the reveal.']) : `I'm ${u.name}. And you?`
  if (has(t, / (how old|your age|ur age|age\?) /)) return room ? 'Let us keep the numbers for the reveal. Younger than you think though.' : `I'm ${u.age}. You?`
  if (has(t, / (where are you|where do you live|which area|where r u|ur area|your area|location|where you from) /))
    return room ? R('wh', ['Somewhere in Bengaluru. Close enough to meet over coffee.', 'Same city as you, that is all I will tell you for now.']) : `I'm around ${u.area}. Where are you?`
  if (has(t, / (what do you do|your job|ur job|work|working|profession|career|office|study|college) /))
    return R('wk', [`Mostly ${u.interests.includes('Startups') ? 'building startup things' : u.interests.includes('Design') ? 'design stuff' : 'a regular job in the city'}. Weekends are for real life though. You?`, 'Work keeps me busy, but I try to escape every evening. What about you?'])
  if (has(t, / (movie|film|cinema|theatre|theater|netflix|series|show|watch) /))
    return R('mv', ['Yes! Movies are my thing. Thriller, comedy or something emotional?', 'I would watch anything on the big screen. Last one I loved was a thriller with a crazy twist. You?', 'Big screen with popcorn beats everything. Are you a rewatcher or only new stuff?'])
  if (has(t, / (coffee|cafe|chai|tea|filter coffee|latte) /))
    return R('cf', ['Coffee is basically a personality trait for me. Filter coffee or a flat white?', 'Cafe plans are the best plans. Do you like quiet ones or busy ones?', 'Chai over coffee on rainy days, always. You?'])
  if (has(t, / (gym|workout|run|running|cricket|football|badminton|sport|sports|play|game|yoga|trek|trekking|hike) /))
    return shared.length ? `Wait, you like ${shared[0].toLowerCase()} too? That is a sign. How often do you do it?` : R('sp', ['I love anything active. Badminton on weekends is my thing. You?', 'Sports keep me sane. Do you play or just watch?', 'Nice! I would join you for a game. What is your level, honestly?'])
  if (has(t, / (startup|founder|cofounder|co founder|business|build|building|idea|product|app) /))
    return R('st', ['I like builders. What are you working on right now?', 'Ideas are easy, shipping is hard. What is your idea?', 'Love that. Are you looking for a co-founder or just people to talk to?'])
  if (has(t, / (music|song|songs|playlist|singer|band|gig|concert) /))
    return R('mu', ['Indie mostly, with some old Bollywood on road trips. What is on repeat for you?', 'Send me your top song right now. I will judge kindly.', 'I have a playlist for every mood. What is yours today?'])
  if (has(t, / (food|eat|hungry|dinner|lunch|biryani|pizza|dosa|restaurant|street food|breakfast) /))
    return R('fd', ['Food is the best plan. Biryani or dosa, pick one.', 'Now I am hungry. Best place you have eaten in Bengaluru?', 'Street food crawl someday? I know a few places.'])
  if (has(t, / (travel|trip|vacation|holiday|goa|manali|beach|mountain|mountains) /))
    return R('tr', ['Mountains, always. Cold air and no signal. Where was your last trip?', 'I am always planning a trip I never take. Dream place?', 'Beach for a day, mountains for a week. You?'])
  if (has(t, / (meet|meetup|date|catch up|hang out|hangout|lets go|let s go|see you|plan) /))
    return room ? R('mt', ['I like where this is going. Let us see how the ten minutes go first.', 'Slow down, we just started. Keep talking and decide at the end.']) : R('mt2', ['I would like that. Tap Plan on top and pick a time and place.', 'Yes, let us do it. Use the Plan button and we will pick somewhere fair for both.', 'Sounds good! Plan it from the top right and I will confirm.'])
  if (has(t, / (thanks|thank you|thx|ty) /)) return R('th', ['Anytime!', 'Of course. 🙂', 'No problem at all.'])
  if (has(t, / (bye|goodnight|good night|gn|ttyl|see ya|talk later|cya) /)) return R('by', ['Bye! This was fun. Talk soon.', 'Good night! Message me tomorrow.', 'See you! Do not disappear.'])
  if (has(t, / (haha|hahaha|lol|lmao|rofl|funny|joke) /)) return R('lg', ['Haha, I like your humour.', 'Okay that made me laugh out loud.', 'You are funny. Tell me another.'])
  if (has(t, / (cute|beautiful|pretty|handsome|nice|great|awesome|amazing|cool|love it) /)) return R('cp', ['Aww, thank you. That made my day.', 'Ha, you are sweet. Now I am blushing.', 'Thanks! You seem easy to talk to as well.'])
  if (has(t, / (bored|boring|tired|sleepy|sad|lonely|alone) /)) return R('bd', ['Same honestly. That is why I am here. Let us fix it with a good chat.', 'Bored people make the best conversations. Tell me something random.', 'Hey, I am here. What would cheer you up right now?'])
  if (has(t, / (yes|yeah|yep|sure|ok|okay|ya|yup) /) && t.trim().split(' ').length < 3) return R('ok', ['Nice. So what else is on your mind?', 'Great! Tell me more about yourself.', 'Cool. Your turn to ask me something.'])
  if (has(t, / (no|nope|nah) /) && t.trim().split(' ').length < 3) return R('no', ['Fair enough. What would you rather talk about?', 'Haha okay. Change of topic then?'])
  if (shared.length && Math.random() < .4) return `By the way, ${shared[0].toLowerCase()}. We both like it. Tell me your favourite part.`
  if (t.includes('?')) return R('q', ['Good question. Honestly I am still thinking. What is your answer?', 'Hmm, depends on the day. What would you say?', 'I will tell you mine if you tell me yours first.'])
  return R('df', ['Okay, I like that. Tell me more.', 'Interesting. What made you think of that?', 'Ha, that is a good one. And then?', 'Same here. What do you do on weekends?', 'Fair point. What are you into these days?'])
}
export const replyDelay = (r) => 900 + Math.min(2200, r.length * 28)
