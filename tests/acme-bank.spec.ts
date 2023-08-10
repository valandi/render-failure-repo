import { Region, Target, FileLogHandler } from "@applitools/eyes-playwright";
import { expect, test } from "@playwright/test";

import { ApplitoolsConfig } from "../applitools.config";
import type { Eyes } from "@applitools/eyes-playwright";

test.describe("home / discover", async () => {
	let eyes: Eyes;
	let applitoolsConfig: ApplitoolsConfig;

	test.beforeAll(async () => {
		applitoolsConfig = new ApplitoolsConfig();
		eyes = applitoolsConfig.createNewEyes();
		eyes.setLogHandler(new FileLogHandler(true, "eyes.log", false))
	});

	test.beforeEach(async ({ page }) => {
		await eyes.open(page, "Test", test.info().title, {
			width: 1024,
			height: 768,
		});
	});

	test.afterEach(async () => {
		await eyes.close(false);
	});

	test.afterAll(async() => {
		await console.log(eyes.runner.getAllTestResults(false));
	});

	test.only("home / discovery contains discovery page content", async ({
		page,
	}) => {
		await page.goto("https://www.fortnite.com");
		/*
		await expect(page.getByText("Trending Categories")).toBeVisible();
		await expect(
			page.getByText(/make your own game in fortnite/i)
		).toBeVisible();*/

		await eyes.check(
			"Discovery page",
			Target.window()
				.fully()
				// .layoutBreakpoints()
				// .layoutRegion({region:"body > main > section:nth-child(2) > div > div", padding:{ top: 0, bottom: 0, left: 0, right: 100 }})
				// .useDom(true)
				// .enablePatterns(true)
				// .lazyLoad()
		);
	});
});
