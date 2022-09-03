import { getAliasStringsForDeployment } from "./aliases";
import { createClient } from "./client";
import {
  DeploymentDetail,
  getDeploymentDetails,
  getDeployments,
} from "./deployments";
import { doRollback } from "./rollback";

export enum RollbackDirection {
  Back = "back",
  Forward = "forward",
}

export async function rollback(
  projectId: string,
  apiToken: string,
  direction: RollbackDirection = RollbackDirection.Back
): Promise<void> {
  const client = createClient(apiToken);
  // TODO: can rework to only use getDeployments, need to pass query parameters
  //  of projectId, state=READY, and target=production
  const deployments = await getDeployments(client);
  // Sort the deployments by creation date, with the most recent first
  const sortedDeployments = [...deployments].sort(
    (a, b) => b.created - a.created
  );
  let foundCurrent = false;
  let latestDeployment: DeploymentDetail | undefined;
  let priorDeployment: DeploymentDetail | undefined;
  for (const deploy of sortedDeployments) {
    const deployDetail = await getDeploymentDetails(client, deploy.uid);
    if (
      deployDetail.projectId === projectId &&
      deployDetail.target === "production" &&
      deployDetail.readyState === "READY"
    ) {
      if (foundCurrent) {
        // Already previously found the latest deployment, so this is the one to roll back to
        priorDeployment = deployDetail;
        break;
      } else {
        // Got the latest deployment, keep looking for the previous one to roll back to
        foundCurrent = true;
        latestDeployment = deployDetail;
      }
    }
  }

  if (!latestDeployment) {
    throw new Error("No latest deployment found");
  }

  if (!priorDeployment) {
    throw new Error("No prior deployment found");
  }

  const currentDeployment =
    direction === RollbackDirection.Back ? latestDeployment : priorDeployment;
  const newDeployment =
    direction === RollbackDirection.Back ? priorDeployment : latestDeployment;

  console.log(`Rolling back to ${newDeployment.url} (${newDeployment.id})`);

  const aliases = await getAliasStringsForDeployment(
    client,
    currentDeployment.id
  );

  await doRollback(client, newDeployment, aliases);
}
