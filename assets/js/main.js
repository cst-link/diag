// nav toggle
document.addEventListener('DOMContentLoaded', function(){
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  if(navToggle){
    navToggle.addEventListener('click', function(){ navList.classList.toggle('show'); });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        var el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        if(navList.classList && navList.classList.contains('show')) navList.classList.remove('show');
      }
    });
  });

  // form submit (AJAX) - works with Formspree
  var form = document.getElementById('leadForm');
  var msg = document.getElementById('formMsg');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response){
        if(response.ok){
          msg.textContent = 'Спасибо! Ваша заявка отправлена.';
          form.reset();
        } else {
          response.json().then(function(err){
            msg.textContent = err.error || 'Ошибка отправки. Попробуйте другой способ.';
          }).catch(function(){
            msg.textContent = 'Ошибка отправки формы.';
          });
        }
      }).catch(function(){
        msg.textContent = 'Ошибка сети.  Попробуйте позже или напишите на почту.';
      });
    });
  }
});
// --- subtle tech motion & reveal (append to main.js) ---
(function(){
  // Respect reduced motion
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;

  // Parallax gears
  var gear1 = document.querySelector('.gear-1');
  var gear2 = document.querySelector('.gear-2');

  // gentle rotation loop using requestAnimationFrame (low-cost)
  var lastTime = 0;
  var rot1 = 0;
  var rot2 = 0;
  function rotateLoop(t){
    if(!lastTime) lastTime = t;
    var dt = t - lastTime;
    lastTime = t;
    // rotate slowly: deg per second
    rot1 += (dt * 0.0042); // ~0.25deg/sec
    rot2 -= (dt * 0.006);  // opposite direction slightly faster
    if(gear1) gear1.style.transform = 'rotate(' + rot1 + 'deg)';
    if(gear2) gear2.style.transform = 'rotate(' + rot2 + 'deg)';
    requestAnimationFrame(rotateLoop);
  }
  requestAnimationFrame(rotateLoop);

  // subtle parallax by scroll - small translateY
  var lastScroll = window.scrollY;
  function onScroll(){
    var s = window.scrollY;
    var diff = s - lastScroll;
    lastScroll = s;
    // compute a small offset based on scroll position (not delta)
    var offset = Math.min(60, s * 0.02); // up to 60px
    if(gear1) gear1.style.transform = 'translateY(' + (offset * 0.15) + 'px) rotate(' + rot1 + 'deg)';
    if(gear2) gear2.style.transform = 'translateY(' + (offset * 0.28) + 'px) rotate(' + rot2 + 'deg)';
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  // Reveal on scroll - IntersectionObserver
  var rElems = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold: 0.06});
    rElems.forEach(function(el){ io.observe(el); });
  } else {
    // fallback: just show
    rElems.forEach(function(el){ el.classList.add('visible'); });
  }
})();

