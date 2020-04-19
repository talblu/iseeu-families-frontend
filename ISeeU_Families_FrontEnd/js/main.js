const hospital = location.href.substring(8, location.href.indexOf('.'));

const dataToSend = {};
dataToSend.token = sessionStorage.getItem('token');
dataToSend.hospital = hospital;

getAllPatients();

async function getAllPatients() {
	let response = await fetch(`https://api.spetz.online:4040/icu/patients/get_all`,{
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
	  		'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataToSend)
	});

	if (response.status == 401) {
		sessionStorage.clear();
        location.href = `login.html`;
    }

	let data = await response.json();
	let patientsList = document.getElementById("patients_list");
	data.forEach(patient => {
		const currPatient = document.createElement('option');
		currPatient.value = patient;
		currPatient.innerHTML = patient;
		patientsList.appendChild(currPatient);
	})
	return data;
}

const getPatient = () => {
	const patientId = document.getElementById("patients_list").value;
	sessionStorage.setItem('patient_id',patientId);
	location.href = `patient_info.html`;
}

const newPatient = () => {
	location.href = `new_patient.html`;
}