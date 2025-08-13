// Common utilities

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

function getUserProfile() {
  return {
    userId: localStorage.getItem('user_id') || '',
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('emailid') || ''
  };
}

function setProfileDisplay(tableSelector, nameSelector) {
  const profile = getUserProfile();
  const table = document.querySelector(tableSelector);
  const nameDisplay = document.querySelector(nameSelector);

  if (table) {
    table.innerHTML = `<tr>
      <td>${profile.userId || '-'}</td>
      <td>${profile.username || '-'}</td>
      <td>${profile.email || '-'}</td>
    </tr>`;
  }
  if (nameDisplay) {
    nameDisplay.textContent = profile.username || 'Guest';
  }
}
