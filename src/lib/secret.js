import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const AWS_REGION = "ap-south-1";
const STAGE = process.env.STAGE || "prod"



export default async function getDatabaseUrl() {
  const DATABASE_URL_SSM_PARAM = `/serverless-nodejs-api/${STAGE}/database-url`
  const client = new SSMClient({ region: AWS_REGION });
  const paramStoreData = {
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true,
  }
  const coommand = new GetParameterCommand(paramStoreData)
  const result = await client.send(coommand)
  return result.Parameter.Value;
}

// export const getDatabaseUrl = getDatabaseUrl;
// export default getDatabaseUrl;
