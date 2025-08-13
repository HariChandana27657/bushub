document.getElementById('registerForm').addEventListener('submit', function(e){
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const p = document.getElementById('password').value;
  const msg = document.getElementById('msg');
  msg.style.color = '#ffd7d7';

  if (!u || !email || p.length < 6) {
    msg.textContent = 'Please fill all fields. Password must be at least 6 characters.';
    return;
  }

  const userId = Math.floor(Date.now() / 1000) % 1000000;
  localStorage.setItem('user_id', userId);
  localStorage.setItem('username', u);
  localStorage.setItem('emailid', email);
  localStorage.setItem('password', p);

  msg.style.color = '#bfffe8';
  msg.textContent = 'Registered — redirecting to login...';

  setTimeout(()=> { window.location.href = 'login.html'; }, 900);
});
