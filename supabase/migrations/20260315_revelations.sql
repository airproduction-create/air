-- ═══════════════════════════════════════════════════════════════════
-- AIR CO — Revelations table (LinkedIn automation pipeline)
-- Run this in Supabase SQL Editor:
--   https://supabase.com/dashboard/project/yossieeqpgmvfuiiwcbl/sql/new
-- ═══════════════════════════════════════════════════════════════════

-- 1. Create table
create table if not exists revelations (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  creative_figure   text not null,
  category          text not null check (category in (
                      'creative-personality',
                      'landmark-campaign',
                      'cultural-movement',
                      'cinematic-breakthrough',
                      'design-philosophy',
                      'advertising-wisdom'
                    )),
  problem_statement text not null,
  insight           text not null,
  narrative         text not null,
  post_copy         text not null,
  publish_date      date unique,
  day_of_week       text,
  tone_tag          text not null check (tone_tag in ('standard', 'sunday')),
  image_prompt      text not null,
  image_url         text,
  published         boolean default false,
  publish_error     text,
  created_at        timestamptz default now()
);

-- 2. Enable RLS
alter table revelations enable row level security;

-- Service role has full access (used by Netlify function)
-- No public read policy needed — this is internal content

-- 3. Seed content: 14 days of LinkedIn posts (March 15 – March 28, 2026)
insert into revelations (title, creative_figure, category, problem_statement, insight, narrative, post_copy, publish_date, day_of_week, tone_tag, image_prompt) values

-- ── Week 1 ─────────────────────────────────────────────────

('The Poster That Sold a Feeling, Not a Product',
 'Toulouse-Lautrec',
 'creative-personality',
 'In the 1890s, advertising was walls of small text. Nobody looked twice.',
 'Lautrec proved that art in service of commerce is not lesser art — it is art that actually reaches people.',
 'Henri de Toulouse-Lautrec turned the streets of Montmartre into a gallery. His posters for the Moulin Rouge were not advertisements in the traditional sense — they were invitations into a world. He used bold colour, dynamic composition, and radical simplification decades before modernism had a name. He understood that a poster seen for two seconds must say everything a novel cannot.',
 'In 1891, a painter limped through Montmartre and invented modern advertising.

Toulouse-Lautrec''s Moulin Rouge poster didn''t describe the cabaret.
It made you feel like you were already inside.

Bold colour. Radical simplification. A world in a single image.

He proved something most brands still haven''t learned:

The best ad doesn''t sell a product.
It sells a feeling you didn''t know you were missing.

Every satisfying satisfying satisfying satisfying brand identity — from Apple to Aesop — owes something to a painter who understood the street better than the salon.

#Advertising #BrandStrategy #CreativeHistory #AIR',
 '2026-03-15', 'Sunday', 'sunday',
 'Cinematic wide shot of 1890s Montmartre at dusk, warm gaslight glow on cobblestones, a single bold lithograph poster on a weathered stone wall, art nouveau style, moody desaturated palette with pops of amber and rouge, film grain, atmospheric'),

('Think Small: The Ad That Made Weakness a Weapon',
 'Bill Bernbach',
 'landmark-campaign',
 'In 1959, America worshipped chrome, fins, and size. Volkswagen''s Beetle was none of those things.',
 'When you cannot win by the existing rules, change what winning looks like.',
 'Bill Bernbach and DDB took the Volkswagen Beetle — small, ugly, foreign — and turned every liability into a virtue. "Think Small" used radical white space, deadpan humour, and brutal honesty to cut through an industry addicted to exaggeration. It didn''t just sell cars; it redefined what advertising could be. The campaign proved that respecting the audience''s intelligence is the most persuasive thing a brand can do.',
 'In 1959, every car ad screamed BIG.

Bill Bernbach whispered "Think Small."

A tiny car. A vast white page. A single line of deadpan copy.

While Detroit sold fantasies, Bernbach sold honesty — and outsold them all.

The lesson hasn''t changed in 67 years:

When you can''t win by the existing rules, change what winning looks like.

Respect your audience''s intelligence. It''s the most persuasive thing you''ll ever do.

#Advertising #Creativity #BrandStrategy #ThinkSmall #AIR',
 '2026-03-16', 'Monday', 'standard',
 'Minimalist overhead shot of a tiny vintage Volkswagen Beetle alone on an enormous empty white surface, single dramatic shadow, cinematic lighting from above, desaturated monochrome with subtle warm tones, editorial photography style'),

('The Woman Who Made You Smell Danger',
 'Estée Lauder',
 'creative-personality',
 'In the 1950s, prestige cosmetics were sold behind glass counters by intimidating saleswomen.',
 'A product people can experience will always outsell a product people can only imagine.',
 'Estée Lauder built an empire on a single insight: let people touch, smell, and feel the product before asking them to buy. She invented the free sample as a strategic weapon. She placed herself at department store counters, personally applying makeup to strangers. While competitors spent fortunes on print advertising, she spent hers on direct human contact. Her "gift with purchase" model created the modern prestige beauty industry.',
 'Estée Lauder didn''t believe in advertising.

She believed in the power of a woman touching her own face and feeling the difference.

While her competitors bought magazine pages, she stood at department store counters. Personally. Every day.

She invented the free sample — not as charity, but as strategy.

Her insight was devastating in its simplicity:

A product people can experience will always outsell a product people can only imagine.

She built a $90B empire on human contact, not media spend.

#BrandStrategy #Marketing #Leadership #AIR',
 '2026-03-17', 'Tuesday', 'standard',
 'Close-up of an elegant woman''s hand holding a vintage gold cosmetics compact, soft cinematic lighting, shallow depth of field, 1950s department store counter blurred in background, warm amber and cream tones, film grain, intimate editorial feel'),

('Absolut Perfection: 1,500 Ads, One Bottle',
 'TBWA',
 'landmark-campaign',
 'Absolut Vodka was a Swedish unknown competing against Russian giants with centuries of heritage.',
 'Consistency is not repetition — it is recognition. A strong enough idea can hold infinite variation.',
 'The Absolut bottle campaign ran for 25 years. Over 1,500 individual print ads, each featuring the bottle''s distinctive silhouette reinterpreted through art, cities, seasons, and culture. Andy Warhol painted one. Keith Haring illustrated another. The campaign turned a commodity product into a cultural icon, proving that a single visual idea — executed with obsessive craft and infinite variation — can build a brand more powerful than any heritage story.',
 'One bottle shape. 1,500 ads. 25 years. Zero deviation from the idea.

Absolut Vodka had no heritage, no Russian mystique, no centuries of tradition.

It had one thing: a distinctive silhouette and the discipline to never abandon it.

Andy Warhol painted it. Keith Haring drew it. Every major city inspired one.

The lesson that most brands forget:

Consistency is not repetition.
Consistency is recognition.

A strong enough idea doesn''t need replacing — it needs exploring.

#Branding #Advertising #CreativeStrategy #AIR',
 '2026-03-18', 'Wednesday', 'standard',
 'A single elegant glass bottle silhouette centered against a dark gallery wall, surrounded by framed artworks in various styles, dramatic museum lighting with spotlight on bottle, cinematic atmosphere, desaturated with gold accent lighting'),

('The Director Who Sold Revolution in 60 Seconds',
 'Ridley Scott',
 'cinematic-breakthrough',
 'In 1984, Apple needed to launch the Macintosh against IBM''s total market dominance.',
 'When you frame your product as liberation, customers don''t just buy — they join a cause.',
 'Ridley Scott''s "1984" Super Bowl commercial for Apple cost $900,000 to produce and aired exactly once during the game. It never showed the product. It never listed features. A woman with a sledgehammer ran through a dystopian theatre of grey conformists and shattered the screen. The message was clear: the Macintosh was not a computer — it was an act of rebellion. The ad is considered the greatest commercial ever made because it understood that the best way to sell a product is to sell an identity.',
 'Ridley Scott''s Apple "1984" commercial aired once. Sixty seconds. During the Super Bowl.

It never showed the product.
It never listed a single feature.
It never said "buy."

A woman ran through a grey dystopia and shattered the screen with a sledgehammer.

That was it.

The message: this is not a computer. This is liberation.

40 years later, the lesson still cuts:

When you frame your product as identity, people don''t just buy.
They belong.

#Apple #Advertising #Storytelling #CreativeDirection #AIR',
 '2026-03-19', 'Thursday', 'standard',
 'Cinematic wide shot of a lone figure with a sledgehammer running through a vast grey industrial corridor, dramatic backlighting, volumetric light streaming through dust, dystopian atmosphere, desaturated blue-grey with single warm accent, film grain, Ridley Scott visual style'),

('The Man Who Made Logos Disappear',
 'Massimo Vignelli',
 'design-philosophy',
 'In the 1970s, the New York subway system was an unnavigable mess of competing signage.',
 'Great design is not about what you add — it is about what you have the courage to remove.',
 'Massimo Vignelli redesigned the New York subway map and signage system using Helvetica, strict grids, and radical simplification. His approach was controversial — he abstracted geography in favour of clarity. But his deeper contribution was proving that design is not decoration; it is structure. His philosophy of extreme reduction influenced everything from American Airlines'' identity to Bloomingdale''s shopping bags. He believed that a designer''s job is to fight visual pollution, not add to it.',
 'Massimo Vignelli looked at New York''s subway chaos and did something radical.

He removed everything that wasn''t essential.

One typeface. One grid. Absolute clarity.

His subway map was controversial — it sacrificed geographic accuracy for legibility. Critics hated it. Riders could finally navigate.

His principle was simple but requires courage:

Great design is not about what you add.
It''s about what you remove.

Every brand that calls itself "minimal" should ask:
Did we remove enough? Or did we just use a thin font?

#Design #Branding #Typography #AIR',
 '2026-03-20', 'Friday', 'standard',
 'Clean overhead shot of a minimalist grid layout on a light surface, Helvetica typography specimens arranged precisely, ruler and geometric tools, stark high-contrast lighting, Swiss design aesthetic, desaturated monochrome with subtle warm paper tones'),

('When Architecture Became Advertising',
 'Frank Gehry',
 'cultural-movement',
 'In the 1990s, the city of Bilbao was an industrial backwater that no tourist would visit.',
 'Sometimes the most powerful piece of content a brand can create is not media — it is a physical experience that makes people travel to see it.',
 'Frank Gehry''s Guggenheim Museum Bilbao, completed in 1997, transformed an entire city''s economy and identity through architecture. The building itself became the advertisement. No media campaign could have achieved what the titanium curves did: people flew across the world just to stand in front of it. The "Bilbao Effect" proved that the most powerful content isn''t something you distribute — it''s something people travel to experience.',
 'No ad campaign in history has done what Frank Gehry''s building did for Bilbao.

Before 1997: a dying industrial port nobody visited.
After 1997: a global cultural destination.

One building. No media spend. The architecture WAS the advertisement.

Tourists flew across oceans to stand in front of it.

The "Bilbao Effect" taught every industry a truth that most still ignore:

The most powerful content isn''t something you distribute.
It''s something people travel to experience.

What is your brand''s Bilbao?

#Architecture #BrandExperience #ContentStrategy #AIR',
 '2026-03-21', 'Saturday', 'standard',
 'Dramatic low-angle shot of a titanium-clad museum exterior reflecting golden sunset light over a river, sweeping curved metallic forms, warm amber reflections on water surface, cinematic wide composition, desaturated atmosphere with metallic highlights'),

-- ── Week 2 ─────────────────────────────────────────────────

('The Quiet Genius of Saying Nothing',
 'Lee Clow',
 'advertising-wisdom',
 'After Steve Jobs returned to Apple in 1997, the company was 90 days from bankruptcy.',
 'The most confident thing a brand can do is shut up about features and speak to identity.',
 'Lee Clow and TBWA\Media Arts Lab created "Think Different" — a campaign that never mentioned a product, a price, or a feature. It showed Einstein, Gandhi, Picasso, and said: "Here''s to the crazy ones." It was a love letter to misfits. Apple''s stock was $4. Within a decade, it would become the most valuable company on earth. Clow understood that when a brand is broken, you don''t fix the product message — you fix the emotional relationship.',
 'Apple was 90 days from bankruptcy.

Lee Clow didn''t talk about products. He talked about people.

Einstein. Gandhi. Picasso. Amelia Earhart.

"Here''s to the crazy ones."

No specs. No prices. No features. Just a declaration:
We see the world differently, and so do you.

That single campaign rebuilt an emotional relationship between a brand and its audience that no product launch could have achieved.

The most confident thing a brand can do is stop talking about what it makes — and start talking about what it believes.

#Apple #ThinkDifferent #BrandStrategy #Advertising #AIR',
 '2026-03-22', 'Sunday', 'sunday',
 'Black and white portrait-style composition of multiple silhouetted figures representing different creative disciplines — musician, painter, scientist, explorer — arranged against a vast sky, dramatic rim lighting, inspirational and contemplative mood, film grain'),

('The Three-Word Brief That Built Nike',
 'Dan Wieden',
 'landmark-campaign',
 'In 1988, Nike was losing the fitness market to Reebok''s aerobics-driven growth.',
 'A tagline is not a slogan — it is a permission slip. The best ones give people courage.',
 'Dan Wieden sat in a meeting trying to find a unifying line for Nike''s diverse roster of athletes. He thought of Gary Gilmore''s last words before execution: "Let''s do it." He softened it to "Just Do It." Three words that transformed Nike from a shoe company into a movement. The line worked because it wasn''t about shoes — it was about the moment of hesitation before every run, every workout, every risk. It gave ordinary people permission to act.',
 'Dan Wieden needed one line to unify every Nike athlete.

Runners. Tennis players. Basketball legends. Weekend warriors.

He found it in three words: Just Do It.

It worked because it wasn''t about shoes.

It was about that moment before every run. Every workout. Every risk.
The moment you almost didn''t.

A tagline is not a slogan.
A tagline is a permission slip.

The best ones don''t describe your brand.
They give your audience courage.

What permission does your brand give people?

#Nike #JustDoIt #Branding #Copywriting #AIR',
 '2026-03-23', 'Monday', 'standard',
 'Dramatic close-up of a single worn running shoe on a rain-wet starting line, early morning golden light breaking through fog, athletic track stretching into vanishing point, cinematic shallow depth of field, desaturated with warm highlights, determination and solitude mood'),

('The Photographer Who Made Poverty Beautiful — Then Regretted It',
 'Sebastião Salgado',
 'creative-personality',
 'Documentary photography was accused of aestheticising suffering, making it easier to look at and easier to ignore.',
 'Beauty in service of truth is not exploitation — unless it replaces action with admiration.',
 'Sebastião Salgado spent decades photographing famine, displacement, and labour in compositions so stunning they belonged in museums. Critics accused him of making suffering beautiful. But Salgado''s images did what news photography couldn''t: they made people stop scrolling. His later shift to environmental work with "Genesis" showed a creator wrestling with the ethics of his own craft. The tension between beauty and truth is not a problem to solve — it is a discipline to practice.',
 'Sebastião Salgado photographed the worst of humanity with the eye of a Renaissance painter.

Famine. Displacement. Brutal labour.

Every image: devastatingly beautiful.

Critics called it exploitation.
But his photos did what news images couldn''t — they made people stop.

The tension he embodied is the tension every creator faces:

Beauty in service of truth is not exploitation.
Unless it replaces action with admiration.

The discipline isn''t choosing between beauty and truth.
It''s refusing to let one excuse the absence of the other.

#Photography #Storytelling #Ethics #CreativeDirection #AIR',
 '2026-03-24', 'Tuesday', 'standard',
 'Dramatic black and white wide shot of vast desert landscape with single small human figure walking, dramatic cloud formations, Salgado-inspired high contrast documentary style, silver gelatin aesthetic, epic scale emphasising human smallness, atmospheric and haunting'),

('How Dove Turned a Billboard Into a Mirror',
 'Ogilvy & Mather',
 'landmark-campaign',
 'In 2004, the beauty industry spent billions telling women they weren''t enough.',
 'The most disruptive thing a brand can do in a dishonest category is tell the truth.',
 'Dove''s "Real Beauty" campaign replaced supermodels with real women. It was not revolutionary because of its production value — it was revolutionary because it was honest in an industry built on manufactured insecurity. The campaign generated $1.5B in additional sales and proved that purpose-driven advertising is not charity — it is competitive advantage. Dove understood that when an entire category lies, truth becomes the most distinctive brand position available.',
 'Every beauty brand in 2004 sold the same fantasy: you are not enough.

Dove said: actually, you are.

No supermodels. No retouching. Real women. Real skin. Real bodies.

"Real Beauty" generated $1.5 billion in sales.

Not because it was altruistic.
Because it was honest in an industry built on manufactured insecurity.

The strategic lesson is timeless:

When an entire category lies, truth is the most distinctive brand position available.

You don''t need to be brave.
You just need to be the only one not pretending.

#Dove #RealBeauty #Advertising #BrandStrategy #AIR',
 '2026-03-25', 'Wednesday', 'standard',
 'Intimate portrait-style photograph of diverse women of different ages and ethnicities laughing naturally together, soft natural daylight from a large window, warm authentic atmosphere, no makeup or styling visible, genuine and unposed, warm cream and skin tones, documentary style'),

('The Typeface That Conquered the World by Being Invisible',
 'Max Miedinger',
 'design-philosophy',
 'In the 1950s, typefaces were ornamental, expressive, and personality-driven. Reading was an act of interpretation.',
 'The most powerful design tool is one people never notice — because it never gets in the way of what matters.',
 'Max Miedinger designed Helvetica in 1957 for the Haas type foundry in Switzerland. Its genius was neutrality: it expressed nothing except clarity. Within two decades, it became the default typeface for governments, corporations, transit systems, and brands worldwide. Helvetica proved that invisibility is a form of power. By refusing to express personality, it became the canvas on which every personality could be projected.',
 'In 1957, Max Miedinger designed a typeface so neutral it expressed nothing.

That was the point.

Helvetica became the most used typeface in human history — not because it was beautiful, but because it was invisible.

It didn''t compete with the message. It carried it.

Governments chose it. Corporations adopted it. Transit systems standardised on it.

The lesson for every brand obsessed with being distinctive:

Sometimes the most powerful design choice is the one nobody notices.

Because it never got in the way of what actually matters.

#Design #Typography #Helvetica #Branding #AIR',
 '2026-03-26', 'Thursday', 'standard',
 'Clean minimalist composition of Helvetica letterforms cast as physical 3D objects on a white Swiss-design surface, precise geometric shadows, stark high-contrast lighting, architectural precision, Swiss International Style aesthetic, monochrome with subtle warmth'),

('The Spy Novelist Who Understood Brands Better Than Any Marketer',
 'John le Carré',
 'advertising-wisdom',
 'Most storytelling advice treats narrative as formula: hero, obstacle, resolution. Audiences have learned to see through it.',
 'The stories that stay with people don''t resolve neatly — they reveal a truth the audience already suspected but couldn''t articulate.',
 'John le Carré spent years in British intelligence before becoming a novelist. His stories didn''t have heroes — they had compromised people making impossible choices. His insight was that audiences don''t want to be manipulated toward a conclusion; they want to be trusted with complexity. The brands that endure are the ones that treat their audience the way le Carré treated his readers: as intelligent adults who can handle nuance.',
 'John le Carré was a spy before he was a writer.

His stories had no heroes. No villains. Just compromised people making impossible choices.

He never manipulated his readers toward a neat conclusion.
He trusted them with complexity.

That trust is what made his work unforgettable.

Most brand storytelling does the opposite — it simplifies, resolves, wraps everything in a bow.

The result? Audiences see through it in seconds.

The stories that endure don''t resolve neatly.
They reveal a truth the audience already suspected but couldn''t articulate.

Trust your audience with complexity.
They''ll trust you back.

#Storytelling #BrandStrategy #ContentStrategy #AIR',
 '2026-03-27', 'Friday', 'standard',
 'Moody photograph of a single desk in a dimly lit study, scattered papers and a typewriter, window showing rainy London street, warm desk lamp casting amber glow against cold blue exterior light, atmospheric and contemplative, noir-inspired cinematography, film grain'),

('What a Japanese Tea Room Teaches About Luxury Branding',
 'Sen no Rikyū',
 'cultural-movement',
 'In 16th century Japan, luxury meant gold, silk, and overwhelming opulence.',
 'True luxury is not excess — it is the confidence to show restraint. Scarcity of ornament creates abundance of meaning.',
 'Sen no Rikyū transformed the Japanese tea ceremony from an opulent display of wealth into a ritual of deliberate simplicity. He chose imperfect, handmade bowls over gilded porcelain. He made the entrance so small that even samurai had to bow to enter, stripping away status at the threshold. Rikyū understood that when you remove everything unnecessary, what remains becomes sacred. Every luxury brand that leans on excess could learn from a man who built an empire on a cup of tea.',
 'In 16th century Japan, Sen no Rikyū did something no luxury brand has matched since.

He made simplicity more prestigious than gold.

His tea rooms were tiny. The bowls were imperfect. The entrance forced samurai to bow — removing status at the threshold.

Nothing was ornamental. Everything meant something.

When you remove everything unnecessary, what remains becomes sacred.

Most "luxury" brands still confuse excess with value.
Rikyū proved the opposite five centuries ago:

True luxury is not what you add.
It''s having the confidence to leave it out.

#Luxury #BrandStrategy #Design #Wabi-Sabi #AIR',
 '2026-03-28', 'Saturday', 'standard',
 'Intimate photograph of a simple handmade ceramic tea bowl on a weathered wooden surface in a minimalist Japanese tea room, soft natural light through rice paper screens, wabi-sabi aesthetic, warm earth tones and natural textures, zen atmosphere, cinematic shallow depth of field')

ON CONFLICT (publish_date) DO NOTHING;
