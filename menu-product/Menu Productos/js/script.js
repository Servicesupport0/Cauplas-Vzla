$(document).ready(function() {
    var table = $('#productTable').DataTable({
        responsive: true,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Todos"]],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "columnDefs": [
            { "orderable": false, "targets": [5, 6, 7, 8, 9, 10, 11] }
        ]
    });

    // Ejemplo de cómo agregar datos a la tabla
    table.row.add([
        "1", "CAU001", "TOR001", "IND001", "OEM001", "Aplicación 1", "Sí", "100", "FCA001", "COD001", "500", "450"
    ]).draw(false);

    table.row.add([
        "2", "CAU002", "TOR002", "IND002", "OEM002", "Aplicación 2", "No", "200", "FCA002", "COD002", "750", "700"
    ]).draw(false);

    // Agregar más filas según sea necesario...

    // Evento para manejar el clic en una fila
    $('#productTable tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        alert('Has seleccionado: ' + data[1] + ' - ' + data[5]);
        // Aquí puedes agregar más lógica, como abrir un modal con detalles del producto
    });
});

$(document).ready(function() {
    $('body').bootstrapMaterialDesign();

    // Initialize DataTable
    $('#productTable').DataTable();

    // Event listener for Add button
    $('#btnAdd').on('click', function() {
        alert('Agregar producto - función no implementada');
    });

    // Event listener for Export to PDF button
    $('#btnExportPDF').on('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text('Lista de Productos', 14, 16);
        doc.save('productos.pdf');
    });

    // Event listener for Export to Excel button
    $('#btnExportExcel').on('click', function() {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('productTable'));
        XLSX.utils.book_append_sheet(wb, ws, 'Productos');
        XLSX.writeFile(wb, 'productos.xlsx');
    });
});