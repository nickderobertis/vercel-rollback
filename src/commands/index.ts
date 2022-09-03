import { Command, Flags } from "@oclif/core";
import { rollback, RollbackDirection } from "../main";

export default class VercelRollbackCommand extends Command {
  static description =
    "Rolls back the current production deployment to the previous one";
  static usage = "<project id> [-t <token>] [-f | --forward]";

  static args = [{ name: "projectId" }];

  static flags = {
    token: Flags.string({
      char: "t",
      description:
        "Vercel API token. Will fall back to environment variable VERCEL_API_TOKEN",
      required: false,
      default: process.env.VERCEL_API_TOKEN,
    }),
    forward: Flags.boolean({
      char: "f",
      description: "Roll forward to the next deployment rather than back",
      required: false,
      default: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(VercelRollbackCommand);

    if (!flags.token) {
      throw new Error("No Vercel API token provided");
    }

    const direction = flags.forward
      ? RollbackDirection.Forward
      : RollbackDirection.Back;

    await rollback(args.projectId, flags.token, direction);
  }
}
