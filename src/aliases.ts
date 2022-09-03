import { AxiosInstance } from "axios";

type Alias = {
  /** The unique identifier of the alias */
  uid: string;
  /** The alias name, it could be a `.vercel.app` subdomain or a custom domain */
  alias: string;
  /** The date when the alias was created */
  created: string;
  /** Target destination domain for redirect when the alias is a redirect */
  redirect?: string | null;
};

type GetAlisesResponse = {
  aliases: Alias[];
};

async function getAliasesForDeployment(
  client: AxiosInstance,
  deploymentId: string
): Promise<Alias[]> {
  const response = await client.get<GetAlisesResponse>(
    `v2/deployments/${deploymentId}/aliases`
  );
  return response.data.aliases;
}

export async function getAliasStringsForDeployment(
  client: AxiosInstance,
  deploymentId: string
): Promise<string[]> {
  const aliases = await getAliasesForDeployment(client, deploymentId);
  return aliases.map(alias => alias.alias);
}
