import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 border-t border-gray-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-6">
              Hablemos de tu próximo proyecto
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              ¿Listo para automatizar tu empresa o desarrollar ese sistema que tenes en mente? Completa el formulario o contáctanos directamente.
            </p>

            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 group-hover:border-brand-500/50 transition-colors">
                    <Phone className="h-6 w-6 text-brand-500" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-white">Teléfono / WhatsApp</h3>
                  <p className="mt-1 text-gray-400">+54 2936 408362</p>
                  <p className="text-sm text-gray-600">Lun-Vie 8am a 7pm</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 group-hover:border-brand-500/50 transition-colors">
                    <Mail className="h-6 w-6 text-brand-500" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-white">Email</h3>
                  <p className="mt-1 text-gray-400">contacto@facilito.ar</p>
                  <p className="text-sm text-gray-600">Respondemos en menos de 24hs</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 group-hover:border-brand-500/50 transition-colors">
                    <MapPin className="h-6 w-6 text-brand-500" />
                  </div>
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-white">Oficinas</h3>
                  <p className="mt-1 text-gray-400">Carhué<br />Provincia de Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800/50 rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-700 backdrop-blur-sm">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                <div className="bg-green-500/20 p-6 rounded-full mb-6">
                  <Send className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Mensaje Enviado!</h3>
                <p className="text-gray-400 mt-2">Gracias por contactarnos. Te responderemos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="block w-full rounded-xl border-gray-600 shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-gray-900 px-4 py-3.5 text-white placeholder-gray-500 transition-colors outline-none border focus:ring-1"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email corporativo
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="block w-full rounded-xl border-gray-600 shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-gray-900 px-4 py-3.5 text-white placeholder-gray-500 transition-colors outline-none border focus:ring-1"
                    placeholder="juan@empresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Servicio de interés
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      className="block w-full rounded-xl border-gray-600 shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-gray-900 px-4 py-3.5 text-white outline-none border focus:ring-1 appearance-none"
                    >
                      <option>Automatización de Procesos</option>
                      <option>Desarrollo de Software</option>
                      <option>Soporte Técnico</option>
                      <option>Consultoría General</option>
                      <option>Otro</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="block w-full rounded-xl border-gray-600 shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-gray-900 px-4 py-3.5 text-white placeholder-gray-500 transition-colors outline-none border focus:ring-1"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:ring-offset-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-95 hover:shadow-brand-500/25"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Enviando...
                    </span>
                  ) : 'Enviar Consulta'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;