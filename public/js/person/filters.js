const formPerson = document.getElementById('formPerson');
const registers = document.getElementById('registers');


formPerson.addEventListener('submit',async(e)=>{
    e.preventDefault();
    try {
        const dni = document.getElementById('dni').value;
        const lastname = document.getElementById('lastname').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;



        const response = await fetch(`/find?dni=${dni}&lastname=${lastname}&name=${name}&${address}`);
        const data = await response.json();

        if(data.status === 200){
            registers.innerHTML = '';
            data.data.forEach(person => {
                console.log('person',person);
                let entriesHTML = ''; // Variable para almacenar las entradas de la persona como HTML
                person.entries.forEach(entry => {
                    entriesHTML += `<li>${dayjs(entry.date).format('DD-MM-YYYY HH:mm:ss')} - ${entry.description || 'Sin descripción'} <a href="/registros/editar/${entry.id}" class="btn btn-outline-success btn-sm"><i class="bi bi-pencil-square"></i></a> </li>`;
                });
            
                registers.innerHTML += `
                    <tr>
                        <td>${person.dni}</td>
                        <td>${person.lastname}</td>
                        <td>${person.name}</td>
                        <td>${person.address}</td>
                        <td>${person.class}</td>
                        <td>
                            <ul>
                                ${entriesHTML}
                            </ul>
                        </td>
                    </tr>
                `;
            });
            
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
    }
});