import React from 'react';
import { Target, Users, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gray-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-sm font-bold text-brand-500 tracking-wider uppercase">Sobre Facilito.ar</h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Socios estratégicos en tu evolución digital
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 h-96 group">
                 <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Reunión de equipo" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                    <p className="text-2xl font-bold mb-2">Compromiso Total</p>
                    <p className="text-gray-300">Acompañamos cada etapa de tu transformación.</p>
                </div>
            </div>

            <div className="space-y-10">
                <p className="text-lg text-gray-300 leading-relaxed">
                    Facilito.ar nació con una misión clara: <strong className="text-brand-400">democratizar el acceso a la tecnología</strong>. Entendemos que la innovación no debe ser una barrera, sino el motor que impulsa tus objetivos comerciales.
                </p>

                <div className="space-y-8">
                    <div className="flex group">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-800 text-brand-500 border border-gray-700 group-hover:border-brand-500/50 transition-colors">
                                <Target className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h4 className="text-lg leading-6 font-bold text-white group-hover:text-brand-400 transition-colors">Enfoque en Resultados</h4>
                            <p className="mt-2 text-base text-gray-400">
                                No implementamos tecnología por moda. Analizamos tu negocio y aplicamos soluciones que impactan directamente en tu rentabilidad.
                            </p>
                        </div>
                    </div>

                    <div className="flex group">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-800 text-brand-500 border border-gray-700 group-hover:border-brand-500/50 transition-colors">
                                <Users className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h4 className="text-lg leading-6 font-bold text-white group-hover:text-brand-400 transition-colors">Talento Humano</h4>
                            <p className="mt-2 text-base text-gray-400">
                                Nuestro equipo combina ingenieros expertos con analistas de negocio, asegurando que hablamos tu mismo idioma.
                            </p>
                        </div>
                    </div>
                    <div className="flex group">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-800 text-brand-500 border border-gray-700 group-hover:border-brand-500/50 transition-colors">
                                <Shield className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <h4 className="text-lg leading-6 font-bold text-white group-hover:text-brand-400 transition-colors">Seguridad y Confianza</h4>
                            <p className="mt-2 text-base text-gray-400">
                                Tratamos tus datos y sistemas con los más altos estándares de seguridad y confidencialidad.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;