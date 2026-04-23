// Read-only demo firms — always visible to all users
// Musterfirma 1: Detailhandel | Musterfirma 2: Energie

const DEMO_FIRMS = [
  {
    firm: 'Musterfirma Detailhandel AG',
    sector: 'Detailhandel & E-Commerce',
    isDemo: true,
    portfolio: [
      // KERNAPPLIKATIONEN
      {
        id: 1001, name: 'SAP S/4HANA (ERP)', type: 'kern', date: '15.01.2025',
        scores: [4.2, 4.0, 3.5, 3.8, 3.5, 3.2],
        total: 3.87, answered: 28, totalQ: 28,
        answers: {}
      },
      {
        id: 1002, name: 'SAP Commerce Cloud (E-Commerce)', type: 'kern', date: '15.01.2025',
        scores: [4.5, 3.8, 3.5, 3.2, 3.8, 3.5],
        total: 3.93, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 1003, name: 'Manhattan Associates WMS (Lager)', type: 'kern', date: '16.01.2025',
        scores: [3.8, 4.2, 3.0, 3.5, 4.0, 4.2],
        total: 3.84, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 1004, name: 'Salesforce CRM', type: 'kern', date: '16.01.2025',
        scores: [3.5, 3.2, 3.8, 2.8, 3.5, 2.5],
        total: 3.35, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 1005, name: 'Azure Data Platform (BI/Analytics)', type: 'kern', date: '17.01.2025',
        scores: [4.8, 4.5, 3.2, 3.0, 4.5, 3.0],
        total: 4.13, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 1006, name: 'Microsoft 365 (Produktivität)', type: 'kern', date: '17.01.2025',
        scores: [3.2, 4.2, 3.0, 2.5, 3.0, 2.0],
        total: 3.25, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 1007, name: 'Adyen (Payment Processing)', type: 'kern', date: '18.01.2025',
        scores: [3.0, 3.5, 2.5, 3.8, 2.8, 2.0],
        total: 3.04, answered: 28, totalQ: 28, answers: {}
      },
      // SUPPORTAPPLIKATIONEN
      {
        id: 1008, name: 'Yokoy (Spesenverwaltung)', type: 'support', date: '20.01.2025',
        scores: [2.0, 2.5, 3.2, 1.8, 2.0, 1.5],
        total: 2.27, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 1009, name: 'Workday HCM (HR)', type: 'support', date: '20.01.2025',
        scores: [2.5, 3.0, 2.8, 2.8, 2.5, 1.8],
        total: 2.66, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 1010, name: 'ServiceNow (IT-Ticketing)', type: 'support', date: '21.01.2025',
        scores: [3.0, 3.2, 2.5, 2.2, 3.0, 2.0],
        total: 2.85, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 1011, name: 'Confluence / Jira (Collaboration)', type: 'support', date: '21.01.2025',
        scores: [2.2, 2.8, 2.0, 2.0, 2.5, 1.5],
        total: 2.33, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 1012, name: 'Coupa (Procurement)', type: 'support', date: '22.01.2025',
        scores: [2.5, 3.5, 2.8, 2.2, 2.8, 1.8],
        total: 2.78, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 1013, name: 'Docusign (E-Signatur)', type: 'support', date: '22.01.2025',
        scores: [1.8, 2.2, 2.5, 2.5, 1.8, 1.2],
        total: 2.08, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 1014, name: 'Zoom (Videokonferenz)', type: 'support', date: '23.01.2025',
        scores: [1.5, 2.0, 1.8, 1.8, 1.5, 1.2],
        total: 1.74, answered: 18, totalQ: 18, answers: {}
      }
    ]
  },
  {
    firm: 'Musterfirma Energie AG',
    sector: 'Energie & Versorgung',
    isDemo: true,
    portfolio: [
      // KERNAPPLIKATIONEN
      {
        id: 2001, name: 'Azure IoT Hub (Netzleitsystem)', type: 'kern', date: '10.02.2025',
        scores: [4.8, 4.5, 3.8, 4.0, 4.5, 4.8],
        total: 4.47, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 2002, name: 'SAP IS-U (Abrechnungssystem)', type: 'kern', date: '10.02.2025',
        scores: [4.2, 4.0, 4.0, 3.8, 3.5, 3.8],
        total: 3.97, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 2003, name: 'Azure Digital Twins (Netzsimulation)', type: 'kern', date: '11.02.2025',
        scores: [5.0, 4.8, 3.5, 3.5, 4.8, 4.5],
        total: 4.60, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 2004, name: 'OSIsoft PI System (Prozessdaten)', type: 'kern', date: '11.02.2025',
        scores: [4.5, 3.8, 3.8, 3.2, 4.2, 4.5],
        total: 4.09, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 2005, name: 'Microsoft Azure ML (Prognosen)', type: 'kern', date: '12.02.2025',
        scores: [4.8, 3.5, 3.2, 3.0, 4.0, 3.5],
        total: 3.87, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 2006, name: 'Salesforce Energy Cloud (CRM)', type: 'kern', date: '12.02.2025',
        scores: [3.5, 3.8, 3.2, 3.0, 3.5, 2.8],
        total: 3.44, answered: 28, totalQ: 28, answers: {}
      },
      {
        id: 2007, name: 'SAP S/4HANA (Finance/ERP)', type: 'kern', date: '13.02.2025',
        scores: [4.0, 4.2, 3.8, 3.5, 3.8, 3.2],
        total: 3.86, answered: 28, totalQ: 28, answers: {}
      },
      // SUPPORTAPPLIKATIONEN
      {
        id: 2008, name: 'Yokoy (Spesenverwaltung)', type: 'support', date: '17.02.2025',
        scores: [2.0, 2.5, 2.2, 2.0, 2.0, 1.5],
        total: 2.19, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 2009, name: 'SAP SuccessFactors (HR)', type: 'support', date: '17.02.2025',
        scores: [2.8, 3.2, 2.5, 2.8, 2.5, 1.8],
        total: 2.74, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 2010, name: 'Learnerbly (Lernplattform)', type: 'support', date: '18.02.2025',
        scores: [1.8, 2.0, 1.8, 2.2, 1.8, 1.2],
        total: 1.89, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 2011, name: 'ServiceNow (IT-Service-Management)', type: 'support', date: '18.02.2025',
        scores: [3.0, 3.2, 2.8, 2.5, 3.0, 2.0],
        total: 2.90, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 2012, name: 'Microsoft Teams (Kommunikation)', type: 'support', date: '19.02.2025',
        scores: [2.5, 3.5, 2.2, 2.0, 2.5, 1.8],
        total: 2.63, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 2013, name: 'Logi-Net (Flottenmanagement)', type: 'support', date: '19.02.2025',
        scores: [2.2, 2.8, 2.5, 2.2, 2.2, 2.0],
        total: 2.37, answered: 18, totalQ: 18, answers: {}
      },
      {
        id: 2014, name: 'DocuWare (Dokumentenmanagement)', type: 'support', date: '20.02.2025',
        scores: [2.5, 2.8, 2.0, 2.5, 2.2, 1.8],
        total: 2.44, answered: 18, totalQ: 18, answers: {}
      }
    ]
  }
];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  return res.status(200).json({ firms: DEMO_FIRMS });
};
