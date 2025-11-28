import React from 'react';
import { Cpu, Code, Headset, BarChart, Settings, Database, LucideIcon } from 'lucide-react';
import { Service } from '../types';

const Services: React.FC = () => {
  const servicesList: (Service & { Icon: LucideIcon })[] = [
    {
      id: '1',
      title: 'Automatización de Procesos (RPA)',
      description: 'Eliminamos tareas repetitivas mediante robots de software, permitiendo que tu equipo se enfoque en lo estratégico.',
      iconName: 'Cpu',
      Icon: Settings
    },
    {
      id: '2',
      title: 'Desarrollo de Software',
      description: 'Creamos soluciones a medida, desde aplicaciones web progresivas hasta sistemas de gestión internos complejos.',
      iconName: 'Code',
      Icon: Code
    },
    {
      id: '3',
      title: 'Soporte IT Corporativo',
      description: 'Mantenimiento preventivo y correctivo de infraestructura, helpdesk y soporte a usuarios nivel 1, 2 y 3.',
      iconName: 'Headset',
      Icon: Headset
    },
    {
      id: '4',
      title: 'Consultoría en Datos',
      description: 'Transformamos tus datos en información valiosa mediante dashboards interactivos y análisis predictivo.',
      iconName: 'BarChart',
      Icon: BarChart
    },
     {
      id: '5',
      title: 'Integración de Sistemas',
      description: 'Conectamos tus herramientas (CRM, ERP, Marketing) para un flujo de información unificado y sin errores.',
      iconName: 'Cpu',
      Icon: Database
    },
     {
      id: '6',
      title: 'Inteligencia Artificial',
      description: 'Implementamos soluciones de IA generativa para atención al cliente y análisis documental.',
      iconName: 'Cpu',
      Icon: Cpu
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-900 relative scroll-mt-20">
       {/* Background pattern */}
       <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-500 tracking-wider uppercase">Nuestras Soluciones</h2>
          <p className="mt-2 text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Tecnología para escalar tu negocio
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-400 mx-auto">
            Un ecosistema de servicios diseñado para optimizar recursos y maximizar resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div key={service.id} className="group bg-gray-950 p-8 rounded-2xl border border-gray-800 hover:border-brand-500/50 shadow-lg hover:shadow-2xl hover:shadow-brand-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gray-900 border border-gray-800 text-brand-500 group-hover:bg-brand-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 mb-6 shadow-inner">
                <service.Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;