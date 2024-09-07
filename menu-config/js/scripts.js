$(document).ready(function() {
    // Manejo del formulario de inicio de sesión
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Prevenir el envío normal del formulario

        // Obtener los valores de usuario y contraseña
        var username = $('#UserName').val();
        var password = $('#UserPassword').val();

        // Ejemplo de usuarios
        var users = [
            { username: 'Admin', password: 'Admin' },
            { username: 'user1', password: 'user123' },
            { username: 'user2', password: 'user456' }
        ];

        // Verificar las credenciales
        let validUser = users.find(user => user.username === username && user.password === password);

        if (validUser) {
            // Redirigir al panel de control
            window.location.href = 'dashboard.html';
        } else {
            // Mostrar mensaje de error
            Swal.fire('Error', 'Usuario o contraseña inválidos', 'error');
        }
    });
});

// Manejo de cerrar sesión
document.querySelector('.btn-exit-system')?.addEventListener('click', function(e) {
    e.preventDefault(); // Previene la acción por defecto del enlace

    // Solicita confirmación para cerrar sesión
    Swal.fire({
        title: '¿Quieres salir del sistema?',
        text: "La sesión actual se cerrará.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let url = 'login.html'; // URL para redirigir después de cerrar sesión
            let token = '...'; // Inserta token adecuado aquí
            let usuario = '...'; // Inserta usuario adecuado aquí

            let datos = new FormData();
            datos.append("token", token);
            datos.append("usuario", usuario);
            datos.append("modulo_login", "cerrar_sesion");

            // Envio de petición para cerrar sesión
            fetch(url, {
                method: 'POST',
                body: datos
            })
            .then(response => response.json()) // Convertir respuesta a JSON
            .then(response => {
                alertas_ajax(response); // Manejo de respuestas
            });
        }
    });
});

document.querySelector("body > main > section.full-box.page-content.scroll > nav > a.btn-exit-system > i")

$(document).ready(function () {
    // Initialize DataTable
    const productTable = $('#productTable').DataTable();
  
    // Save new product function
    $('#btnSaveProduct').on('click', function () {
        const cauplas = $('#cauplas').val();
        const torflex = $('#torflex').val();
        const indomax = $('#indomax').val();
        const oem = $('#oem').val();
        const aplicacion = $('#aplicacion').val();
        const nuevosItems = $('#nuevosItems').val();
        
        // Optional handling for uploaded images
        const foto1 = $('#foto1')[0].files[0];
        const foto2 = $('#foto2')[0].files[0];
  
        // Basic validation
        if (!cauplas || !torflex || !indomax || !oem || !aplicacion || !nuevosItems) {
            Swal.fire('Error', 'Por favor complete todos los campos', 'error');
            return;
        }
  
        // Preview images
        const img1 = foto1 ? URL.createObjectURL(foto1) : 'assets/avatar/Avatar.png';
        const img2 = foto2 ? URL.createObjectURL(foto2) : 'assets/avatar/Avatar.png';
  
        // Add new product to DataTable
        productTable.row.add([
            productTable.rows().count() + 1,
            cauplas,
            torflex,
            indomax,
            oem,
            aplicacion,
            nuevosItems,
            `<img src="${img1}" alt="Foto 1" width="50" height="50">`,
            `<img src="${img2}" alt="Foto 2" width="50" height="50">`,
            `<button type="button" class="btn btn-success"><i class="fas fa-sync-alt"></i></button>`
        ]).draw();
  
        // Reset form
        $('#formNewProduct')[0].reset();
        $('#ModalNewProduct').modal('hide');
    });
  
    // Export PDF functionality
    $('#btnExportPDF').on('click', function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
  
        doc.text('Lista de Productos', 10, 10);
        const tableData = productTable.data().toArray();
        tableData.forEach((row, index) => {
            doc.text(row.join(' '), 10, 20 + (10 * index));
        });
        doc.save('productos.pdf');
    });
  
    // Export Excel functionality
    $('#btnExportExcel').on('click', function () {
        const tableData = productTable.rows().data().toArray();
        const ws = XLSX.utils.json_to_sheet(tableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Productos");
        XLSX.writeFile(wb, "productos.xlsx");
    });
    
    // Logout button functionality
    $('.btn-exit-system').on('click', function () {
        Swal.fire({
            title: 'Cerrar sesión',
            text: "¿Está seguro que desea cerrar la sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simulate logout. Redirect or perform logout operation.
                window.location.href = 'logout.html'; // Change to your logout URL
            }
        });
    });
  });
  