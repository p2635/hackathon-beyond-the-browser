/*
  ABANDONED IDEA - Not enough time.

  Hackathon - Beyond the browser
  By: Philip Wong
  Created: 5 March 2023
  Test Environment:
  Windows 10 (64-bit)
  Firefox Browser v110.0.1 (64-bit)
  1920 x 1080 screen resolution
  NonVisual Desktop Access v2022.4
*/
import { aui } from '../helper/jest.setup';

describe('Launch NVDA', () => {

  it.only('should launch NVDA', async () => {
    await aui.execOnShell("start nvda").exec();
    await aui.expect().modal().exists().exec();
    await aui.expect().text().withExactText("Welcome to NVDA").exists().exec();
  });

  it.only('should dismiss welcome NVDA modal', async () => {
    await aui.expect().modal().exists().exec();
    await aui.pressKey('escape').exec();
    await aui.expect().modal().notExists().exec();
    await aui.expect().text().withExactText("Welcome to NVDA").notExists().exec();
  })

});
