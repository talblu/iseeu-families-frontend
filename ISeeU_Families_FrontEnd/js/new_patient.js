// const urlParams = new URLSearchParams(window.location.search);
// const hospital = urlParams.get('hospital');

const hospital = localStorage.getItem('hospital');

const dataToSend = {};
dataToSend.hospital = hospital;

$(document).ready(function() {
	document.getElementById('hospital').value = hospital;
});

async function executeAction(action) {
	let response = await fetch(`https://api.spetz.online:4040/icu/patients/update_patient`,{
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
	  		'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataToSend)
	});

	return response;
}

const createPatient = async () => {
	const form = document.querySelectorAll('.form-control');
	dataToSend.medical_info = {};
	for (let input of form) {
		if (input.value !== "") {
			if (input.id.startsWith('med_'))
				dataToSend.medical_info[input.id.substring(4)] = input.value;
			else {
				if (input.id === 'phone_list') {
					input.value = input.value.replace(/\s/g,'');
					dataToSend[input.id] = input.value.split(',');
				}
				else
					dataToSend[input.id] = input.value;
			}
		}
	}

	await executeAction('update_patient');
	alert('המטופל/ת נוצר/ה בהצלחה!');
	localStorage.removeItem('patient_id');
	location.href = `/main.html`;
}