/* =====================================================
  shared-scripts.js — közös kliens oldali logika
  - Header/Footer betöltés nyelv szerint (HU↔EN + fallback)
  - Nyelvváltó (URL-párok)
  - Dark mode, footer évszám, mobil navbar
===================================================== */
(function(){
  'use strict';

  /* ========== CONFIG ========== */
  // A <html lang="..."> alapján töltünk:
  var DOC_LANG = (document.documentElement.getAttribute('lang') || 'hu').slice(0,2);

  // Melyik partialt használjuk adott nyelven; ha nincs, fallback jön
  var PARTIALS = {
    header: { hu: 'header-hu.html', en: 'header-en.html', fallback: 'header.html' },
    footer: { hu: 'footer-hu.html', en: 'footer-en.html', fallback: 'footer.html' }
  };

  // HU↔EN könyvtár- és fájl-párok a nyelvváltóhoz
  var DIR_MAP = {
    'sporttudomany':'sportscience',
    'egyeni':'individual',
    'csoportos':'group',
    'sportpszichologia':'sportpsychology',
    'diagnosztika':'diagnostic',
    'coaching':'coaching',
    'csalad':'family',
    'podcast':'podcast',
    'kapcsolat':'contact',
    'kerdoiv':'questionnaire',
    'rolam':'about',
    'blog':'blog',
    'info':'info',
    'adatvedelem':'privacy'
  };
  var FILE_MAP = {
    'index.html':'index.html',
    'antropometria.html':'anthropometry.html',
    'wellness.html':'wellness.html',
    'terheles.html':'training-load.html',
    'tehetseg.html':'talent-id.html',
    'workshopok.html':'workshops.html',
    'adatvedelem.html': 'privacy.html'
  };

  /* ========== HELPERS ========== */
  function $(s, r){ return (r||document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
  function invert(obj){ var r={}; for(var k in obj) if(obj.hasOwnProperty(k)) r[obj[k]]=k; return r; }
  var DIR_MAP_REV = invert(DIR_MAP);
  var FILE_MAP_REV = invert(FILE_MAP);

  // SITE_ROOT autodetekció a script src-jéből (almappában is működik)
  var THIS_SRC = (function(){
    var ss = document.getElementsByTagName('script');
    for (var i=ss.length-1;i>=0;i--) {
      var s = ss[i].src || '';
      if (/\/static\/includes\/shared-scripts\.js(\?|#|$)/.test(s)) return s;
    }
    return '';
  })();
  var SITE_ROOT = THIS_SRC ? THIS_SRC.replace(/\/static\/includes\/shared-scripts\.js.*$/,'/') : '/';

  function onReady(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once:true });
  }

  // Könyvtárak kezelése: "/egyeni" → "/egyeni/index.html"
  function normalizePath(path){
    try{
      if(!path) return '/index.html';
      path = path.replace(/\/+/g,'/');
      if(!path.startsWith('/')) path = '/' + path;
      if (path.endsWith('/')) return path + 'index.html';
      var last = path.substring(path.lastIndexOf('/')+1);
      if (last.indexOf('.') === -1) return path + '/index.html';
      return path;
    }catch(e){ return path; }
  }
  // "/valami/index.html" → "/valami"  (nincs záró perjel)
  function denormalizePath(path){
    return path.endsWith('/index.html') ? path.slice(0, -'/index.html'.length) : path;
  }
  function splitPath(p){
    var parts = p.replace(/^\/+/, '/').split('/').filter(Boolean);
    return { dirs: parts.slice(0,-1), file: parts[parts.length-1] || 'index.html' };
  }
  function buildPath(dirs, file){
    return denormalizePath('/' + (dirs.length ? dirs.join('/') + '/' : '') + file);
  }

  // Nyelvváltó cél meghatározása
  function translatePath(path){
    var orig = normalizePath(path);
    var sp = splitPath(orig);
    var dirs = sp.dirs.slice();
    var file = sp.file;

    if (dirs.length){
      var top = dirs[0], isHU = !!DIR_MAP[top], isEN = !!DIR_MAP_REV[top];
      if (isHU){
        dirs[0] = DIR_MAP[top];
        return { href: buildPath(dirs, FILE_MAP[file] || file), targetLang:'en', sourceLang:'hu' };
      }
      if (isEN){
        dirs[0] = DIR_MAP_REV[top];
        return { href: buildPath(dirs, FILE_MAP_REV[file] || file), targetLang:'hu', sourceLang:'en' };
      }
    }
    var looksHU = /(sporttudomany|egyeni|csoportos|sportpszichologia|diagnosztika|coaching|csalad|podcast|kerdoiv|kapcsolat|rolam|hu)/.test(path) || path === '/';
    return { href: looksHU ? '/en' : '/', targetLang: looksHU ? 'en':'hu', sourceLang: looksHU ? 'hu':'en' };
  }

  function ensureHrefLangLinks(currentPath, altPath, targetLang){
    var head = document.head; if (!head) return;
    $$('.i18n-auto', head).forEach(function(n){ n.parentNode.removeChild(n); });

    var cur = denormalizePath(normalizePath(location.pathname)) + location.search + location.hash;

    var lhu = document.createElement('link'); lhu.className='i18n-auto'; lhu.rel='alternate'; lhu.hreflang='hu';
    var len = document.createElement('link'); len.className='i18n-auto'; len.rel='alternate'; len.hreflang='en';
    if (targetLang === 'en'){ lhu.href = location.origin + cur; len.href = location.origin + altPath; }
    else { lhu.href = location.origin + altPath; len.href = location.origin + cur; }
    head.appendChild(lhu); head.appendChild(len);

    var canon = document.createElement('link'); canon.className='i18n-auto'; canon.rel='canonical'; canon.href = location.href;
    head.appendChild(canon);
  }

  // Partial betöltése nyelv szerint + fallback
  function loadPartialByLang(hostId, kind, cb){
    var host = document.getElementById(hostId);
    if (!host) return Promise.resolve();

    var fileLang = PARTIALS[kind][DOC_LANG] || PARTIALS[kind].hu;
    var fileFallback = PARTIALS[kind].fallback;
    var base = SITE_ROOT + 'static/includes/';

    var candidates = [
      base + fileLang,
      base + fileFallback
    ].filter(function(v,i,a){ return a.indexOf(v)===i; });

    var i=0;
    function tryNext(){
      if (i>=candidates.length){ console.error('[shared] '+kind+' nem tölthető'); return Promise.resolve(); }
      var url = candidates[i++];
      return fetch(url, { cache:'no-cache' })
        .then(function(r){ if(!r.ok) throw new Error(r.status); return r.text(); })
        .then(function(html){ host.innerHTML = html; if (typeof cb==='function') cb(); })
        .catch(function(){ return tryNext(); });
    }
    return tryNext();
  }

  // Mobil navbar becsukása
  function closeNavbarIfOpen(){
    var nav = $('#navbarNav');
    if (nav && nav.classList.contains('show') && window.bootstrap){
      var inst = window.bootstrap.Collapse.getInstance(nav) || new window.bootstrap.Collapse(nav, {toggle:false});
      inst.hide();
    }
  }

  // Nyelvváltó beállítása
  function initLangSwitch(){
    var switches = $$('#lang-switch, [data-role="lang-switch"], .navbar-nav .nav-link[href="/en"]');
    if (!switches.length) return;

    var path = location.pathname || '/';
    var t = translatePath(path);
    var target = t.href + (location.search || '') + (location.hash || '');

    switches.forEach(function(a){
      a.href = target;
      a.textContent = (t.targetLang || 'en').toUpperCase();
      a.setAttribute('aria-label', t.targetLang==='en' ? 'Switch to English' : 'Váltás magyar nyelvre');
    });

    ensureHrefLangLinks(path, t.href, t.targetLang);
  }

  /* ========== INIT ORDER ========== */
  onReady(function(){
    // Téma visszatöltése
    var saved = localStorage.getItem('theme');
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved==='dark' || (!saved && sysDark)) document.body.classList.add('dark-mode');

    // FOOTER
    loadPartialByLang('footer-placeholder', 'footer', function(){
      var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
      initLangSwitch(); // ha a láblécben is van nyelvgomb
    });

    // HEADER
    loadPartialByLang('header-placeholder', 'header', function(){
      // Dark toggle
      var btn = $('#toggleDark');
      if (btn){
        btn.addEventListener('click', function(){
          var on = document.body.classList.toggle('dark-mode');
          localStorage.setItem('theme', on ? 'dark' : 'light');
          closeNavbarIfOpen();
        });
      }
      // Mobil zárás linkkattintásra
      $$('.navbar-nav .nav-link').forEach(function(l){ l.addEventListener('click', closeNavbarIfOpen); });
      // Aktív menüpont
      var cur = location.pathname.replace(/\/$/, '');
      $$('.navbar-nav .nav-link').forEach(function(l){
        var href = (l.getAttribute('href')||'').replace(/\/$/,'');
        if (href && (cur===href || (href==='' && cur==='/'))) l.classList.add('active');
        else l.classList.remove('active');
      });
      // Nyelvgomb
      initLangSwitch();
    });
  });
})();
