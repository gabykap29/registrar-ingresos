const formEntriesEdit = document.getElementById('formEntriesEdit');
const id = document.getElementById('formEntriesEdit').dataset.id;
const getPerson = async (id) => {
    try {
        const response = await fetch(`/api/registro/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const renderPerson = async (id) => {
    const entry = await getPerson(id);
    console.log(entry);
    document.getElementById('dni').value = entry.persons.dni;
    document.getElementById('lastname').value = entry.persons.lastname;
    document.getElementById('name').value = entry.persons.name;
    document.getElementById('address').value = entry.persons.address;
    document.getElementById('clase').value = entry.persons.class;
    document.getElementById('ingreso').value = dayjs(entry.persons.ingreso).format('YYYY-MM-DD hh:mm');
    document.getElementById('description').value = entry.description;

    document.getElementById('dni').disabled = true;
    document.getElementById('lastname').disabled = true;
    document.getElementById('name').disabled = true;
    document.getElementById('address').disabled = true;
    document.getElementById('clase').disabled = true;
};


document.addEventListener('DOMContentLoaded',async () => {
    await renderPerson(id);

    formEntriesEdit.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const ingreso = document.getElementById('ingreso').value;
            const description = document.getElementById('description').value;

            const response = await fetch(`/api/registros/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ingreso,
                    description
                })
            });

            const data = await response.json();
            if(data.status === 200){
                Swal.fire({
                    title: "Good job!",
                    text: data.message,
                    icon: "success"
                  });
                formEntriesEdit.reset();
                setTimeout(() => {
                    window.location.href = '/registros/filtrar';
                }, 2000);
            }else if(data.status === 400){
                Swal.fire({
                    title: "Error!",
                    text: data.menssage,
                    icon: "error"
                  });
            }else{
                Swal.fire({
                    title: "Error!",
                    text: data.errors[0].msg,
                    icon: "error"
                  });
            };
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error!",
                text: 'Error interno del servidor, vuelva a intentar mas tarde o contacte al administrador del sistema',
                icon: "error"
              });
        };
    });


});