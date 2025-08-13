document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('emailid').value.trim();
  const pass = document.getElementById('password').value;
  const storedEmail = localStorage.getItem('emailid');
  const storedPass = localStorage.getItem('password');
  const msg = document.getElementById('msg');

  if (!email || !pass) {
    msg.textContent = 'Enter email & password.';
    return;
  }

  if (storedEmail && storedPass && email === storedEmail && pass === storedPass) {
    if (!localStorage.getItem('username')) {
      localStorage.setItem('username', email.split('@')[0]);
    }
    if (!localStorage.getItem('user_id')) {
      localStorage.setItem('user_id', Math.floor(Math.random() * 900000) + 10000);
    }
    msg.style.color = '#bfffe8';
    msg.textContent = 'Login successful — redirecting...';
    setTimeout(()=> window.location.href = 'homepage.html', 700);
  } else {
    msg.textContent = 'No matching account. Please register first.';
  }
});
