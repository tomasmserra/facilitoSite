import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center justify-start mb-6">
              <img
                src="/img/logoTrnasparenteVerde.png"
                alt="Facilito.ar"
                className="h-36 w-auto transition-transform group-hover:scale-110"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Automatizamos el presente para construir el futuro de tu empresa. Soluciones tecnológicas ágiles y robustas.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Servicios</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-400 transition-colors">RPA & Automatización</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Desarrollo Web</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Soporte IT</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Cloud Computing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Compañía</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#about" className="hover:text-brand-400 transition-colors">Nosotros</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Casos de Éxito</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Términos de Servicio</a></li>
            </ul>

            <div className="mt-8 flex space-x-5">
              <a href="#" className="text-gray-500 hover:text-brand-400 transition-colors transform hover:-translate-y-1"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-gray-500 hover:text-brand-400 transition-colors transform hover:-translate-y-1"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-500 hover:text-brand-400 transition-colors transform hover:-translate-y-1"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Facilito.ar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;