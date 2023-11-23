import { ApiListNode } from "../store/tree";
import { faker } from "@faker-js/faker";

export function mockData(item: ApiListNode) {
  const typeOptions = [
    "Lambda",
    "HTTP",
    "SNS",
    "DynamoDB",
    "EC2",
    "SQS",
    "S3",
    "RDS",
    "APIGateway",
  ];
  const teamOptions = [
    "DevSecOps",
    "Finance",
    "Merchant-X",
    "Commerce",
    "Platform",
    "Operations",
    "Data",
  ];

  return {
    ...item,
    name: faker.company.buzzPhrase().split(" ").join("-"),
    type: faker.helpers.arrayElement(typeOptions),
    description: faker.lorem.paragraph().substring(0, 200), // Ensures description is not more than 200 characters
    team: faker.helpers.arrayElement(teamOptions),
    documentationUrl: faker.internet.url(),
  } as ApiListNode;
}
