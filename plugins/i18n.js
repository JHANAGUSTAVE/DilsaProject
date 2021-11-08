import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        tellMeMore: 'Tell Me More',
        ItsNiceToMeetYou: "It's Nice To Meet You",
        Prod: "Products",
        SACS: "SUPPORT AND CUSTOMER SERVICE",
        WTDILSA: "Welcome To Diesel Injection Laboratory S.A!",
        Serv: "Services",
        Abt: "About",
        Tm: "Team",
        Ctc: "Contact",
        SACSTXT: "The company is very sensitive to the customer satisfaction.",
        adn: "Acquisition and need",
        adntxt: "The company  purchased new Hartridge equipment Sabre CRI Master and  EU INJECTOR TESTER AND ACCESSORIES and Motortool MT-5600D.",
        Rad: "Research and development",
        ctu: "Contact Us",
        Radtxt: "Highest standard of performance in delivering services is one of the key of success of the company. PIS keeps an open eye on the latest development of the latest technologies and equipment available worldwide in the field of diesel systems.",
        SACSTXT1: "A team of two persons is dedicated five days a week to answer the customer's inquiries and complains. The company is also interested in the development of clean energy such biodiesel, solar and wind energies.",
        ctutxt: "DIL is located at 29, chareron street, Port-au-Prince, Haiti in  a two stages built facility of 600 m2. At this time, the company operates also at 29 Lafleur Ducheine street  for the administration and storage and the modern workshop in a hall of 200 m2.",
        Lang: "Language",
        OHB: "Our Humble Beginnings",
        tOHB: "DIL  is the foremost diesel laboratory in Haiti. It is specialized in testing, repairing and calibrating pumps, injectors, turbo chargers and most types of other diesel injectors (marine and generators applications).",
        AAB: "An Agency is Born",
        tAAB: "Diesel Injection Laboratory SA ( Fomer Precision Injection Shop ) is a well established haitian diesel workshop company. The company has been operating in Haiti since 1992.",
        TFS: "Transition to Full Service",
        tTFS:"Highest standard of performance in delivering services is one of the key of success of the company. PIS keeps an open eye on the latest development of the latest technologies and equipment available worldwide in the field of diesel systems. The company is also interested in the development of clean energy such biodiesel, solar and wind energies.",
        PTE: "Phase Two Expansion",
        tPTE: "One of its goals is to meet the needs of its customers in the respect of the environment. The company  purchased new Hartridge equipment Sabre CRI Master and  EU INJECTOR TESTER AND ACCESSORIES and Motortool MT-5600D, .",
   
    },
    'fr':{
        tellMeMore: 'En savoir plus',
        ItsNiceToMeetYou: 'Ravi de vous rencontrer',
        Prod: "Produits",
        SACS: "ASSISTANCE ET SERVICE CLIENTÈLE",
        WTDILSA: "Bienvenue a Diesel Injection Laboratory S.A!",
        Serv: "Prestations de service",
        Abt: "A propos",
        Tm: "Équipe",
        Ctc: "Contact",
        SACSTXT: "L'entreprise est très sensible à la satisfaction du client. ",
        adn: "Acquisition et besoin",
        adntxt: "La société a acheté de nouveaux équipements Hartridge Sabre CRI Master et EU INJECTOR TESTER AND ACCESSORIES et Motortool MT-5600D.",
        Rad: "Recherche et développement",
        ctu: "contacter Nous",
        Radtxt: "Le plus haut niveau de performance dans la prestation de services est l'une des clés du succès de l'entreprise. PIS garde un œil ouvert sur les derniers développements des dernières technologies et équipements disponibles dans le monde entier dans le domaine des systèmes diesel.",
        SACSTXT1: "« Une équipe de deux personnes est dédiée cinq jours par semaine pour répondre aux demandes et réclamations des clients. L'entreprise s'intéresse également au développement d'énergies propres telles que le biodiesel, les énergies solaire et éolienne.",
        ctutxt: "DIL est situé au 29, rue chareron, Port-au-Prince, Haïti dans une installation construite en deux étapes de 600 m2. À cette époque, l'entreprise opère également au 29 rue Lafleur Ducheine pour l'administration et l'entreposage et l'atelier moderne dans un hall de 200 m2.",
        Lang: "Langue",
        OHB: "Nos humbles débuts",
        tOHB: "DIL est le premier laboratoire diesel en Haïti. Elle est spécialisée dans les tests, la réparation et l'étalonnage de pompes, d'injecteurs, de turbocompresseurs et de la plupart des autres types d'injecteurs diesel (applications marines et groupes électrogènes).",
        AAB: "Une agence est née",
        tAAB: "Diesel Injection Laboratory SA (Fomer Precision Injection Shop) est une entreprise haïtienne d'ateliers diesel bien établie. L'entreprise est présente en Haïti depuis 1992.",
        TFS: "Transition vers le service complet",
        tTFS: "Le plus haut niveau de performance dans la prestation de services est l'une des clés du succès de l'entreprise. PIS garde un œil ouvert sur les derniers développements des dernières technologies et équipements disponibles dans le monde entier dans le domaine des systèmes diesel. L'entreprise s'intéresse également au développement d'énergies propres telles que le biodiesel, les énergies solaire et éolienne.",
        PTE: "Expansion de la phase deux",
        tPTE: "L'un de ses objectifs est de répondre aux besoins de ses clients dans le respect de l'environnement. La société a acheté de nouveaux équipements Hartridge Sabre CRI Master et EU INJECTOR TESTER AND ACCESSORIES et Motortool MT-5600D, .",
   
    },
    'es': {
        tellMeMore: 'Dime más',
        ItsNiceToMeetYou: 'Encantado de conocerte',
        Prod: "Productos",
        SACS: "SOPORTE Y SERVICIO AL CLIENTE",
        WTDILSA: "¡Bienvenido a Diesel Injection Laboratory S.A!",
        Serv: "Servicios",
        Abt: "Sobre",
        Tm: "Equipo",
        Ctc: "Contacto",
        SACSTXT: "La empresa es muy sensible a la satisfacción del cliente.",
        adn: "Adquisicion y necesidad",
        adntxt: "La empresa compró nuevos equipos Hartridge Sabre CRI Master y EU INYECTOR TESTER Y ACCESORIOS y Motortool MT-5600D.",
        Rad: "Investigación y desarrollo",
        ctu: "Contacta con nosotros",
        Radtxt: "El más alto nivel de desempeño en la prestación de servicios es una de las claves del éxito de la empresa. PIS está atento a los últimos desarrollos de las últimas tecnologías y equipos disponibles en todo el mundo en el campo de los sistemas diésel. ",
        SACSTXT1: "Un equipo de dos personas se dedica cinco días a la semana a atender las consultas y quejas de los clientes. La empresa también está interesada en el desarrollo de energías limpias como el biodiesel, la solar y la eólica.",
        ctutxt: "DIL está ubicado en 29, chareron street, Port-au-Prince, Haití en una instalación construida en dos etapas de 600 m2. En este momento, la empresa opera también en el 29 de la calle Lafleur Ducheine para la administración y almacenamiento y el moderno taller en una sala de 200 m2.",
        Lang: "idioma",
        OHB: "Nuestros humildes comienzos",
        tOHB: "DIL es el laboratorio de diesel más importante de Haití. Está especializado en probar, reparar y calibrar bombas, inyectores, turbocompresores y la mayoría de los otros inyectores diésel (aplicaciones marinas y de generadores).",
        AAB: "Nace una agencia",
        tAAB: "Diesel Injection Laboratory SA (Fomer Precision Injection Shop) es una empresa haitiana de talleres de diésel bien establecida. La empresa opera en Haití desde 1992.",
        TFS: "Transición al servicio completo",
        tTFS: "El más alto nivel de desempeño en la prestación de servicios es una de las claves del éxito de la empresa. PIS está atento a los últimos desarrollos de las últimas tecnologías y equipos disponibles en todo el mundo en el campo de los sistemas diésel. La empresa también está interesada en el desarrollo de energías limpias como biodiesel, energía solar y eólica.",
        PTE: "Expansión de la fase dos",
        tPTE: "Uno de sus objetivos es satisfacer las necesidades de sus clientes en el respeto al medio ambiente. La empresa compró nuevos equipos Hartridge Sabre CRI Master y EU INYECTOR TESTER Y ACCESORIOS y Motortool MT-5600D." ,


    }
};

const i18n = new VueI18n({
    locale: 'e', // set locale
    fallbackLocale: 'fr', // set fallback locale
    messages, // set locale messages
});

export default i18n;
