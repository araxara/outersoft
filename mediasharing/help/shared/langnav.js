/* OuterSoft help: language auto-detect + switcher. Static, works on GitHub Pages. */
(function(){
  var LANGS = ["en", "ar", "de", "el", "es", "fr", "hi", "id", "it", "ja", "ko", "pt-BR", "ru", "tr", "vi", "zh-Hans", "zh-Hant"];
  var NAMES = {"en": "English", "ar": "العربية", "de": "Deutsch", "el": "Ελληνικά", "es": "Español", "fr": "Français", "hi": "हिन्दी", "id": "Bahasa Indonesia", "it": "Italiano", "ja": "日本語", "ko": "한국어", "pt-BR": "Português (Brasil)", "ru": "Русский", "tr": "Türkçe", "vi": "Tiếng Việt", "zh-Hans": "简体中文", "zh-Hant": "繁體中文"};
  function avail(){ var m={}; LANGS.forEach(function(c){ m[c.toLowerCase()]=c; }); return m; }
  function best(){
    var m=avail();
    var w=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];
    for(var i=0;i<w.length;i++){
      var t=(w[i]||'').toLowerCase(); if(!t) continue;
      if(m[t]) return m[t];
      var p=t.split('-')[0];
      if(p==='zh'){ var tt=/hant|tw|hk|mo/.test(t)?'zh-hant':'zh-hans'; if(m[tt]) return m[tt]; }
      if(p==='nb'||p==='nn'||p==='no'){ if(m['nb']) return m['nb']; }
      if(p==='pt'){ if(m['pt-br']) return m['pt-br']; }
      if(m[p]) return m[p];
    }
    return 'en';
  }
  function choice(){ try{ return localStorage.getItem('os-help-lang'); }catch(e){ return null; } }
  function remember(c){ try{ localStorage.setItem('os-help-lang', c); }catch(e){} }
  function curFile(){ var s=location.pathname.split('/'); return s[s.length-1] || 'index.html'; }
  window.HelpNav = {
    redirect: function(){
      var o=choice(); var l=(o && LANGS.indexOf(o)>=0) ? o : best();
      var p=(new URLSearchParams(location.search)).get('p') || 'index.html';
      if(!/^[a-z0-9-]+\.html$/i.test(p)) p='index.html';
      location.replace(l + '/' + p);
    }
  };
  function inject(){
    if(document.body.hasAttribute('data-help-entry')) return;
    var rtl=(document.documentElement.getAttribute('dir')==='rtl');
    var cur=document.documentElement.lang || 'en';
    var st=document.createElement('style');
    st.textContent='.oshelp-lang{position:fixed;top:10px;'+(rtl?'left':'right')+':12px;z-index:60;'
      +'font:13px -apple-system,BlinkMacSystemFont,"Helvetica Neue",sans-serif}'
      +'.oshelp-lang select{font:inherit;padding:4px 10px;border-radius:7px;border:1px solid rgba(128,128,128,.45);'
      +'background:Canvas;color:inherit;cursor:pointer;opacity:.8;max-width:60vw}'
      +'.oshelp-lang select:hover,.oshelp-lang select:focus{opacity:1}'
      +'@media print{.oshelp-lang{display:none}}';
    document.head.appendChild(st);
    var wrap=document.createElement('div'); wrap.className='oshelp-lang';
    var sel=document.createElement('select'); sel.setAttribute('aria-label','Language / 语言');
    LANGS.slice().sort(function(a,b){ return (NAMES[a]||a).localeCompare(NAMES[b]||b); }).forEach(function(c){
      var o=document.createElement('option'); o.value=c; o.textContent=NAMES[c]||c;
      if(c===cur) o.selected=true; sel.appendChild(o);
    });
    sel.addEventListener('change', function(){ remember(sel.value); location.href='../'+sel.value+'/'+curFile(); });
    wrap.appendChild(sel); document.body.appendChild(wrap);
  }
  if(document.readyState!=='loading') inject(); else document.addEventListener('DOMContentLoaded', inject);
})();
