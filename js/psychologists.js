const psychologistsTableBody = document.getElementById('psychologistsTableBody');
const psychologistForm = document.getElementById('psychologistForm');
const psychologistMessage = document.getElementById('psychologistMessage');

const loadPsychologists = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/psychologists`);
    const psychologists = await response.json();

    psychologistsTableBody.innerHTML = '';

    if (psychologists.length === 0) {
      psychologistsTableBody.innerHTML = `
        <tr>
          <td colspan="5">No psychologists registered.</td>
        </tr>
      `;
      return;
    }

    psychologists.forEach((psychologist) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${psychologist.id}</td>
        <td>${psychologist.full_name}</td>
        <td>${psychologist.specialty}</td>
        <td>${psychologist.email}</td>
        <td>
          <button class="action-btn delete-btn" onclick="deletePsychologist(${psychologist.id})">
            Delete
          </button>
        </td>
      `;

      psychologistsTableBody.appendChild(row);
    });
  } catch (error) {
    psychologistsTableBody.innerHTML = `
      <tr>
        <td colspan="5">Error loading psychologists.</td>
      </tr>
    `;
  }
};

psychologistForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newPsychologist = {
    full_name: document.getElementById('fullName').value,
    specialty: document.getElementById('specialty').value,
    email: document.getElementById('email').value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/psychologists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPsychologist)
    });

    const data = await response.json();

    if (!response.ok) {
      psychologistMessage.textContent = data.message || 'Error creating psychologist.';
      psychologistMessage.className = 'message error';
      return;
    }

    psychologistMessage.textContent = 'Psychologist created successfully.';
    psychologistMessage.className = 'message success';

    psychologistForm.reset();
    loadPsychologists();
  } catch (error) {
    psychologistMessage.textContent = 'Connection error with the backend API.';
    psychologistMessage.className = 'message error';
  }
});

const deletePsychologist = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this psychologist?');

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/psychologists/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Error deleting psychologist.');
      return;
    }

    loadPsychologists();
  } catch (error) {
    alert('Connection error with the backend API.');
  }
};

loadPsychologists();