const hospital = location.href.substring(8, location.href.indexOf('.'));

const dataToSend = {};
dataToSend.token = sessionStorage.getItem('token');
dataToSend.hospital = hospital;

async function executeAction() {
	let response = await fetch(`https://api.spetz.online:4040/icu/patients/update_patient`,{
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

	await executeAction();
	alert('המטופל/ת נוצר/ה בהצלחה!');
	sessionStorage.removeItem('patient_id');
	location.href = `main.html`;
}