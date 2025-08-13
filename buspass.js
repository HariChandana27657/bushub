const detailsDiv = document.getElementById('details');
const passRaw = localStorage.getItem('buspass');

if (!passRaw) {
  detailsDiv.innerHTML = '<div class="no-pass">No active bus pass found. Create one on the dashboard.</div>';
} else {
  try {
    const p = JSON.parse(passRaw);
    detailsDiv.innerHTML = `
      <div class="field"><div><strong>User</strong></div><div>${p.username || p.userId || '-'}</div></div>
      <div class="field"><div><strong>User ID</strong></div><div>${p.userId || '-'}</div></div>
      <div class="field"><div><strong>Issue Date</strong></div><div>${p.issueDate || '-'}</div></div>
      <div class="field"><div><strong>Expiry Date</strong></div><div>${p.expiryDate || '-'}</div></div>
      <div class="field"><div><strong>Pass Type</strong></div><div>${p.passType || '-'}</div></div>
      <div class="field"><div><strong>Status</strong></div><div>${p.status || '-'}</div></div>
    `;
  } catch (err) {
    detailsDiv.innerHTML = '<div class="no-pass">Corrupted pass data.</div>';
  }
}

// Delete pass
document.getElementById('deleteBtn').addEventListener('click', () => {
  if (confirm('Delete bus pass?')) {
    localStorage.removeItem('buspass');
    location.reload();
  }
});

// Export pass
document.getElementById('exportBtn').addEventListener('click', () => {
  const pass = localStorage.getItem('buspass');
  if (!pass) { alert('No pass to export'); return; }
  const blob = new Blob([pass], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `buspass_${localStorage.getItem('user_id') || 'guest'}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// Back to dashboard
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'homepage.html';
});
