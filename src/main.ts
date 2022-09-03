import { getAliasStringsForDeployment } from "./aliases";
import { createClient } from "./client";
import {
  DeploymentDetail,
  getDeploymentDetails,
  getDeployments,
} from "./deployments";
import { doRollback } from "./rollback";

export async function rollback(
  projectId: string,
  apiToken: string
): Promise<void> {
  console.log("rollback", projectId, apiToken);
  const client = createClient(apiToken);
  // TODO: can rework to only use getDeployments, need to pass query parameters
  //  of projectId, state=READY, and target=production
  const deployments = await getDeployments(client);
  // Sort the deployments by creation date, with the most recent first
  const sortedDeployments = [...deployments].sort(
    (a, b) => b.created - a.created
  );
  let foundCurrent = false;
  let currentDeployment: DeploymentDetail | undefined;
  let previousDeployment: DeploymentDetail | undefined;
  for (const deploy of sortedDeployments) {
    const deployDetail = await getDeploymentDetails(client, deploy.uid);
    if (
      deployDetail.projectId === projectId &&
      deployDetail.target === "production" &&
      deployDetail.readyState === "READY"
    ) {
      if (foundCurrent) {
        // Already previously found the current deployment, so this is the one to roll back to
        previousDeployment = deployDetail;
        break;
      } else {
        // Got the current deployment, keep looking for the previous one to roll back to
        foundCurrent = true;
        currentDeployment = deployDetail;
      }
    }
  }

  if (!currentDeployment) {
    throw new Error("No current deployment found");
  }

  if (!previousDeployment) {
    throw new Error("No previous deployment found");
  }

  console.log(
    `Rolling back to ${previousDeployment.url} (${previousDeployment.id})`
  );

  const aliases = await getAliasStringsForDeployment(
    client,
    currentDeployment.id
  );

  await doRollback(client, previousDeployment, aliases);
}
