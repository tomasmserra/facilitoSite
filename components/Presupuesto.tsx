import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Presupuesto: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
  });
  const [detalleServicio, setDetalleServicio] = useState('');
  const [manoObra, setManoObra] = useState(0);
  const [materiales, setMateriales] = useState(0);
  const [materialesACargoCliente, setMaterialesACargoCliente] = useState(false);
  const [notas, setNotas] = useState('');
  const [validez, setValidez] = useState(30);

  const handleLogout = () => {
    logout();
    navigate('/presupuesto/login');
  };

  // Calcular totales
  const subtotal = manoObra + (materialesACargoCliente ? 0 : materiales);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;

    // Header con logo y datos de la empresa
    doc.setFillColor(17, 24, 39); // gray-950
    doc.rect(0, 0, pageWidth, 50, 'F');

    // Logo (texto por ahora, puedes agregar imagen después)
    doc.setTextColor(34, 197, 94); // brand-500
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Facilito.ar', margin, 25);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Soluciones Tecnológicas', margin, 35);
    doc.text('Carhue, Provincia de Buenos Aires, Argentina', margin, 42);

    // Datos del cliente
    let yPos = 60;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PRESUPUESTO', pageWidth - margin, yPos, { align: 'right' });
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-AR')}`, pageWidth - margin, yPos, { align: 'right' });
    doc.text(`Válido por: ${validez} días`, pageWidth - margin, yPos + 6, { align: 'right' });

    yPos += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Cliente:', margin, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    if (cliente.empresa) doc.text(`Empresa: ${cliente.empresa}`, margin, yPos);
    if (cliente.nombre) doc.text(`Nombre: ${cliente.nombre}`, margin, yPos + (cliente.empresa ? 6 : 0));
    if (cliente.email) doc.text(`Email: ${cliente.email}`, margin, yPos + (cliente.empresa ? 12 : 6));
    if (cliente.telefono) doc.text(`Teléfono: ${cliente.telefono}`, margin, yPos + (cliente.empresa ? 18 : 12));

    // Detalle del servicio
    yPos += (cliente.empresa ? 30 : 24);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalle del Servicio:', margin, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    if (detalleServicio) {
      // Convertir HTML a texto plano
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = detalleServicio;
      const textoPlano = tempDiv.textContent || tempDiv.innerText || '';
      
      if (textoPlano.trim()) {
        const splitDetalle = doc.splitTextToSize(textoPlano, pageWidth - 2 * margin);
        doc.text(splitDetalle, margin, yPos);
        yPos += splitDetalle.length * 5;
      } else {
        doc.text('(Sin detalle especificado)', margin, yPos);
        yPos += 5;
      }
    } else {
      doc.text('(Sin detalle especificado)', margin, yPos);
      yPos += 5;
    }

    // Tabla de presupuesto
    yPos += 10;
    const tableData = [
      ['Mano de Obra', `$${manoObra.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`],
    ];

    if (!materialesACargoCliente && materiales > 0) {
      tableData.push(['Materiales', `$${materiales.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`]);
    }

    if (materialesACargoCliente && materiales > 0) {
      tableData.push(['Materiales', 'A cargo del cliente']);
    }

    autoTable(doc, {
      startY: yPos,
      head: [['Concepto', 'Importe']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [34, 197, 94], // brand-500
        textColor: 255,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 10,
      },
      columnStyles: {
        1: { halign: 'right' },
      },
    });

    // Totales
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal:`, pageWidth - margin - 60, finalY, { align: 'right' });
    doc.text(`$${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, pageWidth - margin, finalY, { align: 'right' });
    
    doc.text(`IVA (21%):`, pageWidth - margin - 60, finalY + 6, { align: 'right' });
    doc.text(`$${iva.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, pageWidth - margin, finalY + 6, { align: 'right' });
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL:`, pageWidth - margin - 60, finalY + 15, { align: 'right' });
    doc.text(`$${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, pageWidth - margin, finalY + 15, { align: 'right' });

    // Notas
    if (notas) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Notas:', margin, finalY + 25);
      const splitNotas = doc.splitTextToSize(notas, pageWidth - 2 * margin);
      doc.text(splitNotas, margin, finalY + 32);
    }

    // Footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Facilito.ar - Automatizamos el presente para construir el futuro', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Guardar PDF
    doc.save(`presupuesto-${cliente.empresa || cliente.nombre || 'facilito'}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-brand-600 p-3 rounded-xl">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Generador de Presupuestos</h1>
              <p className="text-gray-400 text-sm">Facilito.ar</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Salir</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Datos del Cliente */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Datos del Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Empresa</label>
                  <input
                    type="text"
                    value={cliente.empresa}
                    onChange={(e) => setCliente({ ...cliente, empresa: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={cliente.nombre}
                    onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={cliente.email}
                    onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="email@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={cliente.telefono}
                    onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="+54 11 1234-5678"
                  />
                </div>
              </div>
            </div>

            {/* Detalle del Servicio */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Detalle del Servicio</h2>
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={detalleServicio}
                  onChange={setDetalleServicio}
                  placeholder="Describe detalladamente el servicio a presupuestar..."
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      [{ 'color': [] }, { 'background': [] }],
                      [{ 'align': [] }],
                      ['clean']
                    ],
                  }}
                  formats={[
                    'header', 'bold', 'italic', 'underline', 'strike',
                    'list', 'bullet', 'size', 'color', 'background', 'align'
                  ]}
                  className="quill-editor-custom"
                />
              </div>
              <style>{`
                .quill-editor-custom .ql-container {
                  background-color: rgb(31, 41, 55);
                  color: white;
                  min-height: 200px;
                  border-bottom-left-radius: 0.75rem;
                  border-bottom-right-radius: 0.75rem;
                }
                .quill-editor-custom .ql-editor {
                  min-height: 200px;
                  color: white;
                }
                .quill-editor-custom .ql-editor.ql-blank::before {
                  color: rgb(107, 114, 128);
                  font-style: normal;
                }
                .quill-editor-custom .ql-toolbar {
                  background-color: rgb(17, 24, 39);
                  border-top-left-radius: 0.75rem;
                  border-top-right-radius: 0.75rem;
                  border-color: rgb(55, 65, 81);
                }
                .quill-editor-custom .ql-toolbar .ql-stroke {
                  stroke: rgb(209, 213, 219);
                }
                .quill-editor-custom .ql-toolbar .ql-fill {
                  fill: rgb(209, 213, 219);
                }
                .quill-editor-custom .ql-toolbar button:hover,
                .quill-editor-custom .ql-toolbar button.ql-active {
                  color: rgb(34, 197, 94);
                }
                .quill-editor-custom .ql-toolbar button:hover .ql-stroke,
                .quill-editor-custom .ql-toolbar button.ql-active .ql-stroke {
                  stroke: rgb(34, 197, 94);
                }
                .quill-editor-custom .ql-toolbar button:hover .ql-fill,
                .quill-editor-custom .ql-toolbar button.ql-active .ql-fill {
                  fill: rgb(34, 197, 94);
                }
              `}</style>
            </div>

            {/* Presupuesto */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Presupuesto</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Presupuesto de Mano de Obra
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={manoObra}
                    onChange={(e) => setManoObra(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Presupuesto de Materiales
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={materiales}
                    onChange={(e) => setMateriales(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="materialesCliente"
                    checked={materialesACargoCliente}
                    onChange={(e) => setMaterialesACargoCliente(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-brand-600 focus:ring-2 focus:ring-brand-500"
                  />
                  <label htmlFor="materialesCliente" className="text-sm font-medium text-gray-300 cursor-pointer">
                    Materiales a cargo del cliente
                  </label>
                </div>
              </div>
            </div>

            {/* Notas y Validez */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Información Adicional</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Validez del presupuesto (días)</label>
                  <input
                    type="number"
                    min="1"
                    value={validez}
                    onChange={(e) => setValidez(parseInt(e.target.value) || 30)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notas</label>
                  <textarea
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="Notas adicionales para el presupuesto..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumen y Exportar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4">Resumen</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Mano de Obra:</span>
                  <span>${manoObra.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
                {materiales > 0 && (
                  <div className="flex justify-between text-gray-300">
                    <span>Materiales:</span>
                    <span>
                      {materialesACargoCliente ? (
                        <span className="text-gray-500 italic">A cargo del cliente</span>
                      ) : (
                        `$${materiales.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`
                      )}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-3 flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>IVA (21%):</span>
                  <span>${iva.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-lg font-bold text-brand-400">
                    ${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={generatePDF}
                disabled={(!detalleServicio || detalleServicio === '<p><br></p>' || detalleServicio.trim() === '') || manoObra === 0}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-brand-600 hover:bg-brand-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Exportar a PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presupuesto;
