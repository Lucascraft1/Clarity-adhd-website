#!/usr/bin/env python3
"""Apply the accessibility and readability treatment to site pages. Safe to re-run.

Usage: python3 tools/a11y_apply.py [file ...]   (no args = every page)
Use it on new blog posts before merging. It:
  * replaces online booking links with the text or email consult CTA, and tracks sms/tel/mailto clicks as contact_click
  * raises small font sizes (body 16 to 17px, fine print 14px, uppercase labels 12px)
  * swaps low-contrast text colors for WCAG AA versions
  * links /a11y.css, adds the skip link, the <main> landmark and the phone Book button
  * on blog posts, adds "On this page" jump links built from the h2 headings
Write any Short answer box by hand; this script never writes summaries.
"""
import re, glob, sys, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
files = sys.argv[1:] or (['index.html'] + sorted(glob.glob('public/*.html')) + sorted(glob.glob('public/blog/*.html')))
files = [f for f in files if 'googlebc' not in f]
OLD = 'href="https://lucas-craft.clientsecure.me"'
NEW = 'href="https://lucas-craft.clientsecure.me/request/service"'

def map_size(v, upper):
    if v <= 0: return v
    if v < 14: return max(v, 12) if upper else 14
    if v in (14.5, 15): return 16
    if v == 15.5: return 16.5
    return v
def fmt(v): return ('%g' % v) + 'px'
def fix_decls(decls):
    upper = re.search(r'text-transform:\s*uppercase', decls) is not None
    def fs(m):
        v = float(m.group(2)); nv = map_size(v, upper)
        return m.group(1) + fmt(nv)
    decls = re.sub(r'(font-size:\s*)(\d+(?:\.\d+)?)px', fs, decls)
    # low-alpha white text on dark panels -> 0.75 (only color: decl, not background/border)
    def col(m):
        a = float(m.group(2))
        return m.group(1) + ('rgba(255,255,255,0.75)' if 0.3 <= a < 0.75 else m.group(0)[len(m.group(1)):])
    decls = re.sub(r'((?<![-\w])color:\s*)rgba\(255,\s*255,\s*255,\s*(0?\.\d+)\)', col, decls)
    decls = re.sub(r'((?<![-\w])color:\s*)#7a8a7b', r'\1#5a665b', decls, flags=re.I)
    decls = re.sub(r'((?<![-\w])color:\s*)#b86a49', r'\1#7f4329', decls, flags=re.I)
    return decls
def fix_css(css):
    return re.sub(r'\{([^{}]*)\}', lambda m: '{' + fix_decls(m.group(1)) + '}', css)

MOBILE = '  <a href="https://lucas-craft.clientsecure.me/request/service" target="_blank" rel="noopener" class="nav-cta nav-cta-mobile" style="color:#ffffff !important;">Book consult</a>\n'
for f in files:
    s = open(f, encoding='utf-8').read(); o = s
    s = s.replace(OLD, NEW)
    # style blocks (skip font-face block: harmless anyway)
    s = re.sub(r'(<style>)(.*?)(</style>)', lambda m: m.group(1) + fix_css(m.group(2)) + m.group(3), s, flags=re.S)
    # inline style attributes
    s = re.sub(r'style="([^"]*)"', lambda m: 'style="' + fix_decls(m.group(1)) + '"', s)
    # shared stylesheet
    if '/a11y.css' not in s:
        s = s.replace('</head>', '<link rel="stylesheet" href="/a11y.css">\n</head>', 1)
    # skip link
    if 'class="skip-link"' not in s:
        s = s.replace('<body>\n', '<body>\n<a class="skip-link" href="#main">Skip to content</a>\n', 1)
    # mobile CTA on inner pages
    if 'nav-cta-mobile' not in s:
        s = re.sub(r'(  </div>\n)(  <button class="nav-toggle")', lambda m: m.group(1) + MOBILE + m.group(2), s, count=1)
        assert 'nav-cta-mobile' in s, f
    # main landmark
    if '<main' not in s:
        i = s.index("document.getElementById('navToggle').classList.remove('open');")
        j = s.index('</script>', i) + len('</script>')
        s = s[:j] + '\n<main id="main" tabindex="-1">' + s[j:]
        k = s.index('<div class="footer-info">')
        s = s[:k] + '</main>\n\n' + s[k:]
    if s != o:
        open(f, 'w', encoding='utf-8').write(s)


# ---- jump links ----
def slug(t):
    t = html.unescape(re.sub(r'<[^>]+>', '', t)).lower()
    t = re.sub(r"[’'\"]", '', t); t = re.sub(r'[^a-z0-9]+', '-', t).strip('-')
    return t[:60].rstrip('-')
def apply(f):
    s = open(f, encoding='utf-8').read()
    if 'class="jump-links"' in s: return False
    # wrap an existing Quick answer paragraph in the answer box style (text unchanged)
    s = re.sub(r'\n<p><strong>Quick answer:</strong>(.*?)</p>\n',
               lambda m: '\n<div class="answer-box answer-quick"><p><strong>Quick answer:</strong>' + m.group(1) + '</p></div>\n', s, count=1, flags=re.S)
    body_start = s.index('<div class="post-body"'); body_end = s.index('</main>')
    body = s[body_start:body_end]
    used = set(re.findall(r'id="([^"]+)"', s)); items = []
    def h2(m):
        attrs, txt = m.group(1), m.group(2)
        idm = re.search(r'id="([^"]+)"', attrs)
        if idm: hid = idm.group(1)
        else:
            hid = base = slug(txt); k = 2
            while hid in used: hid = f'{base}-{k}'; k += 1
            used.add(hid); attrs = attrs + f' id="{hid}"'
        items.append((hid, txt.strip()))
        return f'<h2{attrs}>{txt}</h2>'
    body = re.sub(r'<h2([^>]*)>(.*?)</h2>', h2, body, flags=re.S)
    if len(items) < 3: return False
    nav = '<div class="jump-links" role="navigation" aria-label="On this page">\n  <p class="ab-title">On this page</p>\n  <ol>\n' + ''.join(
        f'    <li><a href="#{i}">{re.sub(r"<[^>]+>", "", t)}</a></li>\n' for i, t in items) + '  </ol>\n</div>\n'
    if 'class="answer-box' in body:
        a = body.index('class="answer-box'); a = body.index('</div>\n', body.index('</p>', a) if 'answer-quick' in body[a:a+40] else body.index('</ul>', a)) + len('</div>\n')
    else:
        a = body.index('class="back-link"'); a = body.index('\n', a) + 1
    body = body[:a] + nav + body[a:]
    s = s[:body_start] + body + s[body_end:]
    open(f, 'w', encoding='utf-8').write(s); return True
for f in files:
    if f.startswith('public/blog/') or f == 'public/adult-adhd.html':
        apply(f)
print('done', len(files), 'files')

# ---- text or email consult CTA (no online booking links) ----
PHONE_SMS = 'sms:+13604537663'
EMAIL = 'lucas@clarityadhdwa.com'
CTA = ('Text or email to set up your free 15-minute consult: '
       '<a href="sms:+13604537663" class="cta-sms">360-453-7663</a> <span aria-hidden="true">|</span> '
       '<a href="mailto:lucas@clarityadhdwa.com" class="cta-email">lucas@clarityadhdwa.com</a>')
PRIVACY = "Please don't include health details in texts or emails; we'll talk about those during the consult."
BOOK = r'<a href="https://lucas-craft\.clientsecure\.me[^"]*"[^>]*>'
NAV_CONTACT = ('<span class="nav-contact"><a href="sms:+13604537663" class="nav-contact-num">Text 360-453-7663</a>'
               '<a href="mailto:lucas@clarityadhdwa.com" class="nav-contact-email">lucas@clarityadhdwa.com</a></span>')
ANALYTICS_OLD_START = '  function bookClick(a){'
ANALYTICS_NEW = '''  document.addEventListener("click", function(e){
    if (!e.target || !e.target.closest) return;
    var c = e.target.closest('a[href^="sms:"], a[href^="tel:"], a[href^="mailto:"]');
    if (!c) return;
    var h = c.getAttribute("href");
    ev("contact_click", {
      page_path: location.pathname,
      method: h.indexOf("sms:") === 0 ? "text" : (h.indexOf("tel:") === 0 ? "phone" : "email"),
      link_text: (c.textContent || "").trim().slice(0, 60),
      cta_location: ((c.className || "inline") + (c.parentElement && c.parentElement.className ? " in " + c.parentElement.className : "")).slice(0, 80)
    });
  }, true);
'''
def consult_cta(s):
    # header: desktop shows number and email, phones get a Text to book button
    s = re.sub(BOOK + r'Book Consultation</a>', NAV_CONTACT, s)
    s = re.sub(r'<a href="https://lucas-craft\.clientsecure\.me[^"]*"[^>]*class="nav-cta nav-cta-mobile"[^>]*>[^<]*</a>',
               '<a href="sms:+13604537663" class="nav-cta nav-cta-mobile" style="color:#ffffff !important;">Text to book</a>', s)
    # footer button
    s = re.sub(BOOK + r'Book Now</a>', '<p class="footer-cta">' + CTA + '</p>', s)
    # cta-box buttons
    s = re.sub(r'\n(\s*)' + BOOK + r'Book (?:a|a Free) (?:Consultation|15-Minute Consultation)</a>',
               lambda m: '\n' + m.group(1) + '<p class="consult-cta">' + CTA + '</p>\n' + m.group(1) + '<p class="consult-privacy">' + PRIVACY + '</p>', s)
    s = s.replace('<p>Ready to get started? Book a consultation through our secure patient portal. Questions first? <a href="/contact">Contact us</a>.</p>',
                  '<p>Ready to get started? The first step is a short, free video call with me. Questions first? <a href="/contact">Contact us</a>.</p>')
    s = s.replace('<p>Ready to get started? Book a consultation through our secure patient portal.</p>',
                  '<p>Ready to get started? The first step is a short, free video call with me.</p>')
    # inline blog CTAs
    s = re.sub(r'(?:: | or |\. )' + BOOK + r'Book a free consult</a>', '. ' + CTA, s)
    # footer info text sits inside a labelled landmark (axe region rule)
    s = s.replace('<div class="footer-info">', '<div class="footer-info" role="region" aria-label="Site information">')
    # analytics: contact clicks replace book_click
    if ANALYTICS_OLD_START in s:
        a = s.index(ANALYTICS_OLD_START); b = s.index('  if ("IntersectionObserver"', a)
        s = s[:a] + ANALYTICS_NEW + s[b:]
    return s
for f in files:
    s = open(f, encoding='utf-8').read(); n = consult_cta(s)
    if n != s: open(f, 'w', encoding='utf-8').write(n)
