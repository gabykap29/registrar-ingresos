const formEntries = document.querySelector('#formEntries');

formEntries.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const dni = document.getElementById('dni').value;
        const lastname = document.getElementById('lastname').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const clase = document.getElementById('clase').value;
        const ingreso = document.getElementById('ingreso').value;
        const description = document.getElementById('description').value;

        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dni,
                lastname,
                name,
                address,
                clase,
                ingreso,
                description
            })
        });

        const data = await response.json();
        if(data.status === 201){
            Swal.fire({
                title: "Good job!",
                text: data.message,
                icon: "success"
              });
            formEntries.reset();
        }else if(data.status === 400){
            Swal.fire({
                title: "Error!",
                text: data.message,
                icon: "error"
              });
        }else{
            Swal.fire({
                title: "Error!",
                text: 'Error interno del servidor, vuelva a intentar mas tarde o contacte al administrador del sistema',
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