---
title: "Shelfie"
pn: "BS-FRG-26"
year: "2026"
lede: "A kitchen inventory app for our household. It keeps track of what's in the fridge, freezer and pantry, tells us what to eat before it goes bad, and keeps a shared shopping list."
order: 99
listed: false
specs:
  - ["Built with", "Next.js, Supabase, Vercel"]
  - ["Users", "2"]
  - ["Source", "Private"]
---

<figure class="fig" data-caption="The kitchen view. Mockup for now, real screenshots coming."><div style="display:grid;place-items:center;padding:28px;background:var(--paper-2);border:1px solid var(--ink)"><div class="phone" aria-hidden="true"><div class="phone__bar"></div><div class="phone__sec">EAT SOON</div><div class="phone__row"><span>Leftover curry</span><b>TODAY</b></div><div class="phone__row"><span>Spinach</span><b>1D</b></div><div class="phone__row"><span>Greek yogurt</span><span>3D</span></div><div class="phone__sec">FRIDGE</div><div class="phone__row"><span>Blackberries</span><span>4D</span></div><div class="phone__row"><span>Eggs</span><span>12D</span></div><div class="phone__row"><span>Oat milk</span><span>9D</span></div><div class="phone__sec">PANTRY</div><div class="phone__row"><span>Jasmine rice</span><span></span></div><div class="phone__row"><span>Chickpeas</span><span></span></div></div></div></figure>

## The kitchen

Everything is grouped by fridge, freezer and pantry, with an Eat soon section at the top for anything that expires in the next three days. Search works like asking “do we have…?” and if nothing matches, you can add it to the shopping list or the kitchen right from the search box. Tap an item to mark it used up or tossed, or to put it back on the list.

## Adding food

Type a name and hit enter, or scan a barcode. Barcodes get looked up in our own history first, then in [Open Food Facts](https://world.openfoodfacts.org). Shelfie remembers where each item lives and how long it usually lasts, so next time it fills that in for you.

## Shopping

We share one list. Check things off at the store, then tap Put away and everything moves into the kitchen with its usual spot and shelf life.

## Dinner ideas

Shelfie builds a prompt from what we have, starting with leftovers and whatever is about to go bad, and opens the share sheet so I can send it to Claude. Once we pick a recipe, I paste the reply back into Shelfie. It shows which kitchen items the recipe used so we can mark them off, and it can save the recipe too.

Recipes can also come in from a link or as pasted text. Those are parsed without any AI.

## How it's built

Next.js and React on Vercel, with Supabase for the database and sign-in. Both of our phones stay in sync, and it costs $0 a month to run. It's private to our household, so there's no public demo.
