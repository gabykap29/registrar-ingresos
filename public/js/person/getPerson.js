const inputDNI = document.getElementById('dni');
const lastname = document.getElementById('lastname');
const name = document.getElementById('name');
const addres = document.getElementById('address');
const clase = document.getElementById('clase');

inputDNI.addEventListener('change',async(e)=>{
    e.preventDefault();
    try {
        inputDNI.value = inputDNI.value
        const response = await fetch(`/find?dni=${inputDNI.value}`);
        const data = await response.json();
        
        if(data){
            let person = data[0];
            lastname.value = person.lastname;
            name.value = person.name;
            addres.value = person.address;
            clase.value = person.class;
        };

    } catch (error) {
        console.log(error);
        
    }
});