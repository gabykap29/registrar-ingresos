(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });


    // Progress Bar
    $('.pg-bar').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
  
})(jQuery);

window.addEventListener('beforeprint', function() {
    const titleFilters = document.querySelector('#titleFilters');
    try {
        const sidebar = document.querySelector('#sidebar');
        const navbar = document.querySelector('#navbar');
        const accordion = document.querySelector('.accordion');
        const cardFilters = document.querySelector('#cardFilters');
        sidebar.style.display = 'none';
        navbar.style.display = 'none';
        accordion.style.display = 'none';
        cardFilters.style = 'margin-top: 0px; margin-bottom: 0px;';
    } catch (error) {
        console.log(error);
    };
    const dateStartElement = document.getElementById('dateStart');
    const dateEndElement = document.getElementById('dateEnd');

    if (dateStartElement && dateEndElement) {
        const dateStartValue = dateStartElement.value;
        const dateEndValue = dateEndElement.value;

    if (dateStartValue && dateEndValue) {
        try {
            const fechaActualUTC = dayjs(dateStartValue);
            const fechaActualUTC3 = fechaActualUTC.subtract(0, 'hour');
            const fechaFormateadaStart = fechaActualUTC3.format('DD-MM-YYYY HH:mm:ss');

            const fechaActualUTC2 = dayjs(dateEndValue);
            const fechaActualUTC32 = fechaActualUTC2.subtract(0, 'hour');
            const fechaFormateadaEnd = fechaActualUTC32.format('DD-MM-YYYY HH:mm:ss');

            titleFilters.innerHTML = `<h6 class="text-center"> <u>Registros del ${fechaFormateadaStart} al ${fechaFormateadaEnd}<u/> </h6>`;
        
        } catch (error) {
            console.error('Error al parsear las fechas:', error);
        }
    } else {
        console.error('Los valores de fecha están vacíos');
    }
} else {
    console.error('No se encontraron los elementos de fecha');
}

});

window.addEventListener('afterprint', function() {
    try {
        const sidebar = document.querySelector('#sidebar');
        const navbar = document.querySelector('#navbar');
        const accordion = document.querySelector('.accordion');
        sidebar.style.display = 'block';
        navbar.style.display = 'block';
        accordion.style.display = 'block';
    } catch (error) {
        console.log(error);
    }
});
