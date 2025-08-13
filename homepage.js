// Load profile into table and username
const userId = localStorage.getItem('user_id') || '';
const username = localStorage.getItem('username') || '';
const email = localStorage.getItem('emailid') || '';

document.getElementById('userTable').innerHTML = `
  <tr>
    <td>${userId || '-'}</td>
    <td>${username || '-'}</td>
    <td>${email || '-'}</td>
  </tr>
`;

document.getElementById('usernameDisplay').textContent = username || 'Guest';

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'login.html';
});

// Create bus pass
const formMsg = document.getElementById('formMsg');
document.getElementById('busPassForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!userId) {
    formMsg.textContent = 'You are not logged in.';
    return;
  }
  if (localStorage.getItem('buspass')) {
    formMsg.textContent = 'A bus pass already exists. Delete it first.';
    return;
  }
  const passObj = {
    userId,
    username,
    issueDate: document.getElementById('issueDate').value,
    expiryDate: document.getElementById('expiryDate').value,
    passType: document.getElementById('passType').value,
    status: document.getElementById('status').value
  };
  if (!passObj.issueDate || !passObj.expiryDate || !passObj.passType || !passObj.status) {
    formMsg.textContent = 'Please complete all fields.';
    return;
  }
  localStorage.setItem('buspass', JSON.stringify(passObj));
  formMsg.style.color = '#bfffe8';
  formMsg.textContent = 'Bus pass created successfully!';
});

// View pass
document.getElementById('viewPassBtn').addEventListener('click', () => {
  window.location.href = 'buspass.html';
});

// Delete pass
document.getElementById('clearPassBtn').addEventListener('click', () => {
  if (localStorage.getItem('buspass')) {
    localStorage.removeItem('buspass');
    alert('Bus pass removed.');
  } else {
    alert('No bus pass found.');
  }
});

// Export pass
document.getElementById('downloadPassBtn').addEventListener('click', () => {
  const pass = localStorage.getItem('buspass');
  if (!pass) {
    alert('No pass to export');
    return;
  }
  const blob = new Blob([pass], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `buspass_${userId || 'guest'}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// Leaflet map
const map = L.map('map').setView([17.385044, 78.486671], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
L.marker([17.385044, 78.486671]).addTo(map).bindPopup('Bus (demo)').openPopup();
