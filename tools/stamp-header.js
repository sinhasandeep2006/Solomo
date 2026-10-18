/* Stamps the one shared announcement bar + header into every live page.
   Edit HEADER below, then run:  node tools/stamp-header.js
   It replaces everything from the announcement bar to </header>, so it is
   safe to run again. {{B}} becomes '' at the root and '../' one folder down. */
'use strict';
var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var PAGES = [
  'index.html', '404.html', 'about.html', 'cart.html', 'checkout.html', 'contact.html',
  'faq.html', 'search.html', 'shop.html', 'wishlist.html',
  'products/bedside-comfort-cube.html', 'products/curated-starter-box.html',
  'products/desk-essentials-flat-box.html', 'products/everyday-pocket-packets.html',
  'products/pure-bamboo-water-wipes.html', 'products/starter-nursery-pack.html',
  'order/failed.html', 'order/success.html', 'order/track.html',
  'policies/privacy.html', 'policies/returns.html', 'policies/shipping.html', 'policies/terms.html'
];

var IMG = 'https://lh3.googleusercontent.com/aida-public/';
var TRIO_IMG = IMG + 'AB6AXuC64BRG-KrSFDkV4nRBV-v5lwuWYS7f7iAJ63vx6rF2OONtExMgZMBI-HChmOAC4mnScEp2rcYOoHBdToo_i3nAKI3N2GCQPIrmmK-n-xRL-XHJHwBv3KUzZF2ms-N-p6T44q5voPBsUa4HwKJ_kCTtGI3AsmFAIq6m6HCWOjmsl1XaJ42RGsc0BT5yyB0qdsJEsJSnxMtNwh6cXtXL0D4kRd_gYBTuAmQkXanJHkAWoH5RKri3qZ__2yjOjJBwSqAxDA';
var NURS_IMG = IMG + 'AB6AXuBp1V6ChSgc7XLc9oLSds2wcl5Z4kDvbmRih51Ypx_Cf2pTtW-IiTt6iprbUyFYoZuYO3R0UsIPI3v3VWEQb-oxwA31zPA4z3QnXmS2dH-EFOOJFt5JlaUSeSQbdRfX3N0zBZ_ZBW2B-sbz0nAnoKJZCcFOxb5wjE2iMMk1ZzwWvuP8Ccrzlz8_tp3bPQSo2ji2AW-e77jXjoU42-dMn3bF3Jys9EtbCZLC5DdVyQ3b5QCHUeXVC0QKtVRQisbWholt_g';

var NAV = 'text-[13.5px] font-extrabold text-navy-brand whitespace-nowrap py-2 border-b-2 border-transparent hover:border-orange-brand transition-colors';
var NAV2 = 'text-xs font-semibold text-slate-body hover:text-navy-brand whitespace-nowrap py-2 transition-colors';
var MEGA_H = 'text-[13px] font-serif font-semibold uppercase tracking-wide text-orange-brand mb-4';
var MEGA_A = 'block py-1.5 text-[15px] text-navy-brand hover:text-orange-brand transition-colors';
var MOB_H = 'text-[11px] font-extrabold uppercase tracking-widest text-orange-brand mt-4 mb-2';
var MOB_A = 'block py-2 font-semibold text-navy-brand hover:text-orange-brand transition-colors';

function links(items, cls) {
  return items.map(function (i) {
    return '<li><a class="' + cls + '" href="{{B}}' + i[1] + '">' + i[0] + '</a></li>';
  }).join('\n');
}

var SHOP = [['All essentials', 'shop.html'], ['Bestsellers', 'index.html#bestsellers'], ['Bundles &amp; gifting', 'shop.html?cat=bundle'], ['Pack size guide', 'faq.html']];
var ROOM = [['Bedside', 'products/bedside-comfort-cube.html'], ['Study &amp; office', 'products/desk-essentials-flat-box.html'], ['Nursery', 'products/starter-nursery-pack.html'], ['Handbag &amp; car', 'products/everyday-pocket-packets.html']];
var FORMAT = [['Table boxes', 'shop.html?cat=table'], ['Water wipes', 'shop.html?cat=wipes'], ['Pocket packets', 'shop.html?cat=pocket'], ['Starter boxes', 'shop.html?cat=bundle']];

function megaCard(name, href, img, alt) {
  return '<a class="group/card block" href="{{B}}' + href + '">\n' +
    '<div class="aspect-[208/260] rounded-2xl overflow-hidden bg-cream-surface"><img alt="' + alt + '" class="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" loading="lazy" src="' + img + '"/></div>\n' +
    '<p class="mt-3 font-serif font-semibold text-navy-brand group-hover/card:text-orange-brand transition-colors">' + name + '</p>\n' +
    '<p class="text-xs text-slate-body mt-0.5">Shop now →</p>\n</a>';
}

var HEADER = [
'<div class="bg-navy-brand text-[#F5F2E9] text-xs font-semibold py-2.5 px-4 tracking-wide text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1">',
'<!-- CLAIM(asci): "Certified 100% Bamboo Pulp" needs a displayed certificate number or softer wording. -->',
'<span class="hidden sm:inline">✦ Certified 100% Bamboo Pulp</span>',
'<span class="opacity-40 hidden sm:inline">|</span>',
'<span>Free <span class="hidden sm:inline">Express </span>Shipping <span class="hidden sm:inline">across India on orders </span>over ₹499</span>',
'<span class="opacity-40">|</span>',
'<span class="text-orange-brand font-bold"><span class="hidden sm:inline">Use code </span>COZY10<span class="hidden sm:inline"> for</span><span class="sm:hidden"> ·</span> 10% off</span>',
'</div>',
'<!-- HEADER — stamped by tools/stamp-header.js. Edit it there, not here. -->',
'<header class="sticky top-0 z-40 bg-[#FFFDF7]/90 backdrop-blur-md border-b border-sand-border">',
'<div class="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center gap-6">',
'<a aria-label="SOLOMO ESSENTIALS home" class="shrink-0" href="{{B}}index.html">',
'<img alt="SOLOMO ESSENTIALS" class="h-16 w-auto mix-blend-multiply" height="64" src="{{B}}assets/img/logo.png" width="89"/>',
'</a>',
'<nav aria-label="Main" class="hidden lg:flex self-stretch items-center gap-5 flex-1 min-w-0">',
'<div class="flex items-center gap-5 h-full">',
'<a class="' + NAV + '" href="{{B}}index.html">Home</a>',
'<a class="' + NAV + '" href="{{B}}about.html">About</a>',
'<div class="group h-full flex items-center">',
'<a class="' + NAV + ' group-hover:border-orange-brand group-focus-within:border-orange-brand" href="{{B}}shop.html">Shop All</a>',
'<div class="absolute left-0 right-0 top-full bg-white border-y border-sand-border shadow-xl invisible opacity-0 -translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200">',
'<div class="max-w-7xl mx-auto px-10 py-10 grid grid-cols-5 gap-8">',
'<div><p class="' + MEGA_H + '">Shop</p><ul>' + links(SHOP, MEGA_A) + '</ul></div>',
'<div><p class="' + MEGA_H + '">Shop by room</p><ul>' + links(ROOM, MEGA_A) + '</ul></div>',
'<div><p class="' + MEGA_H + '">Shop by format</p><ul>' + links(FORMAT, MEGA_A) + '</ul></div>',
megaCard('Curated Starter Box', 'products/curated-starter-box.html', TRIO_IMG, 'The SOLOMO ESSENTIALS mascot trio'),
megaCard('Starter Nursery Pack', 'products/starter-nursery-pack.html', NURS_IMG, 'A SOLOMO ESSENTIALS box in a nursery'),
'</div>',
'</div>',
'</div>',
'<a class="' + NAV + '" href="{{B}}contact.html">Contact</a>',
'</div>',
'<span aria-hidden="true" class="w-px h-4 bg-sand-border shrink-0"></span>',
'<div class="flex items-center gap-4">',
'<a class="' + NAV2 + '" href="{{B}}index.html#story">Our Story</a>',
'<a class="' + NAV2 + '" href="{{B}}index.html#benefits">Why Unbleached</a>',
'</div>',
'</nav>',
'<div class="flex items-center gap-3 sm:gap-4 ml-auto shrink-0">',
'<form action="{{B}}search.html" data-search class="hidden sm:flex items-center bg-white border-2 border-sand-border rounded-full px-3.5 py-1.5 text-xs text-slate-body gap-2 focus-within:border-navy-brand transition-colors" method="get" role="search">',
'<span aria-hidden="true" class="material-symbols-outlined text-sm text-navy-muted">search</span>',
'<label class="sr-only" for="site-search">Search products</label>',
'<input autocomplete="off" class="bg-transparent border-none outline-none focus:ring-0 text-navy-brand placeholder:text-slate-body text-xs font-semibold w-28 lg:w-36" id="site-search" name="q" placeholder="Search products" type="search"/>',
'</form>',
'<a aria-label="Your wishlist" class="relative w-10 h-10 rounded-full bg-white border-2 border-sand-border hover:border-orange-brand flex items-center justify-center text-navy-brand hover:text-orange-brand transition-colors shrink-0" href="{{B}}wishlist.html">',
'<span aria-hidden="true" class="material-symbols-outlined text-xl">favorite</span>',
'<span class="hidden absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-brand text-white text-[11px] flex items-center justify-center font-extrabold" hidden id="nav-wish-count">0</span>',
'</a>',
'<button aria-controls="cart-drawer" aria-label="Open your basket" class="relative flex items-center gap-2 bg-navy-brand hover:bg-navy-muted text-white text-xs font-extrabold px-4 py-2.5 rounded-full shadow-sm transition-transform active:scale-95" onclick="openCart()" type="button">',
'<span aria-hidden="true" class="material-symbols-outlined text-base">shopping_bag</span>',
'<span class="hidden sm:inline">Basket</span>',
'<span class="w-5 h-5 rounded-full bg-orange-brand text-white text-[11px] flex items-center justify-center font-extrabold" id="nav-cart-count">0</span>',
'</button>',
'<button aria-controls="mobile-nav" aria-expanded="false" aria-label="Open menu" class="lg:hidden w-10 h-10 rounded-full bg-cream-surface border border-sand-border flex items-center justify-center text-navy-brand" id="mobile-nav-toggle" onclick="toggleMobileNav()" type="button">',
'<span aria-hidden="true" class="material-symbols-outlined text-xl" id="mobile-nav-icon">menu</span>',
'</button>',
'</div>',
'</div>',
'<nav aria-label="Mobile" class="lg:hidden border-t border-sand-border bg-cream-bg px-6 pb-6 max-h-[75vh] overflow-y-auto" hidden id="mobile-nav">',
'<p class="' + MOB_H + '">Shop</p><ul class="text-sm">' + links([['New In', 'shop.html']].concat(SHOP), MOB_A) + '</ul>',
'<p class="' + MOB_H + '">Shop by room</p><ul class="text-sm">' + links(ROOM, MOB_A) + '</ul>',
'<p class="' + MOB_H + '">Shop by format</p><ul class="text-sm">' + links(FORMAT, MOB_A) + '</ul>',
'<p class="' + MOB_H + '">More</p><ul class="text-sm">' + links([['Our Story', 'about.html'], ['Journal', 'index.html#journal'], ['Your wishlist', 'wishlist.html'], ['Track order', 'order/track.html'], ['FAQs', 'faq.html'], ['Contact &amp; Grievances', 'contact.html']], MOB_A) + '</ul>',
'<form action="{{B}}search.html" data-search class="mt-4 flex items-center bg-white border-2 border-sand-border rounded-full px-3.5 py-2 gap-2" method="get" role="search">',
'<span aria-hidden="true" class="material-symbols-outlined text-sm text-navy-muted">search</span>',
'<label class="sr-only" for="site-search-mobile">Search products</label>',
'<input autocomplete="off" class="bg-transparent border-none outline-none focus:ring-0 text-navy-brand placeholder:text-slate-body text-xs font-semibold flex-1" id="site-search-mobile" name="q" placeholder="Search products" type="search"/>',
'</form>',
'</nav>',
'</header>'
].join('\n');

var START = '<div class="bg-navy-brand text-[#F5F2E9]';
var END = '</header>';
var failed = 0;

PAGES.forEach(function (rel) {
  var file = path.join(ROOT, rel);
  var html = fs.readFileSync(file, 'utf8');
  var s = html.indexOf(START), e = html.indexOf(END);
  if (s === -1 || e === -1 || e < s) { console.error('SKIP ' + rel + ': header markers not found'); failed++; return; }
  var base = rel.indexOf('/') === -1 ? '' : '../';
  // ponytail: an old "<!-- Main Navigation ... -->" comment between the bar and <header> goes too; nothing else lives there.
  var out = html.slice(0, s) + HEADER.replace(/\{\{B\}\}/g, base) + html.slice(e + END.length);
  fs.writeFileSync(file, out);
  console.log('stamped ' + rel);
});
process.exit(failed ? 1 : 0);
