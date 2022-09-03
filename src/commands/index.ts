import { Command, Flags } from "@oclif/core";
import { rollback } from "../main";

export default class VercelRollbackCommand extends Command {
  static description =
    "Rolls back the current production deployment to the previous one";
  static usage = "<project id> [-t <token>]";

  static args = [{ name: "projectId" }];

  static flags = {
    token: Flags.string({
      char: "t",
      description:
        "Vercel API token. Will fall back to environment variable VERCEL_API_TOKEN",
      required: false,
      default: process.env.VERCEL_API_TOKEN,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(VercelRollbackCommand);

    if (!flags.token) {
      throw new Error("No Vercel API token provided");
    }

    await rollback(args.projectId, flags.token);
  }
}
