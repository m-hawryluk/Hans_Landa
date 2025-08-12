// === Swipe Quiz — Desktop & Mobile ===
// Swipe RIGHT if Jewish, LEFT if not

const ACTORS = [
  { img: "actors/bob dylan.jpg", name: "Bob Dylan", realName: "Robert Allen Zimmerman", jewish: true },
  { img: "actors/woody allen.jpg", name: "Woody Allen", realName: "Allan Stewart Konigsberg", jewish: true },
  { img: "actors/david duchovny.jpg", name: "David Duchovny", realName: "David William Duchovny", jewish: true },
  { img: "actors/natalie portman.jpg", name: "Natalie Portman", realName: "Neta-Lee Hershlag", jewish: true },
  { img: "actors/gene simmons.jpeg", name: "Gene Simmons", realName: "Chaim Witz", jewish: true },
  { img: "actors/kirk douglas.jpg", name: "Kirk Douglas", realName: "Issur Danielovitch", jewish: true },
  { img: "actors/adam sandler.jpg", name: "Adam Sandler", realName: "Adam Richard Sandler", jewish: true },
  { img: "actors/scarlett johansson.jpg", name: "Scarlett Johansson", realName: "Scarlett Ingrid Johansson", jewish: true },
  { img: "actors/seth rogen.jpg", name: "Seth Rogen", realName: "Seth Aaron Rogen", jewish: true },
  { img: "actors/jake gyllenhaal.jpg", name: "Jake Gyllenhaal", realName: "Jacob Benjamin Gyllenhaal", jewish: true },
  { img: "actors/mila kunis.jpg", name: "Mila Kunis", realName: "Milena Markovna Kunis", jewish: true },
  { img: "actors/james franco.jpg", name: "James Franco", realName: "James Edward Franco", jewish: true },
  { img: "actors/gal gadot.jpg", name: "Gal Gadot", realName: "Gal Gadot", jewish: true },
  { img: "actors/ben stiller.jpg", name: "Ben Stiller", realName: "Benjamin Edward Stiller", jewish: true },
  { img: "actors/paul rudd.jpg", name: "Paul Rudd", realName: "Paul Stephen Rudd", jewish: true },
  { img: "actors/jonah hill.jpg", name: "Jonah Hill", realName: "Jonah Hill Feldstein", jewish: true },
  { img: "actors/sarah silverman.jpg", name: "Sarah Silverman", realName: "Sarah Kate Silverman", jewish: true },
  { img: "actors/dustin hoffman.jpg", name: "Dustin Hoffman", realName: "Dustin Lee Hoffman", jewish: true },
  { img: "actors/jerry seinfeld.jpg", name: "Jerry Seinfeld", realName: "Jerome Allen Seinfeld", jewish: true },
  { img: "actors/adrien brody.jpg", name: "Adrien Brody", realName: "Adrien Nicholas Brody", jewish: true },
  { img: "actors/jeff goldblum.jpg", name: "Jeff Goldblum", realName: "Jeffrey Lynn Goldblum", jewish: true },
  { img: "actors/winona ryder.jpg", name: "Winona Ryder", realName: "Winona Laura Horowitz", jewish: true },
  { img: "actors/zac efron.jpg", name: "Zac Efron", realName: "Zachary David Alexander Efron", jewish: true },
  { img: "actors/barbra streisand.jpg", name: "Barbra Streisand", realName: "Barbra Joan Streisand", jewish: true },
  { img: "actors/shia labeouf.jpg", name: "Shia LaBeouf", realName: "Shia Saide LaBeouf", jewish: true },
  { img: "actors/mel gibson.jpeg", name: "Mel Gibson", realName: "Mel Columcille Gerard Gibson", jewish: false },
  { img: "actors/leonardo dicaprio.jpg", name: "Leonardo DiCaprio", realName: "Leonardo Wilhelm DiCaprio", jewish: false },
  { img: "actors/tom cruise.jpg", name: "Tom Cruise", realName: "Thomas Cruise Mapother IV", jewish: false },
  { img: "actors/denzel washington.jpg", name: "Denzel Washington", realName: "Denzel Hayes Washington Jr.", jewish: false },
  { img: "actors/brad pitt.jpg", name: "Brad Pitt", realName: "William Bradley Pitt", jewish: false },
  { img: "actors/keanu reeves.jpg", name: "Keanu Reeves", realName: "Keanu Charles Reeves", jewish: false },
  { img: "actors/johnny depp.jpg", name: "Johnny Depp", realName: "John Christopher Depp II", jewish: false },
  { img: "actors/robert de niro.jpg", name: "Robert De Niro", realName: "Robert Anthony De Niro Jr.", jewish: false },
  { img: "actors/christian bale.jpg", name: "Christian Bale", realName: "Christian Charles Philip Bale", jewish: false },
  { img: "actors/matt damon.jpg", name: "Matt Damon", realName: "Matthew Paige Damon", jewish: false },
  { img: "actors/hugh jackman.jpg", name: "Hugh Jackman", realName: "Hugh Michael Jackman", jewish: false }
];

let idx = 0;
  prepareOrder();
  prepareOrder();
let score = 0;

const el = {
  title: document.getElementById("title-screen"),
  start: document.getElementById("start-btn"),
  game: document.getElementById("game-screen"),
  card: document.getElementById("card"),
  photo: document.getElementById("photo"),
  name: document.getElementById("name"),
  score: document.getElementById("score"),
  reveal: document.getElementById("reveal"),
  btnLeft: document.getElementById("btn-left"),
  btnRight: document.getElementById("btn-right"),
  badgeLeft: document.querySelector(".badge.left"),
  badgeRight: document.querySelector(".badge.right"),
};

// Add feedback toasts at top of page
(function addToasts(){
  const wrap = document.createElement('div');
  wrap.className = 'toast-container';
  const ok = document.createElement('div');
  ok.className = 'toast ok';
  ok.textContent = 'CORRECT';
  const no = document.createElement('div');
  no.className = 'toast no';
  no.textContent = 'WRONG';
  wrap.appendChild(ok);
  wrap.appendChild(no);
  document.body.appendChild(wrap);
  el.toastOk = ok;
  el.toastNo = no;
})();

function show(actor){
  el.photo.src = actor.img;
  el.name.textContent = actor.name;
}


function shuffleActors(){
  for(let i = ACTORS.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [ACTORS[i], ACTORS[j]] = [ACTORS[j], ACTORS[i]];
  }
}

let order = [];
function prepareOrder(){
  order = Array.from({length: ACTORS.length}, (_, i) => i);
  shuffleActors();
}


function next(){
  if(!__order || __order.length === 0){
    prepareOrder();
  }
  idx = __order.pop();
  show(ACTORS[idx]);
}



function start(){
  el.title.classList.add("hidden");
  el.game.classList.remove("hidden");
  idx = 0;
  prepareOrder();
  score = 0;
  el.score.textContent = 'Score: ' + score;
  show(ACTORS[idx]);
}

function flash(node){
  node.classList.remove('show');
  void node.offsetWidth;
  node.classList.add('show');
}

function guess(isJewish){
  const actor = ACTORS[idx];
  const correct = actor.jewish === isJewish;

  const badge = isJewish ? el.badgeRight : el.badgeLeft;
  badge.style.opacity = 1;
  setTimeout(()=> (badge.style.opacity = 0), 220);

  if (correct){
    score += 1;
    el.score.textContent = 'Score: ' + score;
    el.reveal.textContent = actor.realName;
    el.reveal.classList.remove("hidden");
    flash(el.toastOk);
    setTimeout(()=>{
      el.reveal.classList.add("hidden");
      next();
    }, 1000);
  } else {
    if (navigator.vibrate) navigator.vibrate(60);
    flash(el.toastNo);
    el.card.classList.add("swipe");
    el.card.style.transform = "translateX(" + (isJewish ? 60 : -60) + "px) rotate(" + (isJewish ? 8 : -8) + "deg)";
    setTimeout(()=>{
      el.card.style.transform = "";
      el.card.classList.remove("swipe");
      next();
    }, 240);
  }
}

// Controls for desktop & mobile
function enableControls(){
  // Buttons
  el.btnLeft.addEventListener("click", ()=>guess(false));
  el.btnRight.addEventListener("click", ()=>guess(true));

  // Keyboard
  window.addEventListener("keydown", (e)=>{
    if (e.key === "ArrowLeft") guess(false);
    if (e.key === "ArrowRight") guess(true);
  });

  // Touch + Mouse drag
  let startX = null;
  let dragging = false;
  const threshold = 56;

  function dragMove(dx){
    const rot = Math.max(-14, Math.min(14, dx/10));
    el.card.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;
    const t = Math.min(1, Math.abs(dx)/120);
    el.badgeRight.style.opacity = dx>0 ? t : 0;
    el.badgeLeft.style.opacity = dx<0 ? t : 0;
  }

  function endSwipe(dx){
    dragging = false;
    el.card.classList.add("swipe");
    el.badgeLeft.style.opacity = 0;
    el.badgeRight.style.opacity = 0;
    if (dx > threshold) {
      el.card.style.transform = "translateX(140%) rotate(14deg)";
      setTimeout(()=>{ el.card.classList.remove("swipe"); el.card.style.transform=''; guess(true); }, 60);
    } else if (dx < -threshold) {
      el.card.style.transform = "translateX(-140%) rotate(-14deg)";
      setTimeout(()=>{ el.card.classList.remove("swipe"); el.card.style.transform=''; guess(false); }, 60);
    } else {
      el.card.style.transform = "";
      setTimeout(()=> el.card.classList.remove("swipe"), 160);
    }
  }

  // Touch
  el.card.addEventListener("touchstart", (e)=>{
    startX = e.changedTouches[0].clientX;
    dragging = true;
  }, {passive:true});

  el.card.addEventListener("touchmove", (e)=>{
    if (!dragging) return;
    const dx = e.changedTouches[0].clientX - startX;
    dragMove(dx);
  }, {passive:true});

  el.card.addEventListener("touchend", (e)=>{
    if (!dragging) return;
    const dx = e.changedTouches[0].clientX - startX;
    endSwipe(dx);
    startX = null;
  });

  // Mouse
  el.card.addEventListener("mousedown", (e)=>{
    startX = e.clientX;
    dragging = true;
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e)=>{
    if (!dragging) return;
    const dx = e.clientX - startX;
    dragMove(dx);
  });

  window.addEventListener("mouseup", (e)=>{
    if (!dragging) return;
    const dx = e.clientX - startX;
    endSwipe(dx);
    startX = null;
  });
}

el.start.addEventListener("click", start);
enableControls();
