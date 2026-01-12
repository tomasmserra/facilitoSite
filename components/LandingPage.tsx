import React, { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Target, Users, Shield, Zap, TrendingUp, Award, Clock, Headphones, Code, Cpu, Database, BarChart, Download, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const LandingPage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Importar html2canvas dinámicamente
      const html2canvas = (await import('html2canvas')).default;
      
      // Ocultar el botón de descarga temporalmente
      const downloadButton = document.querySelector('[data-pdf-button]') as HTMLElement;
      if (downloadButton) downloadButton.style.display = 'none';
      
      // Capturar el contenido con mejor calidad
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#111827', // gray-950
        windowWidth: contentRef.current.scrollWidth,
        windowHeight: contentRef.current.scrollHeight,
        allowTaint: true,
        removeContainer: false,
      });
      
      // Restaurar el botón
      if (downloadButton) downloadButton.style.display = 'none';
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
      
      // Calcular escala: queremos que el ancho del canvas quepa en pdfWidth
      // jsPDF trabaja en mm, necesitamos convertir píxeles a mm
      // A 96 DPI: 1px = 0.264583mm, pero como scale=2, dividimos por 2
      const mmPerPx = 0.264583;
      const canvasWidthMm = (canvas.width / 2) * mmPerPx;
      const canvasHeightMm = (canvas.height / 2) * mmPerPx;
      
      // Factor de escala para que quepa en el ancho
      const scale = pdfWidth / canvasWidthMm;
      const scaledHeightMm = canvasHeightMm * scale;
      
      // Número de páginas necesarias
      const totalPages = Math.ceil(scaledHeightMm / pdfHeight);
      
      // Dividir en páginas
      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }
        
        // Calcular qué parte del canvas corresponde a esta página
        const pageStartMm = page * pdfHeight;
        const pageEndMm = Math.min((page + 1) * pdfHeight, scaledHeightMm);
        const pageHeightMm = pageEndMm - pageStartMm;
        
        // Convertir a píxeles del canvas original
        const pageStartPx = (pageStartMm / scale / mmPerPx) * 2;
        const pageHeightPx = (pageHeightMm / scale / mmPerPx) * 2;
        
        // Crear canvas para esta página
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.max(1, Math.ceil(pageHeightPx));
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          // Copiar la porción correspondiente
          pageCtx.drawImage(
            canvas,
            0, Math.floor(pageStartPx),
            canvas.width, Math.ceil(pageHeightPx),
            0, 0,
            canvas.width, Math.ceil(pageHeightPx)
          );
          
          const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
          
          // Agregar al PDF
          pdf.addImage(
            pageImgData,
            'PNG',
            0,
            0,
            pdfWidth,
            pageHeightMm,
            undefined,
            'FAST'
          );
        }
      }
      
      pdf.save('facilito-ar-presentacion.pdf');
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div ref={contentRef} className="min-h-screen bg-gray-950 text-white relative">
      {/* Botón de descarga PDF */}
    
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-900/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/img/logoTrnasparenteVerde.png"
                alt="Facilito.ar"
                className="h-32 w-auto"
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-brand-900/50 text-brand-400 text-sm font-semibold mb-8 shadow-lg shadow-brand-900/20">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
              Soluciones Tecnológicas de Alto Impacto
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-white">Transformamos tu negocio con</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-teal-300 to-brand-500">
                tecnología inteligente
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Especialistas en automatización, desarrollo de software a medida y soporte técnico integral.
              <br />
              <strong className="text-brand-400">Democratizamos el acceso a la tecnología</strong> para potenciar tu crecimiento.
            </p>

            {/* CTA Buttons */}
            
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="nosotros" className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-500 tracking-wider uppercase mb-4">Sobre Facilito.ar</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Socios estratégicos en tu evolución digital
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Nacimos con la misión de hacer accesible la tecnología de vanguardia para empresas de todos los tamaños.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                En <strong className="text-brand-400">Facilito.ar</strong> entendemos que cada empresa tiene necesidades únicas. 
                Por eso, no ofrecemos soluciones genéricas, sino <strong className="text-brand-400">tecnología a medida</strong> que se adapta 
                perfectamente a tus procesos y objetivos comerciales.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Nuestro equipo combina <strong className="text-brand-400">experiencia técnica</strong> con una profunda comprensión 
                del negocio, garantizando que cada implementación genere valor real y medible.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-brand-400">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Enfoque en resultados</span>
                </div>
                <div className="flex items-center text-brand-400">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Tecnología de punta</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 h-96 group">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Equipo Facilito.ar"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-brand-500/50 transition-all group">
              <div className="bg-brand-600/20 p-4 rounded-xl w-fit mb-6 group-hover:bg-brand-600/30 transition-colors">
                <Target className="h-8 w-8 text-brand-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Enfoque en Resultados</h4>
              <p className="text-gray-400">
                No implementamos tecnología por moda. Analizamos tu negocio y aplicamos soluciones que impactan directamente en tu rentabilidad.
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-brand-500/50 transition-all group">
              <div className="bg-brand-600/20 p-4 rounded-xl w-fit mb-6 group-hover:bg-brand-600/30 transition-colors">
                <Shield className="h-8 w-8 text-brand-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Compromiso Total</h4>
              <p className="text-gray-400">
                Acompañamos cada etapa de tu transformación digital, desde la consultoría inicial hasta el soporte continuo.
              </p>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-brand-500/50 transition-all group">
              <div className="bg-brand-600/20 p-4 rounded-xl w-fit mb-6 group-hover:bg-brand-600/30 transition-colors">
                <Zap className="h-8 w-8 text-brand-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Agilidad y Eficiencia</h4>
              <p className="text-gray-400">
                Metodologías ágiles que garantizan entregas rápidas sin comprometer la calidad ni la seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-brand-500 tracking-wider uppercase mb-4">Nuestros Servicios</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Tecnología para escalar tu negocio
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Un ecosistema completo de servicios diseñado para optimizar recursos y maximizar resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: 'Automatización de Procesos (RPA)',
                description: 'Eliminamos tareas repetitivas mediante robots de software, permitiendo que tu equipo se enfoque en lo estratégico.',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Code,
                title: 'Desarrollo de Software',
                description: 'Creamos soluciones a medida, desde aplicaciones web progresivas hasta sistemas de gestión internos complejos.',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: Headphones,
                title: 'Soporte IT Corporativo',
                description: 'Mantenimiento preventivo y correctivo de infraestructura, helpdesk y soporte a usuarios nivel 1, 2 y 3.',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: BarChart,
                title: 'Consultoría en Datos',
                description: 'Transformamos tus datos en información valiosa mediante dashboards interactivos y análisis predictivo.',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Database,
                title: 'Integración de Sistemas',
                description: 'Conectamos tus herramientas (CRM, ERP, Marketing) para un flujo de información unificado y sin errores.',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: Zap,
                title: 'Inteligencia Artificial',
                description: 'Implementamos soluciones de IA generativa para atención al cliente y análisis documental.',
                color: 'from-yellow-500 to-orange-500'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-gray-950 rounded-2xl p-8 border border-gray-800 hover:border-brand-500/50 shadow-xl hover:shadow-2xl hover:shadow-brand-900/20 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`bg-gradient-to-br ${service.color} p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
