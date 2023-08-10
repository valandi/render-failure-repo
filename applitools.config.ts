import {
	BatchInfo,
	BrowserType,
	Configuration,
	Eyes,
	VisualGridRunner,
} from "@applitools/eyes-playwright";

let branchName = "";
if (process.env.GITHUB_REF !== undefined) {
	branchName = process.env.GITHUB_REF.replace("refs/heads/", "");
} else {
	const date = new Date();
	const month = date.toLocaleString("en-US", { month: "2-digit" });
	const day = date.toLocaleString("en-US", { day: "2-digit" });
	const year = date.getFullYear();
	branchName = `${month}-${day}-${year}`;
}
export class ApplitoolsConfig {
	readonly batch: BatchInfo;
	readonly config: Configuration;
	readonly runner: VisualGridRunner;

	constructor() {
		this.runner = new VisualGridRunner({ testConcurrency: 5 });

		this.batch = new BatchInfo({
			//id: branchName,
			name: `Batch Test ${branchName}`,
		});

		this.config = new Configuration();

		this.config.setBatch(this.batch);
		this.config.addBrowser(1064, 768, BrowserType.CHROME);
		this.config.addBrowser(1440, 1200, BrowserType.CHROME);
		this.config.addBrowser(820, 600, BrowserType.FIREFOX);
		this.config.addBrowser(1064, 768, BrowserType.FIREFOX);
		// this.config.addBrowser(1440, 1200, BrowserType.FIREFOX);
		// this.config.addBrowser(1440, 1200, BrowserType.EDGE_CHROMIUM);
		// this.config.addBrowser(820, 600, BrowserType.SAFARI);
		// this.config.addBrowser(1064, 768, BrowserType.SAFARI);
		// this.config.addBrowser(1440, 1200, BrowserType.SAFARI);
		//this.config.serverUrl = "https://epiceyes.applitools.com";
		this.config.dontCloseBatches = true;
		this.config.layoutBreakpoints = true;
		// this.config.setMatchLevel("Layout");
		// this.config.setIgnoreDisplacements(true);
		this.config.setBranchName(branchName);
		this.config.setParentBranchName("main");
	}

	createNewEyes(): Eyes {
		return new Eyes(this.runner, this.config);
	}
}
