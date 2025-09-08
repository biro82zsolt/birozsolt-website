// --- 1) MYSTIC kulcsszavak (mindig lowercase!) ---
const MYSTIC_KEYS = new Set([
  // ezoterikus kulcsszavak + aliasok
  "aurahegesztes","aurawelding", "aura",
  "rontasleveletel","curseremoval","rontas","curse",
  "csakranyitas","chakrasopening","csakra","chakra",
  "negativenergia","banishnegative",
  "auratisztitas","auracleanse",
  "karmikusoldas","karmarelease","karma",
  "grabojov", "graboiov",
  "acsepp","miracledrops","bachcsepp","bachdrops", "csepp",
  "kristalyprogramozas","crystalprogramming",
  "manifestacio","manifestation",
  "angyalszamok","angelnumbers",
  "lelekutazas","soultravel"
]);

function getTypeForKey(key){
  return MYSTIC_KEYS.has(key) ? "mystic" : "game";
}

(function(){
  try {
    // --- 2) CHEATS (minden kulcs lowercase!) ---
    const CHEATS = {
      // DOOM
      iddqd: {
        hu: "Az életben nincs halhatatlanság, de a sebezhetőségünk tesz emberré.",
        en: "There is no god mode in life – our vulnerability makes us human."
      },
      idkfa: {
        hu: "Nincsenek instant fegyverkészletek, az erőfeszítés adja a fejlődést.",
        en: "No instant arsenal – growth comes from effort."
      },

      // KONAMI
      konami: {
        hu: "A Konami-kód sok extra életet adott – itt az életben csak egy van, vigyázz rá!",
        en: "The Konami code gave many extra lives – in real life you only get one, take care of it!"
      },

      // GTA
      hesoyam: {
        hu: "Nincs gyorspénz és instant erőforrás – a munka és a kitartás az igazi cheat.",
        en: "No quick cash or instant resources – persistence is the real cheat code."
      },
      rocketman: {
        hu: "A jetpackkel azonnal felszállhattál – az életben lépésről lépésre emelkedünk.",
        en: "The jetpack gave instant flight – in life we rise step by step."
      },
      aspirine: {
        hu: "Instant gyógyulás nincs – a sebek begyógyulásához idő kell.",
        en: "No instant healing – wounds in life take time to recover."
      },
      panzer: {
        hu: "Egy tankkal könnyű átgázolni – de az életben az empátia sokkal erősebb fegyver.",
        en: "A tank crushes everything – but in life, empathy is a stronger weapon."
      },

      // STARCRAFT
      blacksheepwall: {
        hu: "Nem tárul fel előre az egész pálya – a bizonytalanság a felfedezés része.",
        en: "The whole map won’t reveal itself – uncertainty is part of discovery."
      },
      showmethemoney: {
        hu: "Nem hull az öledbe minden – a siker értékét a befektetett energia adja.",
        en: "Things don’t just fall into your lap – effort gives success its value."
      },

      // AGE OF EMPIRES
      bigdaddy: {
        hu: "Egy gépfegyveres autó vicces a játékban – az életben a hatalommal felelősség jár.",
        en: "A car with a machine gun is fun in a game – in real life power comes with responsibility."
      },

      // MORTAL KOMBAT
      abacabb: {
        hu: "A titkok felfedhetik az erőt – de az életben a sötétebb oldallal is meg kell birkóznunk.",
        en: "Secrets may unlock power – but in life we must also face the darker side."
      },
      fatality: {
        hu: "A pontos sorrend számít a győzelemhez – az életben a tudatos lépések vezetnek célhoz.",
        en: "Precise sequences win the fight – in life, mindful steps lead to success."
      },

      // MARIO
      warpzone: {
        hu: "Kihagyhatjuk a szinteket egy warp zónával – de az életben a kihívásokat nem lehet átugrani.",
        en: "Warp zones let you skip levels – but in life you can’t skip the challenges."
      },
      oneup: {
        hu: "Végtelen élet jól jön a játékban – de itt egyetlen életünk van, ami értékes.",
        en: "Infinite lives help in games – but here we only get one life, and it’s precious."
      },

      // STREET FIGHTER
      hadouken: {
        hu: "Az energia akkor tör elő, ha jól irányítjuk a mozdulatainkat.",
        en: "Energy is released when we control our moves with precision."
      },

      // THE SIMS
      rosebud: {
        hu: "A pénz cheat megkönnyíti a játékot – de az élet értékét nem a Simoleon adja.",
        en: "Money cheats make The Sims easy – but real life’s value isn’t measured in Simoleons."
      },

      // DIABLO II
      players8: {
        hu: "Néha mi magunk tesszük nehezebbé az utat – és ezzel erősebbé válunk.",
        en: "Sometimes we make the game harder for ourselves – and by that we grow stronger."
      },

      // TEXT ADVENTURE
      xyzzy: {
        hu: "A varázsszavak játékban működnek – az életben a cselekvés a kulcs.",
        en: "Magic words work in games – in life action is the real magic."
      },

      // --- EZOTERIKUS “CHEAT CODES” + aliasok (mind lowercase) ---
      aurahegesztes: {
        hu: "Az aurahegesztés jól hangzik, de a lelki egészséghez szakmai támogatásra van szükség.",
        en: "Aura welding sounds mystical, but real mental health needs professional support."
      },
      aurawelding: {
        hu: "Az aurahegesztés jól hangzik, de a lelki egészséghez szakmai támogatásra van szükség.",
        en: "Aura welding sounds mystical, but real mental health needs professional support."
      },
      // rövid aliasok
      aura: {
        hu: "Az aurahegesztés jól hangzik, de a lelki egészséghez szakmai támogatásra van szükség.",
        en: "Aura welding sounds mystical, but real mental health needs professional support."
      },

      rontasleveletel: {
        hu: "A rontáslevétel nem tudomány – a bizonyítékokon alapuló pszichológia viszont segíthet.",
        en: "Curse removal isn’t science – but evidence-based psychology can help."
      },
      curseremoval: {
        hu: "A rontáslevétel nem tudomány – a bizonyítékokon alapuló pszichológia viszont segíthet.",
        en: "Curse removal isn’t science – but evidence-based psychology can help."
      },
      rontas: {
        hu: "A rontáslevétel nem tudomány – a bizonyítékokon alapuló pszichológia viszont segíthet.",
        en: "Curse removal isn’t science – but evidence-based psychology can help."
      },
      curse: {
        hu: "A rontáslevétel nem tudomány – a bizonyítékokon alapuló pszichológia viszont segíthet.",
        en: "Curse removal isn’t science – but evidence-based psychology can help."
      },

      csakranyitas: {
        hu: "A csakranyitás szép metafora, de az önismerethez valódi munka kell.",
        en: "Opening chakras is a nice metaphor, but real self-knowledge takes work."
      },
      chakrasopening: {
        hu: "A csakranyitás szép metafora, de az önismerethez valódi munka kell.",
        en: "Opening chakras is a nice metaphor, but real self-knowledge takes work."
      },
      csakra: {
        hu: "A csakranyitás szép metafora, de az önismerethez valódi munka kell.",
        en: "Opening chakras is a nice metaphor, but real self-knowledge takes work."
      },
      chakra: {
        hu: "A csakranyitás szép metafora, de az önismerethez valódi munka kell.",
        en: "Opening chakras is a nice metaphor, but real self-knowledge takes work."
      },

      negativenergia: {
        hu: "A negatív energiákat nem mágikus trükk űzi el – hanem a tudatos gondolkodás.",
        en: "Negative energies aren’t banished by tricks – but by mindful thinking."
      },
      banishnegative: {
        hu: "A negatív energiákat nem mágikus trükk űzi el – hanem a tudatos gondolkodás.",
        en: "Negative energies aren’t banished by tricks – but by mindful thinking."
      },

      auratisztitas: {
        hu: "Nem tisztító varázslat ad erőt – hanem a saját döntéseink és cselekedeteink.",
        en: "No cleansing ritual gives you strength – it’s your choices and actions that do."
      },
      auracleanse: {
        hu: "Nem tisztító varázslat ad erőt – hanem a saját döntéseink és cselekedeteink.",
        en: "No cleansing ritual gives you strength – it’s your choices and actions that do."
      },

      karmikusoldas: {
        hu: "A karmát nem lehet egy varázsszóval feloldani – a múlt terheit a feldolgozás és az elfogadás könnyíti meg.",
        en: "Karma can’t be erased with a magic word – healing the past comes through processing and acceptance."
      },
      karmarelease: {
        hu: "A karmát nem lehet egy varázsszóval feloldani – a múlt terheit a feldolgozás és az elfogadás könnyíti meg.",
        en: "Karma can’t be erased with a magic word – healing the past comes through processing and acceptance."
      },
      karma: {
        hu: "A karmát nem lehet egy varázsszóval feloldani – a múlt terheit a feldolgozás és az elfogadás könnyíti meg.",
        en: "Karma can’t be erased with a magic word – healing the past comes through processing and acceptance."
      },

      grabojov: {
        hu: "A Grabojov-számok nem varázskódok – a változást nem a számok, hanem a cselekedeteink hozzák el.",
        en: "Graboiov numbers aren’t magic codes – real change comes from our actions, not from numbers."
      },

      csepp: {
        hu: "A csodacseppek nem oldják meg helyettünk a problémákat – a változás a tudatos döntéseinkből fakad.",
        en: "Miracle drops won’t solve our problems – change comes from conscious choices."
      },
      miracledrops: {
        hu: "A csodacseppek nem oldják meg helyettünk a problémákat – a változás a tudatos döntéseinkből fakad.",
        en: "Miracle drops won’t solve our problems – change comes from conscious choices."
      },
      bachcsepp: {
        hu: "A csodacseppek nem oldják meg helyettünk a problémákat – a változás a tudatos döntéseinkből fakad.",
        en: "Miracle drops won’t solve our problems – change comes from conscious choices."
      },
      bachdrops: {
        hu: "A csodacseppek nem oldják meg helyettünk a problémákat – a változás a tudatos döntéseinkből fakad.",
        en: "Miracle drops won’t solve our problems – change comes from conscious choices."
      },

      kristalyprogramozas: {
        hu: "A kristályok szépek, de a fejlődést nem a kövek, hanem a belső munkánk hozza.",
        en: "Crystals are beautiful, but growth doesn’t come from stones – it comes from inner work."
      },
      crystalprogramming: {
        hu: "Crystals are beautiful, but growth doesn’t come from stones – it comes from inner work.",
        en: "Crystals are beautiful, but growth doesn’t come from stones – it comes from inner work."
      },

      manifestacio: {
        hu: "A vágyak leírása önmagában kevés – a tettek viszik előre az életünket.",
        en: "Writing down wishes isn’t enough – actions are what move our life forward."
      },
      manifestation: {
        hu: "Writing down wishes isn’t enough – actions are what move our life forward.",
        en: "Writing down wishes isn’t enough – actions are what move our life forward."
      },

      angyalszamok: {
        hu: "Az ismétlődő számok megnyugtatóak lehetnek, de az irányt a döntéseink adják.",
        en: "Repeating numbers may feel comforting, but our direction comes from our decisions."
      },
      angelnumbers: {
        hu: "Repeating numbers may feel comforting, but our direction comes from our decisions.",
        en: "Repeating numbers may feel comforting, but our direction comes from our decisions."
      },

      lelekutazas: {
        hu: "Nem kell kilépni a testből – a belső utazás az önismeretben kezdődik.",
        en: "You don’t need to leave your body – the true journey is through self-knowledge."
      },
      soultravel: {
        hu: "You don’t need to leave your body – the true journey is through self-knowledge.",
        en: "You don’t need to leave your body – the true journey is through self-knowledge."
      }
    };

    // --- 3) Billentyűfigyelés (globális) ---
    let buffer = "";

    window.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;

      buffer += (e.key || "").toLowerCase();
      buffer = buffer.slice(-24); // nagyobb puffer

      for (const code in CHEATS) {
        if (buffer.includes(code)) {
          showEasterEgg(code);
          buffer = "";
          break;
        }
      }
    });

    function getLocale(){
      const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
      if (htmlLang.startsWith("hu")) return "hu";
      if (htmlLang.startsWith("en")) return "en";
      const nav = (navigator.language || "").toLowerCase();
      return nav.startsWith("hu") ? "hu" : "en";
    }

    // --- 4) Popup (ikon + típus szerinti akcentus) ---
    function showEasterEgg(code){
      const locale = getLocale();
      const entry = CHEATS[code];
      const text = entry ? (entry[locale] || entry.en) : "…";
      const t = getTypeForKey(code); // "mystic" | "game"
      const icon = t === "mystic" ? "🔮" : "🎮";
      const titleHu = t === "mystic" ? "Misztikus kód" : "Cheat code";
      const titleEn = t === "mystic" ? "Mystic code"   : "Cheat code";
      const title = locale === "hu" ? titleHu : titleEn;

      const overlay = document.createElement("div");
      overlay.className = "easteregg-overlay";

      const dialog = document.createElement("div");
      dialog.className = "easteregg-popup " + (t === "mystic" ? "ee--mystic" : "ee--game");
      dialog.setAttribute("role","dialog");
      dialog.setAttribute("aria-modal","true");
      dialog.setAttribute("tabindex","-1");

      const h2 = document.createElement("h2");
      h2.className = "easteregg-title";
      h2.appendChild(document.createTextNode(`${icon} ${title}: ${code.toUpperCase()}`));

      const p = document.createElement("p");
      p.className = "easteregg-text";
      p.appendChild(document.createTextNode(text));

      const actions = document.createElement("div");
      actions.className = "easteregg-actions";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "easteregg-btn";
      btn.appendChild(document.createTextNode(locale === "hu" ? "Oké" : "Okay"));
      actions.appendChild(btn);

      dialog.appendChild(h2);
      dialog.appendChild(p);
      dialog.appendChild(actions);
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      function close(){ document.body.style.overflow = prevOverflow; overlay.remove(); }
      btn.addEventListener("click", close);
      overlay.addEventListener("click", (e)=>{ if(e.target===overlay) close(); });
      window.addEventListener("keydown", function onEsc(e){
        if(e.key==="Escape"){ close(); window.removeEventListener("keydown", onEsc); }
      }, { once:true });

      setTimeout(()=>dialog.focus(), 0);
    }
  } catch (err) {
    console.warn("Easter egg error:", err);
  }
})();
