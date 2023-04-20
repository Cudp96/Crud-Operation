const newNameEl = document.getElementById('name');
const userEmailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const phonenumberEl = document.getElementById('phonenumber');
const dobEl = document.getElementById('dob');

const signBtnEl = document.getElementById('signBtn');

signBtnEl.addEventListener('click', async(e) => {
    e.preventDefault();
    const newName = newNameEl.value;    
    const userEmail = userEmailEl.value;
    const password = passwordEl.value;
    const phonenumber = phonenumberEl.value;
    const dob =  dobEl.value;
    const credentials = {
        fullName: newName,
        email: userEmail,
        password: password,
        phoneNumber: phonenumber,
        dob: dob
    }
    console.log(credentials);

     const response = await fetch(`http://localhost:8080/api/v1/register`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    const data = await response.json();

    if (data.status){
        window.location.href = 'loginpage.html';
    }
    else{
        alert(data.message);
    }
    
})
