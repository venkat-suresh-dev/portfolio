export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  credentialId?: string;
};

export const certifications: readonly Certification[] = [
  {
    id: "azure-solutions-architect-expert",
    name: "Microsoft Certified Azure Solutions Architect Expert",
    issuer: "Microsoft",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/VenkataramananSuresh-4508/3819ACFD3CDD0AE3?sharingId=F658DDE415E8BFD5",
  },
  {
    id: "databricks-spark-associate",
    name: "Databricks Certified Associate Developer for Apache Spark 3.0",
    issuer: "Databricks",
  },
  {
    id: "astronomer-airflow-fundamentals",
    name: "Astronomer Certification for Apache Airflow Fundamentals",
    issuer: "Astronomer",
    credentialUrl:
      "https://www.credly.com/badges/c8f382ae-2212-4bd1-8115-28115e86f220/",
  },
  {
    id: "datacamp-data-scientist-professional",
    name: "DataCamp Certified Data Scientist Professional",
    issuer: "DataCamp",
    credentialUrl: "https://www.datacamp.com/certificate/DS0028598552271",
  },
];
