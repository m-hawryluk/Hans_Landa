(function(){
  if (typeof ACTORS === 'undefined' || !Array.isArray(ACTORS)) return;
  // Fisher–Yates in-place shuffle
  for (let i = ACTORS.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ACTORS[i], ACTORS[j]] = [ACTORS[j], ACTORS[i]];
  }
})();