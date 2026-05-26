const patientsTableBody = document.getElementById('patientsTableBody');
const patientForm = document.getElementById('patientForm');
const patientMessage = document.getElementById('patientMessage');

const loadPatients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`);
    const patients = await response.json();

    patientsTableBody.innerHTML = '';

    if (patients.length === 0) {
      patientsTableBody.innerHTML = `
        <tr>
          <td colspan="5">No patients registered.</td>
        </tr>
      `;
      return;
    }

    patients.forEach((patient) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${patient.id}</td>
        <td>${patient.full_name}</td>
        <td>${patient.email}</td>
        <td>${patient.phone || '-'}</td>
        <td>
          <button class="action-btn delete-btn" onclick="deletePatient(${patient.id})">
            Delete
          </button>
        </td>
      `;

      patientsTableBody.appendChild(row);
    });
  } catch (error) {
    patientsTableBody.innerHTML = `
      <tr>
        <td colspan="5">Error loading patients.</td>
      </tr>
    `;
  }
};

patientForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newPatient = {
    full_name: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPatient)
    });

    const data = await response.json();

    if (!response.ok) {
      patientMessage.textContent = data.message || 'Error creating patient.';
      patientMessage.className = 'message error';
      return;
    }

    patientMessage.textContent = 'Patient created successfully.';
    patientMessage.className = 'message success';

    patientForm.reset();
    loadPatients();
  } catch (error) {
    patientMessage.textContent = 'Connection error with the backend API.';
    patientMessage.className = 'message error';
  }
});

const deletePatient = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this patient?');

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Error deleting patient.');
      return;
    }

    loadPatients();
  } catch (error) {
    alert('Connection error with the backend API.');
  }
};

loadPatients();