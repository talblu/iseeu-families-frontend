// const urlParams = new URLSearchParams(window.location.search);
// const patientId = urlParams.get('patientId');
// const hospital = urlParams.get('hospital');
const hospital = localStorage.getItem('hospital');
const patientId = localStorage.getItem('patient_id');

const dataToSend = {};
dataToSend.patient_id = patientId;
dataToSend.hospital = hospital;

init();

async function init() {
  const patientInfo = await executeAction('get_patient');
  for (let prop in patientInfo) {
  	if (prop !== 'medical_info') {
  		document.getElementById(prop).value = patientInfo[prop];
  	}
  	else {
  		for (let data in patientInfo.medical_info) {
  			document.getElementById(`med_${data}`).value = patientInfo.medical_info[data];
  		}
  	}
  }
}

async function executeAction(action) {
	let response = await fetch(`https://api.spetz.online:4040/icu/patients/${action}`,{
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
	  		'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataToSend)
	});

	if (action === 'update_patient' || action === 'delete_patient') {
		return response;
	}
	else {
		let data = await response.json();
		return data;
	}
}

const deletePatient = async () => {
	const response = await executeAction('delete_patient');
	if (response.status === 200) {
		alert('המחיקה בוצעה בהצלחה!');
	}
	else {
		alert('המטופל אינו קיים במערכת, אנא נסו שנית');
	}
	localStorage.removeItem('patient_id');
	location.href = `main.html`;
}

const updatePatient = async () => {
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
	alert('העדכון בוצע בהצלחה!');
	localStorage.removeItem('patient_id');
	location.href = `main.html`;
}