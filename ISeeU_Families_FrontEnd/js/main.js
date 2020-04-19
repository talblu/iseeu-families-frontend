// const urlParams = new URLSearchParams(window.location.search);
// const hospital = urlParams.get('hospital');
const hospital = localStorage.getItem('hospital');

const dataToSend = {};
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
	localStorage.setItem('patient_id',patientId);
	// localStorage.setItem('hospital', hospital);
	// location.href = `../html/patient_info.html?patientId=${patientId}&hospital=${hospital}`;
	location.href = `/patient_info.html`;
}

const newPatient = () => {
	// location.href = `../html/new_patient.html?hospital=${hospital}`;
	location.href = `/new_patient.html`;
}