// EVENTOS REGISTER 

function goToEvents() {

    const name = document.getElementById('name').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    
    var user = [name, lastname, email, telephone];

    localStorage.setItem("usuarioArray", JSON.stringify(user));
    console.log("Valores guardados en localStorage: ", user);
    window.location.href = `../events/events.html?name=${encodeURIComponent(name)}&lastname=${encodeURIComponent(lastname)}&email=${encodeURIComponent(email)}&telephone=${encodeURIComponent(telephone)}`;

}

document.addEventListener('DOMContentLoaded', () => {
    const estados = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];
    const estadoSelect = document.getElementById('estado');

    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        estadoSelect.appendChild(option);
    });

    const crearEventoForm = document.getElementById('crearEventoForm');
    const eventosList = document.getElementById('eventosList');
    const usuarios = [];

    crearEventoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const tipoEvento = document.getElementById('tipoEvento').value;
        const organizador = document.getElementById('organizador').value;
        const emailOrganizador = document.getElementById('emailOrganizador').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const estado = document.getElementById('estado').value;
        const puntoReunion = document.getElementById('puntoReunion').value;
        const minParticipantes = document.getElementById('minParticipantes').value;
        const maxParticipantes = document.getElementById('maxParticipantes').value;

        if (usuarios.some(usuario => usuario.email === emailOrganizador)) {
            alert("Usuario ya tiene un evento registrado");
            return;
        }

        const evento = {
            tipoEvento,
            organizador,
            emailOrganizador,
            fecha,
            hora,
            estado,
            puntoReunion,
            minParticipantes,
            maxParticipantes,
            participantes: 0
        };

        usuarios.push({ email: emailOrganizador });

        const eventoItem = document.getElementById('eventosList').innerHTML =
        '<li class="list-group-item d-flex justify-content-between align-items-center">' + 
        `${tipoEvento} organizado por ${organizador} en ${estado} el ${fecha} a las ${hora}. Punto de reunión: ${puntoReunion}. Participantes: ${evento.participantes}/${maxParticipantes}` +
        '<button type="button" id="miBoton" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">Inscribirse</button> ' +
        '</li>'
        ;

        eventosList.appendChild(eventoItem);

        crearEventoForm.reset();
    });

    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
});


function modalInscribirse (){

    var modal = new bootstrap.Modal(document.getElementById('miModal'));

    // Agregar evento onclick al botón para abrir el modal
    document.getElementById('miBoton').onclick = function() {
        modal.show();
    }
}