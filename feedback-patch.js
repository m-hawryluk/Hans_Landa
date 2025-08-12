(function(){
  // Create top toast (never covers the name)
  var toast = document.createElement('div');
  toast.id = 'feedback-toast';
  toast.setAttribute('aria-live','polite');
  toast.style.position = 'fixed';
  toast.style.top = '10px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.padding = '10px 16px';
  toast.style.borderRadius = '999px';
  toast.style.fontWeight = '900';
  toast.style.background = '#fff';
  toast.style.boxShadow = '0 8px 24px rgba(0,0,0,.15)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity .2s ease';
  toast.style.zIndex = '9999';
  toast.style.pointerEvents = 'none';
  document.addEventListener('DOMContentLoaded', function(){
    document.body.appendChild(toast);
  });

  function showToast(text, ok){
    toast.textContent = text;
    toast.style.color = ok ? '#0a8a29' : '#c20d28';
    toast.style.border = '2px solid ' + (ok ? '#0a8a29' : '#c20d28');
    toast.style.opacity = '1';
    setTimeout(function(){ toast.style.opacity = '0'; }, 800);
  }

  // Soft highlight around the card for a moment
  function ring(ok){
    var card = document.getElementById('card');
    if (!card) return;
    var prev = card.style.boxShadow || '';
    card.style.boxShadow = (ok
      ? '0 0 0 4px rgba(10,138,41,.35), 0 12px 40px rgba(0,0,0,.18)'
      : '0 0 0 4px rgba(194,13,40,.35), 0 12px 40px rgba(0,0,0,.18)');
    setTimeout(function(){ card.style.boxShadow = prev; }, 400);
  }

  // Wrap guess() if it exists so we can provide clear feedback
  function wrapGuess(){
    if (typeof window.guess !== 'function') return;
    var original = window.guess;
    window.guess = function(isJewish){
      // Determine correctness BEFORE the UI changes
      var ok = false;
      try {
        if (typeof ACTORS !== 'undefined' && Array.isArray(ACTORS) && typeof idx !== 'undefined') {
          ok = !!(ACTORS[idx] && ACTORS[idx].jewish === !!isJewish);
        }
      } catch(e){}

      // Show feedback right away
      showToast(ok ? 'CORRECT' : 'WRONG', ok);
      ring(ok);
      if (!ok && navigator.vibrate) { try { navigator.vibrate(60); } catch(e){} }

      // Call the original logic (keeps your score, name reveal, next(), etc.)
      return original.apply(this, arguments);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wrapGuess);
  } else {
    wrapGuess();
  }
})();