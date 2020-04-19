async function login () 
{
	const userData = {}
	userData.email = document.getElementById("e-mail_input").value;
	userData.password = document.getElementById("password_input").value;
	userData.hospital = location.href.substring(8, location.href.indexOf('.'));

	document.getElementById('error').style = 'display: none';

	if (isInputValid(userData.email, userData.password, userData.hospital)) {
		let response = await fetch(`https://api.spetz.online:4040/icu/users/user_login`,{
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Accept': 'application/json',
		  		'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		});
		let data = await response.json();
		if (data.success) {
			localStorage.setItem('hospital', userData.hospital);
			location.href = `main.html`;
		}
		else {
			document.getElementById('error').innerHTML = "משתמש לא קיים במערכת, אנא נסה/י שוב";
			document.getElementById('error').style = 'display: block';
		}
	}
}

const isValidEmail = email => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	   return true;
	}

	document.getElementById('error').innerHTML = "כתובת הדוא״ל אינה תקינה";
	document.getElementById('error').style = 'display: block';

	return false;
}

const isInputValid = (email, password, hospital) => {
	if (!isValidEmail(email))
		return false;
	if (password === "" || hospital === "בחר/י בית חולים") {
		document.getElementById('error').innerHTML = "יש למלא את כל השדות";
		document.getElementById('error').style = 'display: block';
		return false;
	}
	return true;
}