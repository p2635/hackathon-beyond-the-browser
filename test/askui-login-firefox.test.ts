/*
  Hackathon - Beyond the browser
  By: Philip Wong
  Created: 5 March 2023
  Test Environment:
  * Windows 10 (64-bit), 125% text size
  * 1920 x 1080 screen resolution
  * Firefox Browser v110.0.1 (64-bit)
*/
import { aui } from './helper/jest.setup';

// Test data
const USERNAME = ''
const PASSWORD = ''
const FULL_NAME = 'Phil Wong'
const WORKSPACE_NAME = 'testing'

describe('Launch Firefox in private mode', () => {

  it('should launch Windows Run prompt', async () => {
    await aui.pressTwoKeys('command', 'R').exec();
    await aui.expect().text().withText("Type the name of a program").exists().exec();
  });

  it('should launch private Firefox from Run', async () => {
    await aui.type("firefox --private-window").exec();
    await aui.pressKey('enter').exec();
    
    await aui.expect().icon().withText('server').notExists().exec();
    await aui.expect().text().withText("Type the name of a program").notExists().exec();
    await aui.expect().text().withExactText("Firefox").exists().exec();
    await aui.expect().text().withText("Private window: Firefox clears your search and browsing history when you close all private windows.").exists().exec();
  });

});

describe('Set Firefox to Zoom text only 200%', () => {

  it('should open Firefox Settings', async () => {
    await aui.pressKey('alt').exec();
    await aui.pressKey('t').exec();
    await aui.pressKey('s').exec();
    await aui.expect().icon().withText("cog").exists().exec();
    await aui.expect().text().withText("Settings").exists().exec();
    await aui.expect().text().withText("Find in Settings").exists().exec();
  });

  it('should go to zoom settings', async () => {
    await aui.type('zoom').exec();
    await aui.expect().text().withText("Search Results").exists().exec();
    await aui.expect().text().withText("Zoom").exists().exec();
    await aui.expect().text().withText("Default zoom").exists().exec();
  });

  it('should set zoom level to 200%', async () => {
    await aui.expect().text().containsText("100").exists().exec();
    await aui.pressKey('tab').exec();
    await aui.pressKey('2').exec();
    await aui.expect().text().containsText("200").exists().exec();
    await aui.pressKey('tab').exec();
  });

  it('should toggle on zoom text only', async () => {
    await aui.pressThreeKeys('alt', 'shift', 't').exec();
    await aui.expect().icon().withText("stop").notExists().exec();
  });

});

describe('Keyboard user logs in to askui', () => {
  
  it('should show cookie policy when visiting askui homepage', async () => {
    await aui.pressTwoKeys('control', 'L').exec();
    await aui.type('askui.com').exec();
    await aui.pressKey('enter').exec();

    await aui.expect().text().withText("askui.com").exists().exec();
    await aui.expect().text().withText("askui").exists().exec();
    await aui.expect().text().containsText("Cookiebot").exists().exec();
  });

  it('should dismiss the cookie notice', async () => {
    await aui.click().text().withText('Deny').exec();

    await aui.expect().text().withText("Log in").exists().exec();
    await aui.expect().text().withText("Cookiebot").notExists().exec();
    await aui.expect().text().withText("This website uses cookies").notExists().exec();
  });

  it('should visit user login page', async () => {
    await aui.pressTwoKeys('control', 'f').exec();
    await aui.type('log in').exec();
    await aui.pressKey('escape').exec();
    await aui.pressKey('enter').exec();
    await aui.expect().text().withText("Log in | askui User Portal v2").exists().exec();
    await aui.expect().text().withText("Log in to askui").exists().exec();
    await aui.expect().text().withExactText("Email address").exists().exec();
    await aui.expect().text().withExactText("Password").exists().exec();
  });

  it('should log in successfully', async () => {
    await aui.type(USERNAME, { isSecret: true, secretMask: '**' }).exec();
    await aui.pressKey('tab').exec();
    await aui.type(PASSWORD, { isSecret: true, secretMask: '**' }).exec();
    await aui.pressKey('tab').exec();
    await aui.pressKey('tab').exec();
    await aui.pressKey('tab').exec();
    await aui.pressKey('enter').exec();

    await aui.expect().text().withText("UserPortal").exists().exec();
    await aui.expect().text().withText("Your quick start guide").exists().exec();
    await aui.expect().text().withText(FULL_NAME).exists().exec();
    await aui.expect().text().withText(WORKSPACE_NAME).exists().exec();
  });

});

