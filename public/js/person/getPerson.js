const formPerson = document.getElementById('formPerson');
const inputDNI = document.getElementById('dni');
const dni = document.getElementById('inputDNI');
const lastname = document.getElementById('lastname');
const name = document.getElementById('name');
const addres = document.getElementById('address');
const clase = document.getElementById('clase');
const registers = document.getElementById('registers');
inputDNI.addEventListener('change',async(e)=>{
    e.preventDefault();
    try {
        inputDNI.value = inputDNI.value
        const response = await fetch(`/find?dni=${inputDNI.value}`);
        const data = await response.json();
        
        if(data.status === 200){
            let person = data.data[0];
            lastname.value = person.lastname;
            name.value = person.name;
            addres.value = person.address;
            clase.value = person.class;
        }else if(data.status === 400){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
              });
        }

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal!',
          });
    };
});

formPerson.addEventListener('submit',async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch('/find',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dni: inputDNI.value,
                lastname: lastname.value,
                name: name.value,
                address: addres.value,
            })
        });
        const data = await response.json();

        if(data){
            registers.innerHTML = '';
            data.forEach(person => {
                registers.innerHTML += `
                    <tr>
                        <td>${person.dni}</td>
                        <td>${person.lastname}</td>
                        <td>${person.name}</td>
                        <td>${person.address}</td>
                        <td>${person.class}</td>
                        <td>${person.entries.date}</td>
                    </tr>
                `;
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message,
              });
        
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salio mal!',
          });
    }
});