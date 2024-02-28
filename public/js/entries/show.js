const registers = document.getElementById('registers');
const formFilters = document.getElementById('formFilters');
const getEntries = async () => {
    try {
        const res = await fetch('/api/registros?page=0&size=10');
        const data = await res.json();
        if(data.length === 0){
            return [];
        };
        return data
    } catch (error) {
        console.log(error);
    }
};

const renderEntries = async () => {
    const entries = await getEntries();
    if(entries.length === 0){
        registers.innerHTML = `
            <tr>
                <td class="alert alert-warning" colspan="7">Aún no hay registros</td>
            </tr>
        `;
        return;
    }
    entries.forEach(entry => {
        const fechaActualUTC = dayjs(entry.date);

        // Ajustar a UTC-3, por alguna razon funciona con el 0, si lo quitas no se ajusta a UTC-3 queda en UTC
        const fechaActualUTC3 = fechaActualUTC.subtract(0, 'hour');
    
        // Formatear la fecha y hora para mostrarla en la interfaz de usuario
        const fechaFormateada = fechaActualUTC3.format('DD-MM-YYYY HH:mm:ss');

        registers.innerHTML += `
            <tr>
                <td>${entry.persons.dni || 'Sin datos'}</td>
                <td>${entry.persons.lastname || 'Sin datos'}</td>
                <td>${entry.persons.name || 'Sin datos'}</td>
                <td>${entry.persons.address || 'Sin datos'}</td>
                <td>${entry.persons.class || 'Sin datos'}</td>
                <td>${fechaFormateada} -- ${entry.description || 'Sin descripción'}</td>
            </tr>
        `;
    });
};

document.addEventListener('DOMContentLoaded',()=>{
    renderEntries();


    formFilters.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const dateStart = encodeURIComponent(document.getElementById('dateStart').value);
        const dateEnd = encodeURIComponent(document.getElementById('dateEnd').value);
        console.log('dateStart',dateStart);
        console.log('dateEnd',dateEnd);

        const res = await fetch(`/api/registros/filtrar?dateStart=${dateStart}&dateEnd=${dateEnd}`);
        const data = await res.json();

        if(data.length === 0 || data === undefined || data === null){
            registers.innerHTML = `
                <tr>
                    <td class="alert alert-warning" colspan="7">No hay registros en el rango de fecha seleccionado</td>
                </tr>
            `;
            return;
        };

        registers.innerHTML = '';
        data.forEach(entry => {
            const fechaActualUTC = dayjs(entry.date);

            // Ajustar a UTC-3, por alguna razon funciona con el 0, si lo quitas no se ajusta a UTC-3 queda en UTC
            const fechaActualUTC3 = fechaActualUTC.subtract(0, 'hour');
        
            // Formatear la fecha y hora para mostrarla en la interfaz de usuario
            const fechaFormateada = fechaActualUTC3.format('DD-MM-YYYY HH:mm:ss');

            registers.innerHTML += `
            <tr>
            <td>${entry.persons.dni || 'Sin datos'}</td>
            <td>${entry.persons.lastname || 'Sin datos'}</td>
            <td>${entry.persons.name || 'Sin datos'}</td>
            <td>${entry.persons.address || 'Sin datos'}</td>
            <td>${entry.persons.class || 'Sin datos'}</td>
            <td>${fechaFormateada} -- ${entry.description || 'Sin descripción'} </td>
        </tr>
            `;
        });

    })


} );