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

