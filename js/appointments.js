const appointmentsTableBody = document.getElementById('appointmentsTableBody');
const appointmentForm = document.getElementById('appointmentForm');
const appointmentMessage = document.getElementById('appointmentMessage');

const patientSelect = document.getElementById('patientId');
const psychologistSelect = document.getElementById('psychologistId');

const loadPatientsOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`);
    const patients = await response.json();

    patientSelect.innerHTML = '<option value="">Select a patient</option>';

    patients.forEach((patient) => {
      const option = document.createElement('option');
      option.value = patient.id;
      option.textContent = `${patient.full_name} - ${patient.email}`;
      patientSelect.appendChild(option);
    });
  } catch (error) {
    patientSelect.innerHTML = '<option value="">Error loading patients</option>';
  }
};

const loadPsychologistsOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/psychologists`);
    const psychologists = await response.json();

    psychologistSelect.innerHTML = '<option value="">Select a psychologist</option>';

    psychologists.forEach((psychologist) => {
      const option = document.createElement('option');
      option.value = psychologist.id;
      option.textContent = `${psychologist.full_name} - ${psychologist.specialty}`;
      psychologistSelect.appendChild(option);
    });
  } catch (error) {
    psychologistSelect.innerHTML = '<option value="">Error loading psychologists</option>';
  }
};

const formatDate = (dateValue) => {
  const date = new Date(dateValue);

  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
};

const loadAppointments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    const appointments = await response.json();

    appointmentsTableBody.innerHTML = '';

    if (appointments.length === 0) {
      appointmentsTableBody.innerHTML = `
        <tr>
          <td colspan="7">No appointments registered.</td>
        </tr>
      `;
      return;
    }

    appointments.forEach((appointment) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${appointment.id}</td>
        <td>${appointment.patient_name}</td>
        <td>${appointment.psychologist_name}</td>
        <td>${appointment.specialty}</td>
        <td>${formatDate(appointment.appointment_date)}</td>
        <td>${appointment.status}</td>
        <td>
          <button class="action-btn status-btn" onclick="confirmAppointment(${appointment.id})">
            Confirm
          </button>
          <button class="action-btn delete-btn" onclick="deleteAppointment(${appointment.id})">
            Delete
          </button>
        </td>
      `;

      appointmentsTableBody.appendChild(row);
    });
  } catch (error) {
    appointmentsTableBody.innerHTML = `
      <tr>
        <td colspan="7">Error loading appointments.</td>
      </tr>
    `;
  }
};

appointmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const newAppointment = {
    patient_id: Number(document.getElementById('patientId').value),
    psychologist_id: Number(document.getElementById('psychologistId').value),
    appointment_date: document.getElementById('appointmentDate').value,
    status: document.getElementById('status').value,
    notes: document.getElementById('notes').value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAppointment)
    });

    const data = await response.json();

    if (!response.ok) {
      appointmentMessage.textContent = data.message || 'Error creating appointment.';
      appointmentMessage.className = 'message error';
      return;
    }

    appointmentMessage.textContent = 'Appointment created successfully.';
    appointmentMessage.className = 'message success';

    appointmentForm.reset();
    loadAppointments();
  } catch (error) {
    appointmentMessage.textContent = 'Connection error with the backend API.';
    appointmentMessage.className = 'message error';
  }
});

const confirmAppointment = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'confirmed'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Error updating appointment status.');
      return;
    }

    loadAppointments();
  } catch (error) {
    alert('Connection error with the backend API.');
  }
};

const deleteAppointment = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this appointment?');

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Error deleting appointment.');
      return;
    }

    loadAppointments();
  } catch (error) {
    alert('Connection error with the backend API.');
  }
};

loadPatientsOptions();
loadPsychologistsOptions();
loadAppointments();