import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-32 overflow-hidden bg-gray-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-900 border border-brand-900/50 text-brand-400 text-sm font-semibold mb-6 shadow-sm shadow-brand-900/20">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
              Innovación Tecnológica
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Simplificamos procesos, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-200">potenciamos tu futuro.</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              En Facilito.ar transformamos la complejidad en eficiencia. Especialistas en automatización, desarrollo de software a medida y soporte técnico integral.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 md:text-lg shadow-lg shadow-brand-900/50 hover:shadow-brand-500/30 transition-all transform hover:-translate-y-0.5">
                Empezar ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#services" className="inline-flex justify-center items-center px-8 py-3.5 border border-gray-700 text-base font-medium rounded-xl text-gray-300 bg-gray-900 hover:bg-gray-800 hover:text-white md:text-lg transition-all">
                Ver Servicios
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-brand-500 mr-2" />
                Soporte 24/7
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-brand-500 mr-2" />
                Tecnología de punta
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-brand-500 mr-2" />
                Resultados medibles
              </div>
            </div>
          </div>

          <div className="relative">
             {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-800 p-2">
                <div className="absolute inset-0 bg-brand-500/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" 
                    alt="Equipo trabajando" 
                    className="rounded-xl w-full object-cover h-[400px] lg:h-[500px] opacity-90"
                />
                <div className="absolute -bottom-6 -left-6 bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800 max-w-xs hidden md:block z-20">
                    <div className="flex items-center justify-center space-x-4 mb-3">
                        <div className="bg-brand-900/50 p-3 rounded-full">
                            <CheckCircle2 className="h-6 w-6 text-brand-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-400">Eficiencia</p>
                            <p className="text-2xl font-bold text-white">+45%</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">Incremento promedio en productividad para nuestros clientes.</p>
                </div>
            </div>
             {/* Decorative blob */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-500/10 blur-3xl rounded-full pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;