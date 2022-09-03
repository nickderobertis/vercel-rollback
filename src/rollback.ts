import { AxiosInstance } from "axios";
import { DeploymentDetail } from "./deployments";

async function doRollbackForAlias(
  client: AxiosInstance,
  deployment: DeploymentDetail,
  aliasUrl: string
): Promise<void> {
  console.log(
    `Rolling back ${aliasUrl} to ${deployment.url} (${deployment.id})`
  );
  await client.post(`v2/now/deployments/${deployment.id}/aliases`, {
    alias: aliasUrl,
  });
  console.log(`Successfully rolled back ${aliasUrl}`);
}

export async function doRollback(
  client: AxiosInstance,
  deployment: DeploymentDetail,
  aliasUrls: string[]
): Promise<void> {
  await Promise.all(
    aliasUrls.map(aliasUrl => doRollbackForAlias(client, deployment, aliasUrl))
  );
}
