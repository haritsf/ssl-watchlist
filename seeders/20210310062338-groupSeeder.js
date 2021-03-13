'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Groups", [
      {
        id: 1,
        group_abbr: "ISG",
        group_full: "IT Strategy & Governance",
        group_div: "ISG",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        group_abbr: "APP",
        group_full: "Application Management & Operation",
        group_div: "APP",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 3,
        group_abbr: "DCE",
        group_full: "Digital Center of Excellence",
        group_div: "DCE",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 4,
        group_abbr: "ISC",
        group_full: "Desk Information Security",
        group_div: "ISC",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 5,
        group_abbr: "KJT",
        group_full: "Kerjasama Teknologi",
        group_div: "KJT",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 6,
        group_abbr: "INF",
        group_full: "IT Infrastructure & Operation",
        group_div: "INF",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 7,
        group_abbr: "ISM",
        group_full: "IT Strategy & Management",
        group_div: "ISG",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 8,
        group_abbr: "AAR",
        group_full: "IT Application Architecture",
        group_div: "ISG",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 9,
        group_abbr: "GRC",
        group_full: "IT Governance & Risk",
        group_div: "ISG",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 10,
        group_abbr: "PMO",
        group_full: "Project Management Office IT",
        group_div: "ISG",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 11,
        group_abbr: "IAR",
        group_full: "IT Infrastructure Architecture",
        group_div: "ISG",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 12,
        group_abbr: "SQM",
        group_full: "IT Service Quality Management",
        group_div: "ISG",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 13,
        group_abbr: "IBR",
        group_full: "IT Business Relation",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 14,
        group_abbr: "CBP",
        group_full: "Core Banking Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 15,
        group_abbr: "CCP",
        group_full: "Corporate Core Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 16,
        group_abbr: "ITP",
        group_full: "International & Treasury Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 17,
        group_abbr: "MAP",
        group_full: "Management Support & Analytics Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 18,
        group_abbr: "CDP",
        group_full: "Card Management Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 19,
        group_abbr: "MDP",
        group_full: "Middleware Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 20,
        group_abbr: "ODP",
        group_full: "Outlet Delivery Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 21,
        group_abbr: "RSP",
        group_full: "Reconciliation and Settlement Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 22,
        group_abbr: "SAP",
        group_full: "Super Apps Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 23,
        group_abbr: "DCP",
        group_full: "Distribution Channel Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 24,
        group_abbr: "CMP",
        group_full: "Cash Management Platform Development",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 25,
        group_abbr: "AES",
        group_full: "Application Engineering Support",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 26,
        group_abbr: "KMG",
        group_full: "Knowledge Management",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 27,
        group_abbr: "ITG",
        group_full: "Application Integration Testing",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 28,
        group_abbr: "APQ",
        group_full: "Application Portfolio & Quality Assurance",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 29,
        group_abbr: "SDK",
        group_full: "IT Service Desk",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 30,
        group_abbr: "DBA",
        group_full: "Database Administration Operation Services",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 31,
        group_abbr: "CAO",
        group_full: "Core & Host Application Operation Services",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 32,
        group_abbr: "SAO",
        group_full: "Super Apps Operation Services",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 33,
        group_abbr: "DAO",
        group_full: "Distribution and Outlet Application Operation Services",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 34,
        group_abbr: "MDO",
        group_full: "Middleware Application Operation Services",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 35,
        group_abbr: "MAO",
        group_full: "Management Support Application Operation Services",
        group_div: "APP",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 36,
        group_abbr: "DST",
        group_full: "Digital Strategy",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 37,
        group_abbr: "DBD",
        group_full: "Digital Banking Development",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 38,
        group_abbr: "FBP",
        group_full: "Future Banking Platform",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 39,
        group_abbr: "DDE",
        group_full: "Digital Design & Experience",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 40,
        group_abbr: "DSE",
        group_full: "Digital Service Enhancement",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 41,
        group_abbr: "DSS",
        group_full: "Digital Service Support",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 42,
        group_abbr: "DBM",
        group_full: "Digital Business Marketing",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 43,
        group_abbr: "DAP",
        group_full: "Data Architecture and Platform",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 44,
        group_abbr: "EDP",
        group_full: "Fungsi Data Policy & Strategy",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 45,
        group_abbr: "EDQ",
        group_full: "Enterprise Data Quality",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 46,
        group_abbr: "BDA",
        group_full: "Big Data & Analytics",
        group_div: "DCE",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 47,
        group_abbr: "SEA",
        group_full: "Security Engineering & Asset ",
        group_div: "ISC",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 48,
        group_abbr: "PRM",
        group_full: "Program, Security Governance, Risk & Compliance",
        group_div: "ISC",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 49,
        group_abbr: "CIA",
        group_full: "Cyber Intelligence Analysis Center",
        group_div: "ISC",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 50,
        group_abbr: "OST",
        group_full: "IT Security Operation",
        group_div: "ISC",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 51,
        group_abbr: "APS",
        group_full: "Application Security",
        group_div: "ISC",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 52,
        group_abbr: "ECS",
        group_full: "Ecosystem Strategy",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 53,
        group_abbr: "ECR",
        group_full: "Ecosystem Relation",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 54,
        group_abbr: "ECN",
        group_full: "Ecosystem Institution",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 55,
        group_abbr: "ECP",
        group_full: "Ecosystem Platform Development",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 56,
        group_abbr: "INP",
        group_full: "Institutions Platform Development",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 57,
        group_abbr: "EQA",
        group_full: "Ecosystem Quality Assurance",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 58,
        group_abbr: "IMO",
        group_full: "Implementation, Monitoring & Operational",
        group_div: "KJT",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 59,
        group_abbr: "PIN",
        group_full: "PMO Infrastructure",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 60,
        group_abbr: "OSP",
        group_full: "IT Operation Support & Partner Management",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 61,
        group_abbr: "CDE",
        group_full: "Computing Design & Engineering",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 62,
        group_abbr: "CPO",
        group_full: "Computing Platform Operation",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 63,
        group_abbr: "DCI",
        group_full: "Data Center Infrastructure Operation",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 64,
        group_abbr: "DRM",
        group_full: "Disaster Recovery Management",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 65,
        group_abbr: "CLQ",
        group_full: "Configuration, Licences & QA Management",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 66,
        group_abbr: "CPL",
        group_full: "Capacity Planning & Optimization",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 67,
        group_abbr: "SOC",
        group_full: "Spacecraft Operation Center",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 68,
        group_abbr: "PAC",
        group_full: "Payload & Carrier System Monitoring",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 69,
        group_abbr: "RGU",
        group_full: "Regulatory & Spectrum Management",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 70,
        group_abbr: "GCS",
        group_full: "Ground Communication System",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 71,
        group_abbr: "SQA",
        group_full: "Satellite Quality Assurance",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 72,
        group_abbr: "NOC",
        group_full: "Network Operation Center",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 73,
        group_abbr: "CAN",
        group_full: "Core Network Operation",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 74,
        group_abbr: "WAN",
        group_full: "Wide Area Network Operation",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 75,
        group_abbr: "NIC",
        group_full: "Network Configuration & Implementation",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 76,
        group_abbr: "NDE",
        group_full: "Network Design & Engineering",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 77,
        group_abbr: "NQA",
        group_full: "Network Quality Assurance",
        group_div: "INF",
        group_is_group: "1",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 78,
        group_abbr: "KKD",
        group_full: "Kartu Kredit",
        group_div: "KKD",
        group_is_group: "0",
        group_is_dto: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 79,
        group_abbr: "RPT",
        group_full: "Retail Payment",
        group_div: "RPT",
        group_is_group: "0",
        group_is_dto: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 80,
        group_abbr: "LCC",
        group_full: "Layanan & Contact Center",
        group_div: "LCC",
        group_is_group: "0",
        group_is_dto: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 81,
        group_abbr: "JBR",
        group_full: "Jaringan Bisnis Ritel",
        group_div: "JBR",
        group_is_group: "0",
        group_is_dto: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 82,
        group_abbr: "TRB",
        group_full: "Transaction Banking",
        group_div: "TRB",
        group_is_group: "0",
        group_is_dto: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 84,
        group_abbr: "OPK",
        group_full: "Operasional Kredit",
        group_div: "OPK",
        group_is_group: "0",
        group_is_dto: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 85,
        group_abbr: "DDB",
        group_full: "Digital Banking Development and Operations",
        group_div: "DDB",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 86,
        group_abbr: "EDM",
        group_full: "Enterprise Data Management",
        group_div: "EDM",
        group_is_group: "0",
        group_is_dto: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Groups", null, {})
  }
};
